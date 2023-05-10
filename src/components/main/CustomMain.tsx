import { Authorization, BASE_URL, SECRET_KEY } from "@/constants/api";
import { setToken } from "@/redux/features/inputSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import Search from "../search/Search";

const LOCAL_KEY = "LOCAL_KEY_PARALECT";

export default function CustomMain() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.inputSlicer.token);

  useEffect(() => {
    if (!token) {
      const getToken = async () => {
        const response = await fetch(
          `${BASE_URL}/2.0/oauth2/password/?login=${Authorization.login}&password=${Authorization.password}&client_id=${Authorization.client_id}&client_secret=${Authorization.client_secret}`,
          {
            method: "GET",
            headers: {
              "x-secret-key": SECRET_KEY,
            },
          }
        );
        if (!response.ok) {
          throw Error("Failed to fetch");
        }
        const data = await response.json();
        dispatch(setToken(data.access_token));
        localStorage.setItem(LOCAL_KEY, data.access_token);
      };
      try {
        getToken();
      } catch (err) {
        console.error(err);
      }
    }
  }, [token, dispatch]);

  return <Search />;
}
