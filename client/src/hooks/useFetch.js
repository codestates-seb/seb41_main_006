import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url, params, reload) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getFetch = async (url, params) => {
    try {
      // console.log('## fetch url ##', url);
      let result;
      if (params !== undefined) {
        // console.log('params', params);
        result = await axios.get(url, {
          params: params,
          timeout: 2000,
        });
      } else {
        result = await axios.get(url, {
          timeout: 2000,
        });
      }
      console.log(result);
      setIsLoading(false);
      setData(result.data);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      console.error(err);
    }
  };

  useEffect(() => {
    getFetch(url, params);
  }, [url, params, reload]);

  return [data, isLoading, error];
};

export default useFetch;
