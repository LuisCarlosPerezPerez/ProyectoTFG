package com.example.demo.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.dto.registro.*;
import com.example.demo.services.interfaz.RegistroInterfaz;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/Registro")
public class RegistroController {
	

	@Autowired
	RegistroInterfaz registroServicio;
	

	@PostMapping("/GuardarRegistro")
	public int guardarRegistro(@RequestBody newRegistroDTO newRegistro) {
		return registroServicio.GuardarRegistro(newRegistro);
	}
	
	
	@PostMapping("/GuardarHoraSalida")
	public void GuardarHoraSalida () {
		registroServicio.RegistrarSalida();
	}
	
	@GetMapping("/MostrarRegistros")
	public List<RegistroDTO> listaRegistros(){
		return registroServicio.listarRegistros();
	}

}
