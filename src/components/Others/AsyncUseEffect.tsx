import { AxiosError, CanceledError } from "../../services/baseUrl";
import { useEffect, useState } from "react";
import postServices from "../../services/postServices";
interface PostType {
  title: string;
  id: number;
}

const AsyncUseEffect = () => {
  const [post, setPosts] = useState<PostType[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const { posts, cancel } = postServices.getAllPosts();
    const fetchPost = async () => {
      try {
        const result = await posts;
        setPosts(result.data);
      } catch (err) {
        if (err instanceof CanceledError) return;
        setError((err as AxiosError).message);
      }
    };
    fetchPost();
    return () => {
      cancel();
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
