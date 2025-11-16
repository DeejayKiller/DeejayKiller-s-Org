
import React from 'react';

interface GDPRProps {
  onBack: () => void;
}

const GDPR: React.FC<GDPRProps> = ({ onBack }) => {
  return (
    <div className="container mx-auto max-w-4xl bg-white p-6 sm:p-8 rounded-lg shadow-lg animate-fade-in-up">
        <div className="prose max-w-none">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-4">GDPR Compliance Statement</h1>
            <p className="text-sm text-slate-500">Last updated: {new Date().toLocaleDateString()}</p>

            <h2 className="text-2xl font-bold mt-6">Introduction</h2>
            <p>CleanSweep ("we," "our," or "us") is committed to protecting and respecting your privacy. This GDPR Compliance Statement explains how we collect, process, and protect personal data in compliance with the General Data Protection Regulation (GDPR).</p>

            <h2 className="text-2xl font-bold mt-6">Data We Collect</h2>
            <p>We may collect and process the following data about you:</p>
            <ul>
                <li><strong>Identity Data:</strong> Includes first name, last name, and user type (Customer/Provider).</li>
                <li><strong>Contact Data:</strong> Includes email address and physical address for services.</li>
                <li><strong>Verification Data (for Providers):</strong> Includes scanned copies of passport and DBS check results to ensure the safety and security of our platform.</li>
                <li><strong>Transaction Data:</strong> Includes details about payments to and from you, and other details of services you have purchased from us.</li>
                <li><strong>Technical Data:</strong> Includes internet protocol (IP) address, your login data, browser type and version, and other technology on the devices you use to access this platform.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-6">How We Use Your Data</h2>
            <p>We use your personal data to operate, maintain, and provide you with the features and functionality of the CleanSweep platform. This includes:</p>
            <ul>
                <li>Registering you as a new user.</li>
                <li>Connecting customers with service providers.</li>
                <li>Processing payments for services.</li>
                <li>Verifying the identity and credentials of service providers.</li>
                <li>Managing our relationship with you, including notifications about jobs and reviews.</li>
                <li>Ensuring the security of our platform and preventing fraud.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-6">Data Sharing</h2>
            <p>We do not sell your personal data. We may share your data with:</p>
            <ul>
                <li>Customers and Service Providers to facilitate a booked service (e.g., sharing a customer's address with the provider).</li>
                <li>Third-party payment processors to handle transactions securely.</li>
                <li>Law enforcement or other authorities if required by applicable law.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-6">Your Rights</h2>
            <p>Under GDPR, you have several rights in relation to your personal data, including:</p>
            <ul>
                <li><strong>The right to access:</strong> You can request copies of your personal data.</li>
                <li><strong>The right to rectification:</strong> You can request that we correct any information you believe is inaccurate.</li>
                <li><strong>The right to erasure:</strong> You can request that we erase your personal data, under certain conditions.</li>
                <li><strong>The right to restrict processing:</strong> You can request that we restrict the processing of your personal data, under certain conditions.</li>
            </ul>
            <p>To exercise these rights, please contact us.</p>

            <h2 className="text-2xl font-bold mt-6">Data Security</h2>
            <p>We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. Access to your personal data is limited to those employees and third parties who have a business need to know.</p>

            <h2 className="text-2xl font-bold mt-6">Contact Us</h2>
            <p>If you have any questions about this GDPR Compliance Statement or our data protection practices, please contact us at <a href="mailto:privacy@cleansweep.com" className="text-blue-600 hover:underline">privacy@cleansweep.com</a>.</p>
        </div>

      <div className="text-center">
        <button onClick={onBack} className="mt-8 px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">
            &larr; Back to App
        </button>
      </div>
    </div>
  );
};

export default GDPR;
