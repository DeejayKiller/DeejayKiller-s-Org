import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext } from '../../types';
import { UserType, VerificationStatus } from '../../types';
import StarRating from '../shared/StarRating';

const Header: React.FC = () => {
  const { currentUser, logout, setView } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleNavClick = (item: string) => {
      const view = item.toLowerCase();
      if (['home', 'products', 'services', 'contact', 'gdpr', 'notifications'].includes(view)) {
          if (view === 'home') setView('landing');
          else if (view === 'products') setView('services'); // Alias products to services
          else setView(view as any);
      } else {
          setView('landing');
      }
      setIsMenuOpen(false);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuRef]);


  const menuItems = ['Home', 'Services', 'Contact', 'GDPR'];

  return (
    <header className="bg-white shadow-md relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setView('landing')}>
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
            <h1 className="text-2xl font-bold text-slate-800">SwiftClean</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            {menuItems.map(item => (
              <a key={item} href="#" onClick={(e) => { e.preventDefault(); handleNavClick(item);}} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                {item}
              </a>
            ))}
             {currentUser?.userType === UserType.Provider && (
                 <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('notifications');}} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Notifications</a>
             )}
          </nav>

          <div className="flex items-center">
            {currentUser ? (
              <div className="hidden md:block relative" ref={userMenuRef}>
                 <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center space-x-2">
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-2">
                          {currentUser.userType === UserType.Provider && currentUser.verificationStatus === VerificationStatus.Verified && (
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
                    <svg className={`w-4 h-4 text-slate-500 transition-transform ${isUserMenuOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                 </button>
                 {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                        <a href="#" onClick={(e) => { e.preventDefault(); setView('settings'); setIsUserMenuOpen(false); }} className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Settings</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); logout(); setIsUserMenuOpen(false); }} className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Logout</a>
                    </div>
                 )}
              </div>
            ) : (
                <div className="hidden md:flex items-center space-x-2">
                    <button onClick={() => setView('login')} className="px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors">Login</button>
                    <button onClick={() => setView('register')} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">Register</button>
                </div>
            )}
             <div className="md:hidden ml-4">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                    {isMenuOpen ? (
                        <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>
          </div>
        </div>
      </div>

       {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             {menuItems.map(item => (
              <a key={item} href="#" onClick={(e) => { e.preventDefault(); handleNavClick(item);}} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">
                {item}
              </a>
            ))}
            {currentUser?.userType === UserType.Provider && (
                 <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('notifications');}} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">Notifications</a>
            )}
          </div>
          {currentUser ? (
            <div className="pt-4 pb-3 border-t border-slate-200">
                <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                       <div className="flex items-center justify-end gap-1">
                            <StarRating rating={currentUser.avgRating} size="small"/>
                       </div>
                    </div>
                    <div className="ml-3">
                      <div className="flex items-center gap-1.5 mb-1">
                          {currentUser.userType === UserType.Provider && currentUser.verificationStatus === VerificationStatus.Verified && (
                              <span title="Verified Provider" className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                  Verified
                              </span>
                          )}
                          <div className="text-base font-medium leading-none text-slate-800">{currentUser.name}</div>
                      </div>
                      <div className="text-sm font-medium leading-none text-slate-500">{currentUser.email}</div>
                    </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                    <button
                        onClick={() => { setView('settings'); setIsMenuOpen(false); }}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                    >
                        Settings
                    </button>
                    <button
                        onClick={() => { logout(); setIsMenuOpen(false); }}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                    >
                        Logout
                    </button>
                </div>
            </div>
          ) : (
            <div className="px-2 pt-2 pb-3 space-y-2">
                <a href="#" onClick={(e) => {e.preventDefault(); setView('login'); setIsMenuOpen(false);}} className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-blue-600 bg-white border border-slate-300 hover:bg-slate-50">Login</a>
                <a href="#" onClick={(e) => {e.preventDefault(); setView('register'); setIsMenuOpen(false);}} className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700">Register</a>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;