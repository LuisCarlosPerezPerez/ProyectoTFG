package com.example.demo.dto;

import java.util.Date;

import com.example.demo.entity.EmpleadoEntity;




public class RegistroDTO {


    private int ID_Registro;
    private Date fecha;
    private Date fecha_entrada;
    private Date fecha_salida;
    private int total_horas;
    private EmpleadoEntity empleado;
    
    

	public RegistroDTO(int iD_Registro, Date fecha, Date fecha_entrada, Date fecha_salida, int total_horas,
			EmpleadoEntity empleado) {
		super();
		this.ID_Registro = iD_Registro;
		this.fecha = fecha;
		this.fecha_entrada = fecha_entrada;
		this.fecha_salida = fecha_salida;
		this.total_horas = total_horas;
		this.empleado = empleado;
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

	public Date getFecha_entrada() {
		return fecha_entrada;
	}

	public void setFecha_entrada(Date fecha_entrada) {
		this.fecha_entrada = fecha_entrada;
	}

	public Date getFecha_salida() {
		return fecha_salida;
	}

	public void setFecha_salida(Date fecha_salida) {
		this.fecha_salida = fecha_salida;
	}

	public int getTotal_horas() {
		return total_horas;
	}

	public void setTotal_horas(int total_horas) {
		this.total_horas = total_horas;
	}

	public EmpleadoEntity getEmpleado() {
		return empleado;
	}

	public void setEmpleado(EmpleadoEntity empleado) {
		this.empleado = empleado;
	}
    
    
}
