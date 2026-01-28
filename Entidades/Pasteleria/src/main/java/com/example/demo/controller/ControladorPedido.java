package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.dto.PedidoDTO;

@Controller
@RequestMapping("/Pedido")
public class ControladorPedido {

	//ServicioPedido serviciopedido
	
	@GetMapping("/CrearPedido")
	public String crearpedido(Model modelo) {
	modelo.addAttribute("Pedido", new PedidoDTO());
		return "Pedido/CrearPedido";
		
	}
	
	@PostMapping("/GuardarPedido")
	public String guardarpedido(@ModelAttribute PedidoDTO pedido,@RequestParam String nombreusuario) {
	//serviciopedido.guardarpedido(nombreusuario,pedido);
		return "";
		
	}
	
	@GetMapping("/MostrarPedido")
	public String monstrarpedido(Model modelo) {
	modelo.addAttribute("PedidoDTO", modelo);
		return null;
		
	}
	
	
}
