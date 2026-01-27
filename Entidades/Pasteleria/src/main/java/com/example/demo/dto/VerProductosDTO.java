package com.example.demo.dto;

import java.util.List;

public class VerProductosDTO {

	private String nombre;
	private int precio;
	private List<IngredienteDTO>Ingredientes;
	
	public VerProductosDTO(String nombre, int precio, List<IngredienteDTO> ingredientes) {
		
		this.nombre = nombre;
		this.precio = precio;
		Ingredientes = ingredientes;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public int getPrecio() {
		return precio;
	}

	public void setPrecio(int precio) {
		this.precio = precio;
	}

	public List<IngredienteDTO> getIngredientes() {
		return Ingredientes;
	}

	public void setIngredientes(List<IngredienteDTO> ingredientes) {
		Ingredientes = ingredientes;
	}
	
	
}
