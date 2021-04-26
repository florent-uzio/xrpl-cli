import { RippleAPI } from "ripple-lib";
import { FormattedGetAccountInfoResponse } from "ripple-lib/dist/npm/ledger/accountinfo";

export const account_info = async (
  address: string,
  api: RippleAPI
): Promise<FormattedGetAccountInfoResponse | void> => {
  try {
    const accountInfo = await api.getAccountInfo(address);
    return accountInfo;
  } catch (err) {
    console.log(
      `Error getting the account ${address}: ${err.data.error_message}`
    );
  }
};

export default account_info;
