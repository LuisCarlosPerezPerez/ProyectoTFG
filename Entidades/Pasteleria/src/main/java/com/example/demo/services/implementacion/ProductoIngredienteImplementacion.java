package com.example.demo.services.implementacion;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.productoingrediente.*;
import com.example.demo.entity.IngredienteEntity;
import com.example.demo.entity.ProductosEntity;
import com.example.demo.entity.ProductosIngredientesEntity;
import com.example.demo.repository.IngredienteRepository;
import com.example.demo.repository.ProductoRepository;
import com.example.demo.repository.ProductosIngredientesRepository;
import com.example.demo.services.interfaz.ProductoIngredienteInterfaz;

@Service
public class ProductoIngredienteImplementacion implements ProductoIngredienteInterfaz {

    @Autowired
    private ProductosIngredientesRepository RepoRelacion;
    
    @Autowired
    private ProductoRepository RepoProducto; 
    
    @Autowired
    private IngredienteRepository RepoIngrediente; 

    @Override
    public int GuardarRelacion(newProductoIngrediente relacionDto) {

        ProductosEntity producto = RepoProducto.findById(relacionDto.getId_producto()).orElse(null);
        IngredienteEntity ingrediente = RepoIngrediente.findById(relacionDto.getId_ingrediente()).orElse(null);

        if (producto == null || ingrediente == null) {

            throw new RuntimeException("No se encontró el Producto o el Ingrediente");
        }


        ProductosIngredientesEntity entidad = new ProductosIngredientesEntity();
        entidad.setProducto(producto);
        entidad.setIngrediente(ingrediente);


        ProductosIngredientesEntity guardada = RepoRelacion.save(entidad);
        return guardada.getID_producto_ingrediente();
    }

    @Override
    public List<ProductosIngredientesDTO> listarIngredientesProductos() {
        return RepoRelacion.findAll().stream()
            .map(r -> new ProductosIngredientesDTO(
                r.getID_producto_ingrediente(),
                r.getProducto().getID_producto(),
                r.getIngrediente().getId()
            )).toList();
    }

    @Override
    public newProductoIngrediente crearRelacion() {
        return new newProductoIngrediente();
    }
    
    @Override
    public void eliminarRelacion(int id) {
        RepoRelacion.deleteById(id);
    }
}
