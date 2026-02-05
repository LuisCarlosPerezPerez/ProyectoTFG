package com.example.demo.services.implementacion;

import java.time.LocalDateTime;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.registro.*;
import com.example.demo.entity.RegistroEntity;
import com.example.demo.repository.RegistroRepository;
import com.example.demo.repository.RepositorioEmpleado;
import com.example.demo.services.interfaz.RegistroInterfaz;

@Service
public class RegistroImplementacion implements RegistroInterfaz {
	
	public static int ID_EMPLEADO;
	
	public static List<RegistroEntity> listaEntidadRegistro = new ArrayList<RegistroEntity>();
	
	@Autowired
	RegistroRepository registrosql;
	
	@Autowired
	RepositorioEmpleado empleadosql;

	@Override
	public newRegistroDTO crearRegistro() {
		return new newRegistroDTO();
	}
	
	@Override
	public int GuardarRegistro(newRegistroDTO registro) {
		RegistroEntity r = null;
		RegistroEntity registrar = new RegistroEntity();
		registrar.setFecha(registro.getFecha());
		registrar.setFecha_entrada(registro.getFecha_entrada());
		registrar.setTotal_horas(0);
		registrar.setEmpleado(empleadosql.findById(registro.getId_empleado()).orElse(null));
		r = registrosql.save(registrar);
		return r.getID_Registro();
	}

	@Override
	public void RegistrarSalida() {
		RegistroEntity registro = registrosql.buscarRegistro(new Date(), ID_EMPLEADO);
		registrosql.ActualizarHoraSalida(LocalDateTime.now(), ID_EMPLEADO, registro.getFecha());
		int horas = registrosql.horasdeldiaTrabajadas(new Date(), ID_EMPLEADO);
		registrosql.ActualizarHorasTotales(horas, ID_EMPLEADO, registro.getFecha());
	}

	@Override
	public List<RegistroDTO> listarRegistros() {
		return listaEntidadRegistro.stream()
	            .map(a -> new RegistroDTO(
	            		a.getID_Registro(),
	            		a.getFecha(),
	            		a.getFecha_entrada(),
	            		a.getFecha_salida(),
	            		a.getTotal_horas(),
	            		a.getEmpleado().getID_Empleado()
	            ))
	            .toList();
	}

}
