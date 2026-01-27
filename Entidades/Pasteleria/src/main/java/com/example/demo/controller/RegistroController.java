package com.example.demo.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.dto.RegistroDTO;
import com.example.demo.entity.RegistroEntity;

public class RegistroController {
	
	public static List<RegistroDTO> Registros = new ArrayList<RegistroDTO>();
	
	@GetMapping("/crearRegistro")
	public String crearRegistro(Model model) {
		model.addAttribute("registro", new RegistroDTO());
		return "/Registro/FormCrearRegistro.html";
	}
	@PostMapping("/GuardarRegistro")
	public String guardarRegistro(Model model, @ModelAttribute RegistroDTO registro) {
		RegistroEntity registrar = new RegistroEntity();
		/*Sacar el ID del empleado*/
		return "/Registro/MostrarRegistros.html";
	}
	
	@GetMapping("/PonerHoraEntrada")
	public String PonerHoraEntrada(Model model) {
		model.addAttribute("Entrada", new RegistroDTO());
		return "/Registro/Entrar.html";
	}
	
	@PostMapping("/GuardarHoraEntrada")
	public String GuardarHoraEntrada (Model model, @RequestParam("HoraEntrada") Date HoraEntrada) {
		/*Repo para buscar el ID del Empleado y cambiar la hora de Entrada*/
		model.addAttribute("registro", Registros);
		return "/Registro/MostrarRegistros.html";
	}
	
	@GetMapping("/PonerHoraSalida")
	public String PonerHoraSalida(Model model) {
		model.addAttribute("Salida", new RegistroDTO());
		return "/Registro/Salir.html";
	}
	
	@PostMapping("/GuardarHoraSalida")
	public String GuardarHoraSalida (Model model,  @RequestParam("HoraSalida") Date HoraSalida) {
		/*Repo para buscar el ID del Empleado y cambiar la hora de Salida*/
		model.addAttribute("registro", Registros);
		return "/Registro/MostrarRegistros.html";
	}

}
