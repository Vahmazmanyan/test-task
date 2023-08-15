import React from "react";
import { Card, Space } from "antd";
import { Link } from "react-router-dom";
import ServiceWorker from "../../serviceWorker/serviceWorket";
import { Response } from "../../types";
import SearchBar from "../SearchBar";
import Pagination from "../Pagination";
import { useDebounce, useFetching } from "../../hooks";

const Cards = () => {
  const { data, error, loading, trigger } = useFetching<Response>();

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [searchByText, setSearchByText] = React.useState<string>("");
  const searchText = useDebounce(searchByText);
  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  React.useEffect(() => {
    if (searchText) {
      trigger(() => ServiceWorker.getAllInfo(null, searchText));
    } else {
      trigger(() => ServiceWorker.getAllInfo(currentPage));
    }
  }, [currentPage, searchText]);

  const getPersonByName = (data: string) => {
    setSearchByText(data);
  };

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <SearchBar onChange={getPersonByName} />
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {!!data?.results.length ? (
            <>
              <Space direction="horizontal" size={21} wrap align="center">
                {data.results.map((el) => {
                  const getUlrID = el.url.match(/\d+/g)?.join("");

                  return (
                    <Card
                      size="small"
                      title={el.name}
                      extra={<Link to={`/card/${getUlrID}`}>More</Link>}
                      style={{ width: 1200 / 4 - 16 }}
                      key={el.created}
                    >
                      <p>
                        <strong>Пол։</strong> {el.gender}
                      </p>
                      <p>
                        <strong>Цвет глаз։</strong> {el.eye_color}
                      </p>
                      <p>
                        <strong>Масса։</strong> {el.mass}кг
                      </p>
                    </Card>
                  );
                })}
              </Space>
              <Pagination
                total={data?.count || 0}
                current={currentPage}
                changePage={changePage}
              />
            </>
          ) : (
            <h1>По вашему запросу нечего не найденна</h1>
          )}
        </>
      )}
    </>
  );
};

export default Cards;
