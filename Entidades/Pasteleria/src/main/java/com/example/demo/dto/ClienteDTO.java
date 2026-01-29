package com.example.demo.dto;
import java.util.HashSet;
import java.util.Set;

public class ClienteDTO {

	private int id;
	private String usuario;
	private String contraseña;
	private PedidoDTO pedido;
	private Set<ProductosDTO>productos = new HashSet<ProductosDTO>();

	public ClienteDTO(int id, String usuario, String contraseña, PedidoDTO pedido,
			Set<ProductosDTO> productos) {
		super();
		this.id = id;
		this.usuario = usuario;
		this.contraseña = contraseña;
		this.pedido = pedido;
		this.productos = productos;
	}
	
	

	public ClienteDTO() {
		
	}


	public PedidoDTO getPedido() {
		return pedido;
	}



	public void setPedido(PedidoDTO pedido) {
		this.pedido = pedido;
	}



	public Set<ProductosDTO> getProductos() {
		return productos;
	}



	public void setProductos(Set<ProductosDTO> productos) {
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
