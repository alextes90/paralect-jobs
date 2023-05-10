import { setSearchInput } from "@/redux/features/inputSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button, TextInput } from "@mantine/core";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import styles from "./SearchField.module.scss";

interface SearchFieldProps {
  setRefresh: Dispatch<SetStateAction<boolean>>;
}

export default function SearchField({ setRefresh }: SearchFieldProps) {
  const dispatch = useAppDispatch();
  const reduxVal = useAppSelector(
    (state) => state.inputSlicer.searchInput.value
  );

  return (
    <div>
      <TextInput
        data-elem='search-input'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          dispatch(setSearchInput({ value: e.target.value }));
        }}
        value={reduxVal}
        className={styles.input}
        placeholder='Введите название вакансии'
        rightSection={
          <Button
            data-elem='search-button'
            onClick={() => {
              setRefresh(true);
            }}
            size='xs'
          >
            Поиск
          </Button>
        }
        icon={<Image src='/S.svg' width={12} height={12} alt='search Icon' />}
      />
    </div>
  );
}
