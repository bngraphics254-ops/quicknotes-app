const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

const STORAGE_KEY = "quicknotes-notes";
const MAX_NOTE_LENGTH = 200;

let notes = loadNotes();

function loadNotes() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function render() {
  notesList.textContent = "";

  const query = searchInput.value.trim().toLowerCase();
  const visibleNotes = notes.filter(
    (note) =>
      note.text.toLowerCase().includes(query) ||
      note.category.toLowerCase().includes(query)
  );

  visibleNotes.forEach((note) => {
    const listItem = document.createElement("li");
    listItem.className = "note " + note.category;

    const tag = document.createElement("span");
    tag.className = "note-category-tag";
    tag.textContent = note.category;

    const text = document.createElement("p");
    text.className = "note-text";
    text.textContent = note.text;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteNote(note.id));

    listItem.appendChild(tag);
    listItem.appendChild(text);
    listItem.appendChild(deleteButton);
    notesList.appendChild(listItem);
  });

  updateCount();
}

function updateCount() {
  const total = notes.length;
  if (total === 0) {
    noteCount.textContent = "No notes yet.";
  } else if (total === 1) {
    noteCount.textContent = "1 note.";
  } else {
    noteCount.textContent = total + " notes.";
  }
}

function showError(message) {
  errorMessage.textContent = message;
}

function addNote(event) {
  event.preventDefault();

  const text = noteInput.value.trim();

  if (text === "") {
    showError("Note cannot be empty.");
    return;
  }

  if (text.length > MAX_NOTE_LENGTH) {
    showError("Note must be 200 characters or fewer.");
    return;
  }

  const note = {
    id: Date.now(),
    text: text,
    category: noteCategory.value,
    createdAt: new Date().toISOString(),
  };

  notes.push(note);
  saveNotes();

  noteInput.value = "";
  errorMessage.textContent = "";
  render();
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

noteForm.addEventListener("submit", addNote);
searchInput.addEventListener("input", render);
noteInput.addEventListener("input", () => {
  errorMessage.textContent = "";
});

render();
