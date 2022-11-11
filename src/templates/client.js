const { http } = require('restutils-client');

const CLIENT_A_BASE = 'http://localhost:3001';
const CLIENT_B_BASE = 'http://localhost:3002';
const CLIENT_C_BASE = 'http://localhost:3003';

const clientA = {
  mailbox: {
    byAddress: async (data) => http.doPost(`${CLIENT_A_BASE}/mailbox/by-address`, data),
    initAddress: async (data) => http.doPost(`${CLIENT_A_BASE}/mailbox/init-address`, data),
  }
};

const clientB = {
  sender: {
    isVerified: async (data) => http.doPost(CLIENT_B_BASE, data)
  }
};

const clientC = {
  messages: {
    storeIncoming: async (data) => http.doPost(CLIENT_C_BASE, data)
  }
};

module.exports = {
  clientA,
  clientB,
  clientC,
}