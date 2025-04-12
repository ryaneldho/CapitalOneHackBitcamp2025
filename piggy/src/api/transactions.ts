import axiosApiInstance from './axiosApiInstance';

export const getDeposits = (accountId: string) =>{
  return axiosApiInstance.get(`/accounts/${accountId}/deposits`);
}


export const getPurchases = (accountId: string) => {
  return axiosApiInstance.get(`/accounts/${accountId}/purchases`);
}
