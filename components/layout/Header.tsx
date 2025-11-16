
import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { UserType } from '../../types';
import StarRating from '../shared/StarRating';

const Header: React.FC = () => {
  const { currentUser, logout } = useContext(AppContext);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
            <h1 className="text-2xl font-bold text-slate-800">CleanSweep</h1>
          </div>
          {currentUser && (
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="flex items-center justify-end gap-2">
                    {currentUser.userType === UserType.Provider && currentUser.isVerified && (
                        <span title="Verified Provider" className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">
                            Verified
                        </span>
                     )}
                    <p className="font-semibold">{currentUser.name}</p>
                </div>
                <div className="flex items-center justify-end gap-1 mt-1">
                    <StarRating rating={currentUser.avgRating} size="small"/>
                    <p className="text-xs text-slate-500">({currentUser.ratingsCount} reviews)</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
