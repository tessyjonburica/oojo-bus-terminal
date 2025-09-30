package com.oojo.busreservation.repositories;

import com.oojo.busreservation.models.Booking;
import com.oojo.busreservation.models.BookingStatus;
import com.oojo.busreservation.models.Bus;
import com.oojo.busreservation.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    
    List<Booking> findByUserOrderByBookingDateDesc(User user);
    
    List<Booking> findByUserAndStatusOrderByBookingDateDesc(User user, BookingStatus status);
    
    @Query("SELECT COUNT(b) FROM Booking b WHERE b.bus = :bus AND b.status = 'ACTIVE'")
    long countActiveBookingsByBus(@Param("bus") Bus bus);
    
    @Query("SELECT b FROM Booking b WHERE b.bus = :bus AND b.seatNumber = :seatNumber AND b.status = 'ACTIVE'")
    Optional<Booking> findActiveBookingByBusAndSeatNumber(@Param("bus") Bus bus, @Param("seatNumber") Integer seatNumber);
    
    @Query("SELECT b FROM Booking b WHERE b.id = :id AND b.user = :user")
    Optional<Booking> findByIdAndUser(@Param("id") Long id, @Param("user") User user);
}
