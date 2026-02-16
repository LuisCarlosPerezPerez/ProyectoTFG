package com.example.demo.dto.IngredientesDTO;

public class IngredienteMostrarDTO {

	private int id;
	private String nombre;
	private int stock;
	private String proveedor;
	
	public IngredienteMostrarDTO(int id, String nombre, int stock, String proveedor) {
		this.id = id;
		this.nombre = nombre;
		this.stock = stock;
		this.proveedor = proveedor;
	}

	public IngredienteMostrarDTO() {
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public int getStock() {
		return stock;
	}

	public void setStock(int stock) {
		this.stock = stock;
	}

	public String getProveedor() {
		return proveedor;
	}

	public void setProveedor(String proveedor) {
		this.proveedor = proveedor;
	}
	
}
