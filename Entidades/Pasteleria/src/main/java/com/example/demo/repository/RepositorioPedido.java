package com.example.demo.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.PedidoEntity;

public interface RepositorioPedido extends JpaRepository<PedidoEntity,Integer> {
	// JpaRepository ya incluye métodos para CRUD:
    // save() - Crear/Actualizar
    // findById() - Leer por ID
    // findAll() - Leer todos
    // deleteById() - Eliminar por ID
	
	//Consulta para Obtener cierto Pedido
	@Query("SELECT P FROM PedidoEntity P WHERE P.id = :id")
    PedidoEntity BuscarPedido(@Param("id") int id);
	
}
