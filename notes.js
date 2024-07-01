let colorMode = "yellow";
let notesCounter;

let addNoteButton = document.querySelector(".addnote");
let notesContainer = document.querySelector(".notes_container");

let notesArray = JSON.parse(localStorage.getItem("notes")) || [];
loadData();

function loadData() {
    if (notesArray.length > 0) {
        notesCounter = 1;
        notesContainer.innerHTML = '';

        // Sort notes by the star property
        notesArray.sort((a, b) => b.star - a.star);

        for (let note of notesArray) {
            notesContainer.innerHTML += `
            <div class="note" id="Note_${note.id}" style="background-color: ${note.color}">
                <textarea class="notetxt" disabled>${note.content}</textarea>
                <div class="star" id="star${note.id}" onclick="starThis(this.id)"><i class='bx ${note.star ? 'bxs-star' : 'bx-star'}'></i></div>
                <div class="controls">
                    <i id="note_${note.id}" onclick="editNote(this.id)" class='bx bx-edit'></i>
                    <i id="rm${note.id}" class='bx bx-message-square-x' onclick="removeNote(this.id)"></i>
                </div>
                <span class="updateon">Last update <span class="updateDate"><i>${note.date}</i></span></span>
            </div>`;
            notesCounter++;
        }
    } else {
        notesCounter = 0;
    }
}

// Remove a note
function removeNote(ID) {
    let index = parseInt(ID.match(/\d+/)[0], 10);

    notesArray = notesArray.filter(note => note.id !== index);

    localStorage.setItem("notes", JSON.stringify(notesArray));
    loadData();
}

// Star a note
function starThis(ID) {
    let index = parseInt(ID.match(/\d+/)[0], 10);

    for (let note of notesArray) {
        if (note.id === index) {
            note.star = !note.star;
            break;
        }
    }

    localStorage.setItem("notes", JSON.stringify(notesArray));
    loadData();
}

// Add a new note
function addNote() {
    notesCounter++;
    let newNote = {
        id: notesCounter,
        date: getCurrentDate(),
        content: `empty${notesCounter}`,
        color: colorMode,
        star: false
    };
    notesArray.push(newNote);
    localStorage.setItem("notes", JSON.stringify(notesArray));
    loadData();
}

addNoteButton.onclick = addNote;

// Edit a note
function editNote(ID) {
    let editButton = document.getElementById(ID);
    let noteElement = editButton.parentElement.parentElement;
    let textareaElement = noteElement.querySelector("textarea");
    textareaElement.disabled = !textareaElement.disabled;

    let index = parseInt(ID.match(/\d+/)[0], 10);

    if (!textareaElement.disabled) {
        textareaElement.focus();
    } else {
        for (let note of notesArray) {
            if (note.id === index) {
                note.content = textareaElement.value;
                note.date = getCurrentDate();
                break;
            }
        }

        let updateDateElement = noteElement.querySelector(".updateDate i");
        updateDateElement.textContent = getCurrentDate();

        localStorage.setItem("notes", JSON.stringify(notesArray));
        loadData();
    }
}

// Get the current date
function getCurrentDate() {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    let day = new Date();
    let month = months[day.getMonth()];
    let dayOfMonth = day.getDate();
    let year = day.getFullYear();
    return `${month} ${dayOfMonth}, ${year}`;
}

// Change color mode
function colorChanger(x) {
    colorMode = x;
}
