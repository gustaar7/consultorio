package com.gustavo.consultorio.service;

import com.gustavo.consultorio.entity.ConsultaEntity;
import com.gustavo.consultorio.repository.ConsultaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConsultaService {

    @Autowired
    private ConsultaRepository consultaRepository;

    private void validarConsulta(ConsultaEntity consulta, Long idIgnorado) {

        if (consulta.getPaciente() == null || consulta.getMedico() == null) {
            throw new RuntimeException("Paciente e médico são obrigatórios");
        }

        Long medicoId = consulta.getMedico().getId();

        if (idIgnorado == null) {
            if (consultaRepository.existsByMedicoIdAndHoraData(medicoId, consulta.getHoraData())) {
                throw new RuntimeException("Médico já tem consulta nesse horário");
            }
        } else {
            if (consultaRepository.existsByMedicoIdAndHoraDataAndIdNot(medicoId, consulta.getHoraData(), idIgnorado)) {
                throw new RuntimeException("Médico já tem consulta nesse horário");
            }
        }

        if (idIgnorado == null) {
            if (consultaRepository.existsBySalaAndHoraData(consulta.getSala(), consulta.getHoraData())) {
                throw new RuntimeException("Sala já ocupada nesse horário");
            }
        } else {
            if (consultaRepository.existsBySalaAndHoraDataAndIdNot(consulta.getSala(), consulta.getHoraData(), idIgnorado)) {
                throw new RuntimeException("Sala já ocupada nesse horário");
            }
        }
    }

    public ConsultaEntity salvarConsulta(ConsultaEntity consulta) {
        validarConsulta(consulta, null);
        return consultaRepository.save(consulta);
    }

    public ConsultaEntity atualizarConsulta(Long id, ConsultaEntity atualizada) {

        ConsultaEntity consulta = consultaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consulta não encontrada"));

        consulta.setPaciente(atualizada.getPaciente());
        consulta.setMedico(atualizada.getMedico());
        consulta.setHoraData(atualizada.getHoraData());
        consulta.setSala(atualizada.getSala());

        validarConsulta(consulta, id);

        return consultaRepository.save(consulta);
    }

    public List<ConsultaEntity> listarTodas() {
        return consultaRepository.findAll();
    }

    public ConsultaEntity buscarPorId(Long id) {
        return consultaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consulta não encontrada"));
    }

    public void deletarConsulta(Long id) {
        if (!consultaRepository.existsById(id)) {
            throw new RuntimeException("Consulta não encontrada");
        }
        consultaRepository.deleteById(id);
    }
}
