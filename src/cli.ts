import { RippleAPI } from "ripple-lib";
import { generate_faucet_wallet, fee, server_info } from "./api";
import {
  Answer,
  BeginningChoices,
  LedgerChoices
} from "./models/answer-choice";
import { beginningQuestion, ledgerQuestion } from "./questions";

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

      case BeginningChoices.LedgerMethod: {
        let ledgerAnswer: Answer = await ledgerQuestion();

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
        break;
      }

      case BeginningChoices.Exit: {
        await this.disconnectApi();
        break;
      }

      default: {
        console.log("Default");
      }
    }
  }

  private async disconnectApi() {
    await this.api.disconnect();
  }

  private restartCli() {
    console.log("");
    this.executeCLI();
  }
}
