package com.jatinbuilds.tambola.dao;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jatinbuilds.tambola.model.Tambola;
import com.jatinbuilds.tambola.repository.TambolaRepository;

@Service
public class TambolaDAO {
	
	@Autowired
	TambolaRepository tambolaRepository;
	
	public Tambola save(Tambola tambola){
		return tambolaRepository.save(tambola);
	}
	
	public Optional<Tambola> findById(String tambolaUUID){
		return tambolaRepository.findById(tambolaUUID);
	}
	
	
	public void truncateTableById(String tambolaUUID){
		tambolaRepository.deleteById(tambolaUUID);
	}

}
