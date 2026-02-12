package com.example.demo.DtosTest.ClienteDTO;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.demo.dto.ClientesDTO.ClienteFullDTO;

public class CrearClienteDTOtest {
    @Test
	void Cliente(){
		ClienteFullDTO cliente = new ClienteFullDTO(1,"carlos","carloszz156","carloschacon@gmail.com",new ArrayList<Integer>());

        assertEquals(1, cliente.getId());
	}
}




/*class IngredienteCrearDtotest {


	@Test
	void Ingrediente(){
		IngredienteCrearDTO Ingrediente = new IngredienteCrearDTO("Mandarina", 200, "Juan");

        assertEquals(200, Ingrediente.getStock());
	}

}*/
