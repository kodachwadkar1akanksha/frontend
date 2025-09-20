import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import  Badge  from '../components/ui/Badge';
import { Info, Mail, Key, Shield } from 'lucide-react';

const DemoCredentials = () => {
  return (
    <Card className="mt-6 bg-slate-800/50 border-slate-600">
      <CardHeader>
        <CardTitle className="flex items-center text-sm">
          <Info className="w-4 h-4 mr-2 text-blue-400" />
          Demo Credentials
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-300">Login Email:</span>
            <Badge variant="outline" className="font-mono text-xs">
              admin@goapolice.gov.in
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Key className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-300">Password:</span>
            <Badge variant="outline" className="font-mono text-xs">
              admin123
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-300">OTP Code:</span>
            <Badge variant="outline" className="font-mono text-xs">
              123456
            </Badge>
          </div>
        </div>
        <div className="pt-2 border-t border-slate-700">
          <p className="text-xs text-slate-500">
            Use these credentials to test the authentication flow
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DemoCredentials;
