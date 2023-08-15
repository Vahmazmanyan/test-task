import React from "react";
import { Input } from "antd";

interface Props {
  onChange: (e: string) => void;
}

const SearchBar: React.FC<Props> = ({ onChange }) => {
  const [value, setValue] = React.useState<string>("");

  const ChangeEventHandler: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const value = e.target.value;
    onChange(value);

    setValue(value);
  };

  return (
    <Input placeholder="Search" onChange={ChangeEventHandler} value={value} />
  );
};

export default SearchBar;
