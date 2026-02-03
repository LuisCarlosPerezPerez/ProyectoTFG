package com.example.demo.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.demo.services.interfaz.*;

import com.example.demo.dto.empleado.EmpleadoDTO;

@Controller
@RequestMapping("/Empleado")
public class ControladorEmpleado {

	@Autowired
	ServicioEmpleado servicioempleado;
	
	@PostMapping("/GuardarEmpleado")
	public void guardarempleado(@RequestBody EmpleadoDTO empleado) {
	servicioempleado.guardarEmpleado(empleado);
		
	}
	
	@PostMapping("/EliminarProducto")
	public void eliminarproducto(@RequestBody int idProducto) {
	servicioempleado.eliminarProducto(idProducto);
	}
	
	@PostMapping("/ModificarProducto")
	public String modificarproducto(@RequestBody String nombreproducto) {
	//servicioproducto.modificarproducto(nombreproducto);
		return nombreproducto;
	}
	
	
	
	
	
	
	
	
	
}
