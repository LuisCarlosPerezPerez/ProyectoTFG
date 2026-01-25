package com.example.demo.dto;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.example.demo.entity.ProductosEntity;
import com.example.demo.entity.RegistroEntity;

import jakarta.persistence.OneToMany;

public class EmpleadoDTO {
	
	    private int ID_Empleado;
	    private String Usuario;
	    private String Contraseña;
	    private int Administrador;
	    private List<RegistroDTO> registros = new ArrayList<RegistroDTO>();
	    private List<ProductosDTO> productos = new ArrayList<ProductosDTO>();
	    
	    
	    

		public EmpleadoDTO(int iD_Empleado, String usuario, String contraseña, int administrador,
				List<RegistroDTO> registros, List<ProductosDTO> productos) {
			super();
			this.ID_Empleado = iD_Empleado;
			this.Usuario = usuario;
			this.Contraseña = contraseña;
			this.Administrador = administrador;
			this.registros = registros;
			this.productos = productos;
		}

		public List<RegistroDTO> getRegistros() {
			return registros;
		}

		public void setRegistros(List<RegistroDTO> registros) {
			this.registros = registros;
		}

		public List<ProductosDTO> getProductos() {
			return productos;
		}

		public void setProductos(List<ProductosDTO> productos) {
			this.productos = productos;
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