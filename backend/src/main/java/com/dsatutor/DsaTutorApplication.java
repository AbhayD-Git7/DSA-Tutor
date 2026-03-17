package com.dsatutor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class DsaTutorApplication {
    public static void main(String[] args) {
        SpringApplication.run(DsaTutorApplication.class, args);
    }
}