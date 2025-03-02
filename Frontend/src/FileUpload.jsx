import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useDropzone } from "react-dropzone";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import { Trash2, Upload } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadialCharts } from "./RadialCharts";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [responseData, setResponseData] = useState(null);

  // const handleFileChange = (event) => {
  //   setFile(event.target.files[0]);
  // };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const removeFile = () => {
    setFile(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async () => {
    if (!file || !text) {
      setMessage("Please upload a file and enter text.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jd", text);

    try {
      setLoading(true);
      setMessage("");
      const response = await axios.post(
        "http://13.60.92.220:8080/parse",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage("Upload successful!");
      let text = response.data.candidates[0].content.parts[0].text;
      let cleanedResponse = text.replace(/^```json\n|\n```\n$/g, "");
      let obj = JSON.parse(cleanedResponse);
      console.log(typeof text);
      console.log(obj);

      setResponseData(obj);
    } catch (error) {
      setMessage("Error uploading file.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 w-[75vw]">
      <div className="grid grid-cols-2 gap-4">
        <div
          className="p-4 border-2 border-dashed rounded-lg cursor-pointer"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <p className="text-center text-gray-600 text-lg">
            Drag & drop your Resume here, or click to select a file
          </p>
          <div className="flex justify-center">
            <Upload className="text-white w-20 h-20" />
          </div>

          <div className="mt-4">
            {file && (
              <Card
                key={file.name}
                className="mb-2 p-2 flex justify-between items-center"
              >
                <CardContent className="flex items-center">
                  <span className="text-sm text-gray-800">{file.name}</span>
                </CardContent>
                <Button variant="ghost" size="icon" onClick={removeFile}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </Card>
            )}
          </div>
        </div>

        <div>
          <Textarea
            placeholder="Enter Job Description here..."
            value={text}
            onChange={handleTextChange}
            className="h-40 text-white bg-[#31363F] border-none"
          />
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        className="mt-4 bg-slate-900 text-slate-400 rounded-xl hover:bg-[#464ed8] hover:text-black"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Submit"}
      </Button>
      {message && <p className="mt-2  text-gray-700">{message}</p>}
      {responseData && (
        <div className="mt-4 p-2 border-none  rounded-xl w-[70vw] flex-row justify-center mx-3">

          <div>
            
            <Card className="text-center mb-3 bg-[#76ABAE]">
              <RadialCharts fillPercentage={responseData.MatchScore} />
            </Card>

            <Card className="mb-3 ">
              <CardHeader>
                <div className="text-2xl font-semibold">Missing Skills:</div>
                <hr />
              </CardHeader>
              <CardContent className="grid gap-3 text-justify mx-10">
                {responseData.MissingSkills.map((Skill) => {
                  return <li>{Skill}</li>;
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="text-2xl font-semibold">Suggestions :</div>
                <hr />
              </CardHeader>

              <CardContent className="grid gap-3 text-justify mx-10">
                {responseData.Suggestions.map((suggestion) => {
                  return <li>{suggestion}</li>;
                })}
              </CardContent>
            </Card>


          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
