import React, { useContext, useState, useMemo, useEffect } from 'react';
import { AppContext } from '../../types';
import type { Job, User, Offer } from '../../types';
import { JobStatus, UserType, VerificationStatus } from '../../types';
import StarRating from './StarRating';
import ReviewModal from './ReviewModal';
import MakeOfferModal from './MakeOfferModal';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { currentUser, updateJob, findUserById, offers, acceptOffer } = useContext(AppContext);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  
  useEffect(() => {
    if (job.imageFile) {
      const url = URL.createObjectURL(job.imageFile);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [job.imageFile]);

  if (!currentUser) return null;

  const customer = findUserById(job.customerId);
  const provider = job.providerId ? findUserById(job.providerId) : null;
  
  const isProvider = currentUser.userType === UserType.Provider;
  
  const jobOffers = useMemo(() => offers.filter(o => o.jobId === job.id), [offers, job.id]);

  const handleUpdateStatus = (newStatus: JobStatus) => {
    updateJob({ ...job, status: newStatus });
  };

  const getStatusInfo = (status: JobStatus): { text: string; color: string } => {
    switch (status) {
      case JobStatus.Pending: return { text: 'Awaiting Offers', color: 'bg-yellow-100 text-yellow-800' };
      case JobStatus.Accepted: return { text: 'Accepted', color: 'bg-blue-100 text-blue-800' };
      case JobStatus.InProgress: return { text: 'In Progress', color: 'bg-indigo-100 text-indigo-800' };
      case JobStatus.Completed: return { text: 'Completed', color: 'bg-green-100 text-green-800' };
      case JobStatus.Reviewed: return { text: 'Reviewed', color: 'bg-purple-100 text-purple-800' };
      default: return { text: 'Unknown', color: 'bg-gray-100 text-gray-800' };
    }
  };
  
  const statusInfo = getStatusInfo(job.status);

  const renderActions = () => {
    if (isProvider) { // Provider View
      if (job.status === JobStatus.Pending) {
        const hasOffered = jobOffers.some(o => o.providerId === currentUser.id);
        if (hasOffered) {
            return <p className="text-center text-sm font-medium text-slate-500 mt-4">Offer Submitted</p>;
        }
        return <button onClick={() => setIsOfferModalOpen(true)} className="w-full mt-4 px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-slate-400" disabled={currentUser.verificationStatus !== VerificationStatus.Verified}>Make Offer</button>;
      }
      if (job.status === JobStatus.Accepted) return <button onClick={() => handleUpdateStatus(JobStatus.InProgress)} className="w-full mt-4 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Start Job</button>;
      if (job.status === JobStatus.InProgress) return <button onClick={() => handleUpdateStatus(JobStatus.Completed)} className="w-full mt-4 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">Mark as Complete</button>;
      if ((job.status === JobStatus.Completed || job.status === JobStatus.Reviewed) && !job.customerRating) return <button onClick={() => setIsReviewModalOpen(true)} className="w-full mt-4 px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700">Review Customer</button>;
    } else { // Customer View
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
  
  const renderOffers = () => {
      if (currentUser.userType !== UserType.Customer || job.status !== JobStatus.Pending || jobOffers.length === 0) {
          return null;
      }
      return (
        <div className="mt-4 space-y-2">
            <h4 className="text-sm font-semibold text-slate-700">Provider Offers:</h4>
            {jobOffers.map(offer => {
                const offerProvider = findUserById(offer.providerId);
                if (!offerProvider) return null;
                return (
                    <div key={offer.id} className="flex justify-between items-center p-2 bg-slate-50 rounded-md border">
                        <div>
                            <p className="font-semibold text-sm">{offerProvider.name}</p>
                            <div className="flex items-center gap-1">
                                <StarRating rating={offerProvider.avgRating} size="small" />
                                <span className="text-xs text-slate-500">({offerProvider.ratingsCount})</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-lg text-slate-800">£{offer.price.toFixed(2)}</p>
                             <button onClick={() => acceptOffer(offer.id)} className="text-xs font-semibold text-white bg-green-600 hover:bg-green-700 px-2 py-1 rounded-md">
                                Accept
                             </button>
                        </div>
                    </div>
                )
            })}
        </div>
      );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-5 flex flex-col justify-between transition-all hover:shadow-xl">
        <div>
          <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-bold text-slate-800">{job.serviceType}</h3>
              <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${statusInfo.color}`}>{statusInfo.text}</span>
          </div>
          {imageUrl && (
            <div className="my-3 rounded-lg overflow-hidden h-40">
                <img src={imageUrl} alt="Cleaning job details" className="w-full h-full object-cover" />
            </div>
           )}
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
            {renderOffers()}
            <div className="mt-4 pt-4 border-t border-slate-200">
               <div className="flex justify-between items-center">
                    <div>
                        {job.status === JobStatus.Pending ? (
                            <p className="text-lg font-semibold text-slate-500">Awaiting Offers</p>
                        ) : (
                           <>
                             <p className="text-xl font-bold text-slate-900">£{job.price?.toFixed(2)}</p>
                             <p className="text-xs text-slate-500">via {job.paymentMethod}</p>
                           </>
                        )}
                        
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
      {isOfferModalOpen && <MakeOfferModal job={job} onClose={() => setIsOfferModalOpen(false)} />}
    </>
  );
};

export default JobCard;