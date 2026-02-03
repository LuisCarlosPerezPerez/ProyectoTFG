package com.example.demo.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.dto.producto.*;
import com.example.demo.services.interfaz.ProductoInterfaz;

@RestController
@RequestMapping("/Producto")
public class ProductoController {
	
	@Autowired
	ProductoInterfaz ProductoServicio;
	
	@PostMapping("GuardarProducto")
	public int GuardarProducto(@RequestBody newProductoDTO newProducto) {
		return ProductoServicio.GuardarProducto(newProducto);
	}
	
	
	@GetMapping("MostrarProductos")
	public List<VerProductosDTO> MostrarProductos() {
		return ProductoServicio.listarProductos();
	}
	
	
}
