package com.dsatutor.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AnalyzeRequest {

    @NotBlank(message = "Problem statement must not be empty")
    @Size(min = 20, max = 5000, message = "Problem must be between 20 and 5000 characters")
    private String problemStatement;

    private String language = "java";

    public String getProblemStatement() { return problemStatement; }
    public void setProblemStatement(String v) { this.problemStatement = v; }

    public String getLanguage() { return language; }
    public void setLanguage(String v) { this.language = v; }
}
