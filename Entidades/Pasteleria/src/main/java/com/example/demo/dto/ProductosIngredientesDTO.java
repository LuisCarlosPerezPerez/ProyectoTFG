package com.example.demo.dto;

import com.example.demo.dto.IngredientesDTO.IngredienteMostrarDTO;

public class ProductosIngredientesDTO {

    private int ID_producto_ingrediente;
    private ProductosDTO producto;
    private IngredienteMostrarDTO ingrediente;
    
    
    
	public ProductosIngredientesDTO() {
		super();
	}
	public ProductosIngredientesDTO(int iD_producto_ingrediente, ProductosDTO producto,
			IngredienteMostrarDTO ingrediente) {
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
	public ProductosDTO getProducto() {
		return producto;
	}
	public void setProducto(ProductosDTO producto) {
		this.producto = producto;
	}
	public IngredienteMostrarDTO getIngrediente() {
		return ingrediente;
	}
	public void setIngrediente(IngredienteMostrarDTO ingrediente) {
		this.ingrediente = ingrediente;
	}
    
    
}
