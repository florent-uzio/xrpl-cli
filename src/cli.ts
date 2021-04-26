import { RippleAPI } from "ripple-lib";
import {
  generate_faucet_wallet,
  fee,
  server_info,
  account_info,
  account_objects,
  tx
} from "./api";
import {
  AccountChoices,
  Answer,
  BeginningChoices,
  LedgerChoices,
  TransactionChoices,
  TransactionTypeChoices
} from "./models/answer-choice";
import {
  beginningQuestion,
  ledgerQuestion,
  transactionQuestion
} from "./questions";
import { accountQuestion } from "./questions/account";
import { Transaction } from "./transaction";

export class CLI {
  api: RippleAPI;

  constructor(api: RippleAPI) {
    this.api = api;
    this.executeCLI();
  }

  public async executeCLI(): Promise<any> {
    let beginningAnswer: Answer = await beginningQuestion();

    switch (beginningAnswer.choice) {
      case BeginningChoices.GenerateFaucetWallet: {
        await generate_faucet_wallet();

        this.restartCli();
        break;
      }

      case BeginningChoices.AccountMethod: {
        let accountAnswer: Answer = await accountQuestion(this.api);

        await this.actOnAccountMethodChoice(accountAnswer);
        break;
      }

      case BeginningChoices.LedgerMethod: {
        let ledgerAnswer: Answer = await ledgerQuestion();

        await this.actOnLedgerMethodChoice(ledgerAnswer);
        break;
      }

      case BeginningChoices.TransactionMethod: {
        let transactionAnswer: Answer = await transactionQuestion(this.api);

        await this.actOnTransactionMethodChoice(transactionAnswer);

        await this.actOnLedgerMethodChoice(transactionAnswer);
        break;
      }

      case BeginningChoices.Exit: {
        await this.disconnectApi();
        break;
      }

      default: {
        await this.disconnectApi();
      }
    }
  }

  private async disconnectApi() {
    try {
      await this.api.disconnect();
    } catch (err) {
      console.log(`Error disconnecting websocket: ${err}`);
    }
  }

  private restartCli() {
    console.log("");
    this.executeCLI();
  }

  /**
   * What action to take from the ledger methods
   *
   * @param ledgerAnswer
   */
  private async actOnLedgerMethodChoice(ledgerAnswer: Answer): Promise<void> {
    switch (ledgerAnswer.choice) {
      case LedgerChoices.Fee: {
        const minFee = await fee(this.api);
        console.log(minFee);

        this.restartCli();
        break;
      }

      case LedgerChoices.ServerInfo: {
        const serverInfo = await server_info(this.api);
        console.log(serverInfo);

        this.restartCli();
        break;
      }

      case LedgerChoices.Exit: {
        await this.disconnectApi();
      }
    }
  }

  private async actOnAccountMethodChoice(accountAnswer: Answer): Promise<void> {
    switch (accountAnswer.choice) {
      case AccountChoices.AccountInfo: {
        if (accountAnswer.address) {
          const accountAddress = accountAnswer.address.trim();

          const accountInfo = await account_info(accountAddress, this.api);
          console.log(accountInfo);
        }
        this.restartCli();
        break;
      }

      case AccountChoices.AccountObjects: {
        if (accountAnswer.address) {
          const accountAddress = accountAnswer.address.trim();

          const accountObjects = await account_objects(
            accountAddress,
            this.api
          );
          console.log(JSON.stringify(accountObjects, null, 2));
        }
        this.restartCli();
        break;
      }

      case AccountChoices.Exit: {
        await this.disconnectApi();
        break;
      }

      default: {
        await this.disconnectApi();
      }
    }
  }

  private async actOnTransactionMethodChoice(
    transactionAnswer: Answer
  ): Promise<void> {
    switch (transactionAnswer.choice) {
      case TransactionChoices.Tx: {
        if (transactionAnswer.tx_hash) {
          const transaction = await tx(transactionAnswer.tx_hash, this.api);
          if (transaction && typeof transaction !== "undefined") {
            console.log(transaction);
          }
        } else {
          console.error("Transaction ID undefined");
        }
        this.restartCli();
        break;
      }

      case TransactionChoices.Submit: {
        switch (transactionAnswer.tx_type) {
          case TransactionTypeChoices.Payment: {
            // const transaction = new Transaction(
            //   TransactionTypeChoices.Payment,
            //   this.api
            // );
            // const preparedTxn = await transaction.prepareTransaction(
            //   transactionAnswer.address!,
            //   transactionAnswer.destination_address!,
            //   transactionAnswer.amount!,
            //   transactionAnswer.currency!
            // );

            // if (preparedTxn) {
            //   const submittedTxn = await transaction.submitTransaction(
            //     preparedTxn,
            //     transactionAnswer.secret!
            //   );
            //   if (submittedTxn && typeof submittedTxn !== "undefined") {
            //     console.log(submittedTxn);
            //   }
            // }

            await this.prepareAndSubmit(
              transactionAnswer,
              TransactionTypeChoices.Payment
            );

            break;
          }

          case TransactionTypeChoices.TrustSet: {
            await this.prepareAndSubmit(
              transactionAnswer,
              TransactionTypeChoices.TrustSet
            );

            break;
          }
        }

        this.restartCli();
        break;
      }

      default: {
        await this.disconnectApi();
      }
    }
  }

  /**
   * Prepare and submit a transaction
   *
   * @param transactionAnswer
   * @param transactionType
   */
  private async prepareAndSubmit(
    transactionAnswer: Answer,
    transactionType: TransactionTypeChoices
  ) {
    const transaction = new Transaction(transactionType, this.api);
    const preparedTxn = await transaction.prepareTransaction(
      transactionAnswer.address!,
      transactionAnswer.destination_address!,
      transactionAnswer.amount!,
      transactionAnswer.currency!
    );

    if (preparedTxn) {
      const submittedTxn = await transaction.submitTransaction(
        preparedTxn,
        transactionAnswer.secret!
      );
      if (submittedTxn && typeof submittedTxn !== "undefined") {
        console.log(submittedTxn);
      }
    }
  }
}
