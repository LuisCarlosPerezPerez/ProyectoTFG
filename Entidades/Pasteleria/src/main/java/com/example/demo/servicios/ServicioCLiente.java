package com.example.demo.servicios;

import com.example.demo.dto.ClientesDTO.*;

public interface ServicioCliente {
	
	//-> Metodo para registrar un nuevo cliente
	ClienteRegistroDTO RegistroCliente();

	int guardarcliente(ClienteRegistroDTO cliente);
	
	//-> Metodo para iniciar sesion como cliente
	void ComprobarSesion(String usuario,String contraseña);
}
