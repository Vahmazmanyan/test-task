import React from "react";
const useDebounce = (text: string, ms: number = 400) => {
  const [value, setValue] = React.useState<string>("");

  React.useEffect(() => {
    let timer = setTimeout(() => {
      setValue(text);
    }, ms);
    return () => {
      clearTimeout(timer);
    };
  }, [text]);

  return value;
};

export default useDebounce;
