package com.example.demo.dto.IngredientesDTO;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class IngredienteCrearDtotest {


	@Test
	void Ingrediente(){
		IngredienteCrearDTO Ingrediente = new IngredienteCrearDTO("Mandarina", 200, "Juan");

        assertEquals(200, Ingrediente.getStock());
	}

}