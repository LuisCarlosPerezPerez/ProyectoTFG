package com.example.demo.services.implementacion;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.dto.IngredientesDTO.*;
import com.example.demo.entity.IngredienteEntity;
import com.example.demo.repository.IngredienteRepository;
import com.example.demo.services.interfaz.IngredienteInterfaz;

@Service
public class IngredienteImplementacion implements IngredienteInterfaz {
    
    @Autowired
    private IngredienteRepository RepoIngrediente;

    @Override
    public List<IngredienteMostrarDTO> listarIngredientes() {

        return RepoIngrediente.findAll().stream()
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
        IngredienteEntity ingredienteEntity = new IngredienteEntity();
        ingredienteEntity.setNombre(ingrediente.getNombre());
        ingredienteEntity.setProveedor(ingrediente.getProveedor());
        ingredienteEntity.setStock(ingrediente.getStock());
        
        IngredienteEntity guardado = RepoIngrediente.save(ingredienteEntity);
        return guardado.getId();
    }
    
    @Override
    public void eliminarIngrediente(int id) {
        if (RepoIngrediente.existsById(id)) {
            RepoIngrediente.deleteById(id);
        } else {
            throw new RuntimeException("El ingrediente con ID " + id + " no existe en la despensa.");
        }
    }
    
    @Override
    public void modificarIngrediente(int id, IngredienteFullDTO dto) {

        IngredienteEntity existente = RepoIngrediente.findById(id)
            .orElseThrow(() -> new RuntimeException("Ingrediente no encontrado con ID: " + id));

        existente.setNombre(dto.getNombre());
        existente.setStock(dto.getStock());
        existente.setProveedor(dto.getProveedor());

        RepoIngrediente.save(existente);
    }
}