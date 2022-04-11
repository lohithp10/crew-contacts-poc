import { useCallback, useState } from 'react';

const useLazyFetch = (props) => {
  const { url, method = 'GET', headers } = props;

  const [data, setData] = useState(null);
  const [isLoading, toggleLoading] = useState(false);
  const [error, setError] = useState(null);

  const _fetch = async ({ url, options }) => {
    const response = await fetch(url, options);
    if (!response.ok) {
      const message = `${response.statusText}. Error:${response.status}`;
      throw new Error(message);
    }
    const data = await response.json();
    return data;
  };

  const lazyFetch = useCallback(
    ({ payload, callback } = {}) => {
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
      setError(null);

      _fetch({ url, options })
        .then((data) => {
          setData(data);
          toggleLoading(false);
          setError(null);
          callback && callback({ hasError: false, data });
        })
        .catch((error) => {
          setData(null);
          toggleLoading(false);
          setError(error);
          callback && callback({ hasError: true });
        });
    },
    [url, headers, method]
  );

  return [data, isLoading, error, lazyFetch];
};

export default useLazyFetch;
