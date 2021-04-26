import inquirer from "inquirer";
import { RippleAPI } from "ripple-lib";
import {
  Answer,
  Choice,
  TransactionChoices,
  TransactionTypeChoices
} from "../models/answer-choice";

export const transactionQuestion = async (api: RippleAPI): Promise<Answer> => {
  const choices: Choice[] = [
    {
      name: "Submit transaction",
      value: TransactionChoices.Submit
    },
    {
      name: "Transaction by ID",
      value: TransactionChoices.Tx
    },
    { name: "Exit", value: TransactionChoices.Exit }
  ];

  const transactionTypeChoice: Choice[] = [
    {
      name: "Payment",
      value: TransactionTypeChoices.Payment
    },
    {
      name: "TrustSet",
      value: TransactionTypeChoices.TrustSet
    }
  ];

  return inquirer.prompt([
    {
      name: "choice",
      type: "rawlist",
      message: "What to do?",
      choices: choices
    },
    {
      name: "tx_hash",
      type: "input",
      message: "Enter the transaction hash",
      when(answer: Answer) {
        if (answer.choice === TransactionChoices.Tx) {
          return true;
        }
        return false;
      }
    },
    {
      name: "tx_type",
      type: "list",
      message: "Select the transaction type",
      when(answer: Answer) {
        if (answer.choice === TransactionChoices.Submit) {
          return true;
        }
        return false;
      },
      choices: transactionTypeChoice
    },
    {
      name: "address",
      type: "input",
      message(answer: Answer) {
        if (answer.tx_type === TransactionTypeChoices.TrustSet) {
          return "Enter the issuer address";
        }
        return "Enter the source address";
      },
      when(answer: Answer) {
        if (answer.choice === TransactionChoices.Submit) {
          return true;
        }
        return false;
      },
      validate(input) {
        if (!input) {
          return "Invalid address";
        }
        if (api.isValidAddress(input)) {
          return true;
        }
        return "Invalid address";
      },
      filter(input: string) {
        return input.trim();
      }
    },
    {
      name: "destination_address",
      type: "input",
      message: "Enter the destination address",
      when(answer: Answer) {
        if (answer.choice === TransactionChoices.Submit) {
          return true;
        }
        return false;
      },
      validate(input) {
        if (!input) {
          return "Invalid address";
        }
        if (api.isValidAddress(input)) {
          return true;
        }
        return "Invalid address";
      },
      filter(input: string) {
        return input.trim();
      }
    },
    {
      name: "currency",
      type: "input",
      message: "Enter the currency (default XRP)",
      default: "XRP",
      when(answer: Answer) {
        if (answer.choice === TransactionChoices.Submit) {
          return true;
        }
        return false;
      },
      validate(input) {
        if (!input) {
          return "Enter a currency";
        }
        return true;
      },
      filter(input: string) {
        if (input.length > 3) {
          return Buffer.from(input, "ascii")
            .toString("hex")
            .toUpperCase()
            .padEnd(40, "0");
        }
        return input.trim().toUpperCase();
      }
    },
    {
      name: "amount",
      type: "input",
      message(answer: Answer) {
        if (answer.tx_type === TransactionTypeChoices.TrustSet) {
          return "Enter the limit amount";
        }
        return "Enter the amount";
      },
      when(answer: Answer) {
        if (answer.choice === TransactionChoices.Submit) {
          return true;
        }
        return false;
      },
      validate(input) {
        if (!input) {
          return "Invalid amount";
        }
        if (0 >= input) {
          return "Amount should be higher than 0";
        }
        if (isNaN(input)) {
          return "Amount must be a number";
        }
        return true;
      },
      filter(input: string) {
        return input.trim();
      }
    },
    {
      name: "secret",
      type: "input",
      message(answer: Answer) {
        if (answer.tx_type === TransactionTypeChoices.TrustSet) {
          return "Enter the destination account secret/seed";
        }
        return "Enter the source account secret/seed";
      },
      when(answer: Answer) {
        if (answer.choice === TransactionChoices.Submit) {
          return true;
        }
        return false;
      },
      filter(input: string) {
        return input.trim();
      }
    }
  ]);
};
