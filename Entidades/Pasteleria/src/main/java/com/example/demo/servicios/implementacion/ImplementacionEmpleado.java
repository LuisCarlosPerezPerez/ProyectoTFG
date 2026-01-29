package com.example.demo.servicios.implementacion;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.EmpleadoDTO;
import com.example.demo.dto.ProductosDTO;
import com.example.demo.entity.EmpleadoEntity;
import com.example.demo.entity.ProductosEntity;
import com.example.demo.entity.RegistroEntity;
import com.example.demo.repository.ProductoRepository;
import com.example.demo.repository.RegistroRepository;
import com.example.demo.repository.RepositorioEmpleado;
import com.example.demo.servicios.ServicioEmpleado;

@Service
public class ImplementacionEmpleado implements ServicioEmpleado {

	@Autowired
	ProductoRepository repoproducto;
	@Autowired
	RepositorioEmpleado repoempleado;

	public void guardarempleado(EmpleadoDTO empleado) {
		Set<ProductosEntity> listaproductos = repoproducto.Obtenerciertosproductos(empleado.getID_Empleado());

		EmpleadoEntity empleadoEntity = new EmpleadoEntity(empleado.getID_Empleado(), empleado.getUsuario(),
				empleado.getContraseña(), empleado.getAdministrador(), listaregistros, listaproductos);

		repoempleado.save(empleadoEntity);

	}

	@Override
	public void guardarproducto(EmpleadoDTO empleado, ProductosDTO producto) {
		ProductosEntity productoo = repoproducto.BuscarPorId(producto.getID_producto());
		EmpleadoEntity empleadoo = repoempleado.BuscarPorId(empleado.getID_Empleado());
		empleadoo.getProductos().add(productoo);

	}

	@Override
	public ProductosEntity obtenerproducto(EmpleadoDTO empleado, int id) {
		EmpleadoEntity empleadoo = repoempleado.BuscarPorId(empleado.getID_Empleado());
		Set<ProductosEntity> lista = empleadoo.getProductos();
		ProductosEntity productoobtenido = null;
		for (ProductosEntity product : lista) {
			if (product.getID_producto() == id) {
				productoobtenido = product;
			}
		}
		return productoobtenido;
	}

	@Override
	public void eliminarproducto(EmpleadoDTO empleado, int id) {

		EmpleadoEntity empleadoo = repoempleado.BuscarPorId(empleado.getID_Empleado());
		Set<ProductosEntity> lista = empleadoo.getProductos();
		for (ProductosEntity product : lista) {
			if (product.getID_producto() == id) {
				lista.remove(product);
				repoproducto.deleteById(id);
			}
		}

	}

}
