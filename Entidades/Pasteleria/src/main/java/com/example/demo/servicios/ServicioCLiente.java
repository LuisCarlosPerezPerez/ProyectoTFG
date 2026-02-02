package com.example.demo.servicios;

import com.example.demo.dto.ClientesDTO.*;

public interface ServicioCLiente {
	
	//-> Metodo para registrar un nuevo cliente
	ClienteRegistroDTO RegistroCliente(String nombre, String contraseña, String email);
	
	//-> Metodo para iniciar sesion como cliente
	ClienteSesionDTO IniciarSesion(String nombre, String contraseña);
}
