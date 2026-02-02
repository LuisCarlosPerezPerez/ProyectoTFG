//-------------------------Objeto Full-------------------------
package com.example.demo.dto.ClientesDTO;
import com.example.demo.dto.PedidosDTO.PedidoFullDTO;

public class ClienteFullDTO {
	private int id;
	private String usuario;
	private String contraseña;
	private String email;
	private PedidoFullDTO pedido;

	//Constructor completo
	public ClienteFullDTO(int id, String usuario, String contraseña, String email, PedidoFullDTO pedido) {
		this.id = id;
		this.usuario = usuario;
		this.email = email;
		this.contraseña = contraseña;
		this.pedido = pedido;
	}

	//Constructor vacio
	public ClienteFullDTO() {
		
	}
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public PedidoFullDTO getPedido() {
		return pedido;
	}

	public void setPedido(PedidoFullDTO pedido) {
		this.pedido = pedido;
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
