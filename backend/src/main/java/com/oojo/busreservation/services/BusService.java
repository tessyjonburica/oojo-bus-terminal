package com.oojo.busreservation.services;

import com.oojo.busreservation.dto.BusResponse;
import com.oojo.busreservation.models.Bus;
import com.oojo.busreservation.repositories.BookingRepository;
import com.oojo.busreservation.repositories.BusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BusService {
    
    @Autowired
    private BusRepository busRepository;

    @Autowired
    private BookingRepository bookingRepository;
    
    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("hh:mm a");
    
    public List<BusResponse> getAllBuses() {
        List<Bus> buses = busRepository.findAllOrderByDepartureTime();
        return buses.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    public List<BusResponse> getBusesByMaxPrice(BigDecimal maxPrice) {
        List<Bus> buses = busRepository.findByPriceLessThanEqualOrderByDepartureTime(maxPrice);
        return buses.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    public Bus findById(Long id) {
        return busRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bus not found with id: " + id));
    }
    
    private BusResponse convertToResponse(Bus bus) {
        int active = (int) bookingRepository.countActiveBookingsByBus(bus);
        int available = Math.max(0, bus.getTotalSeats() - active);
        return new BusResponse(
                bus.getId(),
                bus.getRouteName(),
                bus.getPrice(),
                bus.getDepartureTime().format(TIME_FORMATTER),
                bus.getTotalSeats(),
                available
        );
    }
}
