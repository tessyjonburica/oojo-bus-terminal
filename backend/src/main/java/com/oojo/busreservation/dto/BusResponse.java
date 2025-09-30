package com.oojo.busreservation.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class BusResponse {
    
    private Long id;
    private String route;
    private BigDecimal price;
    private String departureTime;
    private Integer seats;
    private Integer availableSeats;
    
    // Constructors
    public BusResponse() {}
    
    public BusResponse(Long id, String route, BigDecimal price, String departureTime, 
                      Integer seats, Integer availableSeats) {
        this.id = id;
        this.route = route;
        this.price = price;
        this.departureTime = departureTime;
        this.seats = seats;
        this.availableSeats = availableSeats;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getRoute() {
        return route;
    }
    
    public void setRoute(String route) {
        this.route = route;
    }
    
    public BigDecimal getPrice() {
        return price;
    }
    
    public void setPrice(BigDecimal price) {
        this.price = price;
    }
    
    public String getDepartureTime() {
        return departureTime;
    }
    
    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }
    
    public Integer getSeats() {
        return seats;
    }
    
    public void setSeats(Integer seats) {
        this.seats = seats;
    }
    
    public Integer getAvailableSeats() {
        return availableSeats;
    }
    
    public void setAvailableSeats(Integer availableSeats) {
        this.availableSeats = availableSeats;
    }
}
