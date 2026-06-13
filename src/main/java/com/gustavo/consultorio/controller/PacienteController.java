package com.gustavo.consultorio.controller;

import com.gustavo.consultorio.entity.PacienteEntity;
import com.gustavo.consultorio.service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/pacientes")
public class PacienteController {

    @Autowired
    private PacienteService pacienteService;

    @PostMapping
    public PacienteEntity criarPaciente(@RequestBody PacienteEntity paciente) {
        return pacienteService.criarPaciente(paciente);
    }

    @PutMapping("/{id}")
    public PacienteEntity atualizaPaciente(@PathVariable Long id,
                                           @RequestBody PacienteEntity pacienteAtualizado) {
        return pacienteService.atualizaPaciente(id, pacienteAtualizado);
    }

    @GetMapping
    public List<PacienteEntity> listAllPacientes() {
        return pacienteService.listAllPacientes();
    }

    @GetMapping("/{id}")
    public Optional<PacienteEntity> listaByIdPacientes(@PathVariable Long id) {
        return pacienteService.listByIdPacientes(id);
    }

    @DeleteMapping("/{id}")
    public void deletarPacientes(@PathVariable Long id) {
        pacienteService.deletarPaciente(id);
    }
}
