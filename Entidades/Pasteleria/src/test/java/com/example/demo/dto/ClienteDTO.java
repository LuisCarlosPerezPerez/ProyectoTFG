package com.example.demo.dto;

import java.util.ArrayList;
import java.util.List;

public class ClienteDTO {

	private int id;
	private String usuario;
	private String contraseña;
	private List<PedidoDTO>pedidos;
	private List<ProductosDTO>productos;

	public ClienteDTO(int id, String usuario, String contraseña, List<PedidoDTO> pedidos,
			List<ProductosDTO> productos) {
		super();
		this.id = id;
		this.usuario = usuario;
		this.contraseña = contraseña;
		this.pedidos = pedidos;
		this.productos = productos;
	}
	
	

	public List<PedidoDTO> getPedidos() {
		return pedidos;
	}



	public void setPedidos(List<PedidoDTO> pedidos) {
		this.pedidos = pedidos;
	}



	public List<ProductosDTO> getProductos() {
		return productos;
	}



	public void setProductos(List<ProductosDTO> productos) {
		this.productos = productos;
	}



	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public String getContraseña() {
		return contraseña;
	}

	public void setContraseña(String contraseña) {
		this.contraseña = contraseña;
	}
	
	
	
}
