package com.example.demo.dto;

public class verEmpleadoDTO {
	
    private int ID_Empleado;
    private String Usuario;
    private String Contraseña;
    private int Administrador;
	public verEmpleadoDTO(int iD_Empleado, String usuario, String contraseña, int administrador) {
		super();
		ID_Empleado = iD_Empleado;
		Usuario = usuario;
		Contraseña = contraseña;
		Administrador = administrador;
	}
	public verEmpleadoDTO() {
		super();
	}
	public int getID_Empleado() {
		return ID_Empleado;
	}
	public void setID_Empleado(int iD_Empleado) {
		ID_Empleado = iD_Empleado;
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
