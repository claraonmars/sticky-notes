console.log('working')

var notes =[];
var container = document.querySelector('.container');

// render note onto container
var renderNote = function(){

    var note = document.createElement("div");
    note.classList.add("note");

    var title = document.createElement("input");
    title.classList.add('title_input');
    title.setAttribute('placeholder', 'Title');
    note.appendChild(title);

    var contentInput = document.createElement('textarea');
    contentInput.classList.add('content');
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
}

document.querySelector('.add').addEventListener('click', renderNote);
