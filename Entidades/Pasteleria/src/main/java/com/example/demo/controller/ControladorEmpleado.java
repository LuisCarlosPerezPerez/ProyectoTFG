package com.example.demo.controller;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.dto.EmpleadoDTO;

@Controller
@RequestMapping("/Empleado")
public class ControladorEmpleado {

	//EmpleadoServicio servicioempleado
	//ProductoServicio servicioproducto
	
	@GetMapping("/CrearEmpleado")
	public String crearempleado(Model modelo) {
	modelo.addAttribute("EmpleadoDTO", new EmpleadoDTO());
		return "Empleado/CrearEmpleado";
	}
	
	@PostMapping("/GuardarEmpleado")
	public String guardarempleado(@ModelAttribute EmpleadoDTO empleado) {
	//servicioempleado.guardarempleado(empleado);
		return "";
		
	}
	
	@GetMapping("/CrearProducto")
	public String crearProducto(Model modelo) {
	modelo.addAttribute("ProductoDTO", modelo);
	return "";
	}
	
	@GetMapping("/GuardarProducto")
	public String guardarProducto() {
	//servicioempleado.guardarproducto(producto);
	return "";
	}
	
	

	@GetMapping("/MostrarProducto")
	public String guardarProducto(Model modelo) {
	//ProductoDTO producto= servicioproducto.obtenerproducto()
	modelo.addAttribute("ProductoDTO", modelo);
	return "";
	}
	
	
	@GetMapping("/IndicarEliminar")
	public String indicareliminar() {
	return "";
	}
	
	@PostMapping("/EliminarProducto")
	public String eliminarproducto(@RequestParam String nombreproducto) {
	//servicioproducto.eliminarproducto(nombreproducto);
		return nombreproducto;
	}
	
	@GetMapping("/IndicarModificar")
	public String indicarModificar() {
	return "";
	}
	
	@PostMapping("/ModificarProducto")
	public String modificarproducto(@RequestParam String nombreproducto) {
	//servicioproducto.modificarproducto(nombreproducto);
		return nombreproducto;
	}
	
	
	
	
	
	
	
	
	
}
