
var notes
var container = document.querySelector('.container');

// check local storage
var init = function(){
    if (typeof(Storage) !== "undefined") {
        if(window.localStorage.getItem("notes") === null || window.localStorage.getItem("notes") === undefined){
            var newArr =[];
            localStorage.setItem('notes', JSON.stringify(newArr));
            notes = JSON.parse(window.localStorage.getItem('notes'));
        }
        else{
            notes = JSON.parse(window.localStorage.getItem('notes'));
            renderExisting();
        }
    }
    else{
        alert('Your browser does not support local storage, your notes will not be saved!');
        notes = [];
    }
}

// append existing notes from local storage
var renderExisting = function(){
    console.log(notes)
    for (var i = 0; i< notes.length; i ++){
        if (notes[i].title !== '' || notes[i].content !== ''){
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

            var edit = document.querySelectorAll('.content');
            for (var j = 0; j < edit.length; j++){
                edit[j].addEventListener('keyup', editNote);
            }

            //edit title event listener
            var editT = document.querySelectorAll('.title_input');
            for (var k = 0; k < editT.length; k++){
                editT[k].addEventListener('keyup', editTitle);
            }

            // delete event listener
            var deleteBtns = document.querySelectorAll('.delete')
            for (var n = 0; n < deleteBtns.length; n++){
                deleteBtns[n].addEventListener('click', deleteNote);
            }
        }
    }
}

// render note onto container
var renderNote = function(){

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
    for (var i = 0; i < deleteBtns.length; i++){
        deleteBtns[i].addEventListener('click', deleteNote);
    }

    // edit event listener
    var edit = document.querySelectorAll('.content');
    for (var j = 0; j < edit.length; j++){
        edit[j].addEventListener('keyup', editNote);
    }

    //edit title event listener
    var editT = document.querySelectorAll('.title_input');
    for (var k = 0; k < editT.length; k++){
        editT[k].addEventListener('keyup', editTitle);
    }
}

// add note to 'database'
var addNote = function(){
    let title_input = document.querySelector(".title_input").value;
    let content = document.querySelector(".content").value;
    let note = {
        'id': notes.length,
        'title': title_input,
        'content': content
    }
    notes.push(note);
}

// edit note
var editNote = function(event){
    var selectedNoteId = event.target.id.split('_');
    var selectedNoteContent = event.target.value
    for (var i = 0; i<notes.length; i++){
        if (notes[i].id === parseInt(selectedNoteId[1])){
            notes[i].content = selectedNoteContent
        }
    }
    saveNote();
}

// edit note title
var editTitle = function(event){
    var selectedNoteId = event.target.id.split('_');
    var selectedNoteContent = event.target.value
    for (var i = 0; i<notes.length; i++){
        if (notes[i].id === parseInt(selectedNoteId[1])){
            notes[i].title = selectedNoteContent
        }
    }
    saveNote();
}

// delete note
var deleteNote = function(){
    var selectedNoteId = event.target.id.split('_');
    var selectedNote = document.getElementById(event.target.id)
    var parentNode = event.target.parentNode;

    for (var i = 0; i<notes.length; i++){
        if (notes[i].id === parseInt(selectedNoteId[1])){
            notes[i].content = ''
            notes[i].title = ''
        }
    }
    container.removeChild(parentNode);
    saveNote();
}

var saveNote = function(){
    localStorage.setItem('notes', JSON.stringify(notes));
}

// search
var search = function(){
    var query = document.querySelector('.search_input').value;

    for (var i = 0; i < notes.length; i++){
        var note = document.querySelector('#note_' + i);
        if (notes[i].content.includes(query)|| notes[i].title.includes(query)){
            note.style.display = 'block'
        }
        else{
            note.style.display = 'none'
        }
    }
}



// event listener for add button
document.querySelector('.add').addEventListener('click', renderNote);
document.querySelector('.search_input').addEventListener('input', search);

init();