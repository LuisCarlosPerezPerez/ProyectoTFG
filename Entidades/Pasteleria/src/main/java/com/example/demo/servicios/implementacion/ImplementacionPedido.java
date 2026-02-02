package com.example.demo.servicios.implementacion;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.PedidosDTO.PedidoFullDTO;
import com.example.demo.entity.PedidoEntity;
import com.example.demo.repository.RepositorioCliente;
import com.example.demo.repository.RepositorioPedido;
import com.example.demo.servicios.ServicioPedido;

@Service
public class ImplementacionPedido implements ServicioPedido {

	@Autowired
	RepositorioCliente repocliente;
	@Autowired
	RepositorioPedido repopedido;
	
	
	@Override
	public void guardarpedido(PedidoFullDTO pedido) {
		PedidoEntity pedidoo = new PedidoEntity(pedido.getId(), pedido.getEntrega(), pedido.getTelefono(),
				pedido.getEstado(),repocliente.getReferenceById(pedido.getCliente().getId()));
		repopedido.save(pedidoo);

	}

}
