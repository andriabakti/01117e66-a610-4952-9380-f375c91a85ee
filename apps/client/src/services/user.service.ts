import axios from "axios";
import { LoginFields } from "../components/user-login.form";
import { RegisFields } from "../components/user-regis.form";

const REGIS_URL = `${process.env.NEXT_PUBLIC_SERVER_API}/users/sign-up`;
const LOGIN_URL = `${process.env.NEXT_PUBLIC_SERVER_API}/users/sign-in`;

const userService = {
  regis: async (payload: RegisFields) => {
    try {
      const res = await axios.post(REGIS_URL, payload);
      return res.data;
    } catch (err: any) {
      return err.response.data;
    }
  },
  login: async (payload: LoginFields) => {
    try {
      const res = await axios.post(LOGIN_URL, payload);
      return res.data;
    } catch (err: any) {
      return err.response.data;
    }
  },
};

export default userService;
