package com.authkeycloak.keycloak.repositories;

import com.authkeycloak.keycloak.model.Seat;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeatRepository extends CrudRepository<Seat, Long> {
    Boolean existsByName(String name);
    boolean existsById(Long id);
    Seat findFirstById(Long id);
}
