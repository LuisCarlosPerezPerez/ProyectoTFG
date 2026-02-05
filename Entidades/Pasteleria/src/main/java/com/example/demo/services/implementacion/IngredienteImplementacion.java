package com.example.demo.services.implementacion;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.IngredientesDTO.*;
import com.example.demo.dto.productoingrediente.ProductosIngredientesDTO;
import com.example.demo.entity.IngredienteEntity;
import com.example.demo.repository.IngredienteRepository;
import com.example.demo.services.interfaz.IngredienteInterfaz;

@Service
public class IngredienteImplementacion implements IngredienteInterfaz {
	
	public static List<IngredienteEntity> listaingrediente = new ArrayList<IngredienteEntity>();
	
	@Autowired
	IngredienteRepository RepoIngrediente;

	@Override
	public List<IngredienteMostrarDTO> listarIngredientes() {
		return listaingrediente.stream()
				.map(a -> new IngredienteMostrarDTO(
	            		a.getId(),
	            		a.getNombre(),
	            		a.getStock(),
	            		a.getProveedor()
	            ))
	            .toList();
	}

	@Override
	public IngredienteCrearDTO crearIngrediente() {
		return new IngredienteCrearDTO();
	}

	@Override
	public int GuardarIngrediente(IngredienteCrearDTO ingrediente) {
		IngredienteEntity i = null;
		IngredienteEntity Ingredientes = new IngredienteEntity();
		Ingredientes.setNombre(ingrediente.getNombre());
		Ingredientes.setProveedor(ingrediente.getProveedor());
		Ingredientes.setStock(ingrediente.getStock());
		i = RepoIngrediente.save(Ingredientes);
		return i.getId();
	}

}
