package com.gustavo.consultorio.controller;

import com.gustavo.consultorio.entity.MedicoEntity;
import com.gustavo.consultorio.service.MedicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/medicos")
public class MedicoController {

    @Autowired
    private MedicoService medicoService;

    @PostMapping
    public MedicoEntity criarMedico(@RequestBody MedicoEntity novoMedico) {
        return medicoService.criarMedico(novoMedico);
    }

    @PutMapping("/{id}")
    public MedicoEntity atualizarMedico(@PathVariable Long id,
                                        @RequestBody MedicoEntity medicoAtualizado) {
        return medicoService.atualizaMedico(id, medicoAtualizado);
    }

    @GetMapping
    public List<MedicoEntity> listAllMedicos() {
        return medicoService.listAllMedicos();
    }

    @GetMapping("/{id}")
    public Optional<MedicoEntity> listMedicosId(@PathVariable Long id) {
        return medicoService.listByIdMedicos(id);
    }

    @DeleteMapping("/{id}")
    public void deletaMedico(@PathVariable Long id) {
        medicoService.deletaMedico(id);
    }
}
