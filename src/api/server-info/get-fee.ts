import { RippleAPI } from "ripple-lib";

export const fee = async (api: RippleAPI): Promise<string> => {
  return await api.getFee();
};

export default fee;
