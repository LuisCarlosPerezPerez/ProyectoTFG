package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.IngredienteEntity;

import jakarta.transaction.Transactional;

@Repository
public interface IngredienteRepository extends JpaRepository <IngredienteEntity, Integer> {
	
	
	@Modifying
	@Transactional
	@Query("UPDATE IngredienteEntity i SET i.nombre = :nombre, i.stock = :stock, i.proveedor = :proveedor WHERE i.id = :id")
	void modificarIngrediente(
	    @Param("id") int id, 
	    @Param("nombre") String nombre, 
	    @Param("stock") int stock, 
	    @Param("proveedor") String proveedor
	);
}
