//-------------------------Objeto Full-------------------------
package com.example.demo.dto.ClientesDTO;
import com.example.demo.dto.PedidosDTO.PedidoFullDTO;

import java.util.List;

public class ClienteFullDTO {
	private int id;
	private String usuario;
	private String contraseña;
	private String email;
	private List<PedidoFullDTO>listapedidos;

	//Constructor completo
	public ClienteFullDTO(int id, String usuario, String contraseña, String email, List<PedidoFullDTO> list) {
		this.id = id;
		this.usuario = usuario;
		this.email = email;
		this.contraseña = contraseña;
		this.listapedidos= list;
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

	

	public List<PedidoFullDTO> getListapedidos() {
		return listapedidos;
	}

	public void setListapedidos(List<PedidoFullDTO> listapedidos) {
		this.listapedidos = listapedidos;
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
