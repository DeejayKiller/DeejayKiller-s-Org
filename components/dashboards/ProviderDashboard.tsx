
import React, { useState, useContext } from 'react';
import { AppContext } from '../../App';
import type { Job } from '../../types';
import { JobStatus } from '../../types';
import JobCard from '../shared/JobCard';

const ProviderDashboard: React.FC = () => {
  const { currentUser, jobs } = useContext(AppContext);
  const [filter, setFilter] = useState<'available' | 'my-jobs'>('available');
  
  if (!currentUser) return null;

  const availableJobs = jobs.filter(job => job.status === JobStatus.Pending);
  const myJobs = jobs.filter(job => job.providerId === currentUser.id);

  const jobsToDisplay = filter === 'available' ? availableJobs : myJobs;

  return (
    <div className="container mx-auto">
       {!currentUser.isVerified && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-md" role="alert">
          <p className="font-bold">Verification Pending</p>
          <p>Your documents are under review. You can browse available jobs, but you will need to be verified to accept them. You'll be notified once your account is approved.</p>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Job Dashboard</h2>
      </div>
      
      <div className="mb-4 border-b border-slate-200">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          <button onClick={() => setFilter('available')} className={`${filter === 'available' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}>
            Available Jobs ({availableJobs.length})
          </button>
          <button onClick={() => setFilter('my-jobs')} className={`${filter === 'my-jobs' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}>
            My Accepted Jobs ({myJobs.length})
          </button>
        </nav>
      </div>

      {jobsToDisplay.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobsToDisplay.sort((a,b) => b.dateTime.getTime() - a.dateTime.getTime()).map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
         <div className="text-center py-16 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold text-slate-800">No {filter === 'available' ? 'available jobs' : 'accepted jobs'}</h3>
          <p className="text-slate-500 mt-2">
            {filter === 'available' ? "Check back soon for new opportunities!" : "Accept a job from the available list to get started."}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProviderDashboard;
