package com.gustavo.consultorio.controller;

import com.gustavo.consultorio.entity.ConsultaEntity;
import com.gustavo.consultorio.service.ConsultaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/consultas")
public class ConsultaController {

    @Autowired
    private ConsultaService consultaService;

    @PostMapping
    public ConsultaEntity criarConsulta(@RequestBody ConsultaEntity novaConsulta) {
        return consultaService.salvarConsulta(novaConsulta);
    }

    @PutMapping("/{id}")
    public ConsultaEntity atualizarConsulta(
            @PathVariable Long id,
            @RequestBody ConsultaEntity consultaAtualizada) {
        return consultaService.atualizarConsulta(id, consultaAtualizada);
    }

    @GetMapping
    public List<ConsultaEntity> listarTodas() {
        return consultaService.listarTodas();
    }

    @GetMapping("/{id}")
    public ConsultaEntity buscarPorId(@PathVariable Long id) {
        return consultaService.buscarPorId(id);
    }

    @DeleteMapping("/{id}")
    public void deletarConsulta(@PathVariable Long id) {
        consultaService.deletarConsulta(id);
    }
}
