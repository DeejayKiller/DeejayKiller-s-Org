
import React, { useState, useContext } from 'react';
import { AppContext } from '../../App';
import type { User } from '../../types';
import { UserType } from '../../types';

interface RegisterProps {
    onSwitchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSwitchToLogin }) => {
  const { register } = useContext(AppContext);
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserType>(UserType.Customer);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passportFile, setPassportFile] =useState<File | undefined>();
  const [dbsFile, setDbsFile] = useState<File | undefined>();

  const handleFileChange = (setter: React.Dispatch<React.SetStateAction<File | undefined>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userType === UserType.Provider && (!passportFile || !dbsFile)) {
        alert("Passport and DBS checks are required for service providers.");
        return;
    }
    const newUser: Omit<User, 'id' | 'avgRating' | 'ratingsCount' | 'isVerified'> = {
        name,
        email,
        userType,
        passportFile,
        dbsFile
    };
    register(newUser);
  };
  
  const renderStep = () => {
      switch(step) {
          case 1:
              return (
                  <div>
                      <h3 className="text-xl font-semibold mb-4 text-center">I am a...</h3>
                      <div className="flex gap-4">
                          <button onClick={() => {setUserType(UserType.Customer); setStep(2)}} className="flex-1 p-6 border rounded-lg hover:bg-blue-50 transition-colors text-center">
                              <span className="text-2xl">👤</span>
                              <p className="font-semibold mt-2">Customer</p>
                              <p className="text-sm text-slate-500">I need cleaning services</p>
                          </button>
                          <button onClick={() => {setUserType(UserType.Provider); setStep(2)}} className="flex-1 p-6 border rounded-lg hover:bg-blue-50 transition-colors text-center">
                              <span className="text-2xl">✨</span>
                              <p className="font-semibold mt-2">Service Provider</p>
                              <p className="text-sm text-slate-500">I offer cleaning services</p>
                          </button>
                      </div>
                  </div>
              );
          case 2:
              return (
                  <div>
                      <h3 className="text-xl font-semibold mb-6 text-center">Create Your Account</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
                          <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                          <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                        </div>
                        {userType === UserType.Provider && (
                            <>
                                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                    <p className="text-sm font-semibold text-blue-800">Verification Required</p>
                                    <p className="text-xs text-blue-700">Please upload the following documents. Your account will be reviewed and verified by our team.</p>
                                </div>
                                <div>
                                    <label htmlFor="passport" className="block text-sm font-medium text-slate-700">Passport Photo/Scan</label>
                                    <input type="file" id="passport" onChange={handleFileChange(setPassportFile)} required className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                                    {passportFile && <p className="text-xs text-green-600 mt-1">{passportFile.name} uploaded.</p>}
                                </div>
                                <div>
                                    <label htmlFor="dbs" className="block text-sm font-medium text-slate-700">DBS Check Document</label>
                                    <input type="file" id="dbs" onChange={handleFileChange(setDbsFile)} required className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                                    {dbsFile && <p className="text-xs text-green-600 mt-1">{dbsFile.name} uploaded.</p>}
                                </div>
                            </>
                        )}
                        <div className="flex justify-between items-center pt-2">
                          <button type="button" onClick={() => setStep(1)} className="text-sm font-medium text-slate-600 hover:text-slate-900">&larr; Back</button>
                          <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                              Complete Registration
                          </button>
                        </div>
                      </div>
                  </div>
              );
      }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">Join CleanSweep</h2>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-6">
            <div className="bg-blue-600 h-1.5 rounded-full" style={{width: `${step*50}%`}}></div>
        </div>
        {renderStep()}
        <p className="text-center text-sm text-slate-600 mt-8">
          Already have an account?{' '}
          <button type="button" onClick={onSwitchToLogin} className="font-medium text-blue-600 hover:text-blue-500">
            Login here
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
