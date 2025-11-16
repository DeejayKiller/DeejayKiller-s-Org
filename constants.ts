import type { Job, User, Offer } from './types';
import { JobStatus, PaymentMethod, UserType, VerificationStatus, OfferStatus } from './types';

export const MOCK_USERS: User[] = [
  { id: 1, name: 'Alice Customer', email: 'alice@email.com', userType: UserType.Customer, avgRating: 4.8, ratingsCount: 10, verificationStatus: VerificationStatus.NotApplicable, paymentMethods: [{type: PaymentMethod.Card, details: "Visa **** 4242"}, {type: PaymentMethod.PayPal, details: "alice@email.com"}, {type: PaymentMethod.Crypto, details: "bc1q...xyz"}] },
  { id: 2, name: 'Bob Provider', email: 'bob@email.com', userType: UserType.Provider, avgRating: 4.9, ratingsCount: 25, verificationStatus: VerificationStatus.Verified, isAvailable: true },
  { id: 3, name: 'Charlie Customer', email: 'charlie@email.com', userType: UserType.Customer, avgRating: 5.0, ratingsCount: 2, verificationStatus: VerificationStatus.NotApplicable },
  { id: 4, name: 'Diana Provider', email: 'diana@email.com', userType: UserType.Provider, avgRating: 4.7, ratingsCount: 15, verificationStatus: VerificationStatus.Pending, isAvailable: true },
  { id: 5, name: 'Edward Provider', email: 'edward@email.com', userType: UserType.Provider, avgRating: 4.2, ratingsCount: 8, verificationStatus: VerificationStatus.Rejected, isAvailable: false },
];

export const MOCK_JOBS: Job[] = [
  {
    id: 1,
    customerId: 1,
    providerId: 2,
    serviceType: 'Standard Clean',
    address: '123 Main St, Anytown, USA',
    dateTime: new Date(new Date().setDate(new Date().getDate() + 2)),
    price: 75,
    status: JobStatus.Accepted,
    paymentMethod: PaymentMethod.Card,
  },
  {
    id: 2,
    customerId: 3,
    serviceType: 'Deep Clean',
    address: '456 Oak Ave, Anytown, USA',
    dateTime: new Date(new Date().setDate(new Date().getDate() + 3)),
    // No price, pending offers
    status: JobStatus.Pending,
    paymentMethod: PaymentMethod.PayPal,
  },
   {
    id: 3,
    customerId: 1,
    providerId: 4,
    serviceType: 'End of Tenancy Clean',
    address: '789 Pine Ln, Anytown, USA',
    dateTime: new Date(new Date().setDate(new Date().getDate() - 5)),
    price: 250,
    status: JobStatus.Reviewed,
    paymentMethod: PaymentMethod.Card,
    customerRating: 5,
    providerRating: 5,
    providerReview: "Alice was a fantastic customer! The house was prepared for cleaning, and communication was excellent.",
    customerReview: "Diana did an absolutely amazing job. The apartment was spotless, and she was very professional. Highly recommend!",
  },
  {
    id: 4,
    customerId: 3,
    providerId: 2,
    serviceType: 'Window Cleaning',
    address: '101 Skyview Rd, Anytown, USA',
    dateTime: new Date(new Date().setDate(new Date().getDate() - 2)),
    price: 60,
    status: JobStatus.Completed,
    paymentMethod: PaymentMethod.Cash
  }
];

export const MOCK_OFFERS: Offer[] = [
    { id: 1, jobId: 2, providerId: 2, price: 140, status: OfferStatus.Pending },
    { id: 2, jobId: 2, providerId: 5, price: 165, status: OfferStatus.Pending }, // Note: provider 5 is 'Rejected' verification, UI should handle this
];


export const CLEANING_SERVICES = [
    // Residential
    { name: 'Standard Clean', description: "General tidying, dusting, vacuuming, and mopping for homes." },
    { name: 'Deep Clean', description: "Includes standard clean plus scrubbing, sanitizing, and detailed work." },
    { name: 'End of Tenancy Clean', description: "A comprehensive clean to ensure you get your deposit back." },
    { name: 'Apartment Cleaning', description: "Specialized cleaning services for apartment living spaces." },
    { name: 'Move-In/Move-Out Cleaning', description: "Complete cleaning for empty homes before you move in or after you leave." },
    // Commercial
    { name: 'Office Cleaning', description: "Regular cleaning services for office spaces to maintain a professional environment." },
    { name: 'Retail Store Cleaning', description: "Cleaning for shops and retail outlets, including floors and windows." },
    { name: 'Restaurant Cleaning', description: "Kitchen, dining area, and restroom cleaning for food service establishments." },
    { name: 'Medical Facility Cleaning', description: "Specialized, hygienic cleaning for clinics and healthcare facilities." },
    // Specialized
    { name: 'Window Cleaning', description: "Interior and exterior window washing for a streak-free shine." },
    { name: 'Carpet Cleaning', description: "Deep steam cleaning for carpets to remove stains and allergens." },
    { name: 'Upholstery Cleaning', description: "Cleaning for sofas, chairs, and other upholstered furniture." },
    // FIX: Corrected typo 'name:t' to 'name'
    { name: "Post-Construction Cleaning", description: "Cleaning up dust and debris after construction or renovation projects." },
    { name: 'Eco-Friendly Cleaning', description: "Cleaning using only environmentally safe and non-toxic products." },
    { name: 'Event Clean-Up', description: "Cleaning services before and after parties, weddings, or corporate events." },
    { name: 'Pressure Washing', description: "High-pressure water spray to clean exterior surfaces like driveways and siding." },
];