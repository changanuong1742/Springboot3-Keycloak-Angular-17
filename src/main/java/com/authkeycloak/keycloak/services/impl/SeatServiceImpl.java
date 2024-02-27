package com.authkeycloak.keycloak.services.impl;

import com.authkeycloak.keycloak.dto.SeatRequestDto;
import com.authkeycloak.keycloak.dto.SeatResponseDto;
import com.authkeycloak.keycloak.model.Seat;
import com.authkeycloak.keycloak.repositories.SeatRepository;
import com.authkeycloak.keycloak.services.SeatService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SeatServiceImpl implements SeatService {
    private final SeatRepository seatRepository;
    ModelMapper modelMapper = new ModelMapper();

    @Override
    public Seat saveSeat(Seat seat) {
        return seatRepository.save(seat);
    }

    @Override
    public List<SeatResponseDto> getAllSeats() {
        List<Seat> seats = (List<Seat>) seatRepository.findAll();
        Type setOfDTOsType = new TypeToken<List<SeatResponseDto>>() {
        }.getType();
        List<SeatResponseDto> seatResponseDtos = modelMapper.map(seats, setOfDTOsType);
        return seatResponseDtos;
    }

    @Override
    public ResponseEntity<?> createSeat(SeatRequestDto seatDto) {
        if (seatRepository.existsByName(seatDto.getName())) {
            return new ResponseEntity<>("name is already taken !", HttpStatus.SEE_OTHER);
        } else {
            Seat seat = new Seat();
            seat.setName(seatDto.getName());
            seatRepository.save(seat);
            return new ResponseEntity<>("Created Seat", HttpStatus.OK);
        }
    }

    @Override
    public ResponseEntity<?> deleteSeat(Long id) {
        if (seatRepository.existsById(id)) {
            seatRepository.deleteById(id);
            return new ResponseEntity<>("Deleted !", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Created Seat", HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public SeatResponseDto getSeat(Long id) {
        Seat seat = seatRepository.findFirstById(id);
        SeatResponseDto seatResponse = modelMapper.map(seat, SeatResponseDto.class);
        return seatResponse;
    }

    @Override
    public ResponseEntity<?> updateSeat(SeatRequestDto seatDto) {

        if (seatRepository.existsByName(seatDto.getName())) {
            return new ResponseEntity<>("Name exists", HttpStatus.SEE_OTHER);
        } else {
            Seat seat = seatRepository.findFirstById(seatDto.getId());
            // Map values from SeatRequestDto to Seat
            modelMapper.map(seatDto, seat);
            // Save the updated seat to the repository
            seatRepository.save(seat);
            return new ResponseEntity<>("Created Seat", HttpStatus.OK);
        }

    }
}
