package com.example.demo.services.interfaz;

import java.util.List;
import java.util.Map;

import com.example.demo.dto.empleado.*;
import com.example.demo.dto.producto.*;

public interface ServicioEmpleado {
	
	EmpleadoDTO crearEmpleado();
	EmpleadoDTO inicarsesion(newEmpleadoDTO empleadoSesion);
	void guardarEmpleado(EmpleadoDTO empleado);
	int modificarProducto(ProductosDTO producto);
	List<Map<String, Object>> obtenerTodosLosPedidosGlobales();
	void finalizarPedido(int id);
	
}
