package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.dto.ProductosIngredientesDTO;
import com.example.demo.entity.ProductosIngredientesEntity;
import com.example.demo.services.interfaz.ProductoIngredienteInterfaz;

public class ProductoIngredienteController {
	
	@Autowired
	ProductoIngredienteInterfaz RelacionaServicios;

	@GetMapping("/AgregarProductoIngrediente")
	public ProductosIngredientesDTO AgregarRelacion(Model model) {
		return RelacionaServicios.crearRelacion();
	}
	
	@PostMapping("/GuardarProductoIngrediente")
	public void GuardarRelacion(Model model) {
		ProductosIngredientesDTO ProIngre = new ProductosIngredientesDTO();
		ProIngre.setIngrediente(null);
		ProIngre.setProducto(null);
		RelacionaServicios.GuardarRelacion(ProIngre);
		return ;
	}
	
	@GetMapping("/listarProductoIngrediente")
	public List<ProductosIngredientesEntity> lista(){
		return RelacionaServicios.listarIngredientesProductos();
	}
}
