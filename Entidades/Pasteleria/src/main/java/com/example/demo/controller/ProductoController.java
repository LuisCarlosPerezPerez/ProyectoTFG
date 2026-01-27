package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.dto.ProductosDTO;
import com.example.demo.entity.ProductosEntity;

public class ProductoController {
	
	public static List<ProductosDTO> Productos = new ArrayList<ProductosDTO>();
	
	@GetMapping("/CrearProducto")
	public String crearProducto(Model model) {
		model.addAttribute("producto", new ProductosDTO());
		return "/Producto/FormCrearProducto.html";
	}
	
	@PostMapping("GuardarProducto")
	public String GuardarProducto(Model model, @ModelAttribute ProductosDTO nuevoproducto) {
		ProductosEntity producto = new ProductosEntity();
		producto.setNombre(nuevoproducto.getNombre());
		producto.setPrecio(nuevoproducto.getPrecio());
		producto.setReceta(nuevoproducto.getReceta());
		producto.setStock(nuevoproducto.getStock());
		
		
		return "/Producto/MostrarProductos.html";
	}
	
	
	@GetMapping("MostrarProductos")
	public String MostrarProductos(Model model) {
		model.addAttribute("productos", Productos);
		return"/Producto/MostrarProductos.html";
	}
	
	
}
