import { handleEditPost } from "./dashboard.js";

export function closeModal() {
  const closeButtons = document.querySelectorAll(".modal__close");
  const cancelButtons = document.querySelectorAll(".modal__close-cancel");

  const modalCreatePost = document.querySelector("#modal__create-post");
  const modalProfile = document.querySelector("#modal__profile");

  const modalsAcessPost = document.querySelectorAll(".modal__acess-post");
  const modalsEditPost = document.querySelectorAll(".modal__edit-post");
  const modalsDeletePost = document.querySelectorAll(".modal__delete-post");

  const publishButton = document.querySelector("#publish__button");

  const deleteConfirmButtons = document.querySelectorAll(
    ".modal__edit--delete"
  );

  const saveEditButtons = document.querySelectorAll(".modal__edit--publish");

  saveEditButtons.forEach((buttonEdit) => {
    modalsEditPost.forEach((modalEdit) => {
      buttonEdit.addEventListener("click", () => {
        modalEdit.close();
      });
    });
  });

  deleteConfirmButtons.forEach((button) => {
    modalsDeletePost.forEach((modal) => {
      button.addEventListener("click", () => {
        modal.close();
      });
    });
  });

  closeButtons.forEach((button) => {
    publishButton.addEventListener("click", () => {
      modalCreatePost.close();
    });

    button.addEventListener("click", () => {
      modalCreatePost.close();
      modalProfile.close();

      modalsAcessPost.forEach((modalAcessPost) => {
        modalAcessPost.close();
      });
      modalsEditPost.forEach((modalEditPost) => {
        modalEditPost.close();
      });
      modalsDeletePost.forEach((modalDeletePost) => {
        modalDeletePost.close();
      });
    });
  });

  cancelButtons.forEach((button) => {
    button.addEventListener("click", () => {
      modalCreatePost.close();
      modalsAcessPost.forEach((modalAcessPost) => {
        modalAcessPost.close();
      });
      modalsEditPost.forEach((modalEditPost) => {
        modalEditPost.close();
      });
      modalsDeletePost.forEach((modalDeletPost) => {
        modalDeletPost.close();
      });
    });
  });
}

function logOut() {
  const buttonLogOut = document.querySelector("#button__logout");

  buttonLogOut.addEventListener("click", () => {
    localStorage.clear();
    location.replace("../..");
  });
}

function modalCreatePost() {
  const modal = document.querySelector("#modal__create-post");
  const buttonModal = document.querySelector("#button__create-post");

  buttonModal.addEventListener("click", () => {
    modal.showModal();
  });
  closeModal();
}

export function modalProfile() {
  const modal = document.querySelector("#modal__profile");
  const buttonModal = document.querySelector(".profile__img");

  if (buttonModal) {
    buttonModal.addEventListener("click", () => {
      modal.showModal();
    });
    logOut();
    closeModal();
  }
}

export function modalAcessPost(button, post) {
  const modalsAcessPost = document.querySelector(".modal__acess-post");
  console.log(post);
  button.addEventListener("click", () => {
    const h3 = document.querySelector(".modal__title-acess");
    const p = document.querySelector(".post__description--modal");
    h3.innerText = post.title;
    p.innerText = post.content;
    modalsAcessPost.showModal();
  });
}

export async function modalEditPost(button, post) {
  const modal = document.querySelector(".modal__edit-post");

  button.addEventListener("click", () => {
    const buttonSaveEdit = document.querySelector(".modal__edit--publish"); //botão salvar alteraçoes
    buttonSaveEdit.dataset.postId = post.id;
    const h3 = document.querySelector(".input__title");
    const p = document.querySelector(".input__content");
    h3.value = post.title;
    p.value = post.content;
    modal.showModal();
  });
}

export async function modalDeletePost(button, post) {
  const modalDeletePost = document.querySelector(".modal__delete-post"); //dialog delete
  const buttonDelete = document.querySelector(".modal__edit--delete"); //botão salvar alteraçoes

  button.addEventListener("click", () => {
    buttonDelete.dataset.postDelete = post.id;
    modalDeletePost.showModal();
  });
}

modalCreatePost();
