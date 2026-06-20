package com.gustavo.consultorio.repository;

import com.gustavo.consultorio.entity.MedicoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MedicoRepository extends JpaRepository<MedicoEntity, Long> {
    Optional<MedicoEntity> findByNomeIgnoreCase(String nome);
}
