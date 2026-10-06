const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

const MAX_NOTE_LENGTH = 200;

let notes = [];

function showError(message) {
  errorMessage.textContent = message;
}

function updateCount() {
  const total = notes.length;
  if (total === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (total === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = "You have " + total + " notes.";
  }
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  render();
}

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();

  if (text === "") {
    showError("Please type a note first.");
    return;
  }

  if (text.length > MAX_NOTE_LENGTH) {
    showError("Notes must be 200 characters or fewer.");
    return;
  }

  const note = {
    id: Date.now(),
    text: text,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(note);
  noteInput.value = "";
  errorMessage.textContent = "";
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
    deleteButton.addEventListener("click", () => deleteNote(note.id));

    listItem.appendChild(tag);
    listItem.appendChild(text);
    listItem.appendChild(date);
    listItem.appendChild(deleteButton);
    notesList.appendChild(listItem);
  });

  updateCount();
}

render();
