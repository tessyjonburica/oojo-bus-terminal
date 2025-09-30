# Oojo Bus Terminal Backend

A Spring Boot REST API backend for the Bus Reservation System - Assignment Demo Version.

## 🚀 Features

- **Authentication**: JWT-based login/register system
- **Bus Management**: List and filter buses by price
- **Booking System**: Create, view, and cancel bookings
- **Security**: BCrypt password hashing and JWT tokens
- **Database**: PostgreSQL with JPA/Hibernate
- **CORS**: Configured for frontend integration

## 🛠️ Technology Stack

- **Framework**: Spring Boot 3.2.0
- **Database**: PostgreSQL 15
- **ORM**: Spring Data JPA (Hibernate)
- **Security**: Spring Security with JWT
- **Build Tool**: Maven
- **Java Version**: 17

## 📋 Prerequisites

- Java 17 or higher
- Maven 3.6+
- PostgreSQL 12+

## 🚀 Quick Start (Assignment Setup)

1. **Start PostgreSQL** and create database:
```sql
CREATE DATABASE oojo_bus_terminal;
```

2. **Update application.properties** with your database credentials:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/oojo_bus_terminal
spring.datasource.username=postgres
spring.datasource.password=your_postgres_password
```

3. **Run the application**:
```bash
# Windows
mvnw.cmd spring-boot:run

# Linux/Mac
./mvnw spring-boot:run
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires JWT)

### Buses
- `GET /api/buses` - List all buses
- `GET /api/buses?maxPrice=5000` - Filter buses by price

### Bookings (Requires JWT)
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - List user's bookings
- `DELETE /api/bookings/{id}` - Cancel booking
- `GET /api/bookings/status/{id}` - Get booking status

## 🔐 Demo Credentials (For Assignment)

- **Email**: demo@example.com
- **Password**: password

## 📊 Pre-loaded Demo Data

The application comes with pre-seeded data for demonstration:
- **1 demo user** with login credentials
- **5 sample bus routes** with different destinations and prices
- **3 sample bookings** showing various booking states

### Sample Bus Routes
- Lagos → Abuja (₦5,000)
- Lagos → Port Harcourt (₦4,500)
- Abuja → Kano (₦3,500)
- Lagos → Ibadan (₦2,500)
- Abuja → Lagos (₦5,500)

## Environment Variables
- `SPRING_DATASOURCE_URL` - Database URL
- `SPRING_DATASOURCE_USERNAME` - Database username
- `SPRING_DATASOURCE_PASSWORD` - Database password
- `JWT_SECRET` - JWT signing secret
- `JWT_EXPIRATION` - JWT expiration time

## 🔧 Configuration

Key configuration in `application.properties`:
- Database connection settings
- JWT secret and expiration
- CORS configuration
- Logging levels

## 🧪 Testing

```bash
# Run tests
./mvnw test

# Run with coverage
./mvnw test jacoco:report
```

## 📝 API Examples

### Register User
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com",
    "password": "password"
  }'
```

### Get Buses
```bash
curl http://localhost:8080/api/buses
```

### Create Booking (with JWT)
```bash
curl -X POST http://localhost:8080/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "busId": 1,
    "seatNumber": 15
  }'
```

## 🏗️ Project Structure

```
backend/
├── src/main/java/com/oojo/busreservation/
│   ├── controllers/          # REST Controllers
│   ├── services/            # Business logic
│   ├── repositories/        # Spring Data JPA Repos
│   ├── models/              # Entities
│   ├── dto/                 # Request/Response DTOs
│   ├── security/            # JWT Security config
│   ├── exception/           # Global exception handling
│   └── Application.java     # Main entry point
├── src/main/resources/
│   ├── application.properties
│   └── data.sql            # Demo seed data
├── pom.xml
```

## 🔒 Security Features

- JWT-based authentication
- BCrypt password hashing
- CORS configuration
- Input validation
- Global exception handling
- Secure user management

## 🚀 Production Deployment

1. Set strong JWT secret
2. Use environment variables for sensitive data
3. Configure proper CORS origins
4. Set up SSL/TLS
5. Use production database
6. Configure logging
7. Set up monitoring

## 📞 Support

For issues or questions, please check the logs or create an issue in the repository.
