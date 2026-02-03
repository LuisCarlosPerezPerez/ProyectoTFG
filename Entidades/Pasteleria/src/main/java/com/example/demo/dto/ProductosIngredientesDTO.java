package com.example.demo.dto;

public class ProductosIngredientesDTO {

    private int ID_producto_ingrediente;
    private int Id_producto;
    private int Id_ingrediente;
    
    
    
	public ProductosIngredientesDTO() {
		super();
	}
	public ProductosIngredientesDTO(int iD_producto_ingrediente, int id_producto,
			int id_ingrediente) {
		super();
		this.ID_producto_ingrediente = iD_producto_ingrediente;
		this.Id_producto = id_producto;
		this.Id_ingrediente = id_ingrediente;
	}
	public int getID_producto_ingrediente() {
		return ID_producto_ingrediente;
	}
	public void setID_producto_ingrediente(int iD_producto_ingrediente) {
		ID_producto_ingrediente = iD_producto_ingrediente;
	}
	public int getId_producto() {
		return Id_producto;
	}
	public void setId_producto(int id_producto) {
		Id_producto = id_producto;
	}
	public int getId_ingrediente() {
		return Id_ingrediente;
	}
	public void setId_ingrediente(int id_ingrediente) {
		Id_ingrediente = id_ingrediente;
	}
    
    
}
