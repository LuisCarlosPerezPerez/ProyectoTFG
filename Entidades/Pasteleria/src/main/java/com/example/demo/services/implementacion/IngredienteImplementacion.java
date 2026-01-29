package com.example.demo.services.implementacion;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.dto.IngredienteDTO;
import com.example.demo.entity.IngredienteEntity;
import com.example.demo.repository.IngredienteRepository;
import com.example.demo.services.interfaz.IngredienteInterfaz;

public class IngredienteImplementacion implements IngredienteInterfaz {
	
	@Autowired
	IngredienteRepository RepoIngrediente;

	@Override
	public List<IngredienteEntity> listarIngredientes() {
		return RepoIngrediente.findAll();
	}

	@Override
	public IngredienteDTO crearIngrediente() {
		return new IngredienteDTO();
	}

	@Override
	public IngredienteEntity GuardarIngrediente(IngredienteDTO ingrediente) {
		IngredienteEntity Ingredientes = new IngredienteEntity();
		Ingredientes.setNombre(ingrediente.getNombre());
		Ingredientes.setProveedor(ingrediente.getProveedor());
		Ingredientes.setStock(ingrediente.getStock());
		return RepoIngrediente.save(Ingredientes);
	}

}
