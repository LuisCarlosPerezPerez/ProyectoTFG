package com.example.demo.services.interfaz;

import java.util.List;

import com.example.demo.dto.IngredientesDTO.IngredienteMostrarDTO;
import com.example.demo.entity.IngredienteEntity;


public interface IngredienteInterfaz {
	
	List<IngredienteEntity> listarIngredientes();
	IngredienteMostrarDTO crearIngrediente();
	IngredienteEntity GuardarIngrediente(IngredienteMostrarDTO ingrediente);

}
