package com.example.demo.entity;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;

@Entity
@Table(name="INGREDIENTE")
public class IngredienteEntity implements Serializable {

	private static final long serialVersionUID = 1L;
	
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID_INGREDIENTE")
	private int id;
	
	@Column(name="NOMRE")
	private String nombre;
	
	@Column(name="STOCK")
	private int stock;
	
	@Column(name="PROVEEDOR")
	private String proveedor;
	
	@OneToMany(mappedBy="ingrediente", cascade=CascadeType.ALL)
	private Set<ProductosIngredientesEntity>Productos=new HashSet<ProductosIngredientesEntity>();
	
	
	
}
