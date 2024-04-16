import { useEffect } from "react";
import { usePostStore } from "../store/postStore";

const useFetch = (url: string,) => {
  const { setPosts } = usePostStore((state) => ({
    setPosts: state.setPosts,
  }));

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