package com.example.demo.controller;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.dto.empleado.EmpleadoDTO;

@RestController
@RequestMapping("/Empleado")
public class ControladorEmpleado {
	
	@PostMapping("/GuardarEmpleado")
	public String guardarempleado(@RequestBody EmpleadoDTO empleado) {
	//servicioempleado.guardarempleado(empleado);
		return "";
		
	}
	
	@PostMapping("/EliminarProducto")
	public String eliminarproducto(@RequestParam String nombreproducto) {
	//servicioproducto.eliminarproducto(nombreproducto);
		return nombreproducto;
	}
	
	@PostMapping("/ModificarProducto")
	public String modificarproducto(@RequestParam String nombreproducto) {
	//servicioproducto.modificarproducto(nombreproducto);
		return nombreproducto;
	}
	
	
	
	
	
	
	
	
	
}
