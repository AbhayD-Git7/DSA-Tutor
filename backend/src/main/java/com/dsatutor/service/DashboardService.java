package com.dsatutor.service;

import com.dsatutor.model.ProblemAnalysis;
import com.dsatutor.repository.ProblemAnalysisRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final ProblemAnalysisRepository repository;

    public DashboardService(ProblemAnalysisRepository repository) {
        this.repository = repository;
    }

    public Map<String, Object> getUserProgress() {
        List<ProblemAnalysis> all = repository.findAll();

        long easy   = all.stream().filter(p -> "Easy".equals(p.getDifficulty())   && p.isSolved()).count();
        long medium = all.stream().filter(p -> "Medium".equals(p.getDifficulty()) && p.isSolved()).count();
        long hard   = all.stream().filter(p -> "Hard".equals(p.getDifficulty())   && p.isSolved()).count();

        Map<String, long[]> patternStats = new LinkedHashMap<>();
        for (ProblemAnalysis p : all) {
            String name = p.getPatternName() != null ? p.getPatternName() : "Unknown";
            patternStats.computeIfAbsent(name, k -> new long[]{0, 0});
            patternStats.get(name)[0]++;
            if (p.isSolved()) patternStats.get(name)[1]++;
        }

        List<Map<String, Object>> patternBreakdown = patternStats.entrySet().stream()
            .map(e -> {
                long total  = e.getValue()[0];
                long solved = e.getValue()[1];
                return Map.<String, Object>of(
                    "pattern",    Map.of(
                        "name", e.getKey(),
                        "icon", "📦",
                        "id",   e.getKey().toLowerCase().replace(" ", "-")
                    ),
                    "solved",     solved,
                    "total",      total,
                    "percentage", total > 0 ? (solved * 100 / total) : 0
                );
            })
            .collect(Collectors.toList());

        List<Map<String, Object>> recentActivity = all.stream()
            .filter(p -> p.isSolved() && p.getSolvedAt() != null)
            .sorted((a, b) -> b.getSolvedAt().compareTo(a.getSolvedAt()))
            .limit(10)
            .map(p -> {
                Map<String, Object> entry = new LinkedHashMap<>();
                entry.put("date",        p.getSolvedAt().toLocalDate().toString());
                entry.put("problemName", p.getProblemStatement().lines().findFirst().orElse("Problem"));
                entry.put("difficulty",  p.getDifficulty() != null ? p.getDifficulty() : "Unknown");
                entry.put("pattern",     p.getPatternName() != null ? p.getPatternName() : "Unknown");
                entry.put("timeTaken",   0);
                return entry;
            })
            .collect(Collectors.toList());

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("totalSolved",      easy + medium + hard);
        result.put("easyCount",        easy);
        result.put("mediumCount",      medium);
        result.put("hardCount",        hard);
        result.put("streakDays",       calculateStreak(all));
        result.put("lastActivity",     LocalDateTime.now().toString());
        result.put("patternBreakdown", patternBreakdown);
        result.put("recentActivity",   recentActivity);
        return result;
    }

    private int calculateStreak(List<ProblemAnalysis> all) {
        long streak = all.stream()
            .map(p -> p.getCreatedAt().toLocalDate())
            .distinct()
            .sorted(Comparator.reverseOrder())
            .limit(30)
            .count();
        return (int) Math.min(streak, 30);
    }
}