package com.example.demo.services.interfaz;

import java.util.List;


import com.example.demo.dto.ProductosDTO;
import com.example.demo.entity.ProductosEntity;

public interface ProductoInterfaz {

	List<ProductosEntity> listarProductos();
	ProductosDTO crearProductos();
	ProductosEntity GuardarProducto(ProductosDTO producto);
}
