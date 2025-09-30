package com.oojo.busreservation.dto;

import jakarta.validation.constraints.NotNull;

public class BookingRequest {
    
    @NotNull
    private Long busId;
    
    private Integer seatNumber;
    
    // Constructors
    public BookingRequest() {}
    
    public BookingRequest(Long busId, Integer seatNumber) {
        this.busId = busId;
        this.seatNumber = seatNumber;
    }
    
    // Getters and Setters
    public Long getBusId() {
        return busId;
    }
    
    public void setBusId(Long busId) {
        this.busId = busId;
    }
    
    public Integer getSeatNumber() {
        return seatNumber;
    }
    
    public void setSeatNumber(Integer seatNumber) {
        this.seatNumber = seatNumber;
    }
}
