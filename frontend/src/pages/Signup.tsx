import React from 'react';

interface SignupProps {
  onSwitchToLogin?: () => void;
  onSignupSuccess?: () => void;
}

export default function Signup({ onSwitchToLogin, onSignupSuccess }: SignupProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSignupSuccess) onSignupSuccess();
  };

  return (
    <div className="w-full max-w-md p-8 bg-[#090d1a] border border-gray-800 rounded-2xl shadow-2xl relative z-10">
      <h2 className="text-2xl font-black text-white text-center mb-1.5 tracking-tight">Create Account</h2>
      <p className="text-gray-400 text-xs text-center mb-6">
        Get started with real-time editing rooms
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
            Full Name
          </label>
          <input 
            type="text" 
            required 
            placeholder="John Doe" 
            className="w-full px-4 py-3 bg-gray-950/50 border border-gray-800 hover:border-gray-700 focus:border-indigo-500 rounded-xl text-white placeholder-gray-600 focus:outline-none transition-colors text-sm" 
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
            Email Address
          </label>
          <input 
            type="email" 
            required 
            placeholder="you@example.com" 
            className="w-full px-4 py-3 bg-gray-950/50 border border-gray-800 hover:border-gray-700 focus:border-indigo-500 rounded-xl text-white placeholder-gray-600 focus:outline-none transition-colors text-sm" 
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
            Password
          </label>
          <input 
            type="password" 
            required 
            placeholder="••••••••" 
            className="w-full px-4 py-3 bg-gray-950/50 border border-gray-800 hover:border-gray-700 focus:border-indigo-500 rounded-xl text-white placeholder-gray-600 focus:outline-none transition-colors text-sm" 
          />
        </div>

        <button 
          type="submit" 
          className="w-full py-3.5 mt-2 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] transition-all text-white font-semibold rounded-xl text-sm shadow-lg shadow-indigo-600/20"
        >
          Create Account
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-gray-500">
        <span>Already have an account? </span>
        <button 
          onClick={onSwitchToLogin} 
          className="text-indigo-400 hover:text-indigo-300 hover:underline font-semibold focus:outline-none transition-colors"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}