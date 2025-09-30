package com.oojo.busreservation.controllers;

import com.oojo.busreservation.dto.ApiResponse;
import com.oojo.busreservation.dto.BookingRequest;
import com.oojo.busreservation.dto.BookingResponse;
import com.oojo.busreservation.services.BookingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = {"http://localhost:3000", "https://vercel.com/tessyjonburicas-projects/v0-oojo-bus-terminal-frontend"})
public class BookingController {
    
    @Autowired
    private BookingService bookingService;
    
    @PostMapping
    public ResponseEntity<ApiResponse<BookingResponse>> createBooking(
            @Valid @RequestBody BookingRequest request,
            Authentication authentication) {
        try {
            String userEmail = authentication.getName();
            BookingResponse booking = bookingService.createBooking(request, userEmail);
            return ResponseEntity.ok(ApiResponse.success("Booking created successfully", booking));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to create booking: " + e.getMessage()));
        }
    }
    
    @GetMapping
    public ResponseEntity<ApiResponse<List<BookingResponse>>> getUserBookings(Authentication authentication) {
        try {
            String userEmail = authentication.getName();
            List<BookingResponse> bookings = bookingService.getUserBookings(userEmail);
            return ResponseEntity.ok(ApiResponse.success(bookings));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to fetch bookings: " + e.getMessage()));
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> cancelBooking(
            @PathVariable Long id,
            Authentication authentication) {
        try {
            String userEmail = authentication.getName();
            bookingService.cancelBooking(id, userEmail);
            return ResponseEntity.ok(ApiResponse.success("Booking canceled successfully", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to cancel booking: " + e.getMessage()));
        }
    }
    
    @GetMapping("/status/{id}")
    public ResponseEntity<ApiResponse<BookingResponse>> getBookingStatus(
            @PathVariable Long id,
            Authentication authentication) {
        try {
            String userEmail = authentication.getName();
            BookingResponse booking = bookingService.getBookingStatus(id, userEmail);
            return ResponseEntity.ok(ApiResponse.success(booking));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to fetch booking status: " + e.getMessage()));
        }
    }

    // Alias endpoint to match spec: GET /status/{id}
    @GetMapping("/../status/{id}")
    public ResponseEntity<ApiResponse<BookingResponse>> getBookingStatusAlias(
            @PathVariable Long id,
            Authentication authentication) {
        return getBookingStatus(id, authentication);
    }
}
