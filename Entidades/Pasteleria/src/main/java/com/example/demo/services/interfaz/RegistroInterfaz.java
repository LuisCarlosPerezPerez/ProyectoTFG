package com.example.demo.services.interfaz;

import java.util.List;

import com.example.demo.dto.registro.*;
import com.example.demo.entity.RegistroEntity;

public interface RegistroInterfaz {
	
	List<RegistroDTO> listarRegistros();
	newRegistroDTO crearRegistro();
	int GuardarRegistro(newRegistroDTO registro);
	void RegistrarSalida(int idEmpleado);
	List<RegistroDTO> listarTodosLosRegistros();
}
