package com.example.demo.services.implementacion;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.dto.ProductosIngredientesDTO;
import com.example.demo.entity.ProductosEntity;
import com.example.demo.entity.ProductosIngredientesEntity;
import com.example.demo.repository.ProductosIngredientesRepository;
import com.example.demo.services.interfaz.ProductoIngredienteInterfaz;

public class ProductoIngredienteImplementacion implements ProductoIngredienteInterfaz{
	
	@Autowired 
	ProductosIngredientesRepository RepoRelacion;

	@Override
	public ProductosIngredientesDTO crearRelacion() {

		return new ProductosIngredientesDTO();
	}

	@Override
	public void GuardarRelacion(ProductosIngredientesDTO relacion) {
		ProductosIngredientesEntity relaciones = new ProductosIngredientesEntity();
		relaciones.setIngrediente(RepoRelacion.ingrediente(relacion.getIngrediente().getId()));
		relaciones.setProducto(RepoRelacion.producto(relacion.getProducto().getID_producto()));
		RepoRelacion.save(relaciones);
		return;
	}
	
	@Override
	public List<ProductosIngredientesEntity> listarIngredientesProductos(){
		return RepoRelacion.findAll();
	}

}
