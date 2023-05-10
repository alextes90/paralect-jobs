import { BASE_URL, SECRET_KEY, Authorization } from "@/constants/api";
import { setCategories } from "@/redux/features/inputSlice";
import { useAppDispatch } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "./CustomHeader.module.scss";

const CustomHeader = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch(`${BASE_URL}/2.0/catalogues/`, {
        method: "GET",
        headers: {
          "x-secret-key": SECRET_KEY,
          "X-Api-App-Id": `${Authorization.client_secret}`,
        },
      });
      if (!response.ok) {
        throw Error("Failed to fetch");
      }
      const data = await response.json();
      dispatch(setCategories(data));
    };
    try {
      getCategories();
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  return (
    <nav className={styles.header}>
      <div className={styles.logo}>
        <Image src='/Union.svg' alt='logo' width={30} height={30} />
        <span>Jobored</span>
      </div>
      <div>
        <ul>
          <li>
            <Link
              className={`${router.pathname === "/" ? styles.active : ""}`}
              href='/'
            >
              Поиск Вакансий
            </Link>
          </li>
          <li>
            <Link
              className={`${
                router.pathname === "/favorites" ? styles.active : ""
              }`}
              href='/favorites'
            >
              Избранное
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default CustomHeader;
