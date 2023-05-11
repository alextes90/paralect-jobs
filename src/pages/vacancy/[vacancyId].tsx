import VacancyHeader from "@/components/vacancyHeader/VacancyHeader";
import { BASE_URL, SECRET_KEY, Authorization, ItemData } from "@/constants/api";
import { Loader } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./vacancy.module.scss";

interface VacancyData extends ItemData {
  vacancyRichText: string;
}

export default function Home() {
  const router = useRouter();
  const { vacancyId } = router.query;
  const [data, setData] = useState<VacancyData | null>(null);

  useEffect(() => {
    if (vacancyId) {
      const getVacancy = async () => {
        const response = await fetch(
          `${BASE_URL}/2.0/vacancies/${vacancyId}/`,
          {
            method: "GET",
            headers: {
              "x-secret-key": SECRET_KEY,
              "X-Api-App-Id": `${Authorization.client_secret}`,
            },
          }
        );
        if (!response.ok) {
          throw Error("Failed to fetch");
        }
        const data = await response.json();
        setData(data);
      };
      try {
        getVacancy();
      } catch (err) {
        console.error(err);
      }
    }
  }, [vacancyId]);

  return (
    <main className={styles.container}>
      {data ? (
        <>
          <VacancyHeader itemData={data} />
          <div
            className={styles.container_description}
            dangerouslySetInnerHTML={{ __html: data.vacancyRichText }}
          />
        </>
      ) : (
        <div>
          <Loader />
        </div>
      )}
    </main>
  );
}
