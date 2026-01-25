package com.example.demo.dto;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.example.demo.entity.EmpleadoEntity;
import com.example.demo.entity.ProductosEntity;
import com.example.demo.entity.ProductosIngredientesEntity;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

public class ProductosDTO {
	
    private int ID_producto;
    private String nombre;
    private int stock;
    private String receta;
    private int precio;
    private EmpleadoEntity empleado;
    private List<ProductosIngredientesDTO> Ingredientes = new ArrayList<ProductosIngredientesDTO>();
    
    
    
	public ProductosDTO(int iD_producto, String nombre, int stock, String receta, int precio, EmpleadoEntity empleado,
			List<ProductosIngredientesDTO> ingredientes) {
		super();
		this.ID_producto = iD_producto;
		this.nombre = nombre;
		this.stock = stock;
		this.receta = receta;
		this.precio = precio;
		this.empleado = empleado;
		this.Ingredientes = ingredientes;
	}

	public List<ProductosIngredientesDTO> getIngredientes() {
		return Ingredientes;
	}

	public void setIngredientes(List<ProductosIngredientesDTO> ingredientes) {
		Ingredientes = ingredientes;
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

	public EmpleadoEntity getEmpleado() {
		return empleado;
	}

	public void setEmpleado(EmpleadoEntity empleado) {
		this.empleado = empleado;
	}
}
