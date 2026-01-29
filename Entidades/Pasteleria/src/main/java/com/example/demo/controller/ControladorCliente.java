package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.dto.ClienteDTO;
import com.example.demo.dto.IniciarSesionDTO;
import com.example.demo.dto.ProductosDTO;

import org.springframework.ui.Model;

@Controller
@RequestMapping("/Cliente")
public class ControladorCliente {
	
	//ClienteServicio serviciocliente
	
//--------------------- Iniciar Sesion
	@GetMapping("/RegistrarCliente")
	public String registrarcliente(Model modelo) {
	//modelo.AddAtribute("ClienteDTO",New ClienteDTO());
		return "Cliente/RegistarCliente";
	}
	
	@PostMapping("/ComprobarCliente")
	public String guardarcliente(@ModelAttribute ClienteDTO cliente) {
	//serviciocliente.guardarcliente(cliente);
		return"redirect:/";
		
	}

	
	@GetMapping("/IniciarSesion")
	public String crearcliente(Model modelo) {
	//modelo.addAtributte("InicarSesion",new InicioSesionDTO());
		return "Cliente/IniciarSesion";
	}
	
	@GetMapping("/ComprobarSesion")
	public String comprobarsesion(@ModelAttribute IniciarSesionDTO cliente) {
	//serviciocliente.comprobarsesion(cliente);
		return "";
	
	}
//--------------------- Compra del Producto
	@GetMapping("/ComprarProducto")
	public String comprarproducto(@ModelAttribute ProductosDTO producto,@RequestParam String nombreusuario) {
	//serviciocliente.comprarprducto(producto,cliente);
	return "";
	}
	
	
	
}
	
