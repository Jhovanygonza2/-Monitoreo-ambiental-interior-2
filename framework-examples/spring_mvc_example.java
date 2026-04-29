// Spring MVC Example
// Ideal para apps empresariales con datos de transporte.

package com.mobility.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class MobilityController {
    @GetMapping("/stations")
    public List<String> getStations() {
        return List.of("Station A", "Station B", "Station C");
    }
}
