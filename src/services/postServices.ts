import baseUrl from "./baseUrl";

export interface PostType {
  title: string;
  id: number;
}

class PostService {
  getAllPosts() {
    const controller = new AbortController();
    const posts = baseUrl.get<PostType[]>("/posts", {
      signal: controller.signal,
    });
    return { posts, cancel: () => controller.abort() };
  }
}

export default new PostService();
