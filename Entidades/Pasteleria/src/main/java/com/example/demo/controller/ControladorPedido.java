package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.demo.services.interfaz.*;

import com.example.demo.dto.PedidosDTO.PedidoFullDTO;

@Controller
@RequestMapping("/Pedido")
public class ControladorPedido {

	@Autowired
	ServicioPedido serviciopedido;
	
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
