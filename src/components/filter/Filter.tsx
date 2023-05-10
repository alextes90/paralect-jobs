import { SALARY } from "@/constants/defaultVal";
import { setCategory, setSalary } from "@/redux/features/inputSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Button } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import Categories from "../categories/Categories";
import Salary from "../salary/Salary";
import styles from "./Filter.module.scss";

interface Salary {
  amountForm: number | "";
  amountTill: number | "";
}

interface FilterProps {
  setRefresh: Dispatch<SetStateAction<boolean>>;
}

export default function Filter({ setRefresh }: FilterProps) {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.text_wrapper}>
        <h2>Фильтры</h2>
        <div
          className={styles.text}
          onClick={() => {
            dispatch(setCategory(""));
            dispatch(
              setSalary({
                amountForm: SALARY.amountForm,
                amountTill: SALARY.amountTill,
              })
            );
          }}
        >
          Сбросить все &#10006;
        </div>
      </div>
      <div className={styles.category_container}>
        <h3>Отрасль</h3>
        <Categories />
      </div>
      <div>
        <h3>Оклад</h3>
        <Salary />
      </div>
      <Button
        data-elem='search-button'
        onClick={() => {
          setRefresh(true);
        }}
      >
        Применить
      </Button>
    </div>
  );
}
