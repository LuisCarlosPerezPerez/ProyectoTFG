package com.example.demo.dto.registro;

import java.time.LocalDateTime;
import java.util.Date;

public class newRegistroDTO {
	
	private Date fecha;
    private LocalDateTime fecha_entrada;
    
	public newRegistroDTO() {
		super();
	}
	
	public newRegistroDTO(Date fecha, LocalDateTime fecha_entrada) {
		super();
		this.fecha = fecha;
		this.fecha_entrada = fecha_entrada;
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

	public void setFecha_entrada(LocalDateTime fecha_entrada) {
		this.fecha_entrada = fecha_entrada;
	}
    
    

}
