import React, { useContext } from 'react';
import { AppContext, UserType } from '../../types';
import PaymentSettings from './PaymentSettings';

const UserSettingsPage: React.FC = () => {
  const { currentUser } = useContext(AppContext);

  if (!currentUser) return null;

  const isCustomer = currentUser.userType === UserType.Customer;

  return (
    <div className="container mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 space-y-10">
        {isCustomer && <PaymentSettings />}

        {/* Loyalty Program Placeholder */}
        <div>
          <h2 className="text-2xl font-bold border-b pb-2 mb-4">Loyalty Program</h2>
          <div className="bg-slate-50 p-6 rounded-lg text-center">
            <p className="text-slate-600">Our new loyalty program is coming soon!</p>
            <p className="text-sm text-slate-500 mt-2">Earn points for every cleaning and redeem them for discounts.</p>
          </div>
        </div>

        {/* Refer a Friend Placeholder */}
        <div>
          <h2 className="text-2xl font-bold border-b pb-2 mb-4">Refer a Friend</h2>
           <div className="bg-slate-50 p-6 rounded-lg text-center">
            <p className="text-slate-600">Give friends $20 off their first clean, and get $20 in credits when they complete it!</p>
            <button className="mt-4 px-6 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-slate-400" disabled>
                Get Your Referral Code (Coming Soon)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettingsPage;
