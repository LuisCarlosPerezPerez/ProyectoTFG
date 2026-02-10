package com.example.demo.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.producto.*;
import com.example.demo.services.interfaz.ProductoInterfaz;


@RestController
@RequestMapping("/productos")
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
	
	@PostMapping("EliminarProducto")
	public void eliminarProducto(@RequestBody int id) {
	    // Aquí llamamos al método que me acabas de pasar
	    ProductoServicio.eliminarProducto(id); 
	}
	
	@PutMapping("/ActualizarProducto")
    public void actualizarProducto(@RequestParam int id, @RequestBody newProductoDTO productoDTO) {
        // Llamamos a la implementación que acabamos de crear
        ProductoServicio.actualizarProducto(id, productoDTO);
    }
	
}
