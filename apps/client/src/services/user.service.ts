import httpClient from "../commons/http-client";
import { LoginFields } from "../components/users/user-login.form";
import { RegisFields } from "../components/users/user-regis.form";

const REGIS_URL = "/users/sign-up";
const LOGIN_URL = "/users/sign-in";

const userService = {
  regis: async (payload: RegisFields) => {
    try {
      return await httpClient.post(REGIS_URL, payload);
    } catch (err: any) {
      return err;
    }
  },
  login: async (payload: LoginFields) => {
    try {
      return await httpClient.post(LOGIN_URL, payload);
    } catch (err: any) {
      return err;
    }
  },
};

export default userService;
