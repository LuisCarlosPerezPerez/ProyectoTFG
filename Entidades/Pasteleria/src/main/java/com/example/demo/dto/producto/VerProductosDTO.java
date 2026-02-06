package com.example.demo.dto.producto;

import java.util.ArrayList;
import java.util.List;

public class VerProductosDTO {
	private int id_producto;
	private String nombre;
    private int stock;
    private String receta;
    private int precio;
    private List<Integer> Ingredientes = new ArrayList<>();
	public VerProductosDTO(int id_producto,String nombre, int stock, String receta, int precio, List<Integer> ingredientes) {
		super();
		this.id_producto = id_producto;
		this.nombre = nombre;
		this.stock = stock;
		this.receta = receta;
		this.precio = precio;
		Ingredientes = ingredientes;
	}
	public VerProductosDTO() {
		super();
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
	public String getReceta() {
		return receta;
	}
	public void setReceta(String receta) {
		this.receta = receta;
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
	public int getId_producto() {
		return id_producto;
	}
	public void setId_producto(int id_producto) {
		this.id_producto = id_producto;
	}
	
	
    
    

}
