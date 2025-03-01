from fastapi import FastAPI,File, Form
from pydantic import BaseModel
import PyPDF2
from io import BytesIO
from google import genai  # Ensure this is the correct import for the Gemini API
import base64

app = FastAPI()

# Initialize the Gemini client
client = genai.Client(api_key="AIzaSyCU_gBnbkzR_AMUgbm2zOEt4lZVkhEPGhs")  # Replace with your actual API key

# Pydantic model for the resume
class Resume(BaseModel):
    filename: str
    jd: str
    file: str

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/parse")
async def parse(resume:Resume ):
    try:
        # Extract text from the PDF byte array
        pdf_reader = PyPDF2.PdfReader(BytesIO(base64.b64decode(resume.file)))
        resume_text = ""
        for page in pdf_reader.pages:
            resume_text += page.extract_text()

        # Create the prompt for Gemini
        prompt = f"""
        You are an expert career advisor and hiring manager. Your task is to analyze a resume and a job description, and provide the following:

        1. **Match Score**: A percentage score (0-100%) indicating how well the resume matches the job description.
        2. **Suggestions**: Specific suggestions to improve the resume to better align with the job description.
        3. **Missing Skills**: A list of skills mentioned in the job description that are missing from the resume.

        Here is the resume:
        {resume_text}

        Here is the job description:
        {resume.jd}

        Please provide the match score, suggestions, and missing skills in a structured JSON format.
        """

        # Send the prompt to Gemini
        response = client.models.generate_content(
            model="gemini-1.5-flash",
            contents=[{"role": "user", "parts": [{"text": prompt}]}]
        )

        # Extract the response text
        result = response.text

        # Return the response
        return {"result": result}
    except Exception as e:
        return {"error": str(e)}