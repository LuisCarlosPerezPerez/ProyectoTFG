package com.example.demo.dto;

import java.util.ArrayList;
import java.util.List;

public class IngredienteDTO {

	private int id;
	private String nombre;
	private int stock;
	private String proveedor;
	private List<ProductosIngredientesDTO>Productos=new ArrayList<ProductosIngredientesDTO>();
	
	public IngredienteDTO(int id, String nombre, int stock, String proveedor,
			List<ProductosIngredientesDTO> productos) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.stock = stock;
		this.proveedor = proveedor;
		this.Productos = productos;
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

	public List<ProductosIngredientesDTO> getProductos() {
		return Productos;
	}

	public void setProductos(List<ProductosIngredientesDTO> productos) {
		Productos = productos;
	}
	
	

	
}
