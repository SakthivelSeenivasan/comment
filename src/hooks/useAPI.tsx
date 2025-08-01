import axios from "axios";
import { useState } from "react";

const useAPI = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>("");
  const baseURL = "https://dummyjson.com/test";
  const postRequest = async (url: string) => {
    setIsLoading(true);
    try {
      const data = await axios.post(url);
      console.log(data);
    } catch (err) {
      setError(err);
    }
  };
  return { isLoading, error, postRequest };
};

export default useAPI;
