import { useState, useEffect } from 'react';

export const useFetch = (url, optionsFn) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = optionsFn ? optionsFn() : {};
        const res = await fetch(url, options);
        const responseText = await res.text(); // Read the response as text
        console.log('API response:', responseText); // Log the response text

        const json = JSON.parse(responseText); // Parse the response text as JSON

        if (!res.ok) {
          throw json;
        }

        setData(json);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, optionsFn]);

  return { data, error, isLoading };
};