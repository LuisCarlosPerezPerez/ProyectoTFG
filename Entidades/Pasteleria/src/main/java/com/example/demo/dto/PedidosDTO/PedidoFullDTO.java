package com.example.demo.dto.PedidosDTO;
import com.example.demo.dto.*;
import com.example.demo.dto.ClientesDTO.ClienteDTO;
import java.sql.Date;

public class PedidoFullDTO {
	
	private int id;
	private Date entrega;
	private int telefono;
	private String estado;
	private ClienteDTO cliente;
	
	public PedidoFullDTO(int id, Date entrega, int telefono, String estado,ClienteDTO cliente) {
		this.id = id;
		this.entrega = entrega;
		this.telefono = telefono;
		this.estado = estado;
		this.cliente = cliente;
	}

	public PedidoFullDTO() {
		
	}

	public ClienteDTO getCliente() {
		return cliente;
	}


	public void setCliente(ClienteDTO cliente) {
		this.cliente = cliente;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getEntrega() {
		return entrega;
	}

	public void setEntrega(Date entrega) {
		this.entrega = entrega;
	}

	public int getTelefono() {
		return telefono;
	}

	public void setTelefono(int telefono) {
		this.telefono = telefono;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}
	
	
	
	
}
