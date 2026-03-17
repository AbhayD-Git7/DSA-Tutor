package com.dsatutor.ai;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
public class PatternMatchingService {

    private static final Map<String, PatternDefinition> PATTERNS = new LinkedHashMap<>();

    private static final Logger log = LoggerFactory.getLogger(PatternMatchingService.class);

    static {
        PATTERNS.put("sliding-window", new PatternDefinition(
            "Sliding Window", "🪟",
            List.of("subarray", "substring", "window", "consecutive", "contiguous",
                    "maximum", "minimum", "sum", "length", "k elements")
        ));
        PATTERNS.put("two-pointers", new PatternDefinition(
            "Two Pointers", "👆",
            List.of("sorted", "pair", "target sum", "palindrome", "reverse",
                    "two numbers", "left right", "container", "water", "trap")
        ));
        PATTERNS.put("binary-search", new PatternDefinition(
            "Binary Search", "🔍",
            List.of("sorted array", "search", "find position", "log n", "rotated",
                    "mountain", "peak", "threshold", "minimum in rotated")
        ));
        PATTERNS.put("dynamic-programming", new PatternDefinition(
            "Dynamic Programming", "🧮",
            List.of("maximum", "minimum", "count ways", "longest", "shortest path",
                    "subsequence", "subarray sum", "coin change", "knapsack", "fibonacci",
                    "number of ways", "optimal")
        ));
        PATTERNS.put("graphs", new PatternDefinition(
            "Graphs", "🕸️",
            List.of("graph", "node", "edge", "connected", "path", "cycle",
                    "bfs", "dfs", "island", "grid", "matrix", "visited")
        ));
        PATTERNS.put("trees", new PatternDefinition(
            "Trees", "🌳",
            List.of("binary tree", "bst", "root", "leaf", "depth", "height",
                    "level order", "inorder", "preorder", "postorder", "ancestor")
        ));
        PATTERNS.put("hash-map", new PatternDefinition(
            "Hash Map / Set", "🗂️",
            List.of("frequency", "count", "duplicate", "anagram", "occurrence",
                    "lookup", "cache", "two sum", "group")
        ));
        PATTERNS.put("stack-queue", new PatternDefinition(
            "Stack & Queue", "📚",
            List.of("stack", "queue", "parentheses", "bracket", "valid",
                    "monotonic", "next greater", "min stack", "level order")
        ));
        PATTERNS.put("backtracking", new PatternDefinition(
            "Backtracking", "🔄",
            List.of("all combinations", "permutations", "subsets", "generate",
                    "n-queens", "sudoku", "word search", "all possible")
        ));
        PATTERNS.put("heap", new PatternDefinition(
            "Heap / Priority Queue", "🏔️",
            List.of("k largest", "k smallest", "top k", "median", "stream",
                    "priority", "merge k sorted")
        ));
    }

    public String identifyPattern(String problemStatement) {
        String lower = problemStatement.toLowerCase();

        String bestPattern = "hash-map";
        double bestScore = -1;

        for (Map.Entry<String, PatternDefinition> entry : PATTERNS.entrySet()) {
            double score = scorePattern(lower, entry.getValue().keywords());
            if (score > bestScore) {
                bestScore = score;
                bestPattern = entry.getKey();
            }
        }

        log.debug("Identified pattern: {} (score={})", bestPattern, bestScore);
        return PATTERNS.get(bestPattern).name();
    }

    private double scorePattern(String text, List<String> keywords) {
        double score = 0;
        for (String keyword : keywords) {
            if (text.contains(keyword)) {
                score += keyword.split(" ").length;
            }
        }
        return score / keywords.size();
    }

    public Map<String, PatternDefinition> getAllPatterns() {
        return Collections.unmodifiableMap(PATTERNS);
    }

    public record PatternDefinition(String name, String icon, List<String> keywords) {}
}