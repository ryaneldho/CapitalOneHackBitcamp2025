import axiosApiInstance from './axiosApiInstance';
import { Transaction } from '../hooks/useTransactions';
import { AxiosResponse } from 'axios';

// all of the positives to balance
// export const getDeposits = (accountId: string) =>{
//   return axiosApiInstance.get(`/accounts/${accountId}/deposits`);
// }

export const getDeposits = (accountId: string): Promise<AxiosResponse<Transaction[]>> => {
  return axiosApiInstance.get(`/accounts/${accountId}/deposits`);
};

export const getLoans = (accountId: string): Promise<AxiosResponse<Transaction[]>> => {
  return axiosApiInstance.get(`/accounts/${accountId}/loans`);
};


// all of the negatives to balance
export const getPurchases = (accountId: string): Promise<AxiosResponse<Transaction[]>> => {
  return axiosApiInstance.get(`/accounts/${accountId}/purchases`);
};

export const getWithdrawals = (accountId: string): Promise<AxiosResponse<Transaction[]>> => {
  return axiosApiInstance.get(`/accounts/${accountId}/withdrawals`);
};

export const getTransfers = (accountId: string): Promise<AxiosResponse<Transaction[]>> => {
  return axiosApiInstance.get(`/accounts/${accountId}/transfers`);
};

export const getBills = (accountId: string): Promise<AxiosResponse<Transaction[]>> => {
  return axiosApiInstance.get(`/accounts/${accountId}/bills`);
};

