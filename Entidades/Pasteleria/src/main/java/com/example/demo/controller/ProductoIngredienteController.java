package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.productoingrediente.*;
import com.example.demo.services.interfaz.ProductoIngredienteInterfaz;


@RestController
@CrossOrigin(origins = "http://localhost:5173")
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
	
	@PostMapping("/EliminarProductoIngrediente")
	public void eliminar(@RequestBody int id) {
	    RelacionaServicios.eliminarRelacion(id); // Debes crear este método en tu interfaz/implementación
	}
}
