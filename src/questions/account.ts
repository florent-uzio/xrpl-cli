import inquirer from "inquirer";
import { RippleAPI } from "ripple-lib";
import { AccountChoices, Answer, Choice } from "../models/answer-choice";

export const accountQuestion = async (api: RippleAPI): Promise<Answer> => {
  const choices: Choice[] = [
    {
      name: "Account info",
      value: AccountChoices.AccountInfo
    },
    {
      name: "Account objects",
      value: AccountChoices.AccountObjects
    },
    { name: "Exit", value: AccountChoices.Exit }
  ];

  return inquirer.prompt([
    {
      name: "choice",
      type: "rawlist",
      message: "What do you need?",
      choices: choices
    },
    {
      name: "address",
      type: "input",
      message: "Enter the account address",
      when(answer: Answer) {
        if (answer.choice === AccountChoices.Exit) {
          return false;
        }
        return true;
      },
      validate(input) {
        if (!input) {
          return "Invalid address";
        }
        if (api.isValidAddress(input)) {
          return true;
        }
        return "Invalid address";
      }
    }
  ]);
};
