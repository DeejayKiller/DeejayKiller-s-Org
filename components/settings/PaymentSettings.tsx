import React, { useState, useContext } from 'react';
import { AppContext } from '../../types';
import type { PaymentInfo } from '../../types';
import AddPaymentMethodModal from './AddPaymentMethodModal';

const PaymentSettings: React.FC = () => {
    const { currentUser, updateUser } = useContext(AppContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!currentUser) return null;

    const removePaymentMethod = (details: string) => {
        if (confirm('Are you sure you want to remove this payment method?')) {
            const updatedMethods = currentUser.paymentMethods?.filter(pm => pm.details !== details);
            updateUser({ ...currentUser, paymentMethods: updatedMethods });
        }
    };

    const addPaymentMethod = (paymentInfo: PaymentInfo) => {
        const updatedMethods = [...(currentUser.paymentMethods || []), paymentInfo];
        updateUser({ ...currentUser, paymentMethods: updatedMethods });
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'Card': return '💳';
            case 'PayPal': return '🅿️';
            case 'Crypto': return '₿';
            default: return '💵';
        }
    }

    return (
        <>
            <div>
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <h2 className="text-2xl font-bold">Payment Methods</h2>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                        + Add New
                    </button>
                </div>
                <div className="space-y-3">
                    {currentUser.paymentMethods && currentUser.paymentMethods.length > 0 ? (
                        currentUser.paymentMethods.map((pm, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{getIcon(pm.type)}</span>
                                    <div>
                                        <p className="font-semibold">{pm.type}</p>
                                        <p className="text-sm text-slate-500">{pm.details}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removePaymentMethod(pm.details)}
                                    className="text-sm font-medium text-red-500 hover:text-red-700"
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-slate-500 text-center py-4">No payment methods saved.</p>
                    )}
                </div>
            </div>
            {isModalOpen && <AddPaymentMethodModal onClose={() => setIsModalOpen(false)} onAdd={addPaymentMethod} />}
        </>
    );
};

export default PaymentSettings;
