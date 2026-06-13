package com.gustavo.consultorio.service;

import com.gustavo.consultorio.entity.PacienteEntity;
import com.gustavo.consultorio.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {

    @Autowired
    private PacienteRepository pacienteRepository;

    public PacienteEntity criarPaciente(PacienteEntity paciente) {
        return pacienteRepository.save(paciente);
    }

    public PacienteEntity atualizaPaciente(Long id, PacienteEntity pacienteAtualizado) {
        PacienteEntity paciente = pacienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paciente nao encontrado"));

        paciente.setCpf(pacienteAtualizado.getCpf());
        paciente.setNome(pacienteAtualizado.getNome());
        paciente.setEmail(pacienteAtualizado.getEmail());
        paciente.setSenha(pacienteAtualizado.getSenha());

        return pacienteRepository.save(paciente);
    }

    public List<PacienteEntity> listAllPacientes() {
        return pacienteRepository.findAll();
    }

    public Optional<PacienteEntity> listByIdPacientes(Long id) {
        return pacienteRepository.findById(id);
    }

    public void deletarPaciente(Long id) {
        pacienteRepository.deleteById(id);
    }
}
