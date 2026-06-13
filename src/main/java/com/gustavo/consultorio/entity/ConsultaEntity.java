package com.gustavo.consultorio.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "consultas")
public class ConsultaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "paciente_id")
    private PacienteEntity paciente;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "medico_id")
    private MedicoEntity medico;

    @NotNull
    private LocalDateTime horaData;

    @NotBlank
    @Column(nullable = false)
    private String sala;
}
