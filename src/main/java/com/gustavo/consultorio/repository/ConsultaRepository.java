package com.gustavo.consultorio.repository;

import com.gustavo.consultorio.entity.ConsultaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface ConsultaRepository extends JpaRepository<ConsultaEntity, Long> {

    boolean existsByMedicoAndHoraData(
            String medico,
            LocalDateTime horaData
    );

    boolean existsBySalaAndHoraData(
            String sala,
            LocalDateTime horaData
    );
}