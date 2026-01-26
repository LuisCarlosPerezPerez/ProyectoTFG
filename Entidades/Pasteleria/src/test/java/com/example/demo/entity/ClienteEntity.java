package com.example.demo.entity;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;

@Entity
@Table(name="CLIENTE")
public class ClienteEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID_CLIENTE")
	private int id;
	
	@Column(name="USUARIO")
	private String usuario;
	
	@Column(name="CONTRASEÑA")
	private String contraseña;
	
	@OneToMany(mappedBy="Pedido")
	private Set<PedidoEntity>Pedidos=new HashSet<PedidoEntity>();
	
	
	
	public Set<PedidoEntity> getPedidos() {
		return Pedidos;
	}

	public void setPedidos(Set<PedidoEntity> pedidos) {
		Pedidos = pedidos;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public String getContraseña() {
		return contraseña;
	}

	public void setContraseña(String contraseña) {
		this.contraseña = contraseña;
	}
	
	
}
