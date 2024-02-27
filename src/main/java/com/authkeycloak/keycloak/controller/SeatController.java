package com.authkeycloak.keycloak.controller;

import com.authkeycloak.keycloak.dto.SeatRequestDto;
import com.authkeycloak.keycloak.dto.SeatResponseDto;
import com.authkeycloak.keycloak.model.Seat;
import com.authkeycloak.keycloak.repositories.SeatRepository;
import com.authkeycloak.keycloak.services.SeatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/seat")
@RequiredArgsConstructor
public class SeatController {

    private final SeatService seatService;
    private final SeatRepository seatRepository;


    @PostMapping
    @PreAuthorize("hasRole('create-seat')")
    public ResponseEntity<?> createSeat(@RequestBody SeatRequestDto seatDto) {
        try {
            // Gọi service để xử lý logic và trả về dữ liệu thành công
            ResponseEntity<?> response = seatService.createSeat(seatDto);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Xử lý các trường hợp lỗi và trả về thông điệp lỗi
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating seat: " + e.getMessage());
        }
    }

    @PutMapping
    @PreAuthorize("hasRole('edit-seat')")
    public ResponseEntity<?> updateSeat(@RequestBody SeatRequestDto seatDto) {
        System.out.println(seatDto);
        try {
            // Gọi service để xử lý logic và trả về dữ liệu thành công
            ResponseEntity<?> response = seatService.updateSeat(seatDto);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Xử lý các trường hợp lỗi và trả về thông điệp lỗi
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error update seat: " + e.getMessage());
        }
    }

    @PreAuthorize("hasRole('view-seat')")
    @GetMapping
    public ResponseEntity<List<SeatResponseDto>> getAllSeats() {
        try {
            List<SeatResponseDto> seatResponseDtos = seatService.getAllSeats();
            return ResponseEntity.ok(seatResponseDtos);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PreAuthorize("hasRole('delete-seat')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            ResponseEntity<?> response = seatService.deleteSeat(id);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting seat: " + e.getMessage());
        }
    }

    @GetMapping("/edit/{id}")
    public SeatResponseDto getSeatById(@PathVariable Long id) {
        try {
            SeatResponseDto seatResponseDto = seatService.getSeat(id);
            return seatResponseDto;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
