package com.example.demo.services.interfaz;

import com.example.demo.dto.empleado.*;
import com.example.demo.dto.producto.*;

public interface ServicioEmpleado {
	
	EmpleadoDTO crearEmpleado();
	EmpleadoDTO inicarsesion(newEmpleadoDTO empleadoSesion);
	void guardarEmpleado(EmpleadoDTO empleado);
	int modificarProducto(ProductosDTO producto);
	void eliminarProducto(int idProducto);
	
}
