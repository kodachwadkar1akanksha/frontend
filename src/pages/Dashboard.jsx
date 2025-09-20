import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import           Button  from '../components/ui/Button';
import { 
  Video, 
  FileCheck, 
  FileText, 
  TrendingUp, 
  Clock, 
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const Dashboard = () => {
  const caseData = JSON.parse(localStorage.getItem('caseData') || '{}');
  
  const stats = [
    { name: 'Total Evidence Files', value: '24', icon: FileCheck, change: '+12%', changeType: 'positive' },
    { name: 'CCTV Analysis', value: '8', icon: Video, change: '+3', changeType: 'positive' },
    { name: 'Reports Generated', value: '5', icon: FileText, change: '+2', changeType: 'positive' },
    { name: 'Alerts', value: '3', icon: AlertTriangle, change: '-1', changeType: 'negative' },
  ];

  const recentActivity = [
    { id: 1, action: 'Face detection completed', file: 'cctv_cam1_2024.mp4', time: '2 minutes ago', status: 'success' },
    { id: 2, action: 'Number plate analysis', file: 'traffic_cam_entrance.jpg', time: '15 minutes ago', status: 'success' },
    { id: 3, action: 'Forensic analysis started', file: 'evidence_photo_001.jpg', time: '1 hour ago', status: 'processing' },
    { id: 4, action: 'Report generated', file: 'Case_Report_2024.pdf', time: '2 hours ago', status: 'success' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-police-navy to-police-blue rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {caseData.investigatorName}</h1>
        <p className="text-blue-100">Case ID: {caseData.caseId} • Last updated: {new Date().toLocaleString()}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="w-8 h-8 text-police-blue" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-slate-400">{stat.name}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className={`text-sm ${
                    stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stat.change} from last week
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link to="/ai-tools">
              <Button className="w-full justify-start" variant="outline">
                <Video className="w-5 h-5 mr-3" />
                Start CCTV Analysis
              </Button>
            </Link>
            <Link to="/forensic">
              <Button className="w-full justify-start" variant="outline">
                <FileCheck className="w-5 h-5 mr-3" />
                Forensic Media Analysis
              </Button>
            </Link>
            <Link to="/reports">
              <Button className="w-full justify-start" variant="outline">
                <FileText className="w-5 h-5 mr-3" />
                Generate Report
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {activity.status === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <Clock className="w-5 h-5 text-yellow-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{activity.action}</p>
                    <p className="text-sm text-slate-400">{activity.file}</p>
                    <p className="text-xs text-slate-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm text-slate-300">AI Processing Engine</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm text-slate-300">Database Connection</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span className="text-sm text-slate-300">File Storage (85% full)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
