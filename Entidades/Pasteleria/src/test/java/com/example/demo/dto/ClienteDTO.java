package com.example.demo.dto;

public class ClienteDTO {

	private int id;
	private String usuario;
	private String contraseña;
	
	public ClienteDTO(int id, String usuario, String contraseña) {
		this.id = id;
		this.usuario = usuario;
		this.contraseña = contraseña;
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
