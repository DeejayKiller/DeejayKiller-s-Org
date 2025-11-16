import React, { useState, useMemo } from 'react';
import type { Job, User, Offer } from './types';
import { AppContext, View, JobStatus, UserType, VerificationStatus, OfferStatus } from './types';
import { MOCK_JOBS, MOCK_USERS, MOCK_OFFERS } from './constants';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Header from './components/layout/Header';
import CustomerDashboard from './components/dashboards/CustomerDashboard';
import ProviderDashboard from './components/dashboards/ProviderDashboard';
import LandingPage from './components/auth/LandingPage';
import GDPR from './components/legal/GDPR';
import ServicesPage from './components/services/ServicesPage';
import UserSettingsPage from './components/settings/UserSettingsPage';
import NotificationsPage from './components/notifications/NotificationsPage';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [offers, setOffers] = useState<Offer[]>(MOCK_OFFERS);
  const [currentView, setCurrentView] = useState<View>('landing');
  const [bookingService, setBookingService] = useState<string | null>(null);

  const appContextValue = useMemo(() => ({
    currentUser,
    users,
    jobs,
    offers,
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
    register: (user: Omit<User, 'id' | 'avgRating' | 'ratingsCount' | 'verificationStatus' | 'isAvailable'>) => {
      const newUser: User = {
        ...user,
        id: users.length + 1,
        avgRating: 0,
        ratingsCount: 0,
        verificationStatus: user.userType === UserType.Provider ? VerificationStatus.Pending : VerificationStatus.NotApplicable,
        isAvailable: user.userType === UserType.Provider ? true : undefined,
      };
      setUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
    },
    createJob: (job: Omit<Job, 'id' | 'status' | 'customerId' | 'price'>) => {
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
    updateUser: (updatedUser: User) => {
        setUsers(prev => prev.map(user => user.id === updatedUser.id ? updatedUser : user));
        if (currentUser && currentUser.id === updatedUser.id) {
            setCurrentUser(updatedUser);
        }
    },
    createOffer: (jobId: number, price: number) => {
        if (!currentUser || currentUser.userType !== UserType.Provider) return;
        const newOffer: Offer = {
            id: offers.length + 1,
            jobId,
            providerId: currentUser.id,
            price,
            status: OfferStatus.Pending,
        };
        setOffers(prev => [...prev, newOffer]);
    },
    acceptOffer: (offerId: number) => {
        const acceptedOffer = offers.find(o => o.id === offerId);
        if (!acceptedOffer) return;

        // Update the job
        setJobs(prevJobs => prevJobs.map(job => 
            job.id === acceptedOffer.jobId 
            ? { ...job, providerId: acceptedOffer.providerId, price: acceptedOffer.price, status: JobStatus.Accepted } 
            : job
        ));

        // Update offers for this job
        setOffers(prevOffers => prevOffers.map(offer => {
            if (offer.jobId === acceptedOffer.jobId) {
                return { ...offer, status: offer.id === offerId ? OfferStatus.Accepted : OfferStatus.Rejected };
            }
            return offer;
        }));
    },
    submitReview: (jobId: number, reviewerId: number, rating: number, reviewText: string) => {
        const jobToUpdate = jobs.find(j => j.id === jobId);
        if (!jobToUpdate) { return; }
        const reviewer = users.find(u => u.id === reviewerId);
        if (!reviewer) { return; }
        const isCustomerReviewing = reviewer.userType === UserType.Customer;
        const revieweeId = isCustomerReviewing ? jobToUpdate.providerId : jobToUpdate.customerId;
        if (!revieweeId) { return; }

        const updatedJob: Job = { ...jobToUpdate, status: JobStatus.Reviewed };
        if (isCustomerReviewing) {
            updatedJob.providerRating = rating;
            updatedJob.providerReview = reviewText;
        } else {
            updatedJob.customerRating = rating;
            updatedJob.customerReview = reviewText;
        }
        setJobs(prevJobs => prevJobs.map(j => (j.id === jobId ? updatedJob : j)));

        const reviewee = users.find(u => u.id === revieweeId);
        if (reviewee) {
            const totalRatingValue = (reviewee.avgRating * reviewee.ratingsCount) + rating;
            const newTotalRatings = reviewee.ratingsCount + 1;
            const newAverageRating = totalRatingValue / newTotalRatings;
            const updatedReviewee: User = {
                ...reviewee,
                avgRating: parseFloat(newAverageRating.toFixed(2)),
                ratingsCount: newTotalRatings,
            };
            setUsers(prevUsers => prevUsers.map(u => (u.id === revieweeId ? updatedReviewee : u)));
            if (currentUser && currentUser.id === revieweeId) {
                setCurrentUser(updatedReviewee);
            }
        }
    },
    findUserById: (id: number) => users.find(u => u.id === id),
    setView: setCurrentView,
    bookingService,
    setBookingService,
  }), [currentUser, users, jobs, offers, bookingService]);

  const renderContent = () => {
    switch (currentView) {
        // FIX: Replaced undefined 'setView' with 'setCurrentView' state setter.
        case 'gdpr': return <GDPR onBack={() => setCurrentView(currentUser ? (currentUser.userType === UserType.Customer ? 'landing' : 'landing') : 'landing')} />;
        case 'services': return <ServicesPage />;
        case 'settings': return <UserSettingsPage />;
        case 'notifications': return <NotificationsPage />;
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