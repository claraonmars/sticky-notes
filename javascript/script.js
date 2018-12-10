var notes
var container = document.querySelector('.container');

// check local storage
var init = function() {
    if (typeof(Storage) !== "undefined") {
        if (window.localStorage.getItem("notes") === null || window.localStorage.getItem("notes") === undefined) {
            var newArr = [];
            localStorage.setItem('notes', JSON.stringify(newArr));
            notes = JSON.parse(window.localStorage.getItem('notes'));
        } else {
            notes = JSON.parse(window.localStorage.getItem('notes'));
            renderExisting();
        }
    } else {
        alert('Your browser does not support local storage, your notes will not be saved!');
        notes = [];
    }
}

// append existing notes from local storage
var renderExisting = function() {
    console.log(notes)
    for (var i = 0; i < notes.length; i++) {
        if (notes[i].title !== '' || notes[i].content !== '') {
            var note = document.createElement("div");
            note.classList.add("note");
            note.setAttribute('id', 'note_' + i);

            var title = document.createElement("input");
            title.classList.add('title_input');
            title.value = notes[i].title;
            title.setAttribute('id', 'title_' + i);
            note.appendChild(title);

            var contentInput = document.createElement('textarea');
            contentInput.classList.add('content');
            contentInput.value = notes[i].content;
            contentInput.setAttribute('id', 'content_' + i);

            note.appendChild(contentInput);

            var deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete');
            deleteBtn.setAttribute('id', 'delete_' + i);
            deleteBtn.innerText = 'x';
            note.appendChild(deleteBtn);

            container.appendChild(note);

            //edit note content event listener
            var edit = document.querySelectorAll('.content');
            for (var j = 0; j < edit.length; j++) {
                edit[j].addEventListener('keyup', editNote);
            }

            //edit title event listener
            var editT = document.querySelectorAll('.title_input');
            for (var k = 0; k < editT.length; k++) {
                editT[k].addEventListener('keyup', editTitle);
            }

            // delete event listener
            var deleteBtns = document.querySelectorAll('.delete')
            for (var n = 0; n < deleteBtns.length; n++) {
                deleteBtns[n].addEventListener('click', deleteNote);
            }
        }
    }

    // delete all cache / local storage
    var clearCache = document.createElement('button');
    clearCache.classList.add('clear_cache');
    clearCache.innerText = 'Delete all';
    var create = document.querySelector('.create');
    create.appendChild(clearCache);
    clearCache.addEventListener('click', deleteAll);
}

// render note onto container
var renderNote = function() {

    var note = document.createElement("div");
    note.setAttribute('id', 'note_' + notes.length);
    note.classList.add("note");

    var title = document.createElement("input");
    title.classList.add('title_input');
    title.setAttribute('id', 'title_' + notes.length);
    title.setAttribute('placeholder', 'Title');
    note.appendChild(title);

    var contentInput = document.createElement('textarea');
    contentInput.classList.add('content');
    contentInput.setAttribute('id', 'content_' + notes.length);
    contentInput.setAttribute('placeholder', 'Content');

    note.appendChild(contentInput);

    var deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.setAttribute('id', 'delete_' + notes.length);
    deleteBtn.innerText = 'x';
    note.appendChild(deleteBtn);

    container.appendChild(note);

    addNote();

    // delete event listener
    var deleteBtns = document.querySelectorAll('.delete')
    for (var i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].addEventListener('click', deleteNote);
    }

    // edit content event listener
    var edit = document.querySelectorAll('.content');
    for (var j = 0; j < edit.length; j++) {
        edit[j].addEventListener('keyup', editNote);
    }

    //edit title event listener
    var editT = document.querySelectorAll('.title_input');
    for (var k = 0; k < editT.length; k++) {
        editT[k].addEventListener('keyup', editTitle);
    }
}

// add note to 'database'
var addNote = function() {
    let title_input = document.querySelector(".title_input").value;
    let content = document.querySelector(".content").value;
    let note = {
        'id': notes.length,
        'title': title_input,
        'content': content
    }
    notes.push(note);

    // first note to initialize delete all if doesnt already exist
    var deleteAllBtn = document.querySelector('.clear_cache');
    console.log(deleteAllBtn)
    if(deleteAllBtn === null){
        var clearCache = document.createElement('button');
    clearCache.classList.add('clear_cache');
    clearCache.innerText = 'Delete all';
    var create = document.querySelector('.create');
    create.appendChild(clearCache);
    clearCache.addEventListener('click', deleteAll);
    }
}

// edit note / save into local storage
var editNote = function(event) {
    var selectedNoteId = event.target.id.split('_');
    var selectedNoteContent = event.target.value
    for (var i = 0; i < notes.length; i++) {
        if (notes[i].id === parseInt(selectedNoteId[1])) {
            notes[i].content = selectedNoteContent
        }
    }
    saveNote();
}

// edit note title / save into local storage
var editTitle = function(event) {
    var selectedNoteId = event.target.id.split('_');
    var selectedNoteContent = event.target.value
    for (var i = 0; i < notes.length; i++) {
        if (notes[i].id === parseInt(selectedNoteId[1])) {
            notes[i].title = selectedNoteContent
        }
    }
    saveNote();
}

// delete note
var deleteNote = function() {
    var selectedNoteId = event.target.id.split('_');
    var selectedNote = document.getElementById(event.target.id)
    var parentNode = event.target.parentNode;

    for (var i = 0; i < notes.length; i++) {
        if (notes[i].id === parseInt(selectedNoteId[1])) {
            notes[i].content = ''
            notes[i].title = ''
        }
    }
    container.removeChild(parentNode);
    saveNote();
}

// delete all
var deleteAll =function(){
    var confirm = prompt('This will remove all your saved notes! if you wish to continue, input YES');
    if ( confirm === 'YES'){
        localStorage.removeItem("notes");
        location.reload();
    }
    else{
        alert('Your notes are safe!')
    }

}

// save note into database
var saveNote = function() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// search
var search = function() {
    var query = document.querySelector('.search_input').value;

    for (var i = 0; i < notes.length; i++) {
        var note = document.querySelector('#note_' + i);

        if (note !== null) {
            if (notes[i].content.indexOf(query) >= 0 || notes[i].title.indexOf(query) >= 0){
                note.style.display = 'inline-block'
            } else {
                note.style.display = 'none'
            }
            if (query === '') {
                note.style.display = 'inline-block'
            }
        }
    }
}



// event listener for add button
document.querySelector('.add').addEventListener('click', renderNote);
document.querySelector('.search_input').addEventListener('input', search);

init();