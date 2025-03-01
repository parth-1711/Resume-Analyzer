package com.resumeanalyzer.resume_analyzer.model;

public class JobDescription {
    private String jobTitle;
    private String description;

    public JobDescription(String jobTitle, String description) {
        this.jobTitle = jobTitle;
        this.description = description;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
