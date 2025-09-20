import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import DemoCredentials from '../components/DemoCredentials';
import { Shield, UserPlus, LogIn } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation - in real app, this would be API call
      if (formData.email === 'admin@goapolice.gov.in' && formData.password === 'admin123') {
        // Save to localStorage
        localStorage.setItem('caseData', JSON.stringify({
          caseId: 'CASE-2024-001',
          investigatorName: 'Admin User',
          loginTime: new Date().toISOString()
        }));
        
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
            <CardTitle className="text-center flex items-center justify-center">
              <LogIn className="w-5 h-5 mr-2" />
              Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
                  {error}
                </div>
              )}
              
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              
              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-slate-400 text-sm">
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  className="text-police-blue hover:text-blue-400 font-medium transition-colors"
                >
                  Register here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* <DemoCredentials /> */}
        
        <div className="text-center mt-6 text-sm text-slate-400">
          <p>Secure • Confidential • Authorized Access Only</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
