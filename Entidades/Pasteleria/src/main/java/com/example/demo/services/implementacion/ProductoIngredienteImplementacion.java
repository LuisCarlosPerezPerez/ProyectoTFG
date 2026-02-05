package com.example.demo.services.implementacion;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.dto.productoingrediente.*;
import com.example.demo.entity.ProductosIngredientesEntity;
import com.example.demo.repository.ProductosIngredientesRepository;
import com.example.demo.services.interfaz.ProductoIngredienteInterfaz;

@Service
public class ProductoIngredienteImplementacion implements ProductoIngredienteInterfaz{
	
	public static List<ProductosIngredientesDTO> listarelaciones = new ArrayList<ProductosIngredientesDTO>();
	
	@Autowired 
	ProductosIngredientesRepository RepoRelacion;

	@Override
	public newProductoIngrediente crearRelacion() {
		return new newProductoIngrediente();
	}

	@Override
	public int GuardarRelacion (newProductoIngrediente relacion) {
		ProductosIngredientesEntity pi = null;
		ProductosIngredientesEntity relaciones = new ProductosIngredientesEntity();
		relaciones.setIngrediente(RepoRelacion.ingrediente(relacion.getId_ingrediente()));
		relaciones.setProducto(RepoRelacion.producto(relacion.getId_producto()));
		pi = RepoRelacion.save(relaciones);
		return pi.getID_producto_ingrediente();
	}
	
	@Override
	public List <ProductosIngredientesDTO> listarIngredientesProductos(){
		return listarelaciones.stream()
	            .map(a -> new ProductosIngredientesDTO(
	            		a.getID_producto_ingrediente(),
	            		a.getIngrediente(),
	            		a.getProducto()
	            ))
	            .toList();
	}

}
