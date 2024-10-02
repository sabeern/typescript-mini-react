import { CanceledError } from "../../services/baseUrl";
import { useEffect, useState } from "react";
import postServices, { PostType } from "../../services/postServices";

const UseEffectTest = () => {
  const [post, setPosts] = useState<PostType[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const { posts, cancel } = postServices.getAllPosts();
    posts
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => cancel();
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
