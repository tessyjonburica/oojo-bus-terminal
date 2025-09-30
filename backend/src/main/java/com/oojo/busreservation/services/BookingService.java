package com.oojo.busreservation.services;

import com.oojo.busreservation.dto.BookingRequest;
import com.oojo.busreservation.dto.BookingResponse;
import com.oojo.busreservation.models.Booking;
import com.oojo.busreservation.models.BookingStatus;
import com.oojo.busreservation.models.Bus;
import com.oojo.busreservation.models.User;
import com.oojo.busreservation.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class BookingService {
    
    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private BusService busService;
    
    @Autowired
    private AuthService authService;
    
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("hh:mm a");
    
    public BookingResponse createBooking(BookingRequest request, String userEmail) {
        User user = (User) authService.loadUserByUsername(userEmail);
        Bus bus = busService.findById(request.getBusId());
        
        if (bus.getAvailableSeats() <= 0) {
            throw new RuntimeException("No available seats on this bus");
        }
        
        // Auto-assign seat number if not provided
        Integer seatNumber = request.getSeatNumber();
        if (seatNumber == null) {
            seatNumber = assignRandomSeat(bus);
        } else {
            // Check if seat is already taken
            if (bookingRepository.findActiveBookingByBusAndSeatNumber(bus, seatNumber).isPresent()) {
                throw new RuntimeException("Seat " + seatNumber + " is already taken");
            }
        }
        
        Booking booking = new Booking(user, bus, seatNumber);
        Booking savedBooking = bookingRepository.save(booking);
        
        return convertToResponse(savedBooking);
    }
    
    public List<BookingResponse> getUserBookings(String userEmail) {
        User user = (User) authService.loadUserByUsername(userEmail);
        List<Booking> bookings = bookingRepository.findByUserOrderByBookingDateDesc(user);
        return bookings.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    public void cancelBooking(Long bookingId, String userEmail) {
        User user = (User) authService.loadUserByUsername(userEmail);
        Booking booking = bookingRepository.findByIdAndUser(bookingId, user)
                .orElseThrow(() -> new RuntimeException("Booking not found or access denied"));
        
        if (booking.getStatus() == BookingStatus.CANCELED) {
            throw new RuntimeException("Booking is already canceled");
        }
        
        booking.setStatus(BookingStatus.CANCELED);
        bookingRepository.save(booking);
    }
    
    public BookingResponse getBookingStatus(Long bookingId, String userEmail) {
        User user = (User) authService.loadUserByUsername(userEmail);
        Booking booking = bookingRepository.findByIdAndUser(bookingId, user)
                .orElseThrow(() -> new RuntimeException("Booking not found or access denied"));
        
        return convertToResponse(booking);
    }
    
    private Integer assignRandomSeat(Bus bus) {
        Random random = new Random();
        int maxAttempts = 100;
        
        for (int i = 0; i < maxAttempts; i++) {
            int seatNumber = random.nextInt(bus.getTotalSeats()) + 1;
            if (bookingRepository.findActiveBookingByBusAndSeatNumber(bus, seatNumber).isEmpty()) {
                return seatNumber;
            }
        }
        
        throw new RuntimeException("Unable to assign a seat. Please try again.");
    }
    
    private BookingResponse convertToResponse(Booking booking) {
        return new BookingResponse(
                booking.getId(),
                booking.getBus().getRouteName(),
                booking.getSeatNumber(),
                booking.getBus().getPrice(),
                booking.getStatus().toString().toLowerCase(),
                booking.getBookingDate().format(DATE_FORMATTER),
                booking.getBus().getDepartureTime().format(TIME_FORMATTER)
        );
    }
}
