package com.example.demo.services.interfaz;

import java.util.List;

import com.example.demo.dto.productoingrediente.*;

public interface ProductoIngredienteInterfaz {

	newProductoIngrediente crearRelacion();
	int GuardarRelacion(newProductoIngrediente relacion);
	List<ProductosIngredientesDTO> listarIngredientesProductos();
	void eliminarRelacion(int id);
}
