package com.gustavo.consultorio.service;

import com.gustavo.consultorio.entity.MedicoEntity;
import com.gustavo.consultorio.repository.MedicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicoService {

    @Autowired
    private MedicoRepository medicoRepository;

    public MedicoEntity criarMedico(MedicoEntity medico) {
        return medicoRepository.save(medico);
    }

    public MedicoEntity atualizaMedico(Long id, MedicoEntity medicoAtualizado) {
        MedicoEntity medico = medicoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medico nao encontrado"));

        medico.setCrm(medicoAtualizado.getCrm());
        medico.setCpf(medicoAtualizado.getCpf());
        medico.setNome(medicoAtualizado.getNome());
        medico.setEmail(medicoAtualizado.getEmail());
        medico.setSenha(medicoAtualizado.getSenha());

        return medicoRepository.save(medico);
    }

    public List<MedicoEntity> listAllMedicos() {
        return medicoRepository.findAll();
    }

    public Optional<MedicoEntity> listByIdMedicos(Long id) {
        return medicoRepository.findById(id);
    }

    public void deletaMedico(Long id) {
        medicoRepository.deleteById(id);
    }
}
