import { setResultData } from "@/redux/features/inputSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import Filter from "../filter/Filter";
import Results from "../results/Results";
import SearchField from "../searchField/SearchField";
import { getVacancies } from "../utils/apiCall";
import styles from "./Search.module.scss";

export default function Search() {
  const dispatch = useAppDispatch();
  const searchVal = useAppSelector((state) => state.inputSlicer.searchInput);
  const category = useAppSelector((state) => state.inputSlicer.category);
  const salary = useAppSelector((state) => state.inputSlicer.salary);
  const token = useAppSelector((state) => state.inputSlicer.token);
  const [curPage, setCurPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (token && refresh) {
      try {
        (async () => {
          setIsLoading(true);
          const data = await getVacancies(
            searchVal.value,
            category,
            salary,
            token,
            curPage
          );
          dispatch(
            setResultData({ data: data.objects, totalPage: data.total })
          );
          setIsLoading(false);
          setRefresh(false);
        })();
      } catch (err) {
        console.error(err);
      }
    }
  }, [token, searchVal, dispatch, curPage, refresh, category, salary]);

  return (
    <section className={styles.main}>
      <Filter setRefresh={setRefresh} />
      <div>
        <SearchField setRefresh={setRefresh} />
        {isLoading ? (
          <div className={styles.loader}>
            <Loader size='lg' />
          </div>
        ) : (
          <Results
            setCurPage={setCurPage}
            setRefresh={setRefresh}
            currentPage={curPage}
          />
        )}
      </div>
    </section>
  );
}
