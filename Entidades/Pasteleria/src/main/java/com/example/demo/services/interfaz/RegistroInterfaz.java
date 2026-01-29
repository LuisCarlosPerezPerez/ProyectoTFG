package com.example.demo.services.interfaz;

import java.util.List;

import com.example.demo.dto.RegistroDTO;
import com.example.demo.entity.RegistroEntity;

public interface RegistroInterfaz {
	
	void RegistrarSalida();
	List<RegistroEntity> listarRegistros();
	RegistroDTO crearRegistro();
	RegistroEntity GuardarRegistro(RegistroDTO registro);
}
