import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Person } from "../../types";
import { List, Tag, Button, Space, Input } from "antd";
import ServiceWorker from "../../serviceWorker/serviceWorket";
import { useFetching } from "../../hooks";
import { CreateData } from "./data";

interface ICharacterData {
  value: string | JSX.Element[] | JSX.Element;
  label: string;
}

const Card = () => {
  const params = useParams() as { id: string };
  const { trigger, data, loading, error } = useFetching<Person>();
  const [editContent, setEditContent] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<Record<string, string>>(
    {}
  );

  const Navigate = useNavigate();

  React.useEffect(() => {
    if (params.id) {
      trigger(() => ServiceWorker.getById(params.id));
    }
  }, []);

  const [characterData, setCharacterDataData] = React.useState<
    ICharacterData[]
  >([]);

  React.useEffect(() => {
    const localStoreGetData = JSON.parse(
      localStorage.getItem("data") || "null"
    ) as Record<string, ICharacterData[]>;

    if (localStoreGetData?.[params.id]) {
      const returnElements = localStoreGetData[params.id].map((el) => {
        if (Array.isArray(el.value)) {
          return {
            value: el.value.map((item) => (
              <Tag key={item.toString()}>{item}</Tag>
            )),
            label: el.label,
          };
        }
        return el;
      });

      setCharacterDataData(returnElements as ICharacterData[]);
    } else {
      const characters = CreateData(data) as ICharacterData[];
      setCharacterDataData(characters);
    }
  }, [data]);

  const becomeInMainPage = () => {
    Navigate("/");
  };

  const changeEditableStatus = (e: React.PointerEvent<HTMLButtonElement>) => {
    setEditContent((prev) => !prev);

    if (e.currentTarget.innerText === "Save") {
      const getData = JSON.parse(localStorage.getItem("data") || "null");

      localStorage.setItem(
        "data",
        JSON.stringify({
          ...getData,
          [params.id]: characterData.map((item) => {
            return {
              ...item,
              value: Array.isArray(item.value)
                ? item.value.map((el: JSX.Element) => {
                    return el.key;
                  })
                : item.value,
            };
          }),
        })
      );
    }
  };

  const changeDataAndSave = (index: number, value: string) => {
    setInputValue({ index: value });
    characterData[index].value = value;
    setCharacterDataData(characterData);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <Space
      direction="vertical"
      content="center"
      style={{
        width: "100%",
      }}
    >
      <Space direction="horizontal">
        <Button type="dashed" onClick={becomeInMainPage}>
          back
        </Button>
        <Button type="primary" onClick={changeEditableStatus}>
          {editContent ? "Save" : "Edit"}
        </Button>
      </Space>
      <List
        size="large"
        header={<h2>Информация о персонаже</h2>}
        bordered
        dataSource={characterData}
        renderItem={(item, index) => (
          <List.Item>
            <strong>{item.label}:</strong>
            {!editContent ? (
              <span>{item.value}</span>
            ) : typeof item.value === "string" ? (
              <Input
                defaultValue={item.value}
                value={inputValue[index]}
                onChange={(e) => changeDataAndSave(index, e.target.value)}
                style={{
                  width: 200,
                }}
              />
            ) : (
              <span>{item.value}</span>
            )}
          </List.Item>
        )}
      />
    </Space>
  );
};

export default Card;
