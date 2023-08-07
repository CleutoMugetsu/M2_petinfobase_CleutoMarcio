import {
  requestCreatePost,
  requestReadAllPostsFromUser,
  requestEditPost,
  requestDeletePost,
} from "./dashboardRequests.js";

import { getProfileInfos } from "./index.js";

import {
  modalAcessPost,
  modalEditPost,
  modalDeletePost,
  modalProfile,
  closeModal,
} from "./modal.js";

export async function showDashboard() {
  const allPosts = await requestReadAllPostsFromUser();
  createPosts(allPosts);
}

export async function profileImg() {
  const profileInfos = await getProfileInfos();
  const divImgProfile = document.querySelector(".profile__logout");
  divImgProfile.insertAdjacentHTML(
    "afterbegin",
    `<img
    src="${profileInfos.avatar}"
    alt=""
    class="open__modal post__img"
  /><p class="profile__username">${profileInfos.username}</p>`
  );
  const divImgProfileDashboard = document.querySelector(".img__div");

  divImgProfileDashboard.insertAdjacentHTML(
    "afterbegin",
    `<img
    src="${profileInfos.avatar}"
    alt=""
    class="open__modal post__img profile__img"
  />`
  );
}

profileImg();

async function createPosts(arrayPosts) {
  const profileInfos = await getProfileInfos();
  const ul = document.querySelector(".dashboard__posts");
  ul.innerHTML = "";

  arrayPosts.forEach((post, index) => {
    const content = post.content;
    const title = post.title;
    const id = post.id;

    const li = document.createElement("li");
    li.classList.add("dashboard__post");
    li.id = index;
    li.insertAdjacentHTML(
      "afterbegin",
      `
          <div class="dashboard__title">
          <span class="dashboard__name">
          <img
              
              src="${profileInfos.avatar}"
              alt=""
              class="post__img"
              />
              <h3><span class="span__h3">${
                profileInfos.username
              }</span> | ${new Date(
        `${post.createdAt}`
      ).toLocaleDateString()}</h3>
              </span>
          <span class="dashboard__buttons">
          <button data-modal-button-id="${
            post.id
          }" class="edit__post redirect-edit__button">Editar</button>
          
            <button data-modal-delete-id="${
              post.id
            }" class="delete__post close-cancel__button">Excluir</button>
            </span>
            </div>
            
            <div class="dashboard__description">
            <h3>${title}</h3>
            <p class="post__description">
            ${content}
            </p>
            </div>
            <button data-modal-acess-id="${
              post.id
            }" class="button__acess-post">Acessar publicação</button>
            `
    );
    ul.append(li);
    const buttonAcess = li.querySelector(".button__acess-post");
    modalAcessPost(buttonAcess, post);

    const buttonEdit = li.querySelector(".edit__post");
    modalEditPost(buttonEdit, post);

    const buttonDelete = li.querySelector(".delete__post");
    modalDeletePost(buttonDelete, post);

    const dialogAcess = document.querySelector(".modal__acess-post");

    dialogAcess.innerHTML = "";

    dialogAcess.id = id;

    dialogAcess.insertAdjacentHTML(
      "afterbegin",
      `<div class="modal__acess-post--div">
          <div class="modal__title">
          <span class="dashboard__name--modal">
          <img
          src="${profileInfos.avatar}"
            alt=""
            class="post__img"
            />
            <h3><span class="span__h3">${
              profileInfos.username
            }</span> |  ${new Date(
        `${post.createdAt}`
      ).toLocaleDateString()}</h3>
              </span>
            <span>
            <button
            class="dashboard__buttons modal__close close-cancel__button"
            >
            X
            </button>
            </span>
            </div>
            
            <div class="dashboard__description">
            <h3 class="modal__title-acess">${title}</h3>
            <p class="post__description--modal">
            ${content}
            </p>
            </div>
            </div>`
    );

    const dialogEdit = document.querySelector(".modal__edit-post");

    dialogEdit.innerHTML = "";
    dialogEdit.id = id;

    dialogEdit.insertAdjacentHTML(
      "afterbegin",
      ` <div class="modal__edit-post--div">
      <span class="modal__edit-post--span">
      <h3>Edição</h3>
      <button class="modal__close">X</button>
      </span>
      <div>
      <div class="modal__edit-post--textarea">
      <label for="title__edit">Título do post</label>
      <textarea type="text" name="title" class="input__title edit__input" id="title__edit">${title}</textarea>
      <label for="post__edit">Conteúdo do post</label>
      <textarea name="content" id="post__edit" class="input__content edit__input" cols="20" rows="5">${content}</textarea
      >
      </div>
      <span class="modal__create-post--buttons">
      <button class="modal__close-cancel close-cancel__button">
      Cancelar
      </button>
      <button data-post-id="${id}" class="modal__publish modal__edit--publish confirm__button">
      Salvar alterações
      </button>
      </span>
      </div>
      </div>`
    );

    const dialogDelete = document.querySelector(".modal__delete-post");

    dialogDelete.innerHTML = "";

    dialogDelete.id = id;
    dialogDelete.insertAdjacentHTML(
      "afterbegin",
      ` <div class="modal__delete-post--div">
<span class="modal__delete-post--span">
<h3>Confirmação de exclusão</h3>
<button class="modal__close">X</button>
</span>
<div class="modal__delete-post--warning">
<h3>Tem certeza que deseja excluir esse post?</h3>
<p>
Essa ação não poderá ser desfeita, então pedimos que tenha cautela
antes de concluir
</p>
</div>
<span class="modal__delete-post--buttons">
<button class="modal__close-cancel close-cancel__button">
Cancelar
  </button>
  <button data-post-delete="${id}" class="modal__publish modal__edit--delete alert__button">
  Sim, excluir este post
  </button>
</span>
</div>`
    );
  });

  const buttonSaveEdit = document.querySelector(".modal__edit--publish"); //botão salvar alteraçoes

  const inputTitleEdit = document.querySelector("#title__edit");
  const inputPostEdit = document.querySelector("#post__edit");

  let editPost = {};

  buttonSaveEdit.addEventListener("click", async (event) => {
    const postId = event.target.dataset.postId;
    editPost = {
      title: inputTitleEdit.value,
      content: inputPostEdit.value,
    };

    await handleEditPost(postId, editPost);
  });

  handleDeletePost();
  modalProfile();
}

function handleCreatePost() {
  const button = document.querySelector("#publish__button");
  const inputTitle = document.querySelector("#title");
  const inputPost = document.querySelector("#post");
  const ul = document.querySelector(".dashboard__posts");

  button.addEventListener("click", async () => {
    await requestCreatePost({
      title: inputTitle.value.trim(),
      content: inputPost.value.trim(),
    });
    closeModal();
    // ul.innerHTML = "";
    await showDashboard();

    inputTitle.value = "";
    inputPost.value = "";
  });
}

handleCreatePost();

function handleDeletePost() {
  const deleteButton = document.querySelector(".modal__edit--delete"); //botao sim, excluir
  const ul = document.querySelector(".dashboard__posts");

  deleteButton.addEventListener("click", async (event) => {
    // ul.innerHTML = "";
    await requestDeletePost(event.target.dataset.postDelete);
    await showDashboard();
  });
}

export async function handleEditPost(idPost, editPost) {
  await requestEditPost(idPost, editPost);

  await showDashboard();
}

showDashboard();
