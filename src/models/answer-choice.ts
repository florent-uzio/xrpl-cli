export interface Answer {
  choice: string;
}

export interface Choice {
  name: string;
  value: BeginningChoices | LedgerChoices;
}

export enum BeginningChoices {
  GenerateFaucetWallet = "GENERATE A FAUCET WALLET",
  AccountMethod = "ACCOUNT METHODS",
  LedgerMethod = "LEDGER METHODS",
  TransactionMethod = "TRANSACTION METHODS",
  PathAndOrderBook = "PATH AND ORDER BOOK",
  PaymentChannel = "PAYMENT CHANNEL",
  Subscription = "SUBSCRIPTION",
  ServerInfo = "SERVER INFO",
  Utility = "UTILITY",
  Exit = "EXIT"
}

export enum LedgerChoices {
  Fee = "FEE",
  ServerInfo = "SERVER INFO",
  Exit = "EXIT"
}
