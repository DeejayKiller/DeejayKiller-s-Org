
import type { Job, User } from './types';
import { JobStatus, PaymentMethod, UserType } from './types';

export const MOCK_USERS: User[] = [
  { id: 1, name: 'Alice Customer', email: 'alice@email.com', userType: UserType.Customer, avgRating: 4.8, ratingsCount: 10, isVerified: true, paymentMethods: [{type: PaymentMethod.Card, details: "Visa **** 4242"}, {type: PaymentMethod.PayPal, details: "alice@email.com"}] },
  { id: 2, name: 'Bob Provider', email: 'bob@email.com', userType: UserType.Provider, avgRating: 4.9, ratingsCount: 25, isVerified: true },
  { id: 3, name: 'Charlie Customer', email: 'charlie@email.com', userType: UserType.Customer, avgRating: 5.0, ratingsCount: 2, isVerified: true },
  { id: 4, name: 'Diana Provider', email: 'diana@email.com', userType: UserType.Provider, avgRating: 4.7, ratingsCount: 15, isVerified: false },
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
    price: 150,
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

export const CLEANING_SERVICES = [
    { name: 'Standard Clean', price: 75, description: "General tidying, dusting, vacuuming, and mopping." },
    { name: 'Deep Clean', price: 150, description: "Includes standard clean plus scrubbing, sanitizing, and detailed work." },
    { name: 'End of Tenancy Clean', price: 250, description: "A comprehensive clean to ensure you get your deposit back." },
    { name: 'Window Cleaning', price: 60, description: "Interior and exterior window washing for a streak-free shine." }
];
