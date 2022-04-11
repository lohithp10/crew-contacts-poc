import { useEffect, useState } from 'react';

const useFetch = (props) => {
  const { url, payload, headers, method = 'GET' } = props;

  const [data, setData] = useState(null);
  const [isLoading, toggleLoading] = useState(false);
  const [error, setError] = useState(null);

  const _fetch = async (url, options) => {
    const response = await fetch(url, options);
    if (!response.ok) {
      const message = `Error: ${response.status}`;
      throw new Error(message);
    }
    const data = await response.json();
    return data;
  };

  useEffect(async () => {
    const options = {
      method,
      ...(headers
        ? { headers }
        : {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'User-Agent': '*'
          }),
      ...(payload && { payload })
    };

    toggleLoading(true);

    _fetch(url, options)
      .then((data) => {
        setData(data);
        toggleLoading(false);
        setError(null);
      })
      .catch((error) => {
        setData(null);
        toggleLoading(false);
        setError(error);
      });
  }, [url, payload, type]);

  return { data, isLoading, error };
};

export default useFetch;
