package com.example.demo.repository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.RegistroEntity;

import jakarta.transaction.Transactional;

public interface RegistroRepository extends JpaRepository<RegistroEntity, Integer> {

    @Modifying
    @Transactional
    @Query(value = "UPDATE REGISTRO SET FECHA_SALIDA = :FECHA WHERE ID_EMPLEADO = :ID_EMPLEADO AND FECHA = :FECHAHOY", nativeQuery = true)
    void ActualizarHoraSalida(@Param("FECHA") LocalDateTime FECHA, @Param("ID_EMPLEADO") int ID_EMPLEADO, @Param("FECHAHOY") Date FECHAHOY);
    
    @Query(value = "SELECT * FROM REGISTRO WHERE FECHA = :Fecha AND ID_EMPLEADO = :ID_EMPLEADO", nativeQuery = true)
    RegistroEntity buscarRegistro(@Param("Fecha") Date Fecha, @Param("ID_EMPLEADO") int ID_EMPLEADO);
    
    @Query(value = "SELECT TIMESTAMPDIFF(HOUR, FECHA_ENTRADA, FECHA_SALIDA) FROM REGISTRO WHERE FECHA = :Fecha AND ID_EMPLEADO = :ID_EMPLEADO", nativeQuery = true)
    Integer horasdeldiaTrabajadas(@Param("Fecha") Date Fecha, @Param("ID_EMPLEADO") int ID_EMPLEADO);
    
    @Query(value = "SELECT * FROM REGISTRO WHERE ID_EMPLEADO = :ID_EMPLEADO", nativeQuery = true)
    List<RegistroEntity> listarRegistros(@Param("ID_EMPLEADO") int ID_EMPLEADO);
    
    @Modifying
    @Transactional
    @Query(value = "UPDATE REGISTRO SET TOTAL_HORAS = :Horas WHERE ID_EMPLEADO = :ID_EMPLEADO AND FECHA = :FECHAHOY", nativeQuery = true)
    void ActualizarHorasTotales(@Param("Horas") int Horas, @Param("ID_EMPLEADO") int ID_EMPLEADO, @Param("FECHAHOY") Date FECHAHOY);
}
