package com.dsatutor.dto;

import java.time.LocalDateTime;
import java.util.List;

public class ProblemAnalysisDTO {

    private String id;
    private String problemStatement;
    private String difficulty;
    private PatternDTO pattern;
    private ExplanationDTO explanation;
    private ApproachDTO bruteForce;
    private ApproachDTO optimal;
    private List<String> edgeCases;
    private CodeImplementationDTO codeImplementation;
    private InterviewTipsDTO interviewTips;
    private LocalDateTime createdAt;
    private boolean cached;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getProblemStatement() { return problemStatement; }
    public void setProblemStatement(String v) { this.problemStatement = v; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String v) { this.difficulty = v; }

    public PatternDTO getPattern() { return pattern; }
    public void setPattern(PatternDTO v) { this.pattern = v; }

    public ExplanationDTO getExplanation() { return explanation; }
    public void setExplanation(ExplanationDTO v) { this.explanation = v; }

    public ApproachDTO getBruteForce() { return bruteForce; }
    public void setBruteForce(ApproachDTO v) { this.bruteForce = v; }

    public ApproachDTO getOptimal() { return optimal; }
    public void setOptimal(ApproachDTO v) { this.optimal = v; }

    public List<String> getEdgeCases() { return edgeCases; }
    public void setEdgeCases(List<String> v) { this.edgeCases = v; }

    public CodeImplementationDTO getCodeImplementation() { return codeImplementation; }
    public void setCodeImplementation(CodeImplementationDTO v) { this.codeImplementation = v; }

    public InterviewTipsDTO getInterviewTips() { return interviewTips; }
    public void setInterviewTips(InterviewTipsDTO v) { this.interviewTips = v; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime v) { this.createdAt = v; }

    public boolean isCached() { return cached; }
    public void setCached(boolean v) { this.cached = v; }

    // ── Nested DTOs ──────────────────────────────────────────────────────────

    public static class PatternDTO {
        private String id;
        private String name;
        private String description;
        private String icon;
        private String color;
        private int problemCount;
        private int solvedCount;
        private List<String> examples;

        public String getId() { return id; }
        public void setId(String v) { this.id = v; }
        public String getName() { return name; }
        public void setName(String v) { this.name = v; }
        public String getDescription() { return description; }
        public void setDescription(String v) { this.description = v; }
        public String getIcon() { return icon; }
        public void setIcon(String v) { this.icon = v; }
        public String getColor() { return color; }
        public void setColor(String v) { this.color = v; }
        public int getProblemCount() { return problemCount; }
        public void setProblemCount(int v) { this.problemCount = v; }
        public int getSolvedCount() { return solvedCount; }
        public void setSolvedCount(int v) { this.solvedCount = v; }
        public List<String> getExamples() { return examples; }
        public void setExamples(List<String> v) { this.examples = v; }
    }

    public static class ExplanationDTO {
        private String simple;
        private String inputDescription;
        private String outputDescription;
        private StepByStepExampleDTO example;

        public String getSimple() { return simple; }
        public void setSimple(String v) { this.simple = v; }
        public String getInputDescription() { return inputDescription; }
        public void setInputDescription(String v) { this.inputDescription = v; }
        public String getOutputDescription() { return outputDescription; }
        public void setOutputDescription(String v) { this.outputDescription = v; }
        public StepByStepExampleDTO getExample() { return example; }
        public void setExample(StepByStepExampleDTO v) { this.example = v; }
    }

    public static class StepByStepExampleDTO {
        private String input;
        private String output;
        private List<String> steps;

        public String getInput() { return input; }
        public void setInput(String v) { this.input = v; }
        public String getOutput() { return output; }
        public void setOutput(String v) { this.output = v; }
        public List<String> getSteps() { return steps; }
        public void setSteps(List<String> v) { this.steps = v; }
    }

    public static class ApproachDTO {
        private String logic;
        private String timeComplexity;
        private String spaceComplexity;
        private String whyInefficient;

        public String getLogic() { return logic; }
        public void setLogic(String v) { this.logic = v; }
        public String getTimeComplexity() { return timeComplexity; }
        public void setTimeComplexity(String v) { this.timeComplexity = v; }
        public String getSpaceComplexity() { return spaceComplexity; }
        public void setSpaceComplexity(String v) { this.spaceComplexity = v; }
        public String getWhyInefficient() { return whyInefficient; }
        public void setWhyInefficient(String v) { this.whyInefficient = v; }
    }

    public static class CodeImplementationDTO {
        private String java;
        private String python;
        private String javascript;

        public String getJava() { return java; }
        public void setJava(String v) { this.java = v; }
        public String getPython() { return python; }
        public void setPython(String v) { this.python = v; }
        public String getJavascript() { return javascript; }
        public void setJavascript(String v) { this.javascript = v; }
    }

    public static class InterviewTipsDTO {
        private String howToExplain;
        private List<String> commonMistakes;

        public String getHowToExplain() { return howToExplain; }
        public void setHowToExplain(String v) { this.howToExplain = v; }
        public List<String> getCommonMistakes() { return commonMistakes; }
        public void setCommonMistakes(List<String> v) { this.commonMistakes = v; }
    }
}