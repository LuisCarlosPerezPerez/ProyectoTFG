package com.example.demo.controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.example.demo.services.interfaz.*;

import com.example.demo.dto.empleado.EmpleadoDTO;
import com.example.demo.dto.empleado.newEmpleadoDTO;

@RestController
@RequestMapping("/Empleado")
@CrossOrigin(origins = "http://localhost:5173")
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
	
	@GetMapping("/GestionPedidos")
    public ResponseEntity<List<Map<String, Object>>> listarTodo() {
        return ResponseEntity.ok(servicioempleado.obtenerTodosLosPedidosGlobales());
    }

    @PutMapping("/FinalizarPedido/{id}")
    public ResponseEntity<String> finalizarPedido(@PathVariable int id) {
        servicioempleado.finalizarPedido(id);
        return ResponseEntity.ok("Pedido finalizado");
    }

	
	
	
	
	
	
	
	
	
	
}
