// Selectors
const textArea = document.querySelector('#note-textarea');
const saveBtn = document.querySelector('.save-btn');
const savedNote = document.querySelector('.saved-notes ul');
const viewNotes = document.querySelector('p.view-all-notes a');

// Event listeners
document.addEventListener('DOMContentLoaded', getNotes);
saveBtn.addEventListener('click', addNote);
savedNote.addEventListener('click', deleteNote);
savedNote.addEventListener('click', showSpecificNote);

// Functions
function addNote(event) {
	event.preventDefault();

	// Create Note list element
	const noteList = document.createElement('li');
	noteList.classList.add('saved-note-list');

	// Create Note div element (First Div)
	const noteDiv = document.createElement('div');
	noteDiv.classList.add('saved-note');

	// Append Note div to Note list
	noteList.appendChild(noteDiv);

	// Create Note p element
	const note = document.createElement('p');
	note.classList.add('note');
	note.innerText = textArea.value;

	// Append Note p to Note div
	noteDiv.appendChild(note);

	// Add Note to LocalStorage
	saveLocalNotes(textArea.value);

	// CREATE SECOND DIV (Buttons)
	const buttonsDiv = document.createElement('div');
	buttonsDiv.classList.add('buttons');

	// Create buttons a element
	const view = document.createElement('a');
	view.classList.add('view');
	view.innerText = 'View';

	// Append buttons a to Buttons
	buttonsDiv.appendChild(view);

	// Create i element(trash)
	const trash = document.createElement('i');
	trash.classList.add('fas', 'fa-trash');

	// Append trash to Buttons
	buttonsDiv.appendChild(trash);

	// Append Second Div to Note list
	noteList.appendChild(buttonsDiv);

	// Append Note list to Ul
	savedNote.appendChild(noteList);

	viewNotes.innerText = '';

	// Clear TextArea Value
	textArea.value = '';
}

function deleteNote(e) {
	const item = e.target;

	// DELETE NOTE
	if (item.classList[1] === 'fa-trash') {
		const noteItem = item.parentNode.parentNode;
		noteItem.remove();
		removeLocalNotes(noteItem);
	}

	if (savedNote.children.length < 1) {
		viewNotes.innerText = 'You Have No Saved Notes';
	}
}

function showSpecificNote(e) {
	const item = e.target;

	// VIEW NOTE
	const check = document.querySelector('a').classList.contains('view');
	const viewSpecificNote = item.parentNode.previousSibling.firstElementChild;

	if (check) {
		viewSpecificNote.classList.toggle('open');
	}

	if (viewSpecificNote.classList[1] === 'open') {
		item.innerText = 'Close';
	} else {
		item.innerText = 'View';
	}
}

function saveLocalNotes(localNote) {
	// Check if there is a note in there
	let notes;
	if (localStorage.getItem('notes') === null) {
		notes = [];
	} else {
		notes = JSON.parse(localStorage.getItem('notes'));
	}
	notes.push(localNote);
	localStorage.setItem('notes', JSON.stringify(notes));
}

function getNotes() {
	// Check if there is a note in there
	let notes;
	if (localStorage.getItem('notes') === null) {
		notes = [];
	} else {
		notes = JSON.parse(localStorage.getItem('notes'));
	}

	notes.forEach(function (localNote) {
		// Create Note list element
		const noteList = document.createElement('li');
		noteList.classList.add('saved-note-list');

		// Create Note div element (First Div)
		const noteDiv = document.createElement('div');
		noteDiv.classList.add('saved-note');

		// Append Note div to Note list
		noteList.appendChild(noteDiv);

		// Create Note p element
		const note = document.createElement('p');
		note.classList.add('note');
		note.innerText = localNote;

		// Append Note p to Note div
		noteDiv.appendChild(note);

		// CREATE SECOND DIV (Buttons)
		const buttonsDiv = document.createElement('div');
		buttonsDiv.classList.add('buttons');

		// Create buttons a element
		const view = document.createElement('a');
		view.classList.add('view');
		view.innerText = 'View';

		// Append buttons a to Buttons
		buttonsDiv.appendChild(view);

		// Create i element(trash)
		const trash = document.createElement('i');
		trash.classList.add('fas', 'fa-trash');

		// Append trash to Buttons
		buttonsDiv.appendChild(trash);

		// Append Second Div to Note list
		noteList.appendChild(buttonsDiv);

		// Append Note list to Ul
		savedNote.appendChild(noteList);

		viewNotes.innerText = '';
	});
}

function removeLocalNotes(localNote) {
	// Check if there is a note in there
	let notes;
	if (localStorage.getItem('notes') === null) {
		notes = [];
	} else {
		notes = JSON.parse(localStorage.getItem('notes'));
	}

	const noteIndex = localNote.children[0].firstChild.innerText;
	notes.splice(notes.indexOf(noteIndex), 1);

	localStorage.setItem('notes', JSON.stringify(notes));
}
