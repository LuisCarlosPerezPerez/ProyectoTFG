package com.example.demo.dto;

public class newEmpleadoDTO {
	
	private String Usuario;
    private String Contraseña;
    private int Administrador;
    
	public newEmpleadoDTO() {
		super();
	}
	public newEmpleadoDTO(String usuario, String contraseña, int administrador) {
		super();
		Usuario = usuario;
		Contraseña = contraseña;
		Administrador = administrador;
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
	public int getAdministrador() {
		return Administrador;
	}
	public void setAdministrador(int administrador) {
		Administrador = administrador;
	}
    
    

}
