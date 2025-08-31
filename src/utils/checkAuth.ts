import { User } from "../../types/User";
import { getAccessToken } from "./tokenHelpers";

// fake get user request to check validity of token
async function getUser(token?: string | null): Promise<User | null> {
    if (!token) {
      return null;
    }
  
    return new Promise((resolve) => {
      window.setTimeout(() => {
        resolve({
          id: "1",
          name: "John Doe",
        });
      }, 10000);
    });
  }

export async function checkAuth() {
    const accessToken = getAccessToken();
    const user = await getUser(accessToken);
    return !!user;
}
