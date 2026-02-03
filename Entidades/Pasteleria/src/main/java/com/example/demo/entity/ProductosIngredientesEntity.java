package com.example.demo.entity;

import java.io.Serializable;
import java.util.Optional;

import jakarta.persistence.*;

@Entity
@Table(name="Productos_Ingredientes")
public class ProductosIngredientesEntity implements Serializable{
	
	
	private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID_Producto_Ingrediente")
    private int ID_producto_ingrediente;
    
    @ManyToOne
    @JoinColumn(name = "ID_PRODUCTO", nullable = false)
    private ProductosEntity producto;

    @ManyToOne
    @JoinColumn(name = "ID_INGREDIENTE", nullable = false)
    private IngredienteEntity ingrediente;

	

	public ProductosIngredientesEntity(int iD_producto_ingrediente, ProductosEntity producto) {
		
		this.ID_producto_ingrediente = iD_producto_ingrediente;
		this.producto = producto;
	}

	public ProductosIngredientesEntity() {
		
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
