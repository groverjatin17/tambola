package com.jatinbuilds.tambola;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class TambolaApplication {

	public static void main(String[] args) {
		SpringApplication.run(TambolaApplication.class, args);
	}

}
