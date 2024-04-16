import { useEffect } from "react";

const useFetch = (url: string,) => {

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("Data fetched:", data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, [url]);
};

export default useFetch;