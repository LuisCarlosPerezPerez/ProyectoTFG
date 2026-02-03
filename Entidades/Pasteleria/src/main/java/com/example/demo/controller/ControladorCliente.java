package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import com.example.demo.dto.ClientesDTO.*;
import com.example.demo.services.interfaz.*;

@Controller
@RequestMapping("/Cliente")
public class ControladorCliente {
	
	@Autowired
	ServicioCLiente serviciocliente;
	@Autowired
	ServicioPedido serviciopedido;
	
//--------------------- Iniciar Sesion ---------------------//

	@PostMapping("/GuardarCliente")
	public void guardarcliente(@ModelAttribute ClienteRegistroDTO cliente) {
		serviciocliente.guardarcliente(cliente);
	}
	
	@PostMapping("/InicioSesion")
	public void IniciarSesion(String usuario,String contraseña) {
	serviciocliente.ComprobarSesion(usuario,contraseña);
		
	}
	
	
	
}
	
