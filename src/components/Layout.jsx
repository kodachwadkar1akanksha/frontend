import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Video, 
  FileCheck, 
  FileText, 
  Upload,
  LogOut, 
  Menu,
  X,
  Shield
} from 'lucide-react';
import Button from './ui/Button';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const caseData = JSON.parse(localStorage.getItem('caseData') || '{}');

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'CCTV Analysis', href: '/ai-tools', icon: Video },
    { name: 'Forensic Media Analysis', href: '/forensic', icon: FileCheck },
    { name: 'Upload Criminal Data', href: '/upload-criminal-data', icon: Upload },
    { name: 'Reports', href: '/reports', icon: FileText },
  ];

  const handleLogout = () => {
    localStorage.removeItem('caseData');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-police-dark">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-64 bg-slate-900">
          <div className="flex items-center justify-between h-16 px-4 border-b border-slate-700">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-police-blue" />
              <span className="ml-2 text-lg font-semibold text-white">Goa Police</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          <nav className="mt-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-police-blue text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-slate-900 border-r border-slate-700">
          <div className="flex items-center h-16 px-4 border-b border-slate-700">
            <Shield className="w-8 h-8 text-police-blue" />
            <span className="ml-2 text-lg font-semibold text-white">Goa Police</span>
          </div>
          <nav className="flex-1 mt-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-police-blue text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navbar */}
        <div className="sticky top-0 z-40 bg-slate-800 border-b border-slate-700">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="ml-4">
                <p className="text-sm text-slate-300">Case ID: <span className="font-medium text-white">{caseData.caseId || 'N/A'}</span></p>
                <p className="text-xs text-slate-400">Investigator: {caseData.investigatorName || 'N/A'}</p>
              </div>
            </div>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
