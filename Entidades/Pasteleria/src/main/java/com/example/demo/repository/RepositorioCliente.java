package com.example.demo.repository;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.ClienteEntity;

@Repository
public interface RepositorioCliente extends JpaRepository<ClienteEntity, Integer> {
	// JpaRepository ya incluye métodos para CRUD:
    // save() - Crear/Actualizar
    // findById() - Leer por ID
    // findAll() - Leer todos
    // deleteById() - Eliminar por ID

    @Query("SELECT C.* FROM ClienteEntity C WHERE C.usuario = :usuario AND C.contrasena = :contrasena")
    ClienteEntity findByUsuarioAndContrasena(@Param("usuario") String usuario, @Param("contrasena") String contrasena);
}
