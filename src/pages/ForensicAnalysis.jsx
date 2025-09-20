import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { 
  Upload, 
  Search, 
  FileImage, 
  FileVideo, 
  MapPin, 
  Clock, 
  Smartphone, 
  Camera,
  AlertTriangle,
  CheckCircle,
  Download
} from 'lucide-react';

const ForensicAnalysis = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // ✅ Fetch real backend forensic data (optional for now, can use mockFiles)
  // useEffect(() => {
  //   fetch("http://localhost:8000/forensic-data")
  //     .then(res => res.json())
  //     .then(data => setUploadedFiles(data))
  //     .catch(err => console.error(err));
  // }, []);

  const mockFiles = [
    {
      id: 1,
      name: 'evidence_photo_001.jpg',
      type: 'image',
      size: '2.4 MB',
      sha256: 'a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
      device: 'iPhone 13 Pro',
      gps: '15.4909° N, 73.8278° E',
      timestamp: '2024-01-15 14:30:25',
      tampered: false,
      metadata: {
        camera: 'iPhone 13 Pro',
        lens: '26mm f/1.5',
        iso: '100',
        exposure: '1/60s',
        aperture: 'f/1.5'
      }
    }
  ];

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map((file, index) => ({
      id: uploadedFiles.length + index + 1,
      name: file.name,
      type: file.type.startsWith('image/') ? 'image' : 'video',
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      sha256: 'Processing...',
      device: 'Unknown',
      gps: 'Not available',
      timestamp: new Date().toLocaleString(),
      tampered: false,
      metadata: {}
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const filteredFiles = [...mockFiles, ...uploadedFiles].filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || file.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getFileIcon = (type) => {
    return type === 'image' ? <FileImage className="w-5 h-5" /> : <FileVideo className="w-5 h-5" />;
  };

  const getTamperBadge = (tampered) => {
    return tampered ? (
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
  };

  // ✅ Generate Report - Calls FastAPI backend
  const handleGenerateReport = async () => {
    try {
      const response = await fetch("http://localhost:8000/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ files: filteredFiles }),
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
        <h1 className="text-3xl font-bold text-white mb-2">Forensic Media Analysis</h1>
        <p className="text-slate-400">Analyze metadata, detect tampering, and verify authenticity of media files</p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Media Files</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <div className="space-y-2">
              <p className="text-lg font-medium text-white">Upload photos and videos for analysis</p>
              <p className="text-slate-400">Supports JPG, PNG, MP4, AVI, MOV formats</p>
              <input
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="media-upload"
              />
              <label htmlFor="media-upload">
                <Button as="span" variant="outline">
                  Choose Files
                </Button>
              </label>
            </div>
          </div>
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
                variant={filterType === 'all' ? 'primary' : 'outline'}
                onClick={() => setFilterType('all')}
                size="sm"
              >
                All Files
              </Button>
              <Button
                variant={filterType === 'image' ? 'primary' : 'outline'}
                onClick={() => setFilterType('image')}
                size="sm"
              >
                <FileImage className="w-4 h-4 mr-2" />
                Images
              </Button>
              <Button
                variant={filterType === 'video' ? 'primary' : 'outline'}
                onClick={() => setFilterType('video')}
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
                    <h3 className="font-medium text-white truncate">{file.name}</h3>
                    <p className="text-sm text-slate-400">{file.size}</p>
                  </div>
                </div>
                {getTamperBadge(file.tampered)}
              </div>

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

                <div className="pt-3 border-t border-slate-700">
                  <p className="text-xs text-slate-400 mb-2">SHA256 Hash:</p>
                  <p className="font-mono text-xs text-slate-300 break-all">{file.sha256}</p>
                </div>

                {Object.keys(file.metadata).length > 0 && (
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
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats + Generate Report */}
      <Card>
        <CardHeader>
          <CardTitle>Analysis Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{filteredFiles.length}</div>
              <div className="text-sm text-slate-400">Total Files</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {filteredFiles.filter(f => !f.tampered).length}
              </div>
              <div className="text-sm text-slate-400">Authentic</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">
                {filteredFiles.filter(f => f.tampered).length}
              </div>
              <div className="text-sm text-slate-400">Tampered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-police-blue">
                {filteredFiles.filter(f => f.type === 'video').length}
              </div>
              <div className="text-sm text-slate-400">Videos</div>
            </div>
          </div>

          {/* ✅ Report Button */}
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
