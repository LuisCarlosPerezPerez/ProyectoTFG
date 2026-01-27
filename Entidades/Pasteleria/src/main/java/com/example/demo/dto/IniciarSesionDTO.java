package com.example.demo.dto;

public class IniciarSesionDTO {

	private String Usuario;
	private String Contraseña;
	
	
	public IniciarSesionDTO(String usuario, String contraseña) {
		super();
		this.Usuario = usuario;
		this.Contraseña = contraseña;
	}
	
	public String getUsuario() {
		return Usuario;
	}
	public void setUsuario(String usuario) {
		Usuario = usuario;
	}
	public String getContraseña() {
		return Contraseña;
	}
	public void setContraseña(String contraseña) {
		Contraseña = contraseña;
	}
	
	
}
