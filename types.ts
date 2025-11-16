
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
  isVerified: boolean;
  paymentMethods?: PaymentInfo[];
}

export interface Job {
  id: number;
  customerId: number;
  providerId?: number;
  serviceType: string;
  address: string;
  dateTime: Date;
  price: number;
  status: JobStatus;
  paymentMethod: PaymentMethod;
  customerRating?: number;
  providerRating?: number;
  customerReview?: string;
  providerReview?: string;
}
