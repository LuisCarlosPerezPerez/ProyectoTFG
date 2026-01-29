package com.example.demo.controller;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.dto.RegistroDTO;
import com.example.demo.entity.RegistroEntity;
import com.example.demo.repository.RegistroRepository;
import com.example.demo.repository.RepositorioEmpleado;
import com.example.demo.services.interfaz.RegistroInterfaz;

public class RegistroController {
	int ID_EMPLEADO;
	
	@Autowired
	RegistroRepository registrosql;
	
	@Autowired
	RepositorioEmpleado empleadosql;

	@Autowired
	RegistroInterfaz registroServicio;
	
	@GetMapping("/crearRegistro")
	public RegistroDTO crearRegistro(Model model) {

		return registroServicio.crearRegistro();
	}
	@PostMapping("/GuardarRegistro")
	public RegistroEntity guardarRegistro(Model model) {
		RegistroDTO registro = new RegistroDTO();
		registro.setFecha(new Date());
		registro.setFecha_entrada(LocalDateTime.now());
		registro.setTotal_horas(0);
		registro.setEmpleado(empleadosql.findById(ID_EMPLEADO));
		return registroServicio.GuardarRegistro(registro);
	}
	
	
	@PostMapping("/GuardarHoraSalida")
	public void GuardarHoraSalida (Model model) {
		registroServicio.RegistrarSalida();
	}
	
	@GetMapping("/MostrarRegistros")
	public List<RegistroEntity> listaRegistros(Model model){
		
		return registroServicio.listarRegistros();
	}

}
