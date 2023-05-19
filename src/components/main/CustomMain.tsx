import { Authorization, BASE_URL, SECRET_KEY } from "@/constants/api";
import { LOCAL_KEY } from "@/constants/defaultVal";
import { setErrorMessage } from "@/redux/features/errorSlicer";
import { setToken } from "@/redux/features/inputSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import Search from "../search/Search";

export default function CustomMain() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.inputSlicer.token);
  const curDay = Date.now();

  useEffect(() => {
    if (!token.access_token || token.ttl * 1000 < curDay) {
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
          throw Error("Failed to get token");
        }
        const data = await response.json();
        dispatch(
          setToken({
            access_token: data.access_token,
            expires_in: data.expires_in,
            ttl: data.ttl,
          })
        );
        localStorage.setItem(
          LOCAL_KEY,
          JSON.stringify({
            access_token: data.access_token,
            expires_in: data.expires_in,
            ttl: data.ttl,
          })
        );
        return;
      };
      (async () => {
        try {
          await getToken();
        } catch (err) {
          dispatch(
            setErrorMessage("Failed to receive token please refresh the page")
          );
          console.error(err);
        }
      })();
    }
  }, [token, dispatch, curDay]);

  return <Search />;
}
