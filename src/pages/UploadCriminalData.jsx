import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { 
  Upload, 
  User, 
  Car, 
  Image as ImageIcon, 
  CheckCircle,
  X,
  AlertCircle
} from 'lucide-react';

const UploadCriminalData = () => {
  const [faceData, setFaceData] = useState({
    image: null,
    name: '',
    description: '',
    preview: null
  });

  const [plateData, setPlateData] = useState({
    image: null,
    plateNumber: '',
    description: '',
    preview: null
  });

  const [faceSuccess, setFaceSuccess] = useState(false);
  const [plateSuccess, setPlateSuccess] = useState(false);

  const handleFaceImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFaceData(prev => ({
          ...prev,
          image: file,
          preview: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePlateImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPlateData(prev => ({
          ...prev,
          image: file,
          preview: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFaceInputChange = (e) => {
    const { name, value } = e.target;
    setFaceData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlateInputChange = (e) => {
    const { name, value } = e.target;
    setPlateData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFaceSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setFaceSuccess(true);
      setFaceData({
        image: null,
        name: '',
        description: '',
        preview: null
      });
      // Reset success message after 3 seconds
      setTimeout(() => setFaceSuccess(false), 3000);
    }, 1000);
  };

  const handlePlateSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setPlateSuccess(true);
      setPlateData({
        image: null,
        plateNumber: '',
        description: '',
        preview: null
      });
      // Reset success message after 3 seconds
      setTimeout(() => setPlateSuccess(false), 3000);
    }, 1000);
  };

  const clearFaceImage = () => {
    setFaceData(prev => ({
      ...prev,
      image: null,
      preview: null
    }));
  };

  const clearPlateImage = () => {
    setPlateData(prev => ({
      ...prev,
      image: null,
      preview: null
    }));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-police-navy to-police-blue rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Upload Criminal Data</h1>
        <p className="text-blue-100">Upload criminal faces and vehicle number plates for database storage and analysis</p>
      </div>

      {/* Upload Criminal Faces Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="w-6 h-6 mr-3 text-police-blue" />
            Upload Criminal Faces
          </CardTitle>
        </CardHeader>
        <CardContent>
          {faceSuccess && (
            <div className="mb-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg flex items-center">
              <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
              <span className="text-green-400">Criminal face data uploaded successfully!</span>
            </div>
          )}
          
          <form onSubmit={handleFaceSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Image Upload */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-200">
                  Criminal Face Image
                </label>
                <div className="relative border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-police-blue transition-colors">
                  {faceData.preview ? (
                    <div className="relative">
                      <img 
                        src={faceData.preview} 
                        alt="Criminal face preview" 
                        className="mx-auto max-h-48 rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={clearFaceImage}
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-400 mb-2">Click to upload or drag and drop</p>
                      <p className="text-sm text-slate-500">PNG, JPG, JPEG up to 10MB</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFaceImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <Input
                  label="Criminal Name"
                  name="name"
                  type="text"
                  placeholder="Enter criminal's full name"
                  value={faceData.name}
                  onChange={handleFaceInputChange}
                  required
                />
                
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    placeholder="Enter additional details about the criminal"
                    value={faceData.description}
                    onChange={handleFaceInputChange}
                    rows={4}
                    className="flex w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:border-police-blue focus:outline-none focus:ring-1 focus:ring-police-blue disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={!faceData.image || !faceData.name}
                className="flex items-center"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Face Data
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Upload Vehicle Number Plates Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Car className="w-6 h-6 mr-3 text-police-blue" />
            Upload Vehicle Number Plates
          </CardTitle>
        </CardHeader>
        <CardContent>
          {plateSuccess && (
            <div className="mb-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg flex items-center">
              <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
              <span className="text-green-400">Vehicle number plate data uploaded successfully!</span>
            </div>
          )}
          
          <form onSubmit={handlePlateSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Image Upload */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-200">
                  Number Plate Image
                </label>
                <div className="relative border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-police-blue transition-colors">
                  {plateData.preview ? (
                    <div className="relative">
                      <img 
                        src={plateData.preview} 
                        alt="Number plate preview" 
                        className="mx-auto max-h-48 rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={clearPlateImage}
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-400 mb-2">Click to upload or drag and drop</p>
                      <p className="text-sm text-slate-500">PNG, JPG, JPEG up to 10MB</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePlateImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <Input
                  label="Plate Number"
                  name="plateNumber"
                  type="text"
                  placeholder="Enter vehicle number plate"
                  value={plateData.plateNumber}
                  onChange={handlePlateInputChange}
                  required
                />
                
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    placeholder="Enter additional details about the vehicle"
                    value={plateData.description}
                    onChange={handlePlateInputChange}
                    rows={4}
                    className="flex w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:border-police-blue focus:outline-none focus:ring-1 focus:ring-police-blue disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={!plateData.image || !plateData.plateNumber}
                className="flex items-center"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Plate Data
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="w-6 h-6 mr-3 text-yellow-400" />
            Important Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-slate-300">
            <p>• All uploaded images are automatically processed for quality enhancement and analysis</p>
            <p>• Criminal face data is encrypted and stored securely in the police database</p>
            <p>• Vehicle number plates are cross-referenced with existing records for matches</p>
            <p>• Uploaded data is immediately available for case analysis and investigation</p>
            <p>• All uploads are logged with timestamp and investigator information for audit purposes</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadCriminalData;