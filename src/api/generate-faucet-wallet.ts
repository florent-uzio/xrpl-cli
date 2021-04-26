import axios, { AxiosResponse } from "axios";

export const generate_faucet_wallet = async (): Promise<void> => {
  const FAUCET_URL = "https://faucet.altnet.rippletest.net/accounts";

  let response: AxiosResponse;
  try {
    response = await axios.post(FAUCET_URL);
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
};
