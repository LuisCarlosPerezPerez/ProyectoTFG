package com.example.demo.services.implementacion;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.*;

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
	@Autowired
	private RepositorioPedido pedidoRepository;
	@Autowired
	private ProductoRepository productoRepository;

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
		List<Integer> listapedidos = rellenarlistapedidos(clienteentity.getPedido());
		cliente = new ClienteFullDTO(clienteentity.getId(), clienteentity.getUsuario(), clienteentity.getContrasena(),
				clienteentity.getGmail(), listapedidos);
		return cliente;
	}

	public List<Integer> rellenarlistapedidos(List<PedidoEntity> listaentidades) {
		List<Integer> listapedidos = new ArrayList<>();
		if (!(listaentidades == null)) {
			for (int i = 0; i < listaentidades.size(); i++) {
				listapedidos.add(listaentidades.get(i).getId());
			}
		}
		return listapedidos;
	}

	@Override
	public ClienteFullDTO comprarproducto(ClienteFullDTO clienteDto, int idProducto) {
	    // 1. Buscamos al cliente y al producto
	    ClienteEntity cliente = clienteRepository.findById(clienteDto.getId())
	            .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
	    
	    ProductosEntity producto = productoRepository.findById(idProducto)
	            .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

	    // 2. VALIDACIÓN DE STOCK
	    if (producto.getStock() <= 0) {
	        throw new RuntimeException("No hay stock para: " + producto.getNombre());
	    }

	    // 3. BUSCAR PEDIDO PENDIENTE O CREAR UNO NUEVO
	    // Buscamos en la lista de pedidos del cliente alguno que esté en estado "pendiente"
	    PedidoEntity pedidoActivo = cliente.getPedido().stream()
	            .filter(p -> p.getEstado().equalsIgnoreCase("pendiente"))
	            .findFirst()
	            .orElse(null);

	    if (pedidoActivo == null) {
	        // Si no hay ninguno pendiente, creamos la "cabecera" del pedido
	        pedidoActivo = new PedidoEntity();
	        pedidoActivo.setEntrega(new java.sql.Date(System.currentTimeMillis()));
	        pedidoActivo.setEstado("pendiente");
	        pedidoActivo.setCliente(cliente);
	        pedidoActivo = pedidoRepository.save(pedidoActivo);
	        
	        // Actualizamos el DTO con el nuevo ID de pedido si es necesario
	        clienteDto.getListapedidos().add(pedidoActivo.getId());
	    }

	    // 4. RESTAR STOCK Y GUARDAR
	    producto.setStock(producto.getStock() - 1);
	    productoRepository.save(producto);

	    // 5. AÑADIR PRODUCTO AL PEDIDO (Tabla intermedia)
	    PedidoProductoEntity relacion = new PedidoProductoEntity();
	    relacion.setPedido(pedidoActivo);
	    relacion.setProducto(producto);


	    return clienteDto;
	}

	@Override
	public ClienteFullDTO actualizarEstadoPedido(int idPedido, int telefono, ClienteFullDTO clienteToken) {
	    // 1. Verificación de seguridad con el token
	    if (!clienteToken.getListapedidos().contains(idPedido)) {
	        throw new RuntimeException("El pedido no pertenece al cliente");
	    }

	    // 2. Buscamos y actualizamos
	    PedidoEntity pedido = pedidoRepository.findById(idPedido).get();
	    pedido.setEstado("terminado");
	    pedido.setTelefono(telefono);
	    pedidoRepository.save(pedido);

	    // 3. CLAVE: Reconstruimos la lista EXCLUYENDO los terminados
	    ClienteEntity c = pedido.getCliente();
	    List<Integer> idsSoloPendientes = c.getPedido().stream()
	            .filter(p -> !"terminado".equals(p.getEstado())) // <-- Filtro mágico
	            .map(p -> p.getId())
	            .collect(Collectors.toList());

	    // 4. Devolvemos el token "limpio"
	    return new ClienteFullDTO(
	        c.getId(), 
	        c.getUsuario(), 
	        c.getContrasena(), 
	        c.getGmail(), 
	        idsSoloPendientes
	    );
	}

}
