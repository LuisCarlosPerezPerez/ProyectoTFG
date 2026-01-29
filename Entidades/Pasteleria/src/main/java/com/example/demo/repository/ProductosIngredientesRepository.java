package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.IngredienteEntity;
import com.example.demo.entity.ProductosEntity;
import com.example.demo.entity.ProductosIngredientesEntity;

public interface ProductosIngredientesRepository extends JpaRepository <ProductosIngredientesEntity, Integer> {

	@Query("SELECT r FROM INGREDIENTE r WHERE r.ID_INGREDIENTE =: id")
	IngredienteEntity ingrediente(int id);
	
	@Query("SELECT r FROM PRODUCTOS r WHERE r.ID_PRODUCTOS =: id")
	ProductosEntity producto(int id);
	
}
