package com.gustavo.consultorio.repository;

import com.gustavo.consultorio.entity.PacienteEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PacienteRepository extends JpaRepository<PacienteEntity, Long> {
	Optional<PacienteEntity> findByEmail(String email);
	Optional<PacienteEntity> findByNomeIgnoreCase(String nome);
}
