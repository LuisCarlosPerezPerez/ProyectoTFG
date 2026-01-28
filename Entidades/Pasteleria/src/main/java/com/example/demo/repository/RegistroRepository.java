package com.example.demo.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.RegistroEntity;

public interface RegistroRepository extends JpaRepository <RegistroEntity, Integer>{

	
	@Query("UPDATE REGISTRO r SET r.FECHA_ENTRADA = FECHA WHERE r.ID_EMPLEADO = ID_EMPLEADO AND ID_REGISTRO = REGISTRO")
	RegistroEntity ActualizarHoraEntrada(Date FECHA, int ID_EMPLEADO, int REGISTRO);
	
	@Query("UPDATE REGISTRO r SET r.FECHA_SALIDA = FECHA WHERE r.ID_EMPLEADO = ID_EMPLEADO AND ID_REGISTRO = REGISTRO")
	RegistroEntity ActualizarHoraSalida(Date FECHA, int ID_EMPLEADO, int REGISTRO);
	
	@Query("UPDATE REGISTRO r SET r.TOTAL_HORAS = r.TOTAL_HORAS + DIFERENCIA_HORAS r.ID_EMPLEADO = ID_EMPLEADO AND ID_REGISTRO = REGISTRO")
	RegistroEntity ActualizarTotalHoras(int DIFERENCIA_HORAS, int ID_EMPLEADO, int REGISTRO);
	
}
