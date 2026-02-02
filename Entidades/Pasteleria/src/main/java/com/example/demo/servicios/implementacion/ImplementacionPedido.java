package com.example.demo.servicios.implementacion;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.PedidosDTO.PedidoFullDTO;
import com.example.demo.dto.PedidosDTO.PedidoVistaDTO;
import com.example.demo.entity.*;
import com.example.demo.repository.*;
import com.example.demo.servicios.ServicioPedido;



@Service
public class ImplementacionPedido implements ServicioPedido {

	@Autowired
	private RepositorioPedido pedidoRepository;
	
	@Override
	public PedidoVistaDTO CrearPedido() {
		return new PedidoVistaDTO();
	}
	@Override
	public void modificarPedido(PedidoFullDTO pedido) {
		
	}
	@Override
	public void guardarPedido(PedidoFullDTO pedido) {
		PedidoEntity entidad = new PedidoEntity(pedido.getEntrega(), pedido.getTelefono());
		pedidoRepository.save(entidad);
	}

	@Override
	public Set<PedidoVistaDTO> ListarPedidos() {
	Set<PedidoEntity> pedidos = new java.util.HashSet<>(pedidoRepository.findAll());
	// Convertir la lista de entidades a un conjunto de DTOs
	Set<PedidoVistaDTO> pedidosVista = new java.util.HashSet<>();
	for (PedidoEntity pedido : pedidos) {
		PedidoVistaDTO dto = new PedidoVistaDTO(pedido.getId(), pedido.getEstado(), pedido.getEntrega());
		pedidosVista.add(dto);
	}
	return pedidosVista;
	}

}
