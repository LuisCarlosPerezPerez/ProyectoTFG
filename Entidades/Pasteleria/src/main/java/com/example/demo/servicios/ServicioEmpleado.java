package com.example.demo.servicios;

import com.example.demo.dto.EmpleadoDTO;
import com.example.demo.dto.ProductosDTO;
import com.example.demo.entity.ProductosEntity;

public interface ServicioEmpleado {
	
	//-> Metodo para iniciar sesion como empleado
	EmpleadoSesionDTO IniciarSesion(String nombre, String contraseña);
	
	//-> Metodo para agregar un nuevo producto al inventario
	ProductoCrearDTO AgregarProducto(String nombre, String descripcion, double precio, int stock);
	
	//-> Metodo para eliminar un producto del inventario
	void EliminarProducto(int idProducto);
	
	//-> Metodo para actualizar los datos de un producto del inventario
	ProductoActualizarDTO ActualizarProducto(int idProducto, String nombre, String descripcion, double precio, int stock);
	
}
