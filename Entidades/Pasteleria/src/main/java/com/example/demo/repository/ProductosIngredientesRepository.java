package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.ProductosIngredientesEntity;

public interface ProductosIngredientesRepository extends JpaRepository <ProductosIngredientesEntity, Integer> {

	
	
}
