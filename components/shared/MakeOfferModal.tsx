import React, { useState, useContext } from 'react';
import { AppContext } from '../../types';
import type { Job } from '../../types';

interface MakeOfferModalProps {
  job: Job;
  onClose: () => void;
}

const MakeOfferModal: React.FC<MakeOfferModalProps> = ({ job, onClose }) => {
  const { createOffer } = useContext(AppContext);
  const [price, setPrice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      alert('Please enter a valid price.');
      return;
    }
    createOffer(job.id, priceValue);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 text-2xl font-bold">&times;</button>
        <h2 className="text-2xl font-bold mb-2 text-slate-800">Make an Offer</h2>
        <p className="text-slate-600 mb-6">Enter your price for the "{job.serviceType}" job.</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-slate-700">
              Your Price (£)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">£</span>
                </div>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="block w-full rounded-md border-gray-300 pl-7 pr-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                />
            </div>
          </div>
          <button type="submit" className="w-full mt-6 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Submit Offer
          </button>
        </form>
      </div>
    </div>
  );
};

export default MakeOfferModal;