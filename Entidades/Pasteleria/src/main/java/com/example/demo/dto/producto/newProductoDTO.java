package com.example.demo.dto.producto;

public class newProductoDTO {

	private String nombre;
    private int stock;
    private String receta;
    private int precio;
    
    
    
	public newProductoDTO() {
		super();
	}



	public newProductoDTO(String nombre, int stock, String receta, int precio) {
		super();
		this.nombre = nombre;
		this.stock = stock;
		this.receta = receta;
		this.precio = precio;
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
    
	
	
    
}
