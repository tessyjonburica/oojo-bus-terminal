package com.oojo.busreservation.controllers;

import com.oojo.busreservation.dto.ApiResponse;
import com.oojo.busreservation.dto.BusResponse;
import com.oojo.busreservation.services.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/buses")
@CrossOrigin(origins = {"http://localhost:3000", "https://vercel.com/tessyjonburicas-projects/v0-oojo-bus-terminal-frontend"})
public class BusController {
    
    @Autowired
    private BusService busService;
    
    @GetMapping
    public ResponseEntity<ApiResponse<List<BusResponse>>> getAllBuses(
            @RequestParam(required = false) BigDecimal maxPrice) {
        try {
            List<BusResponse> buses;
            if (maxPrice != null) {
                buses = busService.getBusesByMaxPrice(maxPrice);
            } else {
                buses = busService.getAllBuses();
            }
            return ResponseEntity.ok(ApiResponse.success(buses));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to fetch buses: " + e.getMessage()));
        }
    }
}
