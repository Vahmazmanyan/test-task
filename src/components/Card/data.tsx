import { Person } from "../../types";
import { Tag } from "antd";

export const CreateData = (character?: Person) => {
  const films = character?.films.map((film) => <Tag key={film}>{film}</Tag>);
  const starships = character?.starships.map((starship) => (
    <Tag key={starship}>{starship}</Tag>
  ));

  return [
    { label: "Имя", value: character?.name },
    { label: "Пол", value: character?.gender },
    { label: "Год рождения", value: character?.birth_year },
    { label: "Цвет волос", value: character?.hair_color },
    { label: "Цвет глаз", value: character?.eye_color },
    { label: "Рост", value: `${character?.height} см` },
    { label: "Масса", value: `${character?.mass} кг` },
    { label: "Цвет кожи", value: character?.skin_color },
    {
      label: "Создан",
      value: new Date(character?.created || "").toLocaleDateString(),
    },
    {
      label: "Отредактирован",
      value: new Date(character?.edited || "").toLocaleDateString(),
    },
    {
      label: "Фильмы",
      value: films,
    },
    {
      label: "Звездолеты",
      value: starships,
    },
  ];
};
