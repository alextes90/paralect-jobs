import { ItemData } from "@/constants/api";
import { FAVORITES_PER_PAGE, LOCAL_STOR_KEY } from "@/constants/defaultVal";
import { Button } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import NotFound from "../notFound/NotFound";
import ResultItem from "../resultItem/ResultItem";
import styles from "./FavResults.module.scss";

interface Event {
  selected: number;
}

export default function FavResults() {
  const router = useRouter();
  const [data, setData] = useState<ItemData[] | []>([]);

  const [refresh, setRefresh] = useState<boolean>(false);
  const [curPage, setCurPage] = useState(0);

  if (
    curPage + 1 > Math.ceil(data.length / FAVORITES_PER_PAGE) &&
    curPage !== 0
  ) {
    setCurPage((prev) => prev - 1);
  }

  const pageChangeHandler = (e: Event) => {
    setCurPage(e.selected);
  };

  useEffect(() => {
    const favVac = JSON.parse(localStorage.getItem(LOCAL_STOR_KEY) || "[]");
    setData(favVac);
  }, [refresh]);

  console.log(curPage);

  return (
    <section className={styles.container}>
      {data.length > 0 ? (
        <>
          {data
            .filter(
              (_, index) =>
                index >= curPage * FAVORITES_PER_PAGE &&
                index < (curPage + 1) * FAVORITES_PER_PAGE
            )
            .map((vac) => (
              <ResultItem itemData={vac} key={vac.id} setRefresh={setRefresh} />
            ))}
          <div className={styles.pagination_container}>
            <ReactPaginate
              pageCount={Math.ceil(data.length / FAVORITES_PER_PAGE)}
              breakLabel='...'
              nextLabel='>'
              previousLabel='<'
              renderOnZeroPageCount={null}
              marginPagesDisplayed={2}
              onPageChange={pageChangeHandler}
              forcePage={curPage}
            />
          </div>
        </>
      ) : (
        <div className={styles.notFound}>
          <NotFound />
          <div>Упс, здесь еще ничего нет!</div>
          <Button
            onClick={() => {
              router.push("/");
            }}
          >
            <span>Поиск Вакансий</span>
          </Button>
        </div>
      )}
    </section>
  );
}
