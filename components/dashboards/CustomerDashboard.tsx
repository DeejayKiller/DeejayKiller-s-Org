
import React, { useState, useContext } from 'react';
import { AppContext } from '../../types';
import type { Job } from '../../types';
import { JobStatus } from '../../types';
import JobCard from '../shared/JobCard';
import BookingModal from '../shared/BookingModal';

const CustomerDashboard: React.FC = () => {
  const { currentUser, jobs } = useContext(AppContext);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [filter, setFilter] = useState<'upcoming' | 'past'>('upcoming');

  if (!currentUser) return null;

  const myJobs = jobs.filter(job => job.customerId === currentUser.id);

  const upcomingJobs = myJobs.filter(job => job.status !== JobStatus.Reviewed && job.status !== JobStatus.Completed);
  const pastJobs = myJobs.filter(job => job.status === JobStatus.Reviewed || job.status === JobStatus.Completed);
  
  const jobsToDisplay = filter === 'upcoming' ? upcomingJobs : pastJobs;

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">My Bookings</h2>
        <button
          onClick={() => setIsBookingModalOpen(true)}
          className="px-6 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          + Book New Cleaning
        </button>
      </div>

      <div className="mb-4 border-b border-slate-200">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          <button onClick={() => setFilter('upcoming')} className={`${filter === 'upcoming' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}>
            Upcoming ({upcomingJobs.length})
          </button>
          <button onClick={() => setFilter('past')} className={`${filter === 'past' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}>
            Past ({pastJobs.length})
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
          <h3 className="text-xl font-semibold text-slate-800">No {filter} jobs</h3>
          <p className="text-slate-500 mt-2">
            {filter === 'upcoming' ? "Ready for a sparkling clean home? Book your first service now!" : "You have no past cleaning jobs."}
          </p>
        </div>
      )}

      {isBookingModalOpen && <BookingModal onClose={() => setIsBookingModalOpen(false)} />}
    </div>
  );
};

export default CustomerDashboard;