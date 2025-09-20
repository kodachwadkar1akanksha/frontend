import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Shield, UserPlus, ArrowLeft, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock registration - in real app, this would be API call
      // For demo, we'll just navigate to OTP page
      navigate('/otp-verification', { 
        state: { 
          email: formData.email,
          name: formData.name 
        } 
      });
    } catch (err) {
      setError('Registration failed. Please try again.');
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

        {/* Register Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center">
              <UserPlus className="w-5 h-5 mr-2" />
              Create Account
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
                label="Full Name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              
              <Input
                label="Email Address"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-200">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 pr-10 text-sm text-slate-100 placeholder:text-slate-400 focus:border-police-blue focus:outline-none focus:ring-1 focus:ring-police-blue disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-200">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 pr-10 text-sm text-slate-100 placeholder:text-slate-400 focus:border-police-blue focus:outline-none focus:ring-1 focus:ring-police-blue disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-slate-400 text-sm">
                Already have an account?{' '}
                <Link 
                  to="/" 
                  className="text-police-blue hover:text-blue-400 font-medium transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
            
            <div className="mt-4">
              <Link 
                to="/" 
                className="inline-flex items-center text-slate-400 hover:text-slate-300 text-sm transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center mt-6 text-sm text-slate-400">
          <p>Secure • Confidential • Authorized Access Only</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
