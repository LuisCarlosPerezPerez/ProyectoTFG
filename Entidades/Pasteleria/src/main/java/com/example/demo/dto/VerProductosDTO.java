package com.example.demo.dto;

import java.util.List;

public class VerProductosDTO {

	private String nombre;
	private int precio;
	private List<Integer>Ingredientes;
	
	public VerProductosDTO(String nombre, int precio, List<Integer> ingredientes) {
		
		this.nombre = nombre;
		this.precio = precio;
		this.Ingredientes = ingredientes;
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

	public List<Integer> getIngredientes() {
		return Ingredientes;
	}

	public void setIngredientes(List<Integer> ingredientes) {
		Ingredientes = ingredientes;
	}
	
	
}
