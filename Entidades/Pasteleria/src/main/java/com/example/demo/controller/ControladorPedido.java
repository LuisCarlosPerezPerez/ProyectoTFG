package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import com.example.demo.services.interfaz.*;
import com.example.demo.dto.PedidosDTO.PedidoVistaDTO;

import com.example.demo.dto.PedidosDTO.PedidoFullDTO;

@Controller
@RequestMapping("/Pedido")
public class ControladorPedido {

	@Autowired
	ServicioPedido serviciopedido;
	
	@PostMapping("/GuardarPedido")
	public int guardarpedido(@RequestBody PedidoFullDTO pedido) {
	int resultado = serviciopedido.guardarPedido(pedido);
		return resultado;
		
	}
	
	@GetMapping("/MostrarPedido")
	public List<PedidoVistaDTO> mostrarPedidos() {
		return serviciopedido.listarPedidos();
		
	}
	
	
}
