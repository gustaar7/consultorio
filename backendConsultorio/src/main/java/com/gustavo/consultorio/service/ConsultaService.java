package com.gustavo.consultorio.service;
import com.gustavo.consultorio.dto.ConsultaRequest;
import com.gustavo.consultorio.entity.ConsultaEntity;
import com.gustavo.consultorio.entity.MedicoEntity;
import com.gustavo.consultorio.entity.PacienteEntity;
import com.gustavo.consultorio.repository.ConsultaRepository;
import com.gustavo.consultorio.repository.MedicoRepository;
import com.gustavo.consultorio.repository.PacienteRepository;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@Service
public class ConsultaService {

    @Autowired
    private ConsultaRepository consultaRepository;

    @Autowired
    private MedicoRepository medicoRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    private ConsultaEntity montarConsulta(ConsultaRequest request) {
        ConsultaEntity consulta = new ConsultaEntity();
        consulta.setPaciente(resolverPaciente(resolvePacienteRequest(request)));
        consulta.setMedico(resolverMedico(request.getMedico()));
        consulta.setHoraData(request.getHoraData());
        consulta.setSala(request.getSala());
        return consulta;
    }

    private Object resolvePacienteRequest(ConsultaRequest request) {
        return request.getPaciente() != null ? request.getPaciente() : request.getCliente();
    }

    private MedicoEntity resolverMedico(Object medico) {
        if (medico == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Medico e obrigatorio");
        }

        if (medico instanceof Map<?, ?> medicoMap && medicoMap.get("id") != null) {
            return buscarMedicoPorId(converterLong(medicoMap.get("id")));
        }

        if (medico instanceof Number numero) {
            return buscarMedicoPorId(numero.longValue());
        }

        if (medico instanceof String nome) {
            String nomeNormalizado = nome.trim();
            return medicoRepository.findByNomeIgnoreCase(nomeNormalizado)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Medico nao encontrado: " + nomeNormalizado));
        }

        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Medico deve ser informado por id ou nome");
    }

    private PacienteEntity resolverPaciente(Object paciente) {
        if (paciente == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Paciente e obrigatorio");
        }

        if (paciente instanceof Map<?, ?> pacienteMap && pacienteMap.get("id") != null) {
            return buscarPacientePorId(converterLong(pacienteMap.get("id")));
        }

        if (paciente instanceof Number numero) {
            return buscarPacientePorId(numero.longValue());
        }

        if (paciente instanceof String nome) {
            String nomeNormalizado = nome.trim();
            return pacienteRepository.findByNomeIgnoreCase(nomeNormalizado)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Paciente nao encontrado: " + nomeNormalizado));
        }

        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Paciente deve ser informado por id ou nome");
    }

    private Long converterLong(Object valor) {
        if (valor instanceof Number numero) {
            return numero.longValue();
        }

        if (valor instanceof String texto) {
            return Long.parseLong(texto);
        }

        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Id invalido");
    }

    private MedicoEntity buscarMedicoPorId(Long id) {
        return medicoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Medico nao encontrado"));
    }

    private PacienteEntity buscarPacientePorId(Long id) {
        return pacienteRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Paciente nao encontrado"));
    }

    private void validarConsulta(ConsultaEntity consulta, Long idIgnorado) {
        if (consulta.getPaciente() == null || consulta.getMedico() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Paciente e medico sao obrigatorios");
        }

        Long medicoId = consulta.getMedico().getId();

        if (idIgnorado == null) {
            if (consultaRepository.existsByMedicoIdAndHoraData(medicoId, consulta.getHoraData())) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Medico ja tem consulta nesse horario");
            }
        } else {
            if (consultaRepository.existsByMedicoIdAndHoraDataAndIdNot(medicoId, consulta.getHoraData(), idIgnorado)) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Medico ja tem consulta nesse horario");
            }
        }

        if (idIgnorado == null) {
            if (consultaRepository.existsBySalaAndHoraData(consulta.getSala(), consulta.getHoraData())) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Sala ja ocupada nesse horario");
            }
        } else {
            if (consultaRepository.existsBySalaAndHoraDataAndIdNot(consulta.getSala(), consulta.getHoraData(), idIgnorado)) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Sala ja ocupada nesse horario");
            }
        }
    }

    public ConsultaEntity salvarConsulta(ConsultaRequest request) {
        ConsultaEntity consulta = montarConsulta(request);
        validarConsulta(consulta, null);
        return consultaRepository.save(consulta);
    }

    public ConsultaEntity atualizarConsulta(Long id, ConsultaRequest atualizada) {
        ConsultaEntity consulta = consultaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Consulta nao encontrada"));

        ConsultaEntity dadosAtualizados = montarConsulta(atualizada);

        consulta.setPaciente(dadosAtualizados.getPaciente());
        consulta.setMedico(dadosAtualizados.getMedico());
        consulta.setHoraData(dadosAtualizados.getHoraData());
        consulta.setSala(dadosAtualizados.getSala());

        validarConsulta(consulta, id);

        return consultaRepository.save(consulta);
    }

    public List<ConsultaEntity> listarTodas() {
        return consultaRepository.findAll();
    }

    public ConsultaEntity buscarPorId(Long id) {
        return consultaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Consulta nao encontrada"));
    }

    public void deletarConsulta(Long id) {
        if (!consultaRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Consulta nao encontrada");
        }
        consultaRepository.deleteById(id);
    }
}
