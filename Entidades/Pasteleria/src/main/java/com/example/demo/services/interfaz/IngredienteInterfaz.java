package com.example.demo.services.interfaz;

import java.util.List;

import com.example.demo.dto.IngredientesDTO.*;
import com.example.demo.entity.IngredienteEntity;


public interface IngredienteInterfaz {
	
	List<IngredienteEntity> listarIngredientes();
	IngredienteDTO crearIngrediente();
	IngredienteEntity GuardarIngrediente(IngredienteDTO ingrediente);

}
