import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";
interface PostType {
  title: string;
  id: number;
}

const UseEffectTest = () => {
  const [post, setPosts] = useState<PostType[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    axios
      .get<PostType[]>("https://jsonplaceholder.typicode.com/posts", {
        signal: controller.signal,
      })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
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

export default UseEffectTest;
