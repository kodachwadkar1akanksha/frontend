import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { 
  Shield, 
  Video, 
  FileCheck, 
  FileText, 
  Upload, 
  Brain, 
  ShieldCheck,
  Users,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: Video,
      title: 'CCTV Analysis',
      description: 'Detect people/vehicles, timestamps, and match offenders using advanced AI algorithms for comprehensive surveillance analysis.',
      highlights: ['Person Detection', 'Vehicle Recognition', 'Timestamp Analysis', 'Offender Matching']
    },
    {
      icon: FileCheck,
      title: 'Forensic Media Analysis',
      description: 'Extract metadata, detect tampering, and gather GPS/device information from digital evidence with forensic-grade accuracy.',
      highlights: ['Metadata Extraction', 'Tampering Detection', 'GPS Analysis', 'Device Fingerprinting']
    },
    {
      icon: FileText,
      title: 'Dashboard & Reporting',
      description: 'Search evidence, create timelines, and generate tamper-proof reports with comprehensive case management tools.',
      highlights: ['Evidence Search', 'Timeline Creation', 'Tamper-Proof Reports', 'Case Management']
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Upload Evidence',
      description: 'Securely upload CCTV footage, images, and digital evidence files to the system.',
      icon: Upload
    },
    {
      number: '02',
      title: 'AI Analysis',
      description: 'Our advanced AI algorithms process and analyze the evidence for patterns and insights.',
      icon: Brain
    },
    {
      number: '03',
      title: 'Tamper-Proof Report',
      description: 'Generate comprehensive, legally admissible reports with complete audit trails.',
      icon: ShieldCheck
    }
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Lead Forensic Analyst',
      avatar: 'SJ'
    },
    {
      name: 'Inspector Rajesh Kumar',
      role: 'Senior Investigation Officer',
      avatar: 'RK'
    },
    {
      name: 'Dr. Priya Sharma',
      role: 'AI Research Specialist',
      avatar: 'PS'
    },
    {
      name: 'Constable Michael Chen',
      role: 'Digital Evidence Coordinator',
      avatar: 'MC'
    }
  ];

  return (
    <div className="min-h-screen bg-police-dark">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-police-navy via-police-blue to-police-navy">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            {/* Logo */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-8">
              <Shield className="w-10 h-10 text-white" />
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Goa Police Evidence Analysis System
            </h1>
            
            {/* Tagline */}
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto">
              AI-powered forensic analysis for faster, tamper-proof investigations
            </p>
            
             {/* CTA Buttons */}
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Link to="/login">
                 <Button size="xl" className="w-full sm:w-auto bg-white text-police-navy hover:bg-gray-100">
                   Login
                   <ArrowRight className="w-5 h-5 ml-2" />
                 </Button>
               </Link>
               <Link to="/register">
                 <Button variant="outline" size="xl" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-police-navy">
                   Register
                 </Button>
               </Link>
             </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Advanced Forensic Capabilities
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Comprehensive tools designed specifically for law enforcement to process, analyze, and report on digital evidence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-police-blue/10 rounded-full mb-4">
                    <feature.icon className="w-8 h-8 text-police-blue" />
                  </div>
                  <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 mb-6">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center text-sm text-slate-400">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-police-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Simple, secure, and efficient workflow for processing digital evidence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-police-blue to-police-navy rounded-full mb-4">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-police-blue rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">{step.number}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
                <p className="text-slate-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
{/* 
      Team Section
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Expert Team
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Dedicated professionals with extensive experience in forensic analysis and law enforcement
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-police-blue rounded-full mb-4">
                    <span className="text-lg font-bold text-white">{member.avatar}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{member.name}</h3>
                  <p className="text-slate-400 text-sm">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

       {/* Footer */}
       <footer className="bg-police-navy py-8">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center">
             <div className="flex items-center justify-center mb-4">
               <Shield className="w-6 h-6 text-police-blue mr-2" />
               <span className="text-lg font-bold text-white">Goa Police Evidence Analysis System</span>
             </div>
             <p className="text-slate-300 text-base mb-2">
               Built for Goa Police Hackathon 2025
             </p>
             <p className="text-slate-400 text-sm">
               Secure • Reliable • Advanced AI-Powered Forensic Analysis
             </p>
           </div>
         </div>
       </footer>
    </div>
  );
};

export default LandingPage;
