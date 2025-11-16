import React, { useContext } from 'react';
import { AppContext, UserType } from '../../types';
import { CLEANING_SERVICES } from '../../constants';
import BookingModal from '../shared/BookingModal';


const ServicesPage: React.FC = () => {
    const { currentUser, setBookingService } = useContext(AppContext);
    const [isBookingModalOpen, setIsBookingModalOpen] = React.useState(false);

    const handleBookNow = (serviceName: string) => {
        setBookingService(serviceName);
        setIsBookingModalOpen(true);
    };

    return (
        <>
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-slate-900">Our Cleaning Services</h1>
                    <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
                        From a quick touch-up to a deep, restorative clean, we offer a wide range of services to meet your needs. Browse our options below to find the perfect fit for your home or business.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {CLEANING_SERVICES.map((service) => (
                        <div key={service.name} className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between transition-all hover:shadow-xl hover:transform hover:-translate-y-1">
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">{service.name}</h3>
                                <p className="text-slate-600 text-sm mb-4">{service.description}</p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-200">
                                <div className="flex justify-between items-center">
                                    <p className="text-lg font-semibold text-slate-500">Request a Quote</p>
                                    {currentUser?.userType === UserType.Customer && (
                                         <button
                                             onClick={() => handleBookNow(service.name)}
                                             className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                         >
                                             Book Now
                                         </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {isBookingModalOpen && <BookingModal onClose={() => setIsBookingModalOpen(false)} />}
        </>
    );
};

export default ServicesPage;