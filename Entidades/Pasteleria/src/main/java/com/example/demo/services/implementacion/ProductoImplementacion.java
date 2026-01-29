package com.example.demo.services.implementacion;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.dto.ProductosDTO;
import com.example.demo.entity.ProductosEntity;
import com.example.demo.repository.ProductoRepository;
import com.example.demo.services.interfaz.ProductoInterfaz;

public class ProductoImplementacion implements ProductoInterfaz{

	@Autowired
	ProductoRepository RepoProducto;
	
	@Override
	public List<ProductosEntity> listarProductos() {
		return RepoProducto.findAll();
	}

	@Override
	public ProductosDTO crearProductos() {
		return new ProductosDTO();
	}

	@Override
	public ProductosEntity GuardarProducto(ProductosDTO producto) {
		ProductosEntity productos = new ProductosEntity();
		productos.setNombre(producto.getNombre());
		productos.setPrecio(producto.getPrecio());
		productos.setReceta(producto.getReceta());
		productos.setStock(producto.getStock());
		return RepoProducto.save(productos);
	}
	

}
