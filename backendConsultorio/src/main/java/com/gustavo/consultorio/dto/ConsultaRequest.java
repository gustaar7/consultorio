package com.gustavo.consultorio.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ConsultaRequest {

    @NotNull
    private Object paciente;

    private Object cliente;

    @NotNull
    private Object medico;

    @NotNull
    private LocalDateTime horaData;

    @NotBlank
    private String sala;
}
