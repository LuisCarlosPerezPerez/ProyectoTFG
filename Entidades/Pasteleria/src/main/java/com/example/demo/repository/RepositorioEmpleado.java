package com.example.demo.repository;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.EmpleadoEntity;

public interface RepositorioEmpleado extends JpaRepository<EmpleadoEntity,Integer> {
	
	
	//Consulta para Obtener cierto Empleado
	@Query("SELECT E FROM EmpleadoEntity E WHERE E.ID_Empleado = :ID_Empleado")
	 EmpleadoEntity findById(@Param("ID_Empleado") int ID_Empleado);
}
