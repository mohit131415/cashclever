export const UPI_CONFIG = {
    // Dummy UPI configuration
    maxAmount: 100000,
    minAmount: 1,
    supportedApps: [
      {
        id: 'gpay',
        name: 'Google Pay',
        icon: '📱'
      },
      {
        id: 'phonepe',
        name: 'PhonePe',
        icon: '💰'
      },
      {
        id: 'paytm',
        name: 'Paytm',
        icon: '💳'
      }
    ],
    transactionTypes: {
      PAYMENT: 'payment',
      COLLECTION: 'collection'
    },
    statusCodes: {
      SUCCESS: 'SUCCESS',
      FAILURE: 'FAILURE',
      PENDING: 'PENDING'
    },
    timeoutDuration: 60000, // 1 minute in milliseconds
    retryAttempts: 3,
    dummyMerchants: [
      {
        id: 'M001',
        name: 'Test Merchant',
        upiId: 'testmerchant@upi',
        icon: '🏪'
      }
    ]
  }