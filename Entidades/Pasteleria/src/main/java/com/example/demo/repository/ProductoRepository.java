package com.example.demo.repository;

import java.util.Set;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query; 
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

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
    
    @Query("SELECT p FROM ProductosEntity p WHERE p.nombre = :nombre")
    ProductosEntity findByNombre(@Param("nombre") String nombre);
    
    @Modifying
    @Transactional
    @Query("UPDATE ProductosEntity p SET p.nombre = :nombre, p.precio = :precio, p.stock = :stock, p.receta = :receta WHERE p.ID_producto = :id")
    void actualizarProducto(
        @Param("id") int id, 
        @Param("nombre") String nombre, 
        @Param("precio") int precio, // Cambiado a int para coincidir con tu entidad
        @Param("stock") int stock, 
        @Param("receta") String receta
    );
}
