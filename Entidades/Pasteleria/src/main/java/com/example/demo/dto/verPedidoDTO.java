package com.example.demo.dto;

import java.sql.Date;
import java.util.List;

public class verPedidoDTO {
	
	private int id;
	private Date entrega;
	private List<ProductosDTO> producto;
	public verPedidoDTO(Date entrega, int id, List<ProductosDTO> producto) {
		super();
		this.id= id;
		this.entrega = entrega;
		this.producto = producto;
	}
	public Date getEntrega() {
		return entrega;
	}
	public void setEntrega(Date entrega) {
		this.entrega = entrega;
	}
	public List<ProductosDTO> getProducto() {
		return producto;
	}
	public void setProducto(List<ProductosDTO> producto) {
		this.producto = producto;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	

}
