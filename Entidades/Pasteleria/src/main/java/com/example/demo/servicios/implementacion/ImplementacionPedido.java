package com.example.demo.servicios.implementacion;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.dto.PedidosDTO.PedidoFullDTO;
import com.example.demo.entity.PedidoEntity;
import com.example.demo.repository.RepositorioCliente;
import com.example.demo.servicios.ServicioPedido;



@Service
public class ImplementacionPedido implements ServicioPedido {

	 @Autowired
	 private RepositorioCliente repositorioCliente;

	@Override
	public PedidoFullDTO CrearPedido() {
		return new PedidoFullDTO();
	}

	@Override
	public int guardarPedido(PedidoFullDTO pedidoFullDTO) {
		PedidoEntity entidad = new PedidoEntity();
		entidad.setCliente(repositorioCliente.findById(pedidoFullDTO.getCliente().getId()).orElse(null));
		return entidad.getId();
	}

}
