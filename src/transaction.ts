import { Prepare, RippleAPI } from "ripple-lib";
import { FormattedSubmitResponse } from "ripple-lib/dist/npm/transaction/submit";
import { prepare_payment, prepare_trustset } from "./api";
import { TransactionTypeChoices } from "./models/answer-choice";

export class Transaction {
  transaction_type: string;
  api: RippleAPI;

  constructor(transaction_type: TransactionTypeChoices, api: RippleAPI) {
    this.transaction_type = transaction_type;
    this.api = api;
  }

  public async prepareTransaction(
    sourceAddress: string,
    destinationAddress: string,
    amount: string,
    tokenSymbol: string
  ): Promise<Prepare | void> {
    let preparedTransaction: Prepare;

    switch (this.transaction_type) {
      case TransactionTypeChoices.Payment: {
        preparedTransaction = await prepare_payment(
          sourceAddress,
          destinationAddress,
          amount,
          tokenSymbol,
          this.api
        );

        break;
      }

      case TransactionTypeChoices.TrustSet: {
        preparedTransaction = await prepare_trustset(
          sourceAddress,
          destinationAddress,
          amount,
          tokenSymbol,
          this.api
        );

        break;
      }

      default: {
        // Defaults to a Payment
        preparedTransaction = await prepare_payment(
          sourceAddress,
          destinationAddress,
          amount,
          tokenSymbol,
          this.api
        );

        break;
      }
    }

    return preparedTransaction;
  }

  public async submitTransaction(
    prepared: Prepare,
    secret: string
  ): Promise<FormattedSubmitResponse> {
    if (!prepared.txJSON) {
      console.log(prepared);
      console.log("FATAL: Missing txJSON");
      process.exit(1);
    }
    const signedTransaction = this.api.sign(prepared.txJSON, secret);

    return this.api.submit(signedTransaction.signedTransaction);
  }
}
