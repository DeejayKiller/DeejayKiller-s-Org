import React, { useState, useContext } from 'react';
import { AppContext } from '../../types';
import ForgotPasswordModal from './ForgotPasswordModal';
import ResetPasswordModal from './ResetPasswordModal';

interface LoginProps {
    onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const { login, users } = useContext(AppContext);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
  };
  
  const handleEmailForReset = (emailToReset: string) => {
      const userExists = users.some(u => u.email === emailToReset);
      // In a real app, you show the same message regardless to prevent email enumeration
      alert("If an account with that email exists, you will receive a password reset link shortly.");
      if (userExists) {
        setResetEmail(emailToReset);
        setShowForgotPassword(false);
        // Simulate clicking the link in the email by opening the next modal
        setShowResetPassword(true); 
      } else {
        setShowForgotPassword(false);
      }
  }
  
  const handlePasswordReset = () => {
      alert(`Password for ${resetEmail} has been successfully reset. Please log in with your new password.`);
      setShowResetPassword(false);
      setResetEmail('');
  }

  return (
    <>
      <div className="max-w-md mx-auto mt-10">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
          <h2 className="text-3xl font-bold text-center text-slate-800">Login to SwiftClean</h2>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="you@example.com"
              required
            />
          </div>
           <div className="text-right">
             <button type="button" onClick={() => setShowForgotPassword(true)} className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Forgot Password?
             </button>
           </div>
          <div className="text-xs text-slate-500">
              <p className="font-bold">Demo Accounts:</p>
              <ul>
                  {users.map(u => <li key={u.id}>- {u.email} ({u.userType === 0 ? 'Customer' : 'Provider'})</li>)}
              </ul>
          </div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Login
          </button>
          <p className="text-center text-sm text-slate-600">
            Don't have an account?{' '}
            <button type="button" onClick={onSwitchToRegister} className="font-medium text-blue-600 hover:text-blue-500">
              Register here
            </button>
          </p>
        </form>
      </div>
      {showForgotPassword && <ForgotPasswordModal onClose={() => setShowForgotPassword(false)} onEmailSubmitted={handleEmailForReset} />}
      {showResetPassword && <ResetPasswordModal onClose={() => setShowResetPassword(false)} onPasswordReset={handlePasswordReset} />}
    </>
  );
};

export default Login;