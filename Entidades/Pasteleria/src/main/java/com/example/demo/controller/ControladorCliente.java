package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ClientesDTO.*;
import com.example.demo.services.interfaz.*;


@RestController
@RequestMapping("/Cliente")
public class ControladorCliente {
	
	@Autowired
	ServicioCLiente serviciocliente;
	
//--------------------- Iniciar Sesion ---------------------//

	@PostMapping("/GuardarCliente")
	public void guardarcliente(@ModelAttribute ClienteRegistroDTO cliente) {
		serviciocliente.guardarcliente(cliente);
	}
	
	@PostMapping("/InicioSesion")
	public void IniciarSesion(@RequestBody String usuario, @RequestBody String contraseña) {
	serviciocliente.ComprobarSesion(usuario,contraseña);
		
	}
	
	
	
}
	
