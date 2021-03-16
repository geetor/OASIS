package oasis.gateway.config;

import lombok.extern.slf4j.Slf4j;
import oasis.gateway.service.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
public class ApplicationRunner implements CommandLineRunner {
    @Autowired
    private RouteService service;

    @Override
    public void run(String... args) throws Exception {
        log.info("Initializing RouteService");
        service.autoRefresh();
    }

}
