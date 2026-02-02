package com.example.demo.services.interfaz;

import java.util.List;


import com.example.demo.dto.producto.*;
import com.example.demo.entity.ProductosEntity;

public interface ProductoInterfaz {

	List<VerProductosDTO> listarProductos();
	newProductoDTO crearProductos();
	int GuardarProducto(newProductoDTO producto);
}
