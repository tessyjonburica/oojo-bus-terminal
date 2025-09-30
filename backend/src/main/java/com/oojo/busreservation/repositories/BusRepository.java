package com.oojo.busreservation.repositories;

import com.oojo.busreservation.models.Bus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface BusRepository extends JpaRepository<Bus, Long> {
    
    @Query("SELECT b FROM Bus b WHERE b.price <= :maxPrice ORDER BY b.departureTime")
    List<Bus> findByPriceLessThanEqualOrderByDepartureTime(@Param("maxPrice") BigDecimal maxPrice);
    
    @Query("SELECT b FROM Bus b ORDER BY b.departureTime")
    List<Bus> findAllOrderByDepartureTime();
}
