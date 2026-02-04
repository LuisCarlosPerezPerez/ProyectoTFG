package com.example.demo.repository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Set;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.ProductosEntity;
import com.example.demo.entity.RegistroEntity;

public interface RegistroRepository extends JpaRepository <RegistroEntity, Integer>{

	
	@Query("UPDATE REGISTRO r SET r.FECHA_SALIDA =: FECHA WHERE r.ID_EMPLEADO =: ID_EMPLEADO AND r.FECHA =: FECHAHOY")
	void ActualizarHoraSalida(LocalDateTime FECHA, int ID_EMPLEADO, Date FECHAHOY);
	
	@Query("SELECT r FROM REGISTRO r WHERE r.FECHA =: Fecha AND r.ID_EMPLEADO =: ID_EMPLEADO")
	RegistroEntity buscarRegistro(Date Fecha, int ID_EMPLEADO );
	
	@Query("Select TIMESTAMPDIFF(HOUR, r.FECHA_ENTRADA, r.FECHA_SALIDA) FROM REGISTRO r WHERE r.FECHA =: FECHA AND r.ID_EMPLEADO =: ID_EMPLEADO")
	int horasdeldiaTrabajadas(Date Fecha, int ID_EMPLEADO);
	
	@Query("SELECT r FROM REGISTRO r WHERE r.ID_EMPLEADO =: ID_EMPLEADO")
	List<RegistroEntity> listarRegistros(int ID_EMPLEADO);
	
	@Query("UPDATE REGISTRO r SET r.TOTAL_HORAS =: Horas WHERE r.ID_EMPLEADO =: ID_EMPLEADO AND r.FECHA =: FECHAHOY")
	void ActualizarHorasTotales(int Horas, int ID_EMPLEADO, Date FECHAHOY);
}
