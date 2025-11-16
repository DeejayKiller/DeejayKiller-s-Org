import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../types';
import type { Job } from '../../types';
import { PaymentMethod } from '../../types';
import { CLEANING_SERVICES } from '../../constants';

interface BookingModalProps {
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ onClose }) => {
  const { createJob, bookingService, setBookingService } = useContext(AppContext);
  const [serviceType, setServiceType] = useState(bookingService || CLEANING_SERVICES[0].name);
  const [address, setAddress] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('09:00');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.Card);
  const [imageFile, setImageFile] = useState<File | undefined>();

  useEffect(() => {
    // When the modal closes, reset the global booking service state
    return () => {
        if(bookingService) {
            setBookingService(null);
        }
    }
  }, [bookingService, setBookingService]);


  const selectedService = CLEANING_SERVICES.find(s => s.name === serviceType);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
        alert("Please provide an address.");
        return;
    }
    const newJob: Omit<Job, 'id' | 'status' | 'customerId' | 'price'> = {
        serviceType,
        address,
        dateTime: new Date(`${date}T${time}`),
        paymentMethod,
        imageFile
    };
    createJob(newJob);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 text-2xl font-bold">&times;</button>
        <h2 className="text-2xl font-bold mb-6 text-slate-800">Request a Cleaning Service</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="serviceType" className="block text-sm font-medium text-slate-700">Service Type</label>
            <select id="serviceType" value={serviceType} onChange={e => setServiceType(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
              {CLEANING_SERVICES.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
            </select>
            <p className="text-xs text-slate-500 mt-1">{selectedService?.description}</p>
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-slate-700">Address</label>
            <input type="text" id="address" value={address} onChange={e => setAddress(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm"/>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="date" className="block text-sm font-medium text-slate-700">Date</label>
              <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm"/>
            </div>
            <div className="flex-1">
              <label htmlFor="time" className="block text-sm font-medium text-slate-700">Time</label>
              <input type="time" id="time" value={time} onChange={e => setTime(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm"/>
            </div>
          </div>
           <div>
            <label htmlFor="imageUpload" className="block text-sm font-medium text-slate-700">Upload Image (Optional)</label>
            <p className="text-xs text-slate-500 mt-1 mb-2">Show the provider what needs cleaning.</p>
            <input type="file" id="imageUpload" onChange={handleFileChange} accept="image/*" className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
            {imageFile && <p className="text-xs text-green-600 mt-1">{imageFile.name} uploaded.</p>}
           </div>
           <div>
            <label className="block text-sm font-medium text-slate-700">Payment Method</label>
            <div className="mt-2 flex space-x-4">
                {Object.values(PaymentMethod).filter(m => m !== PaymentMethod.Crypto).map(method => (
                    <label key={method} className="flex items-center">
                        <input type="radio" name="payment" value={method} checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"/>
                        <span className="ml-2 text-sm text-slate-700">{method}</span>
                    </label>
                ))}
            </div>
          </div>
          <div className="pt-4 flex justify-end items-center">
            <button type="submit" className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Post Job Request</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;