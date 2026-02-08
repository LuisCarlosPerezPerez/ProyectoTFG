package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.IngredientesDTO.*;
import com.example.demo.dto.producto.newProductoDTO;
import com.example.demo.entity.IngredienteEntity;
import com.example.demo.services.interfaz.IngredienteInterfaz;


@RestController
@RequestMapping("/Ingrediente")
public class IngredienteController {
	
	@Autowired
	IngredienteInterfaz IngredienteServicio;


	@PostMapping("/GuardarIngrediente")
	private int GuardarIngrediente(@RequestBody IngredienteCrearDTO Ingrediente) {
		return IngredienteServicio.GuardarIngrediente(Ingrediente);
	}
	
	@GetMapping("/MostarIngredientes")
	private List<IngredienteMostrarDTO> MostrarIgredientes() {
		return IngredienteServicio.listarIngredientes();
	}
	
	@PostMapping("/ElimnarIngrediente")
	private void EliminarIngrediente(@RequestBody int id) {
		IngredienteServicio.eliminarIngrediente(id);
	}
}
