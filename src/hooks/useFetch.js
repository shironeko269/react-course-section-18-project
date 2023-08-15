import { useCallback, useState } from 'react'

const useFetch = () => {
  const [isLoading,setIsLoading] = useState(false);
  const [error,setError] = useState(null);

  const RequestHandler = useCallback( async (requestConfig,dataHandler = () => {}) => {
    setIsLoading(true);
    setError(null);
    try {
        const respone = await fetch(requestConfig.url, {
            method : requestConfig.method ? requestConfig.method : "GET",
            headers : requestConfig.headers ? requestConfig.headers : {},
            body : requestConfig.body ? JSON.stringify(requestConfig.body) : null
        });
        const data = await respone.json();
        dataHandler(data);
    } catch (error) {
        setError(error.message || "Something went wrong!")
    }
    setIsLoading(false);
  },[]);

  return {
    isLoading,
    error,
    RequestHandler
  }
}

export default useFetch