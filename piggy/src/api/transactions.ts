import axiosApiInstance from './axiosApiInstance';

// all of the positives to balance
export const getDeposits = (accountId: string) =>{
  return axiosApiInstance.get(`/accounts/${accountId}/deposits`);
}

export const getLoans = (accountId : string) => {
  return axiosApiInstance.get(`/accounts/${accountId}/loans`);
}


// all of the negatives to balance
export const getPurchases = (accountId: string) => {
  return axiosApiInstance.get(`/accounts/${accountId}/purchases`);
}

export const getWithdrawals = (accountId: string) => {
  return axiosApiInstance.get(`/accounts/${accountId}/withdrawals`);
}

export const getTransfers = (accountId: string) => {
  return axiosApiInstance.get(`/accounts/${accountId}/transfers`);
}

export const getBills = (accountId: string) => {
  return axiosApiInstance.get(`/accounts/${accountId}/bills`);
}

