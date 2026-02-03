package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


import com.example.demo.dto.*;
import com.example.demo.dto.ClientesDTO.*;
import com.example.demo.servicios.*;
import org.springframework.ui.Model;

@Controller
@RequestMapping("/Cliente")
public class ControladorCliente {
	
	@Autowired
	ServicioCliente serviciocliente;
	@Autowired
	ServicioPedido serviciopedido;
	
//--------------------- Iniciar Sesion ---------------------//

	@PostMapping("/GuardarCliente")
	public void guardarcliente(@RequestBody ClienteRegistroDTO cliente) {
		serviciocliente.guardarcliente(cliente);
	}
	
	@PostMapping("/InicioSesion")
	public void IniciarSesion(String usuario,String contraseña) {
	serviciocliente.ComprobarSesion(usuario,contraseña);
		
	}
	
	
	
}
	
