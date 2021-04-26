export interface Answer {
  choice: string;
  address?: string;
}

export interface Choice {
  name: string;
  value: BeginningChoices | LedgerChoices | AccountChoices;
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

export enum AccountChoices {
  AccountInfo = "ACCOUNT INFO",
  AccountChannels = "ACCOUNT CHANNELS",
  AccountCurrencies = "ACCOUNT CURRENCIES",
  AccountLines = "ACCOUNT LINES",
  AccountObjects = "ACCOUNT OBJECTS",
  AccountOffers = "ACCOUNT OFFERS",
  AccountTx = "ACCOUNT TX",
  GatewayBalances = "GATEWAY BALANCES",
  NoRippleCheck = "NO RIPPLE CHECK",
  Exit = "EXIT"
}
