import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { 
  FileText, 
  Download, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  Shield,
  Hash,
  Calendar,
  User,
  Camera,
  Video
} from 'lucide-react';

const Reports = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [reportData, setReportData] = useState(null);

  const caseData = JSON.parse(localStorage.getItem('caseData') || '{}');

  const mockReportData = {
    caseId: caseData.caseId || 'CASE-2024-001',
    investigator: caseData.investigatorName || 'John Doe',
    generatedAt: new Date().toISOString(),
    summary: {
      totalEvidence: 24,
      tamperedFiles: 3,
      faceDetections: 8,
      vehicleDetections: 5,
      alerts: 12
    },
    evidence: [
      {
        id: 1,
        type: 'image',
        name: 'evidence_photo_001.jpg',
        timestamp: '2024-01-15 14:30:25',
        location: '15.4909° N, 73.8278° E',
        tampered: false,
        analysis: 'Face detected: Male, 25-30 years, confidence: 94.5%'
      },
      {
        id: 2,
        type: 'video',
        name: 'cctv_footage_entrance.mp4',
        timestamp: '2024-01-15 14:25:10',
        location: '15.4910° N, 73.8279° E',
        tampered: true,
        analysis: 'Vehicle detected: White sedan, License: MH-01-AB-1234, confidence: 96.8%'
      },
      {
        id: 3,
        type: 'image',
        name: 'witness_photo_002.png',
        timestamp: '2024-01-15 14:35:42',
        location: '15.4908° N, 73.8277° E',
        tampered: false,
        analysis: 'Face detected: Female, 20-25 years, confidence: 87.2%'
      }
    ],
    timeline: [
      { time: '14:20:15', event: 'Security camera footage recorded', type: 'video' },
      { time: '14:25:10', event: 'Vehicle detected at entrance', type: 'alert' },
      { time: '14:30:25', event: 'Evidence photo captured', type: 'image' },
      { time: '14:35:42', event: 'Witness photo taken', type: 'image' }
    ],
    hash: 'a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
    integrity: true
  };

  const generateReport = async () => {
    setIsGenerating(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setReportData(mockReportData);
    setReportGenerated(true);
    setIsGenerating(false);
  };

  const downloadReport = (format) => {
    const data = reportData;
    let content, filename, mimeType;
    
    if (format === 'json') {
      content = JSON.stringify(data, null, 2);
      filename = `case_report_${data.caseId}.json`;
      mimeType = 'application/json';
    } else if (format === 'pdf') {
      // In a real app, this would generate a PDF
      content = `Case Report - ${data.caseId}\n\nInvestigator: ${data.investigator}\nGenerated: ${new Date(data.generatedAt).toLocaleString()}\n\nSummary:\n- Total Evidence: ${data.summary.totalEvidence}\n- Tampered Files: ${data.summary.tamperedFiles}\n- Face Detections: ${data.summary.faceDetections}\n- Vehicle Detections: ${data.summary.vehicleDetections}\n- Alerts: ${data.summary.alerts}\n\nHash: ${data.hash}`;
      filename = `case_report_${data.caseId}.txt`;
      mimeType = 'text/plain';
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'image':
        return <Camera className="w-4 h-4 text-blue-400" />;
      case 'video':
        return <Video className="w-4 h-4 text-green-400" />;
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default:
        return <FileText className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Case Reports</h1>
        <p className="text-slate-400">Generate comprehensive reports with evidence analysis and integrity verification</p>
      </div>

      {/* Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Case Analysis Report</h3>
                <p className="text-slate-400">Generate a comprehensive report with all evidence and analysis results</p>
              </div>
              <Button
                onClick={generateReport}
                disabled={isGenerating}
                className="bg-police-blue hover:bg-blue-600"
              >
                {isGenerating ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Report
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Preview */}
      {reportGenerated && reportData && (
        <>
          {/* Report Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Report Preview</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => downloadReport('json')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download JSON
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => downloadReport('pdf')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Case Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-police-blue" />
                  <div>
                    <p className="text-sm text-slate-400">Case ID</p>
                    <p className="font-semibold text-white">{reportData.caseId}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-police-blue" />
                  <div>
                    <p className="text-sm text-slate-400">Investigator</p>
                    <p className="font-semibold text-white">{reportData.investigator}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-police-blue" />
                  <div>
                    <p className="text-sm text-slate-400">Generated</p>
                    <p className="font-semibold text-white">
                      {new Date(reportData.generatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center p-4 bg-slate-800 rounded-lg">
                  <div className="text-2xl font-bold text-white">{reportData.summary.totalEvidence}</div>
                  <div className="text-sm text-slate-400">Total Evidence</div>
                </div>
                <div className="text-center p-4 bg-slate-800 rounded-lg">
                  <div className="text-2xl font-bold text-red-400">{reportData.summary.tamperedFiles}</div>
                  <div className="text-sm text-slate-400">Tampered Files</div>
                </div>
                <div className="text-center p-4 bg-slate-800 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">{reportData.summary.faceDetections}</div>
                  <div className="text-sm text-slate-400">Face Detections</div>
                </div>
                <div className="text-center p-4 bg-slate-800 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">{reportData.summary.vehicleDetections}</div>
                  <div className="text-sm text-slate-400">Vehicle Detections</div>
                </div>
                <div className="text-center p-4 bg-slate-800 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400">{reportData.summary.alerts}</div>
                  <div className="text-sm text-slate-400">Alerts</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Evidence List */}
          <Card>
            <CardHeader>
              <CardTitle>Evidence Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.evidence.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                    <div className="flex items-center space-x-4">
                      {getFileIcon(item.type)}
                      <div>
                        <p className="font-medium text-white">{item.name}</p>
                        <p className="text-sm text-slate-400">
                          {item.timestamp} • {item.location}
                        </p>
                        <p className="text-sm text-slate-300 mt-1">{item.analysis}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.tampered ? (
                        <Badge variant="danger">Tampered</Badge>
                      ) : (
                        <Badge variant="success">Authentic</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Event Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.timeline.map((event, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {getFileIcon(event.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-white">{event.event}</p>
                      <p className="text-sm text-slate-400">{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Integrity Verification */}
          <Card>
            <CardHeader>
              <CardTitle>Integrity Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {reportData.integrity ? (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    ) : (
                      <AlertTriangle className="w-6 h-6 text-red-400" />
                    )}
                    <div>
                      <p className="font-medium text-white">
                        {reportData.integrity ? 'Report Integrity Verified' : 'Report Integrity Failed'}
                      </p>
                      <p className="text-sm text-slate-400">
                        {reportData.integrity 
                          ? 'All evidence files have been verified and are authentic'
                          : 'Some evidence files may have been tampered with'
                        }
                      </p>
                    </div>
                  </div>
                  <Badge variant={reportData.integrity ? 'success' : 'danger'}>
                    {reportData.integrity ? 'Valid' : 'Invalid'}
                  </Badge>
                </div>
                
                <div className="p-4 bg-slate-800 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Hash className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-300">Report Hash (SHA256)</span>
                  </div>
                  <p className="font-mono text-xs text-slate-400 break-all">
                    {reportData.hash}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default Reports;
