import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:8000/api/user';

const OTPVerification = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const email = localStorage.getItem('pendingEmail');
  const name = localStorage.getItem('pendingName');
  const requestId = localStorage.getItem('requestId');

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, otp })
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'OTP verification failed');
      }

      // ✅ Cleanup temporary storage
      localStorage.removeItem('requestId');
      localStorage.removeItem('pendingEmail');
      localStorage.removeItem('pendingName');

      // Redirect to login after successful verification
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-police-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-white text-center mb-4">
          Verify OTP
        </h2>
        <p className="text-slate-400 text-center mb-6">
          An OTP has been sent to <span className="font-medium">{email}</span>
        </p>

        {error && (
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            maxLength="6"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-slate-100 focus:ring-1 focus:ring-police-blue"
          />

          <button
            type="submit"
            className="w-full bg-police-blue text-white py-2 rounded-lg hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
