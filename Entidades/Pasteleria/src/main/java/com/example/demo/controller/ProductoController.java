package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.dto.ProductosDTO;
import com.example.demo.entity.ProductosEntity;
import com.example.demo.services.interfaz.ProductoInterfaz;

public class ProductoController {
	
	@Autowired
	ProductoInterfaz ProductoServicio;
	
	@GetMapping("/CrearProducto")
	public ProductosDTO crearProducto(Model model) {
		return ProductoServicio.crearProductos();
	}
	
	@PostMapping("GuardarProducto")
	public ProductosEntity GuardarProducto(Model model) {
		ProductosDTO producto = new ProductosDTO();
		producto.setNombre(null);
		producto.setReceta(null);
		producto.setStock(0);
		producto.setPrecio(0);
		return ProductoServicio.GuardarProducto(producto);
	}
	
	
	@GetMapping("MostrarProductos")
	public List<ProductosEntity> MostrarProductos(Model model) {
		return ProductoServicio.listarProductos();
	}
	
	
}
