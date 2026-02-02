//-------------------------Objeto Full-------------------------
package com.example.demo.dto.ClientesDTO;
import com.example.demo.dto.*;
import com.example.demo.dto.PedidosDTO.PedidoFullDTO;

import java.util.HashSet;
import java.util.Set;

public class ClienteFullDTO {
	private int id;
	private String usuario;
	private String contraseña;
	private PedidoFullDTO pedido;
	private Set<ProductosDTO>productos = new HashSet<ProductosDTO>();

	//Constructor completo
	public ClienteFullDTO(int id, String usuario, String contraseña, PedidoFullDTO pedido,
			Set<ProductosDTO> productos) {
		this.id = id;
		this.usuario = usuario;
		this.contraseña = contraseña;
		this.pedido = pedido;
		this.productos = productos;
	}

	//Constructor vacio
	public ClienteFullDTO() {
		
	}

	public PedidoFullDTO getPedido() {
		return pedido;
	}

	public void setPedido(PedidoFullDTO pedido) {
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
