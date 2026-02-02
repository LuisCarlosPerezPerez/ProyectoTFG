package com.example.demo.servicios;

import com.example.demo.dto.ClientesDTO.*;

public interface ServicioCliente {
	
	//-> Metodo para registrar un nuevo cliente
	ClienteRegistroDTO RegistroCliente();
	
	//-> Metodo para iniciar sesion como cliente
	ClienteSesionDTO IniciarSesion(ClienteRegistroDTO cliente);
}
