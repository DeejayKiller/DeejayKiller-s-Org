import React, { useContext, useState } from 'react';
import { AppContext } from '../../types';
import type { Job, User } from '../../types';
import { JobStatus, UserType, VerificationStatus } from '../../types';
import StarRating from './StarRating';
import ReviewModal from './ReviewModal';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { currentUser, updateJob, findUserById } = useContext(AppContext);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  if (!currentUser) return null;

  const customer = findUserById(job.customerId);
  const provider = job.providerId ? findUserById(job.providerId) : null;
  
  const isProvider = currentUser.userType === UserType.Provider;
  
  const handleAccept = () => {
    if(currentUser.verificationStatus !== VerificationStatus.Verified) {
        alert("You must be a verified provider to accept jobs.");
        return;
    }
    updateJob({ ...job, status: JobStatus.Accepted, providerId: currentUser.id })
  };

  const handleUpdateStatus = (newStatus: JobStatus) => {
    updateJob({ ...job, status: newStatus });
  };

  const getStatusInfo = (status: JobStatus): { text: string; color: string } => {
    switch (status) {
      case JobStatus.Pending: return { text: 'Pending', color: 'bg-yellow-100 text-yellow-800' };
      case JobStatus.Accepted: return { text: 'Accepted', color: 'bg-blue-100 text-blue-800' };
      case JobStatus.InProgress: return { text: 'In Progress', color: 'bg-indigo-100 text-indigo-800' };
      case JobStatus.Completed: return { text: 'Completed', color: 'bg-green-100 text-green-800' };
      case JobStatus.Reviewed: return { text: 'Reviewed', color: 'bg-purple-100 text-purple-800' };
      default: return { text: 'Unknown', color: 'bg-gray-100 text-gray-800' };
    }
  };
  
  const statusInfo = getStatusInfo(job.status);

  const renderActions = () => {
    if (isProvider) {
      if (job.status === JobStatus.Pending) return <button onClick={handleAccept} className="w-full mt-4 px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-slate-400" disabled={currentUser.verificationStatus !== VerificationStatus.Verified}>Accept Job</button>;
      if (job.status === JobStatus.Accepted) return <button onClick={() => handleUpdateStatus(JobStatus.InProgress)} className="w-full mt-4 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Start Job</button>;
      if (job.status === JobStatus.InProgress) return <button onClick={() => handleUpdateStatus(JobStatus.Completed)} className="w-full mt-4 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">Mark as Complete</button>;
      if ((job.status === JobStatus.Completed || job.status === JobStatus.Reviewed) && !job.customerRating) return <button onClick={() => setIsReviewModalOpen(true)} className="w-full mt-4 px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700">Review Customer</button>;
    } else { // Is Customer
        if ((job.status === JobStatus.Completed || job.status === JobStatus.Reviewed) && !job.providerRating) return <button onClick={() => setIsReviewModalOpen(true)} className="w-full mt-4 px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700">Review Provider</button>;
    }
    return null;
  }
  
  const renderReview = (review?: string, rating?: number, author?: string) => (
    review && rating && (
        <div className="mt-4 text-xs italic p-2 bg-slate-50 rounded-md">
            <div className="flex items-center gap-2">
                <StarRating rating={rating} size="small" />
                <p className="font-semibold">{author}</p>
            </div>
            <p className="text-slate-600 mt-1">"{review}"</p>
        </div>
    )
  )

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-5 flex flex-col justify-between transition-all hover:shadow-xl">
        <div>
          <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-bold text-slate-800">{job.serviceType}</h3>
              <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${statusInfo.color}`}>{statusInfo.text}</span>
          </div>
          <div className="space-y-2 text-sm text-slate-600">
              <p><strong>Date:</strong> {job.dateTime.toLocaleDateString()} at {job.dateTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
              <p><strong>Location:</strong> {job.address}</p>
              <p><strong>Customer:</strong> {customer?.name}</p>
              {provider && 
                <div className="flex items-center gap-2">
                  <p><strong>Provider:</strong> {provider.name}</p>
                  {provider.verificationStatus === VerificationStatus.Verified && <span title="Verified Provider" className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">Verified</span>}
                </div>
              }
          </div>
           {job.status === JobStatus.Reviewed && (
               <div className="mt-3 space-y-2">
                   {renderReview(job.customerReview, job.providerRating, customer?.name)}
                   {renderReview(job.providerReview, job.customerRating, provider?.name)}
               </div>
           )}
        </div>

        <div>
            <div className="mt-4 pt-4 border-t border-slate-200">
               <div className="flex justify-between items-center">
                    <div>
                        <p className="text-xl font-bold text-slate-900">${job.price.toFixed(2)}</p>
                        <p className="text-xs text-slate-500">via {job.paymentMethod}</p>
                    </div>
                    {job.status === JobStatus.Reviewed && (
                       <div className="text-right">
                           <p className="text-xs text-slate-500">{isProvider ? 'Your Rating' : 'You Rated'}</p>
                           <StarRating rating={isProvider ? job.customerRating || 0 : job.providerRating || 0} />
                       </div>
                    )}
               </div>
               {renderActions()}
            </div>
        </div>
      </div>
      {isReviewModalOpen && <ReviewModal job={job} onClose={() => setIsReviewModalOpen(false)} />}
    </>
  );
};

export default JobCard;