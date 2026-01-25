package com.example.demo.dto;

import com.example.demo.entity.IngredienteEntity;
import com.example.demo.entity.ProductosEntity;



public class ProductosIngredientesDTO {

    private int ID_producto_ingrediente;
    private ProductosEntity producto;
    private IngredienteDTO ingrediente;
    
	public ProductosIngredientesDTO(int iD_producto_ingrediente, ProductosEntity producto,
			IngredienteDTO ingrediente) {
		super();
		this.ID_producto_ingrediente = iD_producto_ingrediente;
		this.producto = producto;
		this.ingrediente = ingrediente;
	}
	public int getID_producto_ingrediente() {
		return ID_producto_ingrediente;
	}
	public void setID_producto_ingrediente(int iD_producto_ingrediente) {
		ID_producto_ingrediente = iD_producto_ingrediente;
	}
	public ProductosEntity getProducto() {
		return producto;
	}
	public void setProducto(ProductosEntity producto) {
		this.producto = producto;
	}
	public IngredienteEntity getIngrediente() {
		return ingrediente;
	}
	public void setIngrediente(IngredienteEntity ingrediente) {
		this.ingrediente = ingrediente;
	}
    
    
}
