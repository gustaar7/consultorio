package com.gustavo.consultorio.repository;

import com.gustavo.consultorio.entity.ConsultaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface ConsultaRepository extends JpaRepository<ConsultaEntity, Long> {

    boolean existsByMedicoIdAndHoraData(Long medicoId, LocalDateTime horaData);

    boolean existsByMedicoIdAndHoraDataAndIdNot(Long medicoId, LocalDateTime horaData, Long id);

    boolean existsBySalaAndHoraData(String sala, LocalDateTime horaData);

    boolean existsBySalaAndHoraDataAndIdNot(String sala, LocalDateTime horaData, Long id);
}
