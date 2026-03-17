package com.dsatutor.repository;

import com.dsatutor.model.ProblemAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProblemAnalysisRepository extends JpaRepository<ProblemAnalysis, String> {

    Optional<ProblemAnalysis> findByStatementHash(String statementHash);

    List<ProblemAnalysis> findTop20ByOrderByCreatedAtDesc();

    List<ProblemAnalysis> findByPatternName(String patternName);

    long countByDifficultyAndSolvedTrue(String difficulty);

    @Query("SELECT p FROM ProblemAnalysis p WHERE p.solved = false ORDER BY p.createdAt ASC")
    Optional<ProblemAnalysis> findDailyChallenge();
}