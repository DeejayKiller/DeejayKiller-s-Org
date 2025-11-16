import React from 'react';

export enum UserType {
  Customer,
  Provider,
}

export enum JobStatus {
  Pending,
  Accepted,
  InProgress,
  Completed,
  Reviewed,
}

export enum PaymentMethod {
  Card = 'Card',
  PayPal = 'PayPal',
  Cash = 'Cash',
  Crypto = 'Crypto'
}

export enum VerificationStatus {
    NotApplicable, // For customers
    Pending,
    Verified,
    Rejected,
}

export enum OfferStatus {
    Pending,
    Accepted,
    Rejected,
}

export interface Offer {
    id: number;
    jobId: number;
    providerId: number;
    price: number;
    status: OfferStatus;
}


export interface PaymentInfo {
    type: PaymentMethod;
    details: string; // e.g. "Visa **** 1234" or "user@paypal.com"
}

export interface User {
  id: number;
  name: string;
  email: string;
  userType: UserType;
  avgRating: number;
  ratingsCount: number;
  passportFile?: File;
  dbsFile?: File;
  verificationStatus: VerificationStatus;
  paymentMethods?: PaymentInfo[];
  isAvailable?: boolean;
}

export interface Job {
  id: number;
  customerId: number;
  providerId?: number;
  serviceType: string;
  address: string;
  dateTime: Date;
  price?: number;
  status: JobStatus;
  paymentMethod: PaymentMethod;
  customerRating?: number;
  providerRating?: number;
  customerReview?: string;
  providerReview?: string;
  imageFile?: File;
}

export type View = 'landing' | 'login' | 'register' | 'gdpr' | 'services' | 'settings' | 'notifications';

export const AppContext = React.createContext<{
  currentUser: User | null;
  users: User[];
  jobs: Job[];
  offers: Offer[];
  login: (email: string) => void;
  logout: () => void;
  register: (user: Omit<User, 'id' | 'avgRating' | 'ratingsCount' | 'verificationStatus' | 'isAvailable'>) => void;
  createJob: (job: Omit<Job, 'id' | 'status' | 'customerId' | 'price'>) => void;
  updateJob: (updatedJob: Job) => void;
  submitReview: (jobId: number, reviewerId: number, rating: number, reviewText: string) => void;
  findUserById: (id: number) => User | undefined;
  setView: (view: View) => void;
  updateUser: (updatedUser: User) => void;
  bookingService: string | null;
  setBookingService: (serviceName: string | null) => void;
  createOffer: (jobId: number, price: number) => void;
  acceptOffer: (offerId: number) => void;
}>({
  currentUser: null,
  users: [],
  jobs: [],
  offers: [],
  login: () => {},
  logout: () => {},
  register: () => {},
  createJob: () => {},
  updateJob: () => {},
  submitReview: () => {},
  findUserById: () => undefined,
  setView: () => {},
  updateUser: () => {},
  bookingService: null,
  setBookingService: () => {},
  createOffer: () => {},
  acceptOffer: () => {},
});