package com.oojo.busreservation.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class BookingResponse {
    
    private Long id;
    private String busRoute;
    private Integer seatNumber;
    private BigDecimal price;
    private String status;
    private String bookingDate;
    private String departureTime;
    
    // Constructors
    public BookingResponse() {}
    
    public BookingResponse(Long id, String busRoute, Integer seatNumber, BigDecimal price, 
                          String status, String bookingDate, String departureTime) {
        this.id = id;
        this.busRoute = busRoute;
        this.seatNumber = seatNumber;
        this.price = price;
        this.status = status;
        this.bookingDate = bookingDate;
        this.departureTime = departureTime;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getBusRoute() {
        return busRoute;
    }
    
    public void setBusRoute(String busRoute) {
        this.busRoute = busRoute;
    }
    
    public Integer getSeatNumber() {
        return seatNumber;
    }
    
    public void setSeatNumber(Integer seatNumber) {
        this.seatNumber = seatNumber;
    }
    
    public BigDecimal getPrice() {
        return price;
    }
    
    public void setPrice(BigDecimal price) {
        this.price = price;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public String getBookingDate() {
        return bookingDate;
    }
    
    public void setBookingDate(String bookingDate) {
        this.bookingDate = bookingDate;
    }
    
    public String getDepartureTime() {
        return departureTime;
    }
    
    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }
}
