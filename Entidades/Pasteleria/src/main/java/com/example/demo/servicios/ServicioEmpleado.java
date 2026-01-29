package com.example.demo.servicios;

import com.example.demo.dto.EmpleadoDTO;
import com.example.demo.dto.ProductosDTO;
import com.example.demo.entity.ProductosEntity;

public interface ServicioEmpleado {

	void guardarempleado(EmpleadoDTO empleado);
	void guardarproducto(EmpleadoDTO empleado, ProductosDTO producto);
	ProductosEntity obtenerproducto(EmpleadoDTO empleado, int id);
	void eliminarproducto (EmpleadoDTO empleado, int id);
	
}
