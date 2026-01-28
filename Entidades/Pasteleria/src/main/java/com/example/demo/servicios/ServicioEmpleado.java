package com.example.demo.servicios;

import com.example.demo.dto.EmpleadoDTO;
import com.example.demo.dto.ProductosDTO;

public interface ServicioEmpleado {

	void guardarempleado(EmpleadoDTO empleado);
	void guardarproducto(ProductosDTO producto);
	ProductosDTO obtenerproducto(String nombreproducto);
	void eliminarproducto (String nombreproducto);
	
}
