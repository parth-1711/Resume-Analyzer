package com.resumeanalyzer.resume_analyzer.model;

public class Request {
    private String filename;

    private String file;
    private String jd;

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
    }

    public String getJd() {
        return jd;
    }

    public void setJd(String jd) {
        this.jd = jd;
    }

    public Request(String filename, String file, String jd) {
        this.filename = filename;
        this.file = file;
        this.jd = jd;
    }
}
