package com.example.demo.controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.example.demo.services.interfaz.*;

import com.example.demo.dto.empleado.EmpleadoDTO;
import com.example.demo.dto.empleado.newEmpleadoDTO;
import com.example.demo.dto.producto.ProductosDTO;

@RestController
@RequestMapping("/Empleado")
public class ControladorEmpleado {

	@Autowired
	ServicioEmpleado servicioempleado;
	
	@PostMapping("/GuardarEmpleado")
	public void guardarempleado(@RequestBody EmpleadoDTO empleado) {
	servicioempleado.guardarEmpleado(empleado);
		
	}
	
	@PostMapping("IniciarSesionEmpleado")
	public ResponseEntity<EmpleadoDTO> iniciarsesionempleado (@RequestBody newEmpleadoDTO empleadoo) {
	EmpleadoDTO empleado=servicioempleado.inicarsesion(empleadoo);
		return ResponseEntity.ok(empleado);
	}
	
	@PostMapping("/EliminarProducto")
	public void eliminarproducto(@RequestBody int idProducto) {
	servicioempleado.eliminarProducto(idProducto);
	}
	
	@PostMapping("/ModificarProducto")
	public void modificarproducto(@RequestBody ProductosDTO nombreproducto) {
	servicioempleado.modificarProducto(nombreproducto);
	}
	
	
	
	
	
	
	
	
	
}
