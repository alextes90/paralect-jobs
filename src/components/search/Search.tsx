import { setErrorMessage } from "@/redux/features/errorSlicer";
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
      (async () => {
        setIsLoading(true);
        try {
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
        } catch (err) {
          dispatch(setErrorMessage("Failed to get vacancies"));
          console.error(err);
        } finally {
          setIsLoading(false);
          setRefresh(false);
        }
      })();
    }
  }, [token, searchVal, dispatch, curPage, refresh, category, salary]);

  return (
    <section className={styles.main}>
      <Filter setRefresh={setRefresh} setCurPage={setCurPage} />
      <div className={styles.search}>
        <SearchField setRefresh={setRefresh} setCurPage={setCurPage} />
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
