package com.example.demo.repository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.RegistroEntity;

public interface RegistroRepository extends JpaRepository <RegistroEntity, Integer>{

	
	@Query("UPDATE REGISTRO r SET r.FECHA_SALIDA =: FECHA WHERE r.ID_EMPLEADO =: ID_EMPLEADO AND r.FECHA =: FECHAHOY")
	void ActualizarHoraSalida(LocalDateTime FECHA, int ID_EMPLEADO, Date FECHAHOY);
	
	@Query("SELECT r FROM REGISTRO r WHERE r.FECHA =: Fecha AND r.ID_EMPLEADO =: ID_EMPLEADO")
	RegistroEntity buscarRegistro(Date Fecha, int ID_EMPLEADO );
	
	@Query("Select TIMESTAMPDIFF(HOUR, r.FECHA_SALIDA, r.FECHA_ENTRADA) FROM REGISTRO r WHERE r.FECHA =: FECHA AND WHERE r.ID_EMPLEADO =: ID_EMPLEADO")
	int horasdeldiaTrabajadas(Date Fecha, int ID_EMPLEADO);
	
	@Query("SELECT r FROM REGISTRO r WHERE r.ID_EMPLEADO =: ID_EMPLEADO")
	List<RegistroEntity> listarRegistros(int ID_EMPLEADO);
	
	@Query("UPDATE REGISTRO r SET r.TOTAL_HORAS =: Horas WHERE r.ID_EMPLEADO =: ID_EMPLEADO AND r.FECHA =: FECHAHOY")
	void ActualizarHorasTotales(int Horas, int ID_EMPLEADO, Date FECHAHOY);
}
