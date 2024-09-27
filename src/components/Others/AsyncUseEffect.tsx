import axios, { AxiosError, CanceledError } from "axios";
import { useEffect, useState } from "react";
interface PostType {
  title: string;
  id: number;
}

const AsyncUseEffect = () => {
  const [post, setPosts] = useState<PostType[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    const fetchPost = async () => {
      try {
        const posts = await axios.get<PostType[]>(
          "https://jsonplaceholder.typicode.com/posts",
          { signal: controller.signal }
        );
        setPosts(posts.data);
      } catch (err) {
        if (err instanceof CanceledError) return;
        setError((err as AxiosError).message);
      }
    };
    fetchPost();
    return () => {
      console.log("called cleanup");
      controller.abort();
    };
  }, []);
  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {post.map((val, i) => (
          <li key={i}>{val.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default AsyncUseEffect;
