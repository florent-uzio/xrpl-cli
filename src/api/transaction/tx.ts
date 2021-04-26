import { FormattedTransactionType, RippleAPI } from "ripple-lib";

export const tx = async (
  id: string,
  api: RippleAPI
): Promise<FormattedTransactionType | void> => {
  try {
    const txInfo = await api.getTransaction(id);
    return txInfo;
  } catch (err) {
    console.log(`Transaction ${id} not found: ${err}`);
  }
};

export default tx;
