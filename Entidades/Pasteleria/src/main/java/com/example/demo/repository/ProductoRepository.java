package com.example.demo.repository;

import java.util.Set;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query; 
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.ProductosEntity;

public interface ProductoRepository extends JpaRepository<ProductosEntity, Integer> {
    
    // Si usas JPQL (nombres de clase), la consulta es así:
    @Query("SELECT p FROM ProductosEntity p WHERE p.id = :id")
    ProductosEntity BuscarPorId(@Param("id") int id);
    
    // Para traer todos en JPQL:
    @Query("SELECT p FROM ProductosEntity p")
    Set<ProductosEntity> ObtenerTodoslosProductos();
    
    // Consulta para obtener productos por ID (o el campo que necesites)
    @Query("SELECT p FROM ProductosEntity p WHERE p.id = :id")
    Set<ProductosEntity> Obtenerciertosproductos(@Param("id") int id);

}
