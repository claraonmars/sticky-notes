console.log('working')

var notes =[];
var container = document.querySelector('.container');

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
//document.querySelector('.search_button').addEventListener('click', search);
document.querySelector('.search_input').addEventListener('input', search);

