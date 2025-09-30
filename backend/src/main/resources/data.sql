-- Demo Users (all with password: "password")
INSERT INTO users (id, name, email, password_hash) VALUES
(1, 'Demo User', 'demo@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi'),
(2, 'John Doe', 'john@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi'),
(3, 'Jane Smith', 'jane@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi'),
(4, 'Alex Johnson', 'alex@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi'),
(5, 'Mary Okafor', 'mary@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi');

-- Demo Buses
INSERT INTO buses (id, route_name, departure_time, arrival_time, price, total_seats) VALUES
(1, 'Lagos → Abuja', '2025-01-15 08:00:00', '2025-01-15 16:00:00', 10000.00, 40),
(2, 'Abuja → Kaduna', '2025-01-16 09:00:00', '2025-01-16 12:00:00', 5000.00, 30),
(3, 'Lagos → Port Harcourt', '2025-01-17 06:00:00', '2025-01-17 14:00:00', 8000.00, 35),
(4, 'Kano → Lagos', '2025-01-18 10:00:00', '2025-01-18 20:00:00', 12000.00, 45),
(5, 'Ibadan → Abuja', '2025-01-19 07:00:00', '2025-01-19 15:00:00', 7000.00, 38),
(6, 'Abuja → Enugu', '2025-01-20 08:30:00', '2025-01-20 14:30:00', 6500.00, 32),
(7, 'Enugu → Port Harcourt', '2025-01-21 09:15:00', '2025-01-21 12:45:00', 4500.00, 28),
(8, 'Lagos → Ibadan', '2025-01-22 07:00:00', '2025-01-22 09:30:00', 3000.00, 50),
(9, 'Abuja → Kano', '2025-01-23 11:00:00', '2025-01-23 15:00:00', 6000.00, 36),
(10, 'Port Harcourt → Abuja', '2025-01-24 06:45:00', '2025-01-24 14:15:00', 9000.00, 34),
(11, 'Kaduna → Jos', '2025-01-25 10:00:00', '2025-01-25 13:30:00', 4000.00, 26),
(12, 'Lagos → Benin City', '2025-01-26 08:00:00', '2025-01-26 12:30:00', 5500.00, 40);

-- Demo Bookings
INSERT INTO bookings (id, user_id, bus_id, seat_number, status, booking_date) VALUES
(1, 1, 1, 15, 'ACTIVE', '2025-01-10 10:30:00'),
(2, 1, 2, 8, 'CANCELED', '2025-01-08 14:20:00'),
(3, 1, 3, 22, 'ACTIVE', '2025-01-12 09:15:00'),
(4, 2, 1, 5, 'ACTIVE', '2025-01-11 08:05:00'),
(5, 2, 5, 12, 'ACTIVE', '2025-01-13 16:25:00'),
(6, 2, 8, 20, 'CANCELED', '2025-01-14 12:40:00'),
(7, 3, 2, 4, 'ACTIVE', '2025-01-12 07:50:00'),
(8, 3, 4, 18, 'ACTIVE', '2025-01-15 09:05:00'),
(9, 3, 9, 9, 'CANCELED', '2025-01-16 11:30:00'),
(10, 4, 3, 25, 'ACTIVE', '2025-01-13 10:10:00'),
(11, 4, 6, 7, 'ACTIVE', '2025-01-18 13:45:00'),
(12, 4, 10, 11, 'CANCELED', '2025-01-19 15:00:00'),
(13, 5, 7, 6, 'ACTIVE', '2025-01-17 08:20:00'),
(14, 5, 8, 2, 'ACTIVE', '2025-01-18 07:10:00'),
(15, 5, 11, 10, 'CANCELED', '2025-01-20 09:55:00'),
(16, 1, 12, 14, 'ACTIVE', '2025-01-21 10:35:00'),
(17, 2, 9, 3, 'ACTIVE', '2025-01-21 12:05:00'),
(18, 3, 10, 16, 'ACTIVE', '2025-01-22 06:20:00'),
(19, 4, 12, 21, 'ACTIVE', '2025-01-22 11:40:00'),
(20, 5, 6, 15, 'ACTIVE', '2025-01-23 08:00:00');
