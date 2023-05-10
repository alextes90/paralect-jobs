export const BASE_URL = "https://startup-summer-2023-proxy.onrender.com";

export enum Authorization {
  login = "sergei.stralenia@gmail.com",
  password = "paralect123",
  client_id = 2356,
  client_secret = "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948",
  hr = 0,
}

export const SECRET_KEY = "GEU4nvd3rej*jeh.eqp";

export interface ItemData {
  id: string;
  profession: string;
  firm_name: string;
  town: { title: string };
  type_of_work: { title: string };
  payment_to: string;
  payment_from: string;
  currency: string;
}
