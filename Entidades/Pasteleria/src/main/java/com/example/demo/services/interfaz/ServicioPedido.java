package com.example.demo.services.interfaz;
import com.example.demo.dto.PedidosDTO.*;

public interface ServicioPedido {
	
	//-> Metodo para confirmar la creacion el pedido (Cliente)
	PedidoFullDTO CrearPedido();
	int guardarPedido(PedidoFullDTO pedido);
	
}
