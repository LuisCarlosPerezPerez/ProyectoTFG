package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.dto.IngredienteDTO;
import com.example.demo.entity.IngredienteEntity;

public class IngredienteController {
	
	public static List<IngredienteDTO> Ingredientes = new ArrayList <IngredienteDTO>();

	@GetMapping("/CrearIngrediente")
	private String CrearIngrediente(Model model) {
		model.addAttribute("Ingrediente", new IngredienteDTO());
		return"/Ingrediente/FormCrearIngrediente.html";
	}
	@PostMapping("/GuardarIngrediente")
	private String GuardarIngrediente(Model model, @ModelAttribute IngredienteDTO ingredientes) {
		IngredienteEntity Ingrediente = new IngredienteEntity();
		Ingrediente.setNombre(ingredientes.getNombre());
		Ingrediente.setProveedor(ingredientes.getProveedor());
		Ingrediente.setStock(ingredientes.getStock());
		return"/Ingrediente/MostrarIngrediente.html";
	}
	
	@GetMapping("/MostarIngredientes")
	private String MostrarIgredientes(Model model) {
		model.addAttribute("ingredientes", Ingredientes);
		return"/Ingrediente/MostarIngrediente.html";
	}
}
