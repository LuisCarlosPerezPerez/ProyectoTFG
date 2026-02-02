package com.example.demo.servicios.implementacion;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ClientesDTO.*;
import com.example.demo.entity.*;
import com.example.demo.repository.*;
import com.example.demo.servicios.ServicioCliente;

@Service
public class ImplementacionCliente implements ServicioCliente {
	
	@Override
	public ClienteRegistroDTO RegistroCliente() {
		return new ClienteRegistroDTO();
	}
	
	@Override
	public ClienteSesionDTO IniciarSesion(ClienteRegistroDTO cliente) {
	
		return new ClienteSesionDTO(cliente.getUsuario(), cliente.getContraseña());
	}
}
