package com.example.demo.services.interfaz;

import com.example.demo.dto.ClientesDTO.*;

public interface ServicioCLiente {
	
	//-> Metodo para registrar un nuevo cliente
	ClienteRegistroDTO RegistroCliente();

	int guardarcliente(ClienteRegistroDTO cliente);
	
	//-> Metodo para iniciar sesion como cliente
	void ComprobarSesion(String usuario,String contraseña);
}
