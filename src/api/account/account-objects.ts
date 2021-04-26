import { AccountObjectsResponse, RippleAPI } from "ripple-lib";

export const account_objects = async (
  address: string,
  api: RippleAPI
): Promise<AccountObjectsResponse | void> => {
  try {
    const accountObjects = await api.getAccountObjects(address);
    return accountObjects;
  } catch (err) {
    console.log(
      `Error getting the account ${address}: ${err.data.error_message}`
    );
  }
};

export default account_objects;
