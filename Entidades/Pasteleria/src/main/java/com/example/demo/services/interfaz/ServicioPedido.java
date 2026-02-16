package com.example.demo.services.interfaz;
import java.util.List;

import com.example.demo.dto.PedidosDTO.*;

public interface ServicioPedido {
	
	 PedidoFullDTO CrearPedido();
	int guardarPedido(PedidoFullDTO pedido);
	List<PedidoVistaDTO> listarPedidos();
	
}
