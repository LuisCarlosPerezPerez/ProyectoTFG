package com.example.demo.repository;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.EmpleadoEntity;
import com.example.demo.entity.ProductosEntity;

public interface RepositorioEmpleado extends JpaRepository<EmpleadoEntity,Integer> {
	
	
}
