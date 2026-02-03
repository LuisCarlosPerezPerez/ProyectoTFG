package com.example.demo.services.interfaz;
import java.util.List;

import com.example.demo.dto.PedidosDTO.*;

public interface ServicioPedido {
	
	 PedidoFullDTO CrearPedido();
	//-> Metodo para confirmar la creacion el pedido (Cliente)
	int guardarPedido(PedidoFullDTO pedido);
	List<PedidoVistaDTO> listarPedidos();
	
}
