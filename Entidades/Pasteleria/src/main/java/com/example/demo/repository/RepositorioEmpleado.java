package com.example.demo.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.EmpleadoEntity;
import com.example.demo.entity.ProductosEntity;

public interface RepositorioEmpleado extends JpaRepository<EmpleadoEntity,Integer> {
	
	@Query("SELECT E FROM EmpleadoEntity E WHERE E.ID_Empleado = :ID_Empleado")
    EmpleadoEntity findById(@Param("ID_Empleado") int id);
	
	@Query("SELECT E FROM EmpleadoEntity E WHERE E.Usuario = :Usuario AND E.Contraseña=Contraseña")
    EmpleadoEntity FinbyUsuario(@Param("Usuario") String Usuario, @Param ("Contraseña") String Contraseña);
}
