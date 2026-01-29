package com.example.demo.servicios.implementacion;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ClienteDTO;
import com.example.demo.dto.IniciarSesionDTO;
import com.example.demo.entity.ClienteEntity;
import com.example.demo.entity.PedidoProductoEntity;
import com.example.demo.entity.ProductosEntity;
import com.example.demo.repository.ProductoRepository;
import com.example.demo.repository.RepositorioCliente;
import com.example.demo.repository.RepositorioPedido;
import com.example.demo.servicios.ServicioCLiente;

@Service
public class ImplementacionCliente implements ServicioCLiente {

	@Autowired
	RepositorioPedido repopedido;
	@Autowired
	RepositorioCliente repocliente;
	@Autowired
	ProductoRepository repoproducto;

	@Override
	public void guardarcliente(ClienteDTO cliente) {
		ClienteEntity clientee = new ClienteEntity(cliente.getId(), cliente.getUsuario(), cliente.getContraseña(),
				repopedido.BuscarPedido(cliente.getId()));
		repocliente.save(clientee);
	}

	@Override
	public boolean comprobarsesion(IniciarSesionDTO sesion) {
		List<ClienteEntity> listaclientes = repocliente.findAll();
		boolean existe = false;
		for (int i = 0; i < listaclientes.size(); i++) {
			if (listaclientes.get(i).getUsuario().equals(sesion.getUsuario())
					&& listaclientes.get(i).getContraseña() == sesion.getContraseña()) {
				existe=true;
			}
		}
		return existe;
	}

	@Override
	public void comprarproducto(int idproducto, ClienteDTO cliente) {
	ProductosEntity producto= repoproducto.BuscarPorId(idproducto);
	ClienteEntity clienteEntity=repocliente.getReferenceById(cliente.getId());
	clienteEntity.getPedido().getProductos().add(new PedidoProductoEntity(clienteEntity.getPedido(),producto));
	

	}

}
