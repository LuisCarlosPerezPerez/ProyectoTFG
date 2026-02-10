package com.example.demo.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.registro.*;
import com.example.demo.services.interfaz.RegistroInterfaz;


@RestController
@RequestMapping("/Registro")
public class RegistroController {
	

	@Autowired
    RegistroInterfaz registroServicio;

    @PostMapping("/GuardarRegistro")
    public int guardarRegistro(@RequestBody newRegistroDTO newRegistro) {
        return registroServicio.GuardarRegistro(newRegistro);
    }
    
    @PostMapping("/GuardarHoraSalida")
    public void GuardarHoraSalida(@RequestParam int idEmpleado) { 
        registroServicio.RegistrarSalida(idEmpleado);
    }
    
    @GetMapping("/MostrarRegistros")
    public List<RegistroDTO> listaRegistros(){
        return registroServicio.listarRegistros();
    }

    @GetMapping("/MostrarTodosLosRegistros")
    public List<RegistroDTO> listarRegistros(){
        return registroServicio.listarTodosLosRegistros();
    }
    
    
}
