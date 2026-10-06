const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

let notes = [];

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const note = {
    id: Date.now(),
    text: noteInput.value,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(note);
  noteInput.value = "";
  render();
});

function render() {
  notesList.textContent = "";

  notes.forEach((note) => {
    const listItem = document.createElement("li");
    listItem.className = "note category-" + note.category;

    const tag = document.createElement("span");
    tag.className = "note-category-tag";
    tag.textContent = note.category;

    const text = document.createElement("p");
    text.className = "note-text";
    text.textContent = note.text;

    const date = document.createElement("p");
    date.className = "note-date";
    date.textContent = note.createdAt;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";

    listItem.appendChild(tag);
    listItem.appendChild(text);
    listItem.appendChild(date);
    listItem.appendChild(deleteButton);
    notesList.appendChild(listItem);
  });
}

render();
