package com.example.demo.dto;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;

import com.example.demo.entity.EmpleadoEntity;


public class RegistroDTO {


    private int ID_Registro;
    private Date fecha;
    private LocalDateTime fecha_entrada;
    private LocalDateTime fecha_salida;
    private int total_horas;
    private Optional<EmpleadoEntity> empleado;
	public RegistroDTO(int iD_Registro, Date fecha, LocalDateTime fecha_entrada, LocalDateTime fecha_salida, int total_horas,
			Optional<EmpleadoEntity> empleado) {
		super();
		this.ID_Registro = iD_Registro;
		this.fecha = fecha;
		this.fecha_entrada = fecha_entrada;
		this.fecha_salida = fecha_salida;
		this.total_horas = total_horas;
		this.empleado = empleado;
	}
	public RegistroDTO() {
		
	}
	public int getID_Registro() {
		return ID_Registro;
	}
	public void setID_Registro(int iD_Registro) {
		ID_Registro = iD_Registro;
	}
	public Date getFecha() {
		return fecha;
	}
	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
	public LocalDateTime getFecha_entrada() {
		return fecha_entrada;
	}
	public void setFecha_entrada( LocalDateTime fecha_entrada) {
		this.fecha_entrada = fecha_entrada;
	}
	public LocalDateTime getFecha_salida() {
		return fecha_salida;
	}
	public void setFecha_salida(LocalDateTime fecha_salida) {
		this.fecha_salida = fecha_salida;
	}
	public int getTotal_horas() {
		return total_horas;
	}
	public void setTotal_horas(int total_horas) {
		this.total_horas = total_horas;
	}
	public Optional<EmpleadoEntity> getEmpleado() {
		return empleado;
	}
	public void setEmpleado(Optional<EmpleadoEntity> optional) {
		this.empleado = optional;
	}

    
}
