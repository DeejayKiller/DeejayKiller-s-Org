
import React, { useState, useContext } from 'react';
import { AppContext } from '../../App';
import type { Job } from '../../types';
import { UserType } from '../../types';
import StarRating from './StarRating';

interface ReviewModalProps {
  job: Job;
  onClose: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ job, onClose }) => {
  const { currentUser, submitReview, findUserById } = useContext(AppContext);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  
  if(!currentUser) return null;

  const isCustomerReviewing = currentUser.userType === UserType.Customer;
  const revieweeId = isCustomerReviewing ? job.providerId! : job.customerId;
  const reviewee = findUserById(revieweeId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReview(job.id, currentUser.id, rating, reviewText);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 text-2xl font-bold">&times;</button>
        <h2 className="text-2xl font-bold mb-2 text-slate-800">Leave a Review</h2>
        <p className="text-slate-600 mb-6">How was your experience with {reviewee?.name}?</p>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-4">
            <StarRating rating={rating} onRatingChange={setRating} interactive={true} size="large" />
          </div>
          <div>
            <label htmlFor="reviewText" className="block text-sm font-medium text-slate-700">
                Optional Review
            </label>
            <textarea
                id="reviewText"
                rows={3}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder={`Share your experience...`}
            />
          </div>
          <button type="submit" className="w-full mt-6 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
