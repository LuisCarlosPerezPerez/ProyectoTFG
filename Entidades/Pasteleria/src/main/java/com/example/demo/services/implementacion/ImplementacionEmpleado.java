package com.example.demo.services.implementacion;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.empleado.*;
import com.example.demo.dto.producto.*;
import com.example.demo.entity.EmpleadoEntity;
import com.example.demo.entity.PedidoEntity;
import com.example.demo.entity.ProductosEntity;
import com.example.demo.repository.ProductoRepository;
import com.example.demo.repository.RepositorioEmpleado;
import com.example.demo.repository.RepositorioPedido;
import com.example.demo.services.interfaz.ServicioEmpleado;

@Service
public class ImplementacionEmpleado implements ServicioEmpleado {

	@Autowired
	private RepositorioEmpleado repositorioEmpleado;

	@Autowired
	private ProductoRepository productoRepository;
	
	@Autowired
	private RepositorioPedido pedidorepository;
	@Override
	public void guardarEmpleado(EmpleadoDTO empleado) {
		EmpleadoEntity entidad = new EmpleadoEntity(empleado.getID_Empleado(), empleado.getUsuario(),
				empleado.getContraseña(), empleado.getAdministrador());
		repositorioEmpleado.save(entidad);
	}

	@Override
	public int modificarProducto(ProductosDTO producto) {
		ProductosEntity entidad = productoRepository.findById(producto.getId_producto()).orElse(null);
		if (entidad != null) {
			entidad.setNombre(producto.getNombre());
			entidad.setStock(producto.getStock());
			entidad.setReceta(producto.getReceta());
			entidad.setPrecio(producto.getPrecio());
			productoRepository.save(entidad);
		}
		return entidad.getID_producto();
	}


	@Override
	public EmpleadoDTO inicarsesion(newEmpleadoDTO empleadoSesion) {
		EmpleadoEntity entidad = repositorioEmpleado.FinbyUsuario(empleadoSesion.getUsuario(),
				empleadoSesion.getContraseña());
		EmpleadoDTO empleado = new EmpleadoDTO(entidad.getID_Empleado(), entidad.getUsuario(), entidad.getContraseña(), entidad.getAdministrador());

		return empleado;
	}

	@Override
	public EmpleadoDTO crearEmpleado() {
		return new EmpleadoDTO();
	}

	@Override
	public void finalizarPedido(int idPedido) {
	    PedidoEntity pedido = pedidorepository.findById(idPedido)
	            .orElseThrow(() -> new RuntimeException("No existe el pedido " + idPedido));
	    
	    pedido.setEstado("Terminado");
	    pedido.setTelefono(0); // Borramos el rastro del teléfono
	    pedidorepository.save(pedido);
	}

	@Override
	public List<Map<String, Object>> obtenerTodosLosPedidosGlobales() {
	    List<PedidoEntity> todos = pedidorepository.findAll();

	    return todos.stream().map(pedido -> {
	        Map<String, Object> map = new HashMap<>();
	        map.put("id", pedido.getId());
	        map.put("entrega", pedido.getEntrega() != null ? pedido.getEntrega().toString() : "Sin fecha");
	        map.put("estado", pedido.getEstado());
	        
	        // EXTRAEMOS SOLO EL NOMBRE (evita la recursión del objeto cliente)
	        map.put("nombre_cliente", pedido.getCliente() != null ? pedido.getCliente().getUsuario() : "Anónimo");
	        
	        // Lógica del teléfono
	        map.put("telefono", (pedido.getTelefono() == 0 || "Terminado".equalsIgnoreCase(pedido.getEstado())) ? "Oculto" : pedido.getTelefono());
	        
	        map.put("preciototal", pedido.getPreciototal());

	        // EXTRAEMOS SOLO IDs DE PRODUCTOS (evita la recursión de productos)
	        List<Integer> productosIds = pedido.getProductos().stream()
	            .map(pp -> pp.getProducto().getID_producto())
	            .collect(Collectors.toList());
	        map.put("productos", productosIds);
	        
	        return map;
	    }).collect(Collectors.toList());
	}

}
