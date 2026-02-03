package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.dto.productoingrediente.*;
import com.example.demo.services.interfaz.ProductoIngredienteInterfaz;

@RestController
@RequestMapping("/ProductoIngrediente")
public class ProductoIngredienteController {
	
	@Autowired
	ProductoIngredienteInterfaz RelacionaServicios;
	
	@PostMapping("/GuardarProductoIngrediente")
	public int GuardarRelacion(@RequestBody newProductoIngrediente relacion) {
		return RelacionaServicios.GuardarRelacion(relacion);
	}
	
	@GetMapping("/listarProductoIngrediente")
	public List<ProductosIngredientesDTO> lista(){
		return RelacionaServicios.listarIngredientesProductos();
	}
}
