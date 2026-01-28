package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.PedidoEntity;

public interface RepositorioPedido extends JpaRepository<PedidoEntity,Integer> {

}
