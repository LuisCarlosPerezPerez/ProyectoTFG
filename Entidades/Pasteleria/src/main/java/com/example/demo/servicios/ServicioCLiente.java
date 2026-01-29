package com.example.demo.servicios;

import com.example.demo.dto.ClienteDTO;
import com.example.demo.dto.IniciarSesionDTO;

public interface ServicioCLiente {
	
	void guardarcliente (ClienteDTO cliente);
	boolean comprobarsesion (IniciarSesionDTO sesion);
	void comprarproducto (int idproducto, ClienteDTO cliente);

}
