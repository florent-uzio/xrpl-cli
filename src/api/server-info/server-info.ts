import { RippleAPI } from "ripple-lib";
import { GetServerInfoResponse } from "ripple-lib/dist/npm/common/serverinfo";

export const server_info = async (
  api: RippleAPI
): Promise<GetServerInfoResponse> => {
  return await api.getServerInfo();
};

export default server_info;
