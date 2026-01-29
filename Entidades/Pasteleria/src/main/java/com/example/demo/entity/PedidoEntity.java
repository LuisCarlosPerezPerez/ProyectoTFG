package com.example.demo.entity;

import java.io.Serializable;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;

@Entity
@Table(name="PEDIDO")
public class PedidoEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID_PEDIDO")
	private int id;
	
	@Column(name="ENTREGA")
	private Date entrega;
	
	@Column(name="TELEFONO")
	private int telefono;
	
	@Column(name="ESTADO")
	private String estado;
	
	@ManyToOne
	@JoinColumn(name="ID_CLIENTE",nullable=false)
	private ClienteEntity cliente;
	
	@OneToMany(mappedBy="Producto")
	private Set<PedidoProductoEntity>productos=new HashSet<PedidoProductoEntity>();
	
	public PedidoEntity(int id, Date entrega, int telefono, String estado, ClienteEntity cliente) {
		this.id = id;
		this.entrega = entrega;
		this.telefono = telefono;
		this.estado = estado;
		this.cliente = cliente;
		this.productos= new HashSet<PedidoProductoEntity>();
	}
	
	

	public Set<PedidoProductoEntity> getProductos() {
		return productos;
	}



	public void setProductos(Set<PedidoProductoEntity> productos) {
		this.productos = productos;
	}



	public ClienteEntity getCliente() {
		return cliente;
	}

	public void setCliente(ClienteEntity cliente) {
		this.cliente = cliente;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getEntrega() {
		return entrega;
	}

	public void setEntrega(Date entrega) {
		this.entrega = entrega;
	}

	public int getTelefono() {
		return telefono;
	}

	public void setTelefono(int telefono) {
		this.telefono = telefono;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}
	
	
	
	
	
}
