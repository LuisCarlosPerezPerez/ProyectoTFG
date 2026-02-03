package com.example.demo.servicios;

import com.example.demo.dto.EmpleadoDTO;
import com.example.demo.dto.ProductosDTO;

public interface ServicioEmpleado {
	
	EmpleadoDTO crearEmpleado();
	void guardarEmpleado(EmpleadoDTO empleado);
	int modificarProducto(ProductosDTO producto);
	void eliminarProducto(int idProducto);
	
}
