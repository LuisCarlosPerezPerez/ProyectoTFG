package com.example.demo.services.implementacion;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ClientesDTO.*;
import com.example.demo.entity.*;
import com.example.demo.repository.*;
import com.example.demo.services.interfaz.*;

@Service
public class ImplementacionCliente implements ServicioCLiente {
	
	@Autowired
	private RepositorioCliente clienteRepository;
	
	@Override
	public ClienteRegistroDTO RegistroCliente() {
		return new ClienteRegistroDTO();
	}

	public int guardarcliente(ClienteRegistroDTO cliente) {
		ClienteEntity clienteentity=null;
		ClienteEntity entidad = new ClienteEntity();
		entidad.setContrasena(cliente.getContraseña());
		entidad.setUsuario(cliente.getUsuario());
		clienteentity=clienteRepository.save(entidad);
		return clienteentity.getId();
	}
	
	@Override
	public void ComprobarSesion(String usuario,String contraseña) {
		ClienteEntity clienteentity=clienteRepository.findByUsuarioAndContrasena(usuario, contraseña);
		if(clienteentity!=null) {
			System.out.println("Inicio de Sesion Correcto");
		}else {
			System.out.println("Error en el Inicio de Sesion");
		}
	}
}
