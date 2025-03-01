package com.resumeanalyzer.resume_analyzer.controller;

import com.resumeanalyzer.resume_analyzer.model.Resume;
import com.resumeanalyzer.resume_analyzer.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class ResumeController {

    private ResumeService resumeService;

    @Autowired
    public ResumeController(ResumeService resumeService){
        this.resumeService=resumeService;
    }

    @GetMapping("/")
    public String hello(){
        return "hello";
    }

    @PostMapping(value="/parse", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String parseResume(@RequestPart("resume") MultipartFile resume, @RequestPart("jd") String jd){
        String response="";
        try {
            Resume resume1=new Resume(resume.getName(),resume.getBytes());

            response=resumeService.parseResume(resume1,jd);
        }catch (Exception e){
            System.out.println(e);
        }
        return response;
    }
}
