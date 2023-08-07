import { toast, red, green } from "./toast.js";

export async function requestCreatePost(requestBody) {
  const token = localStorage.getItem("petInfo: login token");
  const newPost = await fetch("http://localhost:3333/posts/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
  })
    .then(async (response) => {
      const resJson = await response.json();
      if (response.ok) {
        toast("Post criado com sucesso", green);
        return resJson;
      } else {
        throw new Error(resJson.message);
      }
    })
    .catch((err) => toast(err.message, red));

  return newPost;
}

export async function requestReadAllPostsFromUser() {
  const token = localStorage.getItem("petInfo: login token");
  const allPosts = await fetch("http://localhost:3333/posts", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      const resJson = await response.json();
      if (response.ok) {
        return resJson;
      } else {
        throw new Error("Problemas no servidor, tente novamente mais tarde");
      }
    })
    .catch((err) => toast(err.message, red));

  return allPosts;
}

export async function requestEditPost(postId, requestBody) {
  const token = localStorage.getItem("petInfo: login token");
  const post = await fetch(`http://localhost:3333/posts/${postId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then(async (response) => {
      if (response.ok) {
        toast("Post alterado com sucesso!", green);
        const resJson = await response.json();
        return resJson;
      } else {
        throw new Error(resJson.message);
      }
    })
    .catch((err) => toast(err.message, red));
  return post;
}

export async function requestDeletePost(postId) {
  const token = localStorage.getItem("petInfo: login token");
  const deletePost = await fetch(`http://localhost:3333/posts/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      const resJson = await response.json();

      if (response.ok) {
        toast("Post deletado com sucesso!", green);
        return resJson;
      } else {
        throw new Error(resJson.message);
      }
    })
    .catch((err) => toast(err.message, red));

  return deletePost;
}
