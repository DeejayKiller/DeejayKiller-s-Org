import React, { useState } from 'react';
import { PaymentMethod } from '../../types';
import type { PaymentInfo } from '../../types';

interface AddPaymentMethodModalProps {
  onClose: () => void;
  onAdd: (paymentInfo: PaymentInfo) => void;
}

const AddPaymentMethodModal: React.FC<AddPaymentMethodModalProps> = ({ onClose, onAdd }) => {
  const [paymentType, setPaymentType] = useState<PaymentMethod>(PaymentMethod.Card);
  const [details, setDetails] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details) {
      alert('Please fill in the details.');
      return;
    }
    const displayDetails = paymentType === PaymentMethod.Card ? `**** **** **** ${details.slice(-4)}` : details;
    onAdd({ type: paymentType, details: displayDetails });
    onClose();
  };

  const renderInputs = () => {
    switch(paymentType) {
        case PaymentMethod.Card:
            return (
                <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-slate-700">Card Number</label>
                    <input type="text" id="cardNumber" value={details} onChange={e => setDetails(e.target.value)} placeholder="Enter 16-digit card number" maxLength={16} minLength={16} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm"/>
                </div>
            );
        case PaymentMethod.PayPal:
            return (
                 <div>
                    <label htmlFor="paypalEmail" className="block text-sm font-medium text-slate-700">PayPal Email</label>
                    <input type="email" id="paypalEmail" value={details} onChange={e => setDetails(e.target.value)} placeholder="you@example.com" required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm"/>
                </div>
            );
        case PaymentMethod.Crypto:
             return (
                 <div>
                    <label htmlFor="walletAddress" className="block text-sm font-medium text-slate-700">Crypto Wallet Address</label>
                    <input type="text" id="walletAddress" value={details} onChange={e => setDetails(e.target.value)} placeholder="Enter your public wallet address" required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm"/>
                </div>
            );
        default: return null;
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 text-2xl font-bold">&times;</button>
        <h2 className="text-2xl font-bold mb-6 text-slate-800">Add Payment Method</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-700">Payment Type</label>
                <div className="mt-2 flex space-x-4">
                    {Object.values(PaymentMethod).filter(m => m !== PaymentMethod.Cash).map(method => (
                        <label key={method} className="flex items-center">
                            <input type="radio" name="paymentType" value={method} checked={paymentType === method} onChange={() => {setPaymentType(method); setDetails('');}} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"/>
                            <span className="ml-2 text-sm text-slate-700">{method}</span>
                        </label>
                    ))}
                </div>
            </div>
          
            {renderInputs()}
          
            <div className="pt-4">
                 <button type="submit" className="w-full px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">Save Method</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default AddPaymentMethodModal;
