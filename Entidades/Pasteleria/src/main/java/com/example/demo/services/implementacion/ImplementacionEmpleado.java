package com.example.demo.services.implementacion;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.empleado.*;
import com.example.demo.dto.producto.*;
import com.example.demo.entity.EmpleadoEntity;
import com.example.demo.entity.ProductosEntity;
import com.example.demo.repository.ProductoRepository;
import com.example.demo.repository.RepositorioEmpleado;
import com.example.demo.services.interfaz.ServicioEmpleado;

@Service
public class ImplementacionEmpleado implements ServicioEmpleado {

	@Autowired
	private RepositorioEmpleado repositorioEmpleado;
	
	@Autowired
	private ProductoRepository productoRepository;
	
	@Override
	public EmpleadoDTO crearEmpleado() {
		return new EmpleadoDTO();
	}

	@Override
	public void guardarEmpleado(EmpleadoDTO empleado) {
		EmpleadoEntity entidad = new EmpleadoEntity(empleado.getID_Empleado(), empleado.getUsuario(), empleado.getContraseña(),
				empleado.getAdministrador());
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


}
