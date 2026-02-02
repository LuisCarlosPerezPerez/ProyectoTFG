package com.example.demo.servicios;
import java.util.Set;
import com.example.demo.dto.PedidosDTO.*;

public interface ServicioPedido {
	
	//-> Metodo para confirmar la creacion el pedido (Cliente)
	PedidoVistaDTO CrearPedido();
	void modificarPedido(PedidoFullDTO pedido);
	void guardarPedido(PedidoFullDTO pedido);
	//-> Metodo para listar todos los pedidos (Empleado)
	Set<PedidoVistaDTO> ListarPedidos();
	
	
}
