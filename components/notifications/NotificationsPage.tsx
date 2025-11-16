import React from 'react';

const NotificationsPage: React.FC = () => {
    return (
        <div className="container mx-auto max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Notifications</h1>
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 text-center">
                 <div className="mx-auto h-16 w-16 text-blue-500 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                 </div>
                 <h2 className="text-2xl font-bold text-slate-800">Coming Soon!</h2>
                 <p className="mt-4 text-slate-600">
                    This will be your hub for all job-related notifications. Get real-time alerts for new job bookings in your preferred service categories, job status updates, and messages from customers.
                 </p>
                 <p className="mt-2 text-sm text-slate-500">
                    Stay tuned for a more connected and efficient way to manage your work.
                 </p>
            </div>
        </div>
    );
};

export default NotificationsPage;
