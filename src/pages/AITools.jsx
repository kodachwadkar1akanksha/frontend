import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import {
  Video,
  Camera,
  Upload,
  Play,
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
} from "lucide-react";

const AITools = () => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const tools = [
    {
      id: "face-detection",
      name: "Face Detection",
      description: "Detect and analyze faces in video footage and images",
      icon: Camera,
      color: "bg-blue-600",
      supportedFormats: ["MP4", "JPG", "PNG"],
    },
    {
      id: "number-plate",
      name: "Number Plate Detection",
      description: "Extract and analyze vehicle number plates from traffic cameras",
      icon: Video,
      color: "bg-green-600",
      supportedFormats: ["MP4", "JPG", "PNG"],
    },
  ];

  const mockResults = [
    {
      id: 1,
      type: "Person",
      timestamp: "00:02:15",
      confidence: 94.5,
      alert: "high",
      details: "Male, 25-30 years, wearing blue shirt",
    },
    {
      id: 2,
      type: "Person",
      timestamp: "00:05:42",
      confidence: 87.2,
      alert: "medium",
      details: "Female, 20-25 years, wearing white dress",
    },
    {
      id: 3,
      type: "Vehicle",
      timestamp: "00:08:33",
      confidence: 96.8,
      alert: "high",
      details: "White sedan, License: MH-01-AB-1234",
    },
    {
      id: 4,
      type: "Person",
      timestamp: "00:12:18",
      confidence: 91.3,
      alert: "medium",
      details: "Male, 35-40 years, wearing black jacket",
    },
  ];

  // ✅ Select file
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file || null);
  };

  // ✅ Upload selected file
  const handleUpload = async () => {
    if (!selectedFile || !selectedTool) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("camera_id", selectedTool);

    const endpoint = "http://localhost:8000/api/user/upload/server";

    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No access token found");

      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();

      const newFile = {
        id: data.image?.id || data.video?.id || Date.now(),
        name: selectedFile.name,
        type: selectedFile.type.startsWith("image/") ? "image" : "video",
        size: (selectedFile.size / (1024 * 1024)).toFixed(1) + " MB",
        sha256: data.image?.sha256 || data.video?.sha256,
        timestamp: new Date(
          data.image?.ingest_time || data.video?.ingest_time || Date.now()
        ).toLocaleString(),
        url: data.secure_url,
      };

      setUploadedFiles((prev) => [...prev, newFile]);
      setSelectedFile(null);

      // ✅ simulate AI results after upload
      setIsProcessing(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setResults(mockResults);
      setIsProcessing(false);
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const getAlertIcon = (alert) => {
    switch (alert) {
      case "high":
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      case "medium":
        return <Clock className="w-4 h-4 text-yellow-400" />;
      default:
        return <CheckCircle className="w-4 h-4 text-green-400" />;
    }
  };

  const getAlertBadge = (alert) => {
    switch (alert) {
      case "high":
        return <Badge variant="danger">High Priority</Badge>;
      case "medium":
        return <Badge variant="warning">Medium</Badge>;
      default:
        return <Badge variant="success">Low</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          AI Evidence Analysis Tools
        </h1>
        <p className="text-slate-400">
          Advanced AI-powered analysis for CCTV footage and forensic evidence
        </p>
      </div>

      {/* Tool Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => (
          <Card
            key={tool.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-xl ${
              selectedTool === tool.id ? "ring-2 ring-police-blue" : ""
            }`}
            onClick={() => setSelectedTool(tool.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${tool.color}`}>
                  <tool.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-slate-400 mb-3">{tool.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {tool.supportedFormats.map((format) => (
                      <Badge key={format} variant="outline" className="text-xs">
                        {format}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* File Upload Section */}
      {selectedTool && (
        <Card>
          <CardHeader>
            <CardTitle>Upload Evidence File</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-police-blue transition-colors cursor-pointer"
              onClick={() => document.getElementById("file-upload").click()}
            >
              <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <div className="space-y-2">
                <p className="text-lg font-medium text-white">
                  Upload your evidence file
                </p>
                <p className="text-slate-400">
                  Drag and drop or click to browse
                </p>
                <input
                  type="file"
                  accept="video/*,image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
              </div>
            </div>

            {/* Selected File */}
            {selectedFile && (
              <div className="bg-slate-800 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Play className="w-5 h-5 text-police-blue" />
                  <div className="flex-1">
                    <p className="font-medium text-white">{selectedFile.name}</p>
                    <p className="text-sm text-slate-400">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    onClick={handleUpload}
                    disabled={isProcessing}
                    className="bg-police-blue hover:bg-blue-600"
                  >
                    {isProcessing ? "Processing..." : "Upload & Analyze"}
                  </Button>
                </div>
              </div>
            )}

            {/* Progress Bar */}
            {isProcessing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-slate-400">
                  <span>Processing evidence...</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-police-blue h-2 rounded-full animate-pulse"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Results Section */}
      {results.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Analysis Results</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Results
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Alert</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {result.type === "Person" ? (
                          <Camera className="w-4 h-4 text-blue-400" />
                        ) : (
                          <Video className="w-4 h-4 text-green-400" />
                        )}
                        <span>{result.type}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono">{result.timestamp}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-slate-700 rounded-full h-2">
                          <div
                            className="bg-police-blue h-2 rounded-full"
                            style={{ width: `${result.confidence}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">{result.confidence}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getAlertIcon(result.alert)}
                        {getAlertBadge(result.alert)}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {result.details}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Timeline Visualization */}
      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Detection Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="flex items-center space-x-4 overflow-x-auto pb-4">
                {results.map((result) => (
                  <div
                    key={result.id}
                    className="flex flex-col items-center space-y-2 min-w-0"
                  >
                    <div
                      className={`w-4 h-4 rounded-full ${
                        result.alert === "high"
                          ? "bg-red-400"
                          : result.alert === "medium"
                          ? "bg-yellow-400"
                          : "bg-green-400"
                      }`}
                    ></div>
                    <div className="text-xs text-slate-400 text-center">
                      <div className="font-mono">{result.timestamp}</div>
                      <div className="truncate max-w-20">{result.type}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute top-2 left-0 right-0 h-0.5 bg-slate-600 -z-10"></div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AITools;
