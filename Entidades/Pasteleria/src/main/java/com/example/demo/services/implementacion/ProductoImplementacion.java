package com.example.demo.services.implementacion;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.producto.*;
import com.example.demo.entity.ProductosEntity;
import com.example.demo.repository.ProductoRepository;
import com.example.demo.services.interfaz.ProductoInterfaz;

@Service
public class ProductoImplementacion implements ProductoInterfaz{
	
	public static List<ProductosEntity> listaEntidadProducto = new ArrayList<ProductosEntity>();

	@Autowired
	ProductoRepository RepoProducto;
	
	@Override
	public List<VerProductosDTO> listarProductos() {
		return listaEntidadProducto.stream()
	            .map(a -> new VerProductosDTO(
	            		a.getNombre(),
	            		a.getStock(),
	            		a.getReceta(),
	            		a.getPrecio(),
	            	    a.getIngredientes().stream()
	            			.map(i ->
	            					i.getIngrediente().getId())
	            						.toList()
	            ))
	            .toList();
	}

	@Override
	public newProductoDTO crearProductos() {
		return new newProductoDTO();
	}

	@Override
	public int GuardarProducto(newProductoDTO producto) {
		ProductosEntity p = null;
		if(listaEntidadProducto.stream()
				.filter(a  -> a.getNombre().equals(producto.getNombre()))
				.findAny().isEmpty()) {
			ProductosEntity productos = new ProductosEntity();
			productos.setNombre(producto.getNombre());
			productos.setPrecio(producto.getPrecio());
			productos.setReceta(producto.getReceta());
			productos.setStock(producto.getStock());
			p = RepoProducto.save(productos);
		}
		return p.getID_producto();
	}
	

}
