package com.example.demo.dto;

import java.util.ArrayList;
import java.util.List;


public class ProductosDTO {
	
    private int ID_producto;
    private String nombre;
    private int stock;
    private String receta;
    private int precio;
    private int id_empleado;
    private List<Integer> Ingredientes = new ArrayList<>();
    private List<Integer> Pedidos = new ArrayList<>();
    
    
    

    
	public ProductosDTO() {
		super();
	}

	public ProductosDTO(int iD_producto, String nombre, int stock, String receta, int precio, int id_empleado,
			List<Integer> ingredientes, List<Integer> pedidos) {
		super();
		this.ID_producto = iD_producto;
		this.nombre = nombre;
		this.stock = stock;
		this.receta = receta;
		this.precio = precio;
		this.id_empleado = id_empleado;
		this.Ingredientes = ingredientes;
		this.Pedidos = pedidos;
	}
	
	
	
	public int getID_producto() {
		return ID_producto;
	}
	public void setID_producto(int iD_producto) {
		ID_producto = iD_producto;
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
	public int getEmpleado() {
		return id_empleado;
	}
	public void setEmpleado(int id_empleado) {
		this.id_empleado = id_empleado;
	}
	public List<Integer> getIngredientes() {
		return Ingredientes;
	}
	public void setIngredientes(List<Integer> ingredientes) {
		Ingredientes = ingredientes;
	}
	public List<Integer> getPedidos() {
		return Pedidos;
	}
	public void setPedidos(List<Integer> pedidos) {
		Pedidos = pedidos;
	}
    
}
