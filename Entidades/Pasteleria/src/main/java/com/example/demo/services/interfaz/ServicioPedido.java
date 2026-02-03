package com.example.demo.servicios;
import com.example.demo.dto.PedidosDTO.*;

public interface ServicioPedido {
	
	//-> Metodo para confirmar la creacion el pedido (Cliente)
	PedidoFullDTO CrearPedido();
	int guardarPedido(PedidoFullDTO pedido);
	
}
