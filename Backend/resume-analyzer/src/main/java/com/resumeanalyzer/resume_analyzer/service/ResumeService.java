package com.resumeanalyzer.resume_analyzer.service;

import io.github.cdimascio.dotenv.Dotenv;
import com.resumeanalyzer.resume_analyzer.model.Resume;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

@Service
public class ResumeService {

    private final Dotenv dotenv;

    public ResumeService() {
        this.dotenv = Dotenv.configure().directory("/app").load();
    }


    public static String extractTextFromPDF(byte[] pdfBytes) {
        try (PDDocument document = PDDocument.load(new ByteArrayInputStream(pdfBytes))) {
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
        } catch (Exception e) {
            e.printStackTrace();
            return "Error extracting text from PDF.";
        }
    }
    public String parseResume(Resume resume, String jd) throws Exception{
        String resumeText = extractTextFromPDF(resume.getFile());


        String prompt = """
        You are an expert career advisor and hiring manager. Your task is to analyze text and content of resume and a job description, and provide the following:
    
        1. Match Score: A percentage score (0-100%%) indicating how well the resume matches the job description.
        2. Suggestions: Specific suggestions to improve the resume to better align with the job description.
        3. Missing Skills: A list of skills mentioned in the job description that are missing from the resume.
    
        Here is the resume:
        %s
    
        Here is the job description:
        %s
    
        Please provide the match score, suggestions, and missing skills in a structured object.
        """.formatted(resumeText, jd);


        String jsonBody = """
                {
                  "contents": [{
                    "parts": [{"text": "%s"}]
                  }]
                }
                """.formatted(prompt);


        String apiKey = dotenv.get("GEMINI_API_KEY");
        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey;


        HttpRequest postRequest=HttpRequest.newBuilder()
                .uri(new URI(url))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody, StandardCharsets.UTF_8))
                .build();

        HttpClient httpClient=HttpClient.newHttpClient();

        HttpResponse<String> response=httpClient.send(postRequest, HttpResponse.BodyHandlers.ofString());
        return response.body();
    }
}
