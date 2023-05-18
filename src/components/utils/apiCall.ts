import { BASE_URL, SECRET_KEY, Authorization } from "@/constants/api";
import { ITEMS_PER_PAGE, LOCAL_KEY, SALARY } from "@/constants/defaultVal";

export const getVacancies = async (
  searchInput = "",
  category = "",
  salary = { amountForm: SALARY.amountForm, amountTill: SALARY.amountTill },

  token = "",
  page = 0
) => {
  const response = await fetch(
    `${BASE_URL}/2.0/vacancies/?page=${page}&count=${ITEMS_PER_PAGE}&published=1&keyword=${searchInput}&catalogues=${category}&payment_from=${salary.amountForm}&payment_to=${salary.amountTill}&no_agreement=1`,
    {
      method: "GET",
      headers: {
        "x-secret-key": SECRET_KEY,
        Authorization: `Bearer ${token}`,
        "X-Api-App-Id": `${Authorization.client_secret}`,
      },
    }
  );
  // if (response.status === 410) {
  //   localStorage.removeItem(LOCAL_KEY);
  //   location.reload();
  //   return;
  // }
  if (!response.ok) {
    throw Error("Failed to fetch");
  }
  const data = await response.json();
  return data;
};
