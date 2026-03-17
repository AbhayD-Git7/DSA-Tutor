package com.dsatutor.controller;

import com.dsatutor.ai.PatternMatchingService;
import com.dsatutor.dto.AnalyzeRequest;
import com.dsatutor.dto.ProblemAnalysisDTO;
import com.dsatutor.service.DashboardService;
import com.dsatutor.service.ProblemAnalysisService;
import jakarta.validation.Valid;
// Not using Lombok constructors here to keep javac happy during build
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/problems")
@CrossOrigin(origins = "${spring.web.cors.allowed-origins}")
class ProblemController {

    private final ProblemAnalysisService analysisService;

    public ProblemController(ProblemAnalysisService analysisService) {
        this.analysisService = analysisService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<Map<String, Object>> analyze(@Valid @RequestBody AnalyzeRequest request) {
        ProblemAnalysisDTO result = analysisService.analyze(request);
        return ResponseEntity.ok(Map.of(
            "data",    result,
            "success", true
        ));
    }

    @PostMapping("/{id}/complete")
    public ResponseEntity<Map<String, Object>> markComplete(@PathVariable String id) {
        analysisService.markSolved(id);
        return ResponseEntity.ok(Map.of("success", true));
    }
}

@RestController
@RequestMapping("/api/patterns")
@CrossOrigin(origins = "${spring.web.cors.allowed-origins}")
class PatternController {

    private final PatternMatchingService patternMatchingService;

    public PatternController(PatternMatchingService patternMatchingService) {
        this.patternMatchingService = patternMatchingService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllPatterns() {
        var patterns = patternMatchingService.getAllPatterns().entrySet().stream()
            .map(e -> Map.of(
                "id",           e.getKey(),
                "name",         e.getValue().name(),
                "icon",         e.getValue().icon(),
                "keywords",     e.getValue().keywords(),
                "problemCount", 0,
                "solvedCount",  0
            ))
            .toList();

        return ResponseEntity.ok(Map.of("data", patterns, "success", true));
    }
}

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "${spring.web.cors.allowed-origins}")
class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/dashboard/progress")
    public ResponseEntity<Map<String, Object>> getProgress() {
        return ResponseEntity.ok(Map.of(
            "data",    dashboardService.getUserProgress(),
            "success", true
        ));
    }

    @GetMapping("/daily-challenge")
    public ResponseEntity<Map<String, Object>> getDailyChallenge() {
        return ResponseEntity.ok(Map.of("data", Map.of(), "success", true));
    }
}