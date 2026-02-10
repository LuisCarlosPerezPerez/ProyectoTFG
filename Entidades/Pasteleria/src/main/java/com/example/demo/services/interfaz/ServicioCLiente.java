package com.example.demo.services.interfaz;
import com.example.demo.dto.ClientesDTO.*;

public interface ServicioCLiente {
	
	//-> Metodo para registrar un nuevo cliente
	ClienteRegistroDTO RegistroCliente();

	int guardarcliente(ClienteRegistroDTO cliente);
	
	//-> Metodo para iniciar sesion como cliente
	ClienteFullDTO ComprobarSesion(String usuario,String contraseña);

	ClienteFullDTO comprarproducto(ClienteFullDTO clienteDto, int idProducto);
	
	ClienteFullDTO actualizarEstadoPedido(int idPedido, int telefono, ClienteFullDTO clienteToken);
}
