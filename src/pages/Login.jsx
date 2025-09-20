import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import  Input  from '../components/ui/Input';
import  {Shield}  from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    caseId: '',
    investigatorName: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Save to localStorage
    localStorage.setItem('caseData', JSON.stringify({
      caseId: formData.caseId,
      investigatorName: formData.investigatorName,
      loginTime: new Date().toISOString()
    }));
    
    setIsLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-police-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-police-blue rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Goa Police</h1>
          <p className="text-slate-400 mt-2">Evidence Analysis System</p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Login </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email"
                name="email"
                type="text"
                placeholder="Enter Email"
                value={formData.caseId}
                onChange={handleInputChange}
                required
              />
              
              <Input
                label="Password"
                name="password"
                type="string"
                placeholder="Enter Password"
                value={formData.investigatorName}
                onChange={handleInputChange}
                required
              />
              
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Starting Case...' : 'Login'}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="text-center mt-6 text-sm text-slate-400">
          <p>Secure • Confidential • Authorized Access Only</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
