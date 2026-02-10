package com.example.demo.services.implementacion;
import org.springframework.stereotype.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.dto.IngredientesDTO.IngredienteMostrarDTO;
import com.example.demo.dto.PedidosDTO.PedidoFullDTO;
import com.example.demo.entity.PedidoEntity;
import com.example.demo.repository.RepositorioCliente;
import com.example.demo.repository.RepositorioPedido;
import com.example.demo.services.interfaz.ServicioPedido;
import com.example.demo.dto.PedidosDTO.PedidoVistaDTO;


@Service
public class ImplementacionPedido implements ServicioPedido {

	@Autowired
	 private RepositorioCliente repositorioCliente;
	
	@Autowired
	 private RepositorioPedido repositorioPedido;

	@Override
	public PedidoFullDTO CrearPedido() {
		return new PedidoFullDTO();
	}

	@Override
	public int guardarPedido(PedidoFullDTO pedidoFullDTO) {
		PedidoEntity entidad = new PedidoEntity();
		entidad.setCliente(repositorioCliente.BuscarPorId(pedidoFullDTO.getId_cliente()));
		repositorioPedido.save(entidad);
		return entidad.getId();
	}

	@Override
	public List<PedidoVistaDTO> listarPedidos() {
		List<PedidoEntity> pedidos = repositorioPedido.findAll();
		return pedidos.stream()
				.map(a -> new PedidoVistaDTO(
	            		a.getId(),
	            		a.getEstado(),
						a.getProductos().stream().map(p -> p.getId()).collect(java.util.stream.Collectors.toSet()),
	            		a.getEntrega(),
	            		a.getCliente().getId()
				))
				.toList();
	}

}
