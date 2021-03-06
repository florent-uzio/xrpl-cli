import inquirer from "inquirer";
import { Answer, Choice, BeginningChoices } from "../models/answer-choice";

export const beginningQuestion = async (): Promise<Answer> => {
  const choices: Choice[] = [
    {
      name: "Generate a faucet wallet",
      value: BeginningChoices.GenerateFaucetWallet
    },
    {
      name: "Go to account methods",
      value: BeginningChoices.AccountMethod
    },
    {
      name: "Go to ledger methods",
      value: BeginningChoices.LedgerMethod
    },
    {
      name: "Go to transaction methods",
      value: BeginningChoices.TransactionMethod
    },
    { name: "Exit", value: BeginningChoices.Exit }
  ];

  return inquirer.prompt([
    {
      name: "choice",
      type: "rawlist",
      message: "What to do?",
      choices: choices
    }
  ]);
};
