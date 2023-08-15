import React from "react";

function useFetching<T>() {
  const [data, setData] = React.useState<T>();
  const [error, setError] = React.useState<string>();
  const [loading, setLoading] = React.useState<boolean>(true);

  const trigger = async (callBack: () => Promise<T>) => {
    try {
      setLoading(true);
      const data = await callBack();
      setData(data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    trigger,
    data,
    error,
    loading,
  };
}

export default useFetching;
