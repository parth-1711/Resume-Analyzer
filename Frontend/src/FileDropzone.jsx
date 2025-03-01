import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const FileDropzone = () => {
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const removeFile = () => {
    setFile(null);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false });

  return (
    <div className="p-4 border-2 border-dashed rounded-lg cursor-pointer" {...getRootProps()}>
      <input {...getInputProps()} />
      <p className="text-center text-gray-600">Drag & drop a file here, or click to select a file</p>
      <div className="mt-4">
        {file && (
          <Card key={file.name} className="mb-2 p-2 flex justify-between items-center">
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
  );
};

export default FileDropzone;
