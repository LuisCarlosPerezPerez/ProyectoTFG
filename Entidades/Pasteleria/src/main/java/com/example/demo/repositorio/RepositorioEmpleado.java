package com.example.demo.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.EmpleadoEntity;

public interface RepositorioEmpleado extends JpaRepository<EmpleadoEntity,Integer> {

}
