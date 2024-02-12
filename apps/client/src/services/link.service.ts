import httpClient from "./base.service";
import { ShortenField } from "../components/links/link-form.section";

const SHORTEN_URL = "/links/shorten";
const LIST_URL = "/links/list";

const linkService = {
  shorten: async (payload: ShortenField) => {
    try {
      return await httpClient.post(SHORTEN_URL, payload);
    } catch (err: any) {
      return err;
    }
  },
  list: async (skip: number, limit: number) => {
    try {
      return await httpClient.get(`${LIST_URL}?skip=${skip}&limit=${limit}`);
    } catch (err: any) {
      return err;
    }
  },
};

export default linkService;
