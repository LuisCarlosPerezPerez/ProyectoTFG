package com.example.demo.services.interfaz;

import java.util.List;

import com.example.demo.dto.ProductosIngredientesDTO;
import com.example.demo.entity.ProductosIngredientesEntity;

public interface ProductoIngredienteInterfaz {

	ProductosIngredientesDTO crearRelacion();
	void GuardarRelacion(ProductosIngredientesDTO relacion);
	List<ProductosIngredientesEntity> listarIngredientesProductos();
}
