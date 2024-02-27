package com.authkeycloak.keycloak.services;

import com.authkeycloak.keycloak.dto.SeatRequestDto;
import com.authkeycloak.keycloak.dto.SeatResponseDto;
import com.authkeycloak.keycloak.model.Seat;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface SeatService {
    Seat saveSeat(Seat seat);
    ResponseEntity<?> createSeat (SeatRequestDto seatDto);
    ResponseEntity<?> deleteSeat (Long id);
    List<SeatResponseDto> getAllSeats(); // Updated method name
    SeatResponseDto getSeat(Long id);
    ResponseEntity<?>  updateSeat (SeatRequestDto seatDto);
}
