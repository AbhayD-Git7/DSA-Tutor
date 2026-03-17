package com.dsatutor.ai;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class AnthropicService {

  private final WebClient anthropicWebClient;
  private final ObjectMapper objectMapper;

  public AnthropicService(WebClient anthropicWebClient, ObjectMapper objectMapper) {
    this.anthropicWebClient = anthropicWebClient;
    this.objectMapper = objectMapper;
  }

  private static final Logger log = LoggerFactory.getLogger(AnthropicService.class);

    @Value("${anthropic.api.model}")
    private String model;

    @Value("${anthropic.api.max-tokens}")
    private int maxTokens;

    private static final String SYSTEM_PROMPT = """
        You are an expert DSA (Data Structures & Algorithms) tutor. When given a LeetCode-style problem,
        respond ONLY with a valid JSON object — no markdown, no explanation outside the JSON.

        The JSON must match this exact schema:
        {
          "difficulty": "Easy|Medium|Hard",
          "pattern": {
            "id": "two-pointers",
            "name": "Two Pointers",
            "description": "...",
            "icon": "👆",
            "color": "#7c3aed",
            "problemCount": 45,
            "solvedCount": 0,
            "examples": ["Valid Palindrome", "Container With Most Water"]
          },
          "explanation": {
            "simple": "...",
            "inputDescription": "...",
            "outputDescription": "...",
            "example": {
              "input": "nums = [2,7,11,15], target = 9",
              "output": "[0,1]",
              "steps": ["Step 1: ...", "Step 2: ..."]
            }
          },
          "bruteForce": {
            "logic": "...",
            "timeComplexity": "O(n²)",
            "spaceComplexity": "O(1)",
            "whyInefficient": "..."
          },
          "optimal": {
            "logic": "...",
            "timeComplexity": "O(n)",
            "spaceComplexity": "O(n)"
          },
          "edgeCases": ["Empty array", "Single element", "..."],
          "codeImplementation": {
            "java": "// Java code with comments",
            "python": "# Python code with comments",
            "javascript": "// JS code with comments"
          },
          "interviewTips": {
            "howToExplain": "...",
            "commonMistakes": ["Mistake 1", "Mistake 2"]
          }
        }

        Be thorough, beginner-friendly, and technically accurate.
        """;

    public String analyzeProblem(String problemStatement) {
        log.debug("Sending problem to Claude API (model={})", model);

        Map<String, Object> requestBody = Map.of(
            "model", model,
            "max_tokens", maxTokens,
            "system", SYSTEM_PROMPT,
            "messages", List.of(
                Map.of("role", "user", "content", problemStatement)
            )
        );

        Map<?, ?> response = anthropicWebClient
            .post()
            .uri("/messages")
            .bodyValue(requestBody)
            .retrieve()
            .bodyToMono(Map.class)
            .block();

        List<?> content = (List<?>) response.get("content");
        Map<?, ?> firstBlock = (Map<?, ?>) content.get(0);
        String rawJson = (String) firstBlock.get("text");

        log.debug("Received response from Claude ({} chars)", rawJson.length());
        return rawJson;
    }

    public double[] generateEmbedding(String text) {
        log.debug("Embedding requested for text of length {}", text.length());
        return new double[0];
    }
}