let colorMode = "yellow";
let notsNBr;

let textarea = document.querySelector(".notetxt");
let addnote = document.querySelector(".addnote");
let notes_container = document.querySelector(".notes_container");
let star = document.querySelector(".bx-star");

let arr = JSON.parse(localStorage.getItem("notes")) || [];
loadData();

function loadData() {
    if (arr.length > 0) {
        notsNBr = 1;
        notes_container.innerHTML = '';

        // Sort notes by the star property
        arr.sort((a, b) => b.star - a.star);

        for (let NOTE of arr) {
            notes_container.innerHTML += `
            <div class="note" id="Note_${notsNBr}" style="background-color: ${NOTE.color}">
                <textarea class="notetxt" disabled>${NOTE.content}</textarea>
                <div class="star" id="star${notsNBr}" onclick="starThis(this.id)"><i class='bx ${NOTE.star ? 'bxs-star' : 'bx-star'}'></i></div>
                <div class="controlls">
                    <i id="note_${NOTE.id}" onclick="editNotte(this.id)" class='bx bx-edit'></i>
                    <i id="rm${NOTE.id}" class='bx bx-message-square-x' onclick="RMnotte(this.id)"></i>
                </div>
                <span class="updateon">last update <span class="updateDate"><i>${NOTE.date}</i></span></span>
            </div>`;
            notsNBr++;
        }
    } else {
        notsNBr = 0;
    }
}

// Remove a note
function RMnotte(ID) {
    let str = `${ID}`;
    let index = parseInt(str.match(/\d+/)[0], 10) - 1;

    // Remove the note from the array
    arr = arr.filter(note => note.id !== `note_${index + 1}`);

    // Update the local storage
    localStorage.setItem("notes", JSON.stringify(arr));

    // Refresh the notes
    loadData();
}

// Star a note
function starThis(ID) {
    let str = `${ID}`;
    let index = parseInt(str.match(/\d+/)[0], 10) - 1;
    arr[index].star = !arr[index].star;

    let starElmnt = document.querySelector(`#${ID} i`);
    starElmnt.classList.toggle('bxs-star');
    starElmnt.classList.toggle('bx-star');

    localStorage.setItem("notes", JSON.stringify(arr));
    loadData();
}

// Add a note
function addNote() {
    notsNBr++;
    let newNote = {
        id: `note_${notsNBr}`,
        date: getipdatedate(),
        content: `empty${notsNBr}`,
        color: colorMode,
        star: false
    };
    arr.push(newNote);
    localStorage.setItem("notes", JSON.stringify(arr));
    loadData();
}

function addNotToArr(x) {
    arr.push({
        id: `note_${notsNBr}`,
        date: getipdatedate(),
        content: `${x} `,
        color: colorMode,
        star: false
    });
    localStorage.setItem("notes", JSON.stringify(arr));
}

addnote.onclick = addNote;

// Edit a note
function editNotte(ID) {
    let editbtn = document.getElementById(ID);
    let noteElement = editbtn.parentElement.parentElement;
    let textareaElement = noteElement.querySelector("textarea");
    textareaElement.disabled = !textareaElement.disabled;
    textareaElement.textContent = textareaElement.value;
    let span1 = noteElement.querySelector(".updateon");
    let span2 = span1.querySelector(".updateDate i");
    span2.textContent = getipdatedate();

    let str = `${ID}`;
    let index = parseInt(str.match(/\d+/)[0], 10) - 1;
    arr[index].content = textareaElement.value;
    localStorage.setItem("notes", JSON.stringify(arr));
}

// Get the current date
function getipdatedate() {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    let day = new Date();
    let month = months[day.getMonth()];
    let DAY = day.getDate();
    let year = day.getFullYear();
    return `${month} ${DAY}, ${year}`;
}

// Change color mode
function colorChanger(x) {
    colorMode = x;
}
