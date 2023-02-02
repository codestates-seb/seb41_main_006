import { useState, useEffect } from 'react';
// import axios from 'axios';
import defaultRequest from '../api/defaultRequest';

const useFetch = (url, params, reload) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getFetch = async (url, params) => {
    try {
      let result;
      if (params !== undefined) {
        result = await defaultRequest.get(url, {
          params: params,
          timeout: 2000,
        });
      } else {
        result = await defaultRequest.get(url, {
          timeout: 2000,
        });
      }
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
