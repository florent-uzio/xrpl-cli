import inquirer from "inquirer";
import { Answer, Choice, LedgerChoices } from "../models/answer-choice";

export const ledgerQuestion = async (): Promise<Answer> => {
  const choices: Choice[] = [
    {
      name: "Fee",
      value: LedgerChoices.Fee
    },
    {
      name: "Server info",
      value: LedgerChoices.ServerInfo
    },
    { name: "Exit", value: LedgerChoices.Exit }
  ];

  return inquirer.prompt([
    {
      name: "choice",
      type: "rawlist",
      message: "What do you need?",
      choices: choices
    }
  ]);
};
