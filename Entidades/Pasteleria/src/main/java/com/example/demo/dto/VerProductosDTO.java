package com.example.demo.dto;

import java.util.List;

import com.example.demo.dto.IngredientesDTO.IngredienteMostrarDTO;

public class VerProductosDTO {

	private String nombre;
	private int precio;
	private List<IngredienteMostrarDTO>Ingredientes;
	
	public VerProductosDTO(String nombre, int precio, List<IngredienteMostrarDTO> ingredientes) {
		
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

	public List<IngredienteMostrarDTO> getIngredientes() {
		return Ingredientes;
	}

	public void setIngredientes(List<IngredienteMostrarDTO> ingredientes) {
		Ingredientes = ingredientes;
	}
	
	
}
