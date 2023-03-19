let comments = [];
loadComments();

document.addEventListener("DOMContentLoaded", function () {
  let trashBtns = document.querySelectorAll("#trash");
  for (i of trashBtns) {
    i.addEventListener("click", clearFunction);
  }
});

// Добавление комментария
document.getElementById("comment-add").onclick = function () {
  let commentName = document.getElementById("comment-name");
  let commentBody = document.getElementById("comment-body");

  let comment = {
    name: commentName.value,
    body: commentBody.value,
    time: Math.floor(Date.now() / 1000),
  };

  commentName.value = "";
  commentBody.value = "";

  comments.push(comment);
  saveComments();
  showComments();
};

// Сохранение комментария в local storage
function saveComments() {
  localStorage.setItem("comments", JSON.stringify(comments));
}

function loadComments() {
  if (localStorage.getItem("comments"))
    comments = JSON.parse(localStorage.getItem("comments"));
  showComments();
}

// Показ комментария
function showComments() {
  let commentField = document.getElementById("comment-field");
  let out = "";
  comments.forEach(function (item) {
    out += `<div id="commentView">
    <p class = "text-right small"><em>${timeConverter(item.time)}</em></p>
    <p class = "alert alert-primary">${item.name} </p>
    <p class = "alert alert-success">${item.body}</p>
    <div class="bi-heart btn" id="heart"></div>
    <div class="bi-trash btn" id="trash"></div>
    </div>`;
  });
  commentField.innerHTML = out;
}

function timeConverter(UNIX_timestamp) {
  let a = new Date(UNIX_timestamp * 1000);
  let months = [
    "Янв",
    "Фев",
    "Мар",
    "Апр",
    "Май",
    "Июн",
    "Июл",
    "Авг",
    "Сен",
    "Окт",
    "Ноя",
    "Дек",
  ];
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = a.getDate();
  let hour = a.getHours();
  let min = a.getMinutes();
  let sec = a.getSeconds();
  let time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
}

const heart = document.querySelectorAll("#heart");

heart.forEach((button) => {
  button.addEventListener("click", function (event) {
    const heartIcon = event.target;
    if (heartIcon.classList.contains("bi-heart-fill")) {
      heartIcon.classList.remove("bi-heart-fill");
      heartIcon.classList.add("bi-heart");
    } else {
      heartIcon.classList.remove("bi-heart");
      heartIcon.classList.add("bi-heart-fill");
    }
  });
});

const trash = document.getElementById("trash");
const commentView = document.getElementById("commentView");

trash.addEventListener("click", clearFunction);
function clearFunction(event) {
  console.log("Clicked!");
  const trashIcon = event.target;
  localStorage.removeItem("comments");
  commentView.innerHTML = "";
}
// let trash1 = Object.values(commentView);
// console.log(trash1);
// trash1.forEach((button) => {
//   button.addEventListener("click", function (event) {
//     const trash1 = event.target;
//     commentView.innerHTML = "";
//   });
// });
