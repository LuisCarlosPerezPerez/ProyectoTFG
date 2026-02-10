package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ClientesDTO.*;
import com.example.demo.dto.PedidosDTO.PedidoFullDTO;
import com.example.demo.entity.ClienteEntity;
import com.example.demo.repository.RepositorioCliente;
import com.example.demo.services.interfaz.*;

@RestController
@RequestMapping("/Cliente")
public class ControladorCliente {

	@Autowired
	ServicioCLiente serviciocliente;

	@Autowired
	RepositorioCliente repocliente;

//--------------------- Iniciar Sesion ---------------------//

	@PostMapping("GuardarCliente")
	public ResponseEntity<ClienteSesionDTO> guardarcliente(@RequestBody ClienteRegistroDTO cliente) {
		int id_cliente = serviciocliente.guardarcliente(cliente);
		ClienteEntity entidad = repocliente.BuscarPorId(id_cliente);
		ClienteSesionDTO clientee = new ClienteSesionDTO(entidad.getUsuario(), entidad.getContrasena());
		return ResponseEntity.ok(clientee);
	}

	@PostMapping("InicioSesion")
	public ResponseEntity<ClienteFullDTO> IniciarSesion(@RequestBody ClienteSesionDTO clienteS ) {
		ClienteFullDTO cliente = serviciocliente.ComprobarSesion(clienteS.getUsuario(), clienteS.getContraseña());
		return ResponseEntity.ok(cliente);
	}
	
	@PostMapping("ComprarProducto/{id}")
	public ResponseEntity<ClienteFullDTO> comprarProducto(
	    @PathVariable("id") String idProducto, 
	    @RequestBody ClienteFullDTO cliente) { // Spring sacará los datos del JSON aquí
	    
	    int id_p = Integer.parseInt(idProducto);
	    ClienteFullDTO clienteActualizado = serviciocliente.comprarproducto(cliente,id_p);
	    return ResponseEntity.ok(clienteActualizado);
	}
	
	@PutMapping("/FinalizarPedido/{idPedido}")
	public ResponseEntity<ClienteFullDTO> finalizarPedido(
	        @PathVariable int idPedido, 
	        @RequestParam int telefono,
	        @RequestBody ClienteFullDTO clienteToken) { 
	    
	    // El servicio se encarga de validar si ese ID de pedido pertenece al token
	    ClienteFullDTO resultado = serviciocliente.actualizarEstadoPedido(idPedido, telefono, clienteToken);
	    return ResponseEntity.ok(resultado);
	}

}
