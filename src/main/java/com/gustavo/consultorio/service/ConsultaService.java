package com.gustavo.consultorio.service;

import com.gustavo.consultorio.entity.ConsultaEntity;
import com.gustavo.consultorio.repository.ConsultaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class ConsultaService {
    @Autowired
    private ConsultaRepository consultaService;

    public void verificarConflitos(ConsultaEntity consulta) {

        boolean horarioOcupado =
                consultaService.existsByMedicoAndHoraData(
                        consulta.getMedico(),
                        consulta.getHoraData());
        System.out.println("Horario ocupado? " + horarioOcupado);

        if (horarioOcupado) {
            throw new RuntimeException(
                    "Esse medico ja tem consulta nesse horario");
        }

        boolean salaOcupada =
                consultaService.existsBySalaAndHoraData(
                        consulta.getSala(),
                        consulta.getHoraData());
        System.out.println("Sala ocupada? " + salaOcupada);

        if (salaOcupada) {
            throw new RuntimeException(
                    "Ja existe uma consulta nessa sala no mesmo horario");
        }
    }

    public ConsultaEntity salvarConsulta(ConsultaEntity consulta) {
        if (consulta.getCliente() == null || consulta.getCliente().isEmpty()) {
            throw new RuntimeException("O nome do cliente nao pode estar vazio!");
        }
        verificarConflitos(consulta);

        return consultaService.save(consulta);
    }

    public ConsultaEntity atualizarConsulta(Long id, ConsultaEntity consultaAtualizada) {
        ConsultaEntity consulta = consultaService.findById(id)
                .orElseThrow(() -> new RuntimeException("Nao encontramos esse id"));

        consulta.setCliente(consultaAtualizada.getCliente());
        consulta.setMedico(consultaAtualizada.getMedico());
        consulta.setHoraData(consultaAtualizada.getHoraData());
        consulta.setSala(consultaAtualizada.getSala());

        verificarConflitos(consulta);

        return consultaService.save(consulta);
    }

    public List<ConsultaEntity> listarTodas() {
        return consultaService.findAll();
    }

    public Optional<ConsultaEntity> buscarPorId(Long id) {
        return consultaService.findById(id);
    }

    public void deletarConsulta(Long id) {
        consultaService.deleteById(id);
    }
}
