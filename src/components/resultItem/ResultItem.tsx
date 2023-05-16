import { ItemData } from "@/constants/api";
import { LOCAL_STOR_KEY } from "@/constants/defaultVal";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import SaveIcon from "../saveIcon/SaveIcon";
import styles from "./ResultItem.module.scss";

interface ResultItemProps {
  itemData: ItemData;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}

export default function ResultItem({ itemData, setRefresh }: ResultItemProps) {
  const {
    id,
    profession,
    firm_name,
    town,
    type_of_work,
    payment_to,
    payment_from,
    currency,
  } = itemData;

  const favVac = JSON.parse(localStorage.getItem(LOCAL_STOR_KEY) || "[]");
  const isInFavArr = favVac.find((vacancy: ItemData) => vacancy.id === id)
    ? true
    : false;

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isInFavArr) {
      const savedVac = favVac.filter((vacancy: ItemData) => vacancy.id !== id);
      if (typeof window !== "undefined") {
        localStorage.setItem(LOCAL_STOR_KEY, JSON.stringify(savedVac));
      }
      setRefresh((prev) => !prev);
    } else {
      const savedVac = [
        ...favVac,
        {
          id,
          profession,
          firm_name,
          town,
          type_of_work,
          payment_from,
          payment_to,
          currency,
        },
      ];
      if (typeof window !== "undefined") {
        localStorage.setItem(LOCAL_STOR_KEY, JSON.stringify(savedVac));
      }
      setRefresh((prev) => !prev);
    }
  };

  return (
    <Link
      data-elem={`vacancy-${id}`}
      href={`/vacancy/${id}`}
      className={styles.container}
    >
      <div className={styles.head_container}>
        <h4>
          {profession} ({firm_name})
        </h4>
        <button onClick={onClickHandler}>
          <SaveIcon id={id} color={`${isInFavArr ? "#5E96FC" : ""}`} />
        </button>
      </div>
      <div>
        <span className={styles.salary_container}>
          з/п<span>{payment_from ? ` от ${payment_from} ` : " "}</span>
          <span>{payment_to ? `до ${payment_to} ` : ""}</span>
          <span>{currency}</span>
        </span>
        <span className={styles.point}>&#8226;</span>
        <span>{type_of_work.title}</span>
      </div>
      <div className={styles.town_container}>
        <Image src='/M.svg' width={20} height={20} alt='place icon' />
        <div>{town.title}</div>
      </div>
    </Link>
  );
}
