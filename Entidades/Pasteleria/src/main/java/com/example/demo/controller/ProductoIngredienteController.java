package com.example.demo.controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.entity.ProductosIngredientesEntity;

public class ProductoIngredienteController {

	@GetMapping("/AgregarProductoIngrediente")
	public String AgregarRelacion(Model model) {
		model.addAttribute("Producto");
		model.addAttribute("Ingrediente");
		return "/ProductoIngrediente/FormRelación";
	}
	
	@PostMapping("/GuardarProductoIngrediente")
	public String GuardarRelacion(Model model) {
		ProductosIngredientesEntity ProIngre = new ProductosIngredientesEntity();
		/*Comparar si un pro existe o no y con los ingredientes igual y pasar el producto e ingrediente entero*/
		return"/ProductoIngrediente/MostrarRelaciones";
	}
}
