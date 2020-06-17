package com.jatinbuilds.tambola.controller;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jatinbuilds.tambola.dao.TambolaDAO;
import com.jatinbuilds.tambola.model.Tambola;

@RestController
@RequestMapping("/tambola")
public class TambolaController {

	@Autowired
	TambolaDAO tambolaDAO;
	
	@CrossOrigin
	@PostMapping("/number")
	public Tambola saveTambolaSession(@Validated @RequestBody Tambola tambola){
		return tambolaDAO.save(tambola);
	}
	
	@CrossOrigin
	@GetMapping("/number/{id}")
	public ResponseEntity<Optional<Tambola>> getEmployeeById(@PathVariable(value="id") String tambolaUUID){
		Optional<Tambola> tambola = tambolaDAO.findById(tambolaUUID);
		if(tambola==null){
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().body(tambola);
		}
}
