package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.IngredienteEntity;
import com.example.demo.entity.PedidoProductoEntity;

@Repository
public interface PedidoProductoRepository extends JpaRepository <PedidoProductoEntity, Integer> {
	
	

}
