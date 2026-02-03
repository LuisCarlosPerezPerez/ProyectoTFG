package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.dto.PedidosDTO.PedidoFullDTO;

@RestController
@RequestMapping("/Pedido")
public class ControladorPedido {

	//ServicioPedido serviciopedido
	
	@PostMapping("/GuardarPedido")
	public String guardarpedido(@RequestBody PedidoFullDTO pedido,@RequestParam String nombreusuario) {
	//serviciopedido.guardarpedido(nombreusuario,pedido);
		return "";
		
	}
	
	@GetMapping("/MostrarPedido")
	public String monstrarpedido() {
		return null;
		
	}
	
	
}
