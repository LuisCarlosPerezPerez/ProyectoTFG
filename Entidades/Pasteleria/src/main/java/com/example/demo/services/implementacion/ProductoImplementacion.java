package com.example.demo.services.implementacion;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.producto.*;
import com.example.demo.entity.ProductosEntity;
import com.example.demo.repository.ProductoRepository;
import com.example.demo.services.interfaz.ProductoInterfaz;

@Service
public class ProductoImplementacion implements ProductoInterfaz {

    @Autowired
    ProductoRepository RepoProducto;

    @Override
    public List<VerProductosDTO> listarProductos() {

        return RepoProducto.findAll().stream()
                .map(a -> new VerProductosDTO(
                        a.getID_producto(),
                        a.getNombre(),
                        a.getStock(),
                        a.getReceta(),
                        a.getPrecio(),
                        a.getIngredientes().stream()
                                .map(i -> i.getIngrediente().getId())
                                .toList()
                ))
                .toList();
    }

    @Override
    public int GuardarProducto(newProductoDTO productoDTO) {

        ProductosEntity existente = RepoProducto.findByNombre(productoDTO.getNombre());
        

        if (existente == null) {
            ProductosEntity nuevaEntidad = new ProductosEntity();
            nuevaEntidad.setNombre(productoDTO.getNombre());
            nuevaEntidad.setPrecio(productoDTO.getPrecio());
            nuevaEntidad.setReceta(productoDTO.getReceta());
            nuevaEntidad.setStock(productoDTO.getStock());
            
            ProductosEntity guardado = RepoProducto.save(nuevaEntidad);
            return guardado.getID_producto();
        }
        

        return 0; 
    }
    @Override
    public void actualizarProducto(int id, newProductoDTO productoDTO) {
        RepoProducto.actualizarProducto(
            id, 
            productoDTO.getNombre(), 
            productoDTO.getPrecio(), 
            productoDTO.getStock(), 
            productoDTO.getReceta()
        );
    }

    @Override
    public void eliminarProducto(int idProducto) {

        RepoProducto.deleteById(idProducto);
    }

    @Override
    public newProductoDTO crearProductos() {
        return new newProductoDTO();
    }
}