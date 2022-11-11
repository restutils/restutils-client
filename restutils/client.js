const { http } = require('restutils-helpers');
 
const CLIENT_BASE = 'http://localhost:3015';
 
const client = {
  mobile: {
    receive: async (data) => http.doPost(`${CLIENT_BASE}/mobile/receive`, data)
  },
  verifications: {
    fetchPending: async (data) => http.doPost(`${CLIENT_BASE}/verifications/fetch-pending`, data),
    sendRequests: async (data) => http.doPost(`${CLIENT_BASE}/verifications/send-requests`, data)
  },
  testing: {
    email: {
      send: {
        sendMessage: async (data) => http.doPost(`${CLIENT_BASE}/testing/email/send/send-message`, data)
      }
    }
  }
};
 
module.exports = {
  client,
};
