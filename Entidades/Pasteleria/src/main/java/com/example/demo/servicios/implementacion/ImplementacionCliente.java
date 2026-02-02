package com.example.demo.servicios.implementacion;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ClientesDTO.*;
import com.example.demo.entity.*;
import com.example.demo.repository.*;
import com.example.demo.servicios.ServicioCliente;

@Service
public class ImplementacionCliente implements ServicioCliente {
	
	@Autowired
	private RepositorioCliente clienteRepository;
	@Override
	public ClienteRegistroDTO RegistroCliente() {
		return new ClienteRegistroDTO();
	}
	
	@Override
	public ClienteSesionDTO IniciarSesion(ClienteRegistroDTO cliente) {
		clienteRepository.save(new ClienteEntity(0, cliente.getUsuario(), cliente.getContraseña(), null));
		return new ClienteSesionDTO(cliente.getUsuario(), cliente.getContraseña());
	}
}
