package com.resumeanalyzer.resume_analyzer.model;

public class Resume {
    private String filename;
    private byte[] file;

    public Resume(String filename, byte[] file) {
        this.filename = filename;
        this.file = file;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public byte[] getFile() {
        return file;
    }

    public void setFile(byte[] file) {
        this.file = file;
    }
}
