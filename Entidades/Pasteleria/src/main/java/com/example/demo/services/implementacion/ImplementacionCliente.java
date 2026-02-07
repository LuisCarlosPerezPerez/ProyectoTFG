package com.example.demo.services.implementacion;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ClientesDTO.*;
import com.example.demo.dto.PedidosDTO.PedidoFullDTO;
import com.example.demo.entity.*;
import com.example.demo.repository.*;
import com.example.demo.services.interfaz.*;

@Service
public class ImplementacionCliente implements ServicioCLiente {

	@Autowired
	private RepositorioCliente clienteRepository;
	@Autowired
	private RepositorioPedido pedidoRepository;

	@Override
	public ClienteRegistroDTO RegistroCliente() {
		return new ClienteRegistroDTO();
	}

	public int guardarcliente(ClienteRegistroDTO cliente) {
		ClienteEntity clienteentity = null;
		ClienteEntity entidad = new ClienteEntity();
		entidad.setContrasena(cliente.getContraseña());
		entidad.setUsuario(cliente.getUsuario());
		clienteentity = clienteRepository.save(entidad);
		return clienteentity.getId();
	}

	@Override
	public ClienteFullDTO ComprobarSesion(String usuario, String contraseña) {
		ClienteFullDTO cliente = null;
		ClienteEntity clienteentity = clienteRepository.BuscarPorUsuarioYContraseña(usuario, contraseña);
		List<PedidoFullDTO> listapedidos = pedidoRepository.BuscarPedido(clienteentity.getId());
		cliente = new ClienteFullDTO(clienteentity.getId(), clienteentity.getUsuario(), clienteentity.getContrasena(),
				clienteentity.getGmail(), listapedidos);
		return cliente;
	}
}
