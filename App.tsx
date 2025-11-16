
import React, { useState, useMemo } from 'react';
import type { Job, User } from './types';
import { JobStatus, UserType } from './types';
import { MOCK_JOBS, MOCK_USERS } from './constants';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Header from './components/layout/Header';
import CustomerDashboard from './components/dashboards/CustomerDashboard';
import ProviderDashboard from './components/dashboards/ProviderDashboard';
import LandingPage from './components/auth/LandingPage';
import GDPR from './components/legal/GDPR';

type View = 'landing' | 'login' | 'register' | 'gdpr';

export const AppContext = React.createContext<{
  currentUser: User | null;
  users: User[];
  jobs: Job[];
  login: (email: string) => void;
  logout: () => void;
  register: (user: Omit<User, 'id' | 'avgRating' | 'ratingsCount' | 'isVerified'>) => void;
  createJob: (job: Omit<Job, 'id' | 'status' | 'customerId'>) => void;
  updateJob: (updatedJob: Job) => void;
  submitReview: (jobId: number, reviewerId: number, rating: number, reviewText: string) => void;
  findUserById: (id: number) => User | undefined;
  setView: (view: View) => void;
}>({
  currentUser: null,
  users: [],
  jobs: [],
  login: () => {},
  logout: () => {},
  register: () => {},
  createJob: () => {},
  updateJob: () => {},
  submitReview: () => {},
  findUserById: () => undefined,
  setView: () => {},
});

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [currentView, setCurrentView] = useState<View>('landing');

  const appContextValue = useMemo(() => ({
    currentUser,
    users,
    jobs,
    login: (email: string) => {
      const user = users.find(u => u.email === email);
      if (user) {
        setCurrentUser(user);
      } else {
        alert('User not found!');
      }
    },
    logout: () => {
      setCurrentUser(null);
      setCurrentView('landing');
    },
    register: (user: Omit<User, 'id' | 'avgRating' | 'ratingsCount' | 'isVerified'>) => {
      const newUser: User = {
        ...user,
        id: users.length + 1,
        avgRating: 0,
        ratingsCount: 0,
        isVerified: user.userType === UserType.Customer, // Customers are auto-verified, providers are not
      };
      setUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
    },
    createJob: (job: Omit<Job, 'id' | 'status' | 'customerId'>) => {
      if (!currentUser) return;
      const newJob: Job = {
        ...job,
        id: jobs.length + 1,
        status: JobStatus.Pending,
        customerId: currentUser.id,
      };
      setJobs(prev => [newJob, ...prev]);
    },
    updateJob: (updatedJob: Job) => {
        setJobs(prev => prev.map(job => job.id === updatedJob.id ? updatedJob : job));
    },
    submitReview: (jobId: number, reviewerId: number, rating: number, reviewText: string) => {
        const job = jobs.find(j => j.id === jobId);
        if (!job) return;
        
        const reviewer = users.find(u => u.id === reviewerId);
        if (!reviewer) return;
        
        const isCustomerReviewing = reviewer.userType === UserType.Customer;
        const revieweeId = isCustomerReviewing ? job.providerId : job.customerId;
        if (!revieweeId) return;

        // Update Job
        const updatedJob: Job = {
            ...job,
            status: JobStatus.Reviewed,
            ...(isCustomerReviewing 
                ? { providerRating: rating, providerReview: reviewText } 
                : { customerRating: rating, customerReview: reviewText })
        };
        setJobs(prevJobs => prevJobs.map(j => j.id === jobId ? updatedJob : j));

        // Update Reviewee's Rating
        const reviewee = users.find(u => u.id === revieweeId);
        if (reviewee) {
            const totalRating = (reviewee.avgRating * reviewee.ratingsCount) + rating;
            const newRatingsCount = reviewee.ratingsCount + 1;
            const newAvgRating = totalRating / newRatingsCount;
            
            const updatedUser: User = {
                ...reviewee,
                avgRating: parseFloat(newAvgRating.toFixed(2)),
                ratingsCount: newRatingsCount
            };
            setUsers(prevUsers => prevUsers.map(u => u.id === revieweeId ? updatedUser : u));

            // Also update current user if they are the one being reviewed
            if (currentUser && currentUser.id === revieweeId) {
                setCurrentUser(updatedUser);
            }
        }
    },
    findUserById: (id: number) => users.find(u => u.id === id),
    setView: setCurrentView,
  }), [currentUser, users, jobs]);

  const renderContent = () => {
    if (currentView === 'gdpr') {
        return <GDPR onBack={() => setCurrentView('landing')} />;
    }
      
    if (currentUser) {
      if (currentUser.userType === UserType.Customer) {
        return <CustomerDashboard />;
      }
      return <ProviderDashboard />;
    }

    switch (currentView) {
      case 'login':
        return <Login onSwitchToRegister={() => setCurrentView('register')} />;
      case 'register':
        return <Register onSwitchToLogin={() => setCurrentView('login')} />;
      case 'landing':
      default:
        return <LandingPage onLogin={() => setCurrentView('login')} onRegister={() => setCurrentView('register')} />;
    }
  };

  return (
    <AppContext.Provider value={appContextValue}>
      <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
        <Header />
        <main className="p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </AppContext.Provider>
  );
};

export default App;
