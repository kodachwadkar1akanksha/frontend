import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Badge from "../components/ui/Badge";
import {
  Upload,
  FileImage,
  FileVideo,
  MapPin,
  Clock,
  Smartphone,
  AlertTriangle,
  CheckCircle,
  Download,
} from "lucide-react";
import Cookies from "js-cookie";

const ForensicAnalysis = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null); // ✅ single file only



  // ✅ Fetch files stored in backend/DB
  // useEffect(() => {
  //   const fetchFiles = async () => {
  //     try {
  //       const token = localStorage.getItem("access_token");
  //       if (!token) throw new Error("No access token found");

  //       const res = await fetch("http://localhost:8000/api/user/forensic-data", {
  //         headers: { Authorization: `Bearer ${token}` },
  //         credentials: "include",
  //       });
  //       if (!res.ok) throw new Error("Failed to fetch forensic data");
  //       const data = await res.json();
  //       setUploadedFiles(data);
  //     } catch (err) {
  //       console.error("Fetch error:", err);
  //     }
  //   };

  //   fetchFiles();
  // }, []);

  // ✅ Select a single file
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file || null);
  };

  // ✅ Upload selected file
  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("camera_id", "frontend_upload");

    const endpoint = "http://localhost:8000/api/user/upload/server";

    try {
      const token = localStorage.getItem("access_token");
      console.log(token);
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
        device: "Unknown",
        gps: "Not available",
        timestamp: new Date(
          data.image?.ingest_time || data.video?.ingest_time || Date.now()
        ).toLocaleString(),
        tampered: false,
        metadata: {},
        url: data.secure_url,
      };

      setUploadedFiles((prev) => [...prev, newFile]);
      setSelectedFile(null); // ✅ reset
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  // ✅ Filter logic
  const filteredFiles = uploadedFiles.filter((file) => {
    const matchesSearch = file.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || file.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getFileIcon = (type) =>
    type === "image" ? <FileImage className="w-5 h-5" /> : <FileVideo className="w-5 h-5" />;

  const getTamperBadge = (tampered) =>
    tampered ? (
      <Badge variant="danger" className="flex items-center space-x-1">
        <AlertTriangle className="w-3 h-3" />
        <span>Tampered</span>
      </Badge>
    ) : (
      <Badge variant="success" className="flex items-center space-x-1">
        <CheckCircle className="w-3 h-3" />
        <span>Authentic</span>
      </Badge>
    );

  // ✅ Generate PDF Report
  const handleGenerateReport = async () => {
    try {
      const token = Cookies.get("access_token");
      if (!token) throw new Error("No access token found");

      const response = await fetch("http://localhost:8000/api/report/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ files: filteredFiles }),
        // credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to generate report");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "forensic_report.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Forensic Media Analysis
        </h1>
        <p className="text-slate-400">
          Analyze metadata, detect tampering, and verify authenticity of media files
        </p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Select Media File</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-police-blue transition-colors cursor-pointer"
            onClick={() => document.getElementById("media-upload").click()}
          >
            <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <div className="space-y-2">
              <p className="text-lg font-medium text-white">
                Choose a photo or video for upload
              </p>
              <p className="text-slate-400">Supports JPG, PNG, MP4, AVI, MOV</p>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileSelect}
                className="hidden"
                id="media-upload"
              />
            </div>
          </div>

          {/* Show selected file */}
          {selectedFile && (
            <div className="mt-4">
              <h3 className="text-white font-medium mb-2">File Selected:</h3>
              <p className="text-slate-300 text-sm mb-3">
                {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(1)} MB)
              </p>
              <Button variant="primary" onClick={handleUpload}>
                Upload File
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by filename..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex space-x-2">
              <Button
                variant={filterType === "all" ? "primary" : "outline"}
                onClick={() => setFilterType("all")}
                size="sm"
              >
                All Files
              </Button>
              <Button
                variant={filterType === "image" ? "primary" : "outline"}
                onClick={() => setFilterType("image")}
                size="sm"
              >
                <FileImage className="w-4 h-4 mr-2" />
                Images
              </Button>
              <Button
                variant={filterType === "video" ? "primary" : "outline"}
                onClick={() => setFilterType("video")}
                size="sm"
              >
                <FileVideo className="w-4 h-4 mr-2" />
                Videos
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Files Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFiles.map((file) => (
          <Card key={file.id} className="hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-slate-700 rounded-lg">
                    {getFileIcon(file.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white truncate">
                      {file.name}
                    </h3>
                    <p className="text-sm text-slate-400">{file.size}</p>
                  </div>
                </div>
                {getTamperBadge(file.tampered)}
              </div>

              {/* File Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Smartphone className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">{file.device}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">{file.gps}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">{file.timestamp}</span>
                </div>

                {/* SHA256 */}
                <div className="pt-3 border-t border-slate-700">
                  <p className="text-xs text-slate-400 mb-2">SHA256 Hash:</p>
                  <p className="font-mono text-xs text-slate-300 break-all">
                    {file.sha256}
                  </p>
                </div>

                {/* Metadata */}
                {Object.keys(file.metadata || {}).length > 0 && (
                  <div className="pt-3 border-t border-slate-700">
                    <p className="text-xs text-slate-400 mb-2">Metadata:</p>
                    <div className="space-y-1">
                      {Object.entries(file.metadata).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-xs">
                          <span className="text-slate-400 capitalize">{key}:</span>
                          <span className="text-slate-300">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ✅ Preview Media */}
                {file.url && (
                  <div className="pt-3 border-t border-slate-700">
                    {file.type === "image" ? (
                      <img
                        src={file.url}
                        alt={file.name}
                        className="rounded-lg max-h-48 object-cover"
                      />
                    ) : (
                      <video
                        controls
                        className="rounded-lg max-h-48 w-full mt-2"
                      >
                        <source src={file.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary + Report */}
      <Card>
        <CardHeader>
          <CardTitle>Analysis Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {filteredFiles.length}
              </div>
              <div className="text-sm text-slate-400">Total Files</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {filteredFiles.filter((f) => !f.tampered).length}
              </div>
              <div className="text-sm text-slate-400">Authentic</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">
                {filteredFiles.filter((f) => f.tampered).length}
              </div>
              <div className="text-sm text-slate-400">Tampered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-police-blue">
                {filteredFiles.filter((f) => f.type === "video").length}
              </div>
              <div className="text-sm text-slate-400">Videos</div>
            </div>
          </div>

          {/* Generate Report */}
          <Button variant="primary" size="sm" onClick={handleGenerateReport}>
            <Download className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForensicAnalysis;
