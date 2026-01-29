package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.dto.IngredienteDTO;
import com.example.demo.entity.IngredienteEntity;
import com.example.demo.services.interfaz.IngredienteInterfaz;

public class IngredienteController {
	
	@Autowired
	IngredienteInterfaz IngredienteServicio;

	@GetMapping("/CrearIngrediente")
	private IngredienteDTO CrearIngrediente(Model model) {
		return IngredienteServicio.crearIngrediente();
	}
	@PostMapping("/GuardarIngrediente")
	private IngredienteEntity GuardarIngrediente(Model model) {
		IngredienteDTO Ingrediente = new IngredienteDTO();
		Ingrediente.setNombre(null);
		Ingrediente.setProveedor(null);
		Ingrediente.setStock(0);
		return IngredienteServicio.GuardarIngrediente(Ingrediente);
	}
	
	@GetMapping("/MostarIngredientes")
	private List<IngredienteEntity> MostrarIgredientes(Model model) {
		return IngredienteServicio.listarIngredientes();
	}
}
