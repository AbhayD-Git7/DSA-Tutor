package com.dsatutor.service;

import com.dsatutor.ai.AnthropicService;
import com.dsatutor.ai.PatternMatchingService;
import com.dsatutor.dto.AnalyzeRequest;
import com.dsatutor.dto.ProblemAnalysisDTO;
import com.dsatutor.model.ProblemAnalysis;
import com.dsatutor.repository.ProblemAnalysisRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.MessageDigest;
import java.util.HexFormat;

@Service
public class ProblemAnalysisService {

    private static final Logger log = LoggerFactory.getLogger(ProblemAnalysisService.class);

    private final AnthropicService anthropicService;
    private final PatternMatchingService patternMatchingService;
    private final ProblemAnalysisRepository repository;
    private final ObjectMapper objectMapper;

    public ProblemAnalysisService(
        AnthropicService anthropicService,
        PatternMatchingService patternMatchingService,
        ProblemAnalysisRepository repository,
        ObjectMapper objectMapper
    ) {
        this.anthropicService = anthropicService;
        this.patternMatchingService = patternMatchingService;
        this.repository = repository;
        this.objectMapper = objectMapper;
    }

    @Cacheable(value = "problemAnalysis", key = "#root.target.hashStatement(#request.problemStatement)")
    @Transactional
    public ProblemAnalysisDTO analyze(AnalyzeRequest request) {
        String hash = hashStatement(request.getProblemStatement());

        return repository.findByStatementHash(hash)
            .map(existing -> {
                log.info("Cache hit (DB) for hash {}", hash);
                return deserialize(existing.getAnalysisJson());
            })
            .orElseGet(() -> {
                log.info("No cache � calling Claude API");
                return callAiAndPersist(request, hash);
            });
    }

    private ProblemAnalysisDTO callAiAndPersist(AnalyzeRequest request, String hash) {
        String rawJson = anthropicService.analyzeProblem(request.getProblemStatement());

        ProblemAnalysisDTO dto = deserialize(rawJson);

        String localPattern = patternMatchingService.identifyPattern(request.getProblemStatement());
        log.debug("AI pattern: {}, Local pattern: {}",
            dto.getPattern() != null ? dto.getPattern().getName() : "null", localPattern);

        ProblemAnalysis entity = new ProblemAnalysis();
        entity.setStatementHash(hash);
        entity.setProblemStatement(request.getProblemStatement());
        entity.setAnalysisJson(rawJson);
        entity.setDifficulty(dto.getDifficulty());
        entity.setPatternName(dto.getPattern() != null ? dto.getPattern().getName() : "Unknown");
        entity.setLanguage(request.getLanguage());
        repository.save(entity);

        dto.setCached(false);
        return dto;
    }

    @Transactional
    public void markSolved(String id) {
        repository.findById(id).ifPresent(p -> {
            p.setSolved(true);
            p.setSolvedAt(java.time.LocalDateTime.now());
            repository.save(p);
        });
    }

    public String hashStatement(String statement) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] hash = md.digest(statement.trim().toLowerCase().getBytes());
            return HexFormat.of().formatHex(hash);
        } catch (Exception e) {
            return String.valueOf(statement.hashCode());
        }
    }

    private ProblemAnalysisDTO deserialize(String json) {
        try {
            return objectMapper.readValue(json, ProblemAnalysisDTO.class);
        } catch (Exception e) {
            log.error("Failed to deserialize AI response", e);
            throw new RuntimeException("Failed to parse AI response: " + e.getMessage());
        }
    }
}
