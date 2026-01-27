package com.example.demo.dto;

import java.util.ArrayList;
import java.util.List;


public class ProductosDTO {
	
    private int ID_producto;
    private String nombre;
    private int stock;
    private String receta;
    private int precio;
    private EmpleadoDTO empleado;
    private List<ProductosIngredientesDTO> Ingredientes = new ArrayList<ProductosIngredientesDTO>();
    private List<PedidoProductoDTO> Pedidos = new ArrayList<PedidoProductoDTO>();
    

    
	public ProductosDTO() {
		super();
	}

	public ProductosDTO(int iD_producto, String nombre, int stock, String receta, int precio, EmpleadoDTO empleado,
			List<ProductosIngredientesDTO> ingredientes, List<PedidoProductoDTO> pedidos) {
		super();
		this.ID_producto = iD_producto;
		this.nombre = nombre;
		this.stock = stock;
		this.receta = receta;
		this.precio = precio;
		this.empleado = empleado;
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
	public EmpleadoDTO getEmpleado() {
		return empleado;
	}
	public void setEmpleado(EmpleadoDTO empleado) {
		this.empleado = empleado;
	}
	public List<ProductosIngredientesDTO> getIngredientes() {
		return Ingredientes;
	}
	public void setIngredientes(List<ProductosIngredientesDTO> ingredientes) {
		Ingredientes = ingredientes;
	}
	public List<PedidoProductoDTO> getPedidos() {
		return Pedidos;
	}
	public void setPedidos(List<PedidoProductoDTO> pedidos) {
		Pedidos = pedidos;
	}
    
}
