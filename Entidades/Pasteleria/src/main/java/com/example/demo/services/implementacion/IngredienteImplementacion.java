package com.example.demo.services.implementacion;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.dto.IngredientesDTO.*;
import com.example.demo.dto.productoingrediente.ProductosIngredientesDTO;
import com.example.demo.entity.IngredienteEntity;
import com.example.demo.repository.IngredienteRepository;
import com.example.demo.services.interfaz.IngredienteInterfaz;

public class IngredienteImplementacion implements IngredienteInterfaz {
	
	public static List<IngredienteFullDTO> listaingrediente = new ArrayList<IngredientesFullDTO>();
	
	@Autowired
	IngredienteRepository RepoIngrediente;

	@Override
	public List<IngredienteFullDTO> listarIngredientes() {
		return listaingrediente.stream
				.map(a -> new IngredienteFullDTO(
	            		a.getid(),
	            		a.getNombre(),
	            		a.getStock(),
	            		a.getProoveedor()
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
