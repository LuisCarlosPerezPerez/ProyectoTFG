package com.example.demo.services.interfaz;
import java.util.List;
import java.util.Map;

import com.example.demo.dto.ClientesDTO.*;

public interface ServicioCLiente {
	
	//-> Metodo para registrar un nuevo cliente
	ClienteRegistroDTO RegistroCliente();

	int guardarcliente(ClienteRegistroDTO cliente);
	
	//-> Metodo para iniciar sesion como cliente
	ClienteFullDTO ComprobarSesion(String usuario,String contraseña);

	ClienteFullDTO comprarproducto(ClienteFullDTO clienteDto, int idProducto);

	List<Map<String, Object>> obtenerProductosPedidoPendiente(int idCliente);

	ClienteFullDTO finalizarPedidoAutomatico(String fechaEntrega, String telefono, Map<String, Object> datos);

	List<Map<String, Object>> obtenerHistorialPedidos(int idCliente);
}
