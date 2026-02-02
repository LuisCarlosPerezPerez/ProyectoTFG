package com.example.demo.dto;


public class ProductosIngredientesDTO {

    private int ID_producto_ingrediente;
    private int id_producto;
    private int id_ingrediente;
    
	public ProductosIngredientesDTO() {
		super();
	}
	public ProductosIngredientesDTO(int iD_producto_ingrediente, int id_producto,
			int id_ingrediente) {
		super();
		this.ID_producto_ingrediente = iD_producto_ingrediente;
		this.id_producto = id_producto;
		this.id_ingrediente = id_ingrediente;
	}
	public int getID_producto_ingrediente() {
		return ID_producto_ingrediente;
	}
	public void setID_producto_ingrediente(int iD_producto_ingrediente) {
		ID_producto_ingrediente = iD_producto_ingrediente;
	}
	public int getProducto() {
		return id_producto;
	}
	public void setProducto(int id_producto) {
		this.id_producto = id_producto;
	}
	public int getIngrediente() {
		return id_ingrediente;
	}
	public void setIngrediente(int id_ingrediente) {
		this.id_ingrediente = id_ingrediente;
	}
    
    
}
