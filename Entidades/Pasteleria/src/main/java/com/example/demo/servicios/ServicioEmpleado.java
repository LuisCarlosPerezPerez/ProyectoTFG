package com.example.demo.servicios;

import com.example.demo.dto.EmpleadoDTO;
import com.example.demo.dto.ProductosDTO;

public interface ServicioEmpleado {
	
	EmpleadoDTO crearEmpleado();
	void guardarEmpleado(EmpleadoDTO empleado);
	ProductosDTO crearProducto(String nombre, int stock, String receta, int precio);
	void guardarProducto(ProductosDTO producto);
	void modificarProducto(ProductosDTO producto);
	void eliminarProducto(int idProducto);
	
}
