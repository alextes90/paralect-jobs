import { ItemData } from "@/constants/api";
import { ITEMS_PER_PAGE } from "@/constants/defaultVal";
import { useAppSelector } from "@/redux/hooks";
import { Dispatch, SetStateAction, useState } from "react";
import ReactPaginate from "react-paginate";
import NotFound from "../notFound/NotFound";
import ResultItem from "../resultItem/ResultItem";
import styles from "./Results.module.scss";

interface ResultsProps {
  setCurPage: Dispatch<SetStateAction<number>>;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  currentPage: number;
}

interface Event {
  selected: number;
}

export default function Results({
  setCurPage,
  setRefresh,
  currentPage,
}: ResultsProps) {
  const displayedData = useAppSelector((state) => state.inputSlicer.resultData);
  const [, setRefreshResults] = useState(false);

  const pageChangeHandler = (e: Event) => {
    setCurPage(e.selected);
    setRefresh((prev) => !prev);
  };

  return (
    <div>
      <div className={styles.results_container}>
        {displayedData.data.length ? (
          displayedData.data.map((el: ItemData) => (
            <ResultItem
              key={el.id}
              setRefresh={setRefreshResults}
              itemData={el}
            />
          ))
        ) : (
          <div className={styles.notFound}>
            <NotFound />
            <div>Ничего не найдено, попробуйте другой запрос</div>
          </div>
        )}
      </div>
      {displayedData.data.length ? (
        <div className={styles.pagination_container}>
          <ReactPaginate
            pageCount={
              Math.ceil(displayedData.totalPage / ITEMS_PER_PAGE) < 125
                ? Math.ceil(displayedData.totalPage / ITEMS_PER_PAGE)
                : 125
            }
            breakLabel='...'
            nextLabel='>'
            previousLabel='<'
            renderOnZeroPageCount={null}
            marginPagesDisplayed={2}
            onPageChange={pageChangeHandler}
            forcePage={currentPage}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
