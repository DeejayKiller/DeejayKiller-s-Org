import React from 'react';

interface LandingPageProps {
  onLogin: () => void;
  onRegister: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onRegister }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-lg mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-blue-600 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Welcome to SwiftClean</h1>
        <p className="text-slate-600 mb-8 text-lg">Your one-stop solution for professional cleaning services. Find trusted cleaners or offer your services today.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onLogin}
            className="w-full sm:w-auto px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105"
          >
            Login
          </button>
          <button
            onClick={onRegister}
            className="w-full sm:w-auto px-8 py-3 text-lg font-semibold text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;