package com.example.demo.services.implementacion;

import java.time.LocalDateTime;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.dto.RegistroDTO;
import com.example.demo.entity.RegistroEntity;
import com.example.demo.repository.RegistroRepository;
import com.example.demo.repository.RepositorioEmpleado;
import com.example.demo.services.interfaz.RegistroInterfaz;


public class RegistroImplementacion implements RegistroInterfaz {
	
	public static int ID_EMPLEADO;
	
	@Autowired
	RegistroRepository registrosql;
	
	@Autowired
	RepositorioEmpleado empleadosql;

	@Override
	public RegistroDTO crearRegistro() {
		return new RegistroDTO();
	}
	
	@Override
	public RegistroEntity GuardarRegistro(RegistroDTO registro) {
		registro.setEmpleado(empleadosql.findById(ID_EMPLEADO));
		RegistroEntity registrar = new RegistroEntity();
		registrar.setFecha(registro.getFecha());
		registrar.setFecha_entrada(registro.getFecha_entrada());
		registrar.setTotal_horas(registro.getTotal_horas());
		registrar.setEmpleado(registro.getEmpleado());
		return registrar;
	}

	@Override
	public void RegistrarSalida() {
		RegistroEntity registro = registrosql.buscarRegistro(new Date(), ID_EMPLEADO);
		registrosql.ActualizarHoraSalida(LocalDateTime.now(), ID_EMPLEADO, registro.getFecha());
		int horas = registrosql.horasdeldiaTrabajadas(new Date(), ID_EMPLEADO);
		registrosql.ActualizarHorasTotales(horas, ID_EMPLEADO, registro.getFecha());
	}

	@Override
	public List<RegistroEntity> listarRegistros() {
		return registrosql.findAll();
	}

}
