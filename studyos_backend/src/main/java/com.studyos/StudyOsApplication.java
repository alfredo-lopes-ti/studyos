package main.java.com.studyos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * ==========================================================================
 * STUDYOS - CLASSE INICIALIZADORA DO BACKEND (STUDYOSAPPLICATION.JAVA)
 * ==========================================================================
 * Esta classe é a porta de entrada da nossa aplicação Java Spring Boot.
 */
@SpringBootApplication
public class StudyOsApplication {

    public static void main(String[] args) {
        // Dispara o motor do Spring Boot e levanta o servidor Tomcat na porta 8080
        SpringApplication.run(StudyOsApplication.class, args);
    }
}