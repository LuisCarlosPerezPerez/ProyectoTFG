package com.example.demo.repository;

import java.util.Set;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.ProductosEntity;

public interface ProductoRepository extends JpaRepository <ProductosEntity, Integer>{
	
	// JpaRepository ya incluye métodos para CRUD:
    // save() - Crear/Actualizar
    // findById() - Leer por ID
    // findAll() - Leer todos
    // deleteById() - Eliminar por ID
	
	//Consulta para Obtener cierto Producto por Id
	@Query("SELECT P.* FROM ProductosEntity P WHERE P.id = :id")
    ProductosEntity BuscarPorId(@Param("id") int id);
	
	//Consulta para Obtener todos los Productos
	@Query("SELECT * FROM ProductosEntity")
    Set<ProductosEntity> ObtenerTodoslosProductos();
	
	//Consulta para Obtener los Porductos a partir de un Id de Empleado
	@Query("SELECT P.* FROM ProductosEntity P WHERE P.id = :id")
    Set<ProductosEntity> Obtenerciertosproductos(@Param("id") int id);

}
