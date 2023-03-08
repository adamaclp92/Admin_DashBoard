import { useCallback, useState } from "react";

const UseHttpRequests = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const httpRequest = useCallback(async (requestParam: any, applyData: any) => {
    try {
      setIsLoading(true);
      const response = await fetch(requestParam.url, {
        method: requestParam.method ? requestParam.method : "GET",
        headers: requestParam.headers ? requestParam.headers : {},
        body: requestParam.body ? JSON.stringify(requestParam.body) : null,
      });

      const data = await response.json();
      setIsLoading(false);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      applyData(data);
    } catch (e: any) {
      setError(e.message);
    }
  }, []);

  return { error, isLoading, httpRequest };
};

export default UseHttpRequests;
