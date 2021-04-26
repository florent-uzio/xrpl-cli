import { RippleAPI } from "ripple-lib";
import { FormattedTrustlineSpecification } from "ripple-lib/dist/npm/common/types/objects";
import { Payment } from "ripple-lib/dist/npm/transaction/payment";

export const prepare_payment = async (
  sourceAddress: string,
  destinationAddress: string,
  amount: string,
  tokenSymbol: string,
  api: RippleAPI
) => {
  const payment: Payment = {
    source: {
      address: sourceAddress,
      maxAmount: {
        value: amount,
        currency: tokenSymbol,
        counterparty: sourceAddress
      }
    },
    destination: {
      address: destinationAddress,
      amount: {
        value: amount,
        currency: tokenSymbol,
        counterparty: sourceAddress
      }
    }
  };
  const preparedTransaction = await api.preparePayment(sourceAddress, payment);

  return preparedTransaction;
};

/**
 * Prepare a TrustSet/TrustLine
 *
 * @param sourceAddress
 * @param destinationAddress
 * @param amount
 * @param tokenSymbol
 * @param api
 * @returns
 */
export const prepare_trustset = async (
  sourceAddress: string,
  destinationAddress: string,
  amount: string,
  tokenSymbol: string,
  api: RippleAPI
) => {
  const trustSet: FormattedTrustlineSpecification = {
    currency: tokenSymbol,
    limit: amount,
    counterparty: sourceAddress // Issuer address
  };
  const preparedTransaction = await api.prepareTrustline(
    destinationAddress,
    trustSet
  );

  return preparedTransaction;
};
