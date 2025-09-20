import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { 
  Shield, 
  LogIn, 
  UserPlus, 
  Video, 
  FileCheck, 
  FileText,
  Upload,
  ArrowRight,
  Star,
  CheckCircle
} from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: Video,
      title: 'CCTV Analysis',
      description: 'AI-powered face and vehicle detection from surveillance footage',
      color: 'text-blue-400'
    },
    {
      icon: FileCheck,
      title: 'Forensic Analysis',
      description: 'Metadata extraction and tamper detection for digital evidence',
      color: 'text-green-400'
    },
    {
      icon: FileText,
      title: 'Report Generation',
      description: 'Automated case reports with integrity verification',
      color: 'text-purple-400'
    },
    {
      icon: Upload,
      title: 'Data Management',
      description: 'Secure upload and management of criminal evidence',
      color: 'text-orange-400'
    }
  ];

  const stats = [
    { label: 'Cases Processed', value: '1,250+' },
    { label: 'Evidence Files', value: '15,000+' },
    { label: 'Success Rate', value: '99.8%' },
    { label: 'Active Users', value: '500+' }
  ];

  return (
    <div className="min-h-screen bg-police-dark">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-police-navy via-police-dark to-slate-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-police-blue rounded-full">
                <Shield className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Goa Police
              <span className="block text-police-blue">Evidence Analysis System</span>
            </h1>
            
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Advanced AI-powered forensic analysis platform for law enforcement. 
              Process CCTV footage, analyze digital evidence, and generate comprehensive case reports.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" className="bg-police-blue hover:bg-blue-600">
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline">
                  <UserPlus className="w-5 h-5 mr-2" />
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Advanced Forensic Capabilities
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Cutting-edge technology for modern law enforcement
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800 flex items-center justify-center`}>
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-police-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Join the Goa Police Evidence Analysis System and streamline your forensic investigations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="bg-police-blue hover:bg-blue-600">
                Access Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline">
                Request Access
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-900 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-police-blue mr-3" />
              <span className="text-2xl font-bold text-white">Goa Police</span>
            </div>
            <p className="text-slate-400 mb-4">
              Evidence Analysis System
            </p>
            <p className="text-sm text-slate-500">
              Secure • Confidential • Authorized Access Only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;