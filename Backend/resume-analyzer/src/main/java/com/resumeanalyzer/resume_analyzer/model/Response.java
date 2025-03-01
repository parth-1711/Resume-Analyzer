package com.resumeanalyzer.resume_analyzer.model;

import java.util.List;

public class Response {
    private Integer score;
    private String suggestion;
    private String MissingSkills;

    public Response(Integer score, String suggestion, String missingSkills) {
        this.score = score;
        this.suggestion = suggestion;
        MissingSkills = missingSkills;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getSuggestion() {
        return suggestion;
    }

    public void setSuggestion(String suggestion) {
        this.suggestion = suggestion;
    }

    public String getMissingSkills() {
        return MissingSkills;
    }

    public void setMissingSkills(String missingSkills) {
        MissingSkills = missingSkills;
    }
}
