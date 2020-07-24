// console.log("Hello");
shownotes();
// If users add a note, add it to the local storage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let notesElement = localStorage.getItem("notes"); //if there is any item named 'notes' in localstorage , it will be assigned here
  if (notesElement == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notesElement);
  }
  let myObj = {
    title : addTitle.value,
    text : addTxt.value
  }
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
//   console.log(notesObj);
  shownotes();
});

//function to show elements from local storage
function shownotes() {
  let notesElement = localStorage.getItem("notes");
  if (notesElement == null) {
    notesObj = [];
  } 
  else {
    notesObj = JSON.parse(notesElement);
  }

  let html = "";

  notesObj.forEach(function (element, index) {
       
        html += `<div class="my-2 mx-2 noteCard" style="width: 18rem; border: 1px solid black">
          <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text" style="background-color: beige; border: 0.1px solid  rgb(202, 198, 198);"> ${element.text}</p>
            <button id = "${index}" onclick = "deleteItem(this.id)" class="btn btn-primary">Delete Now</button>
          </div>
        </div>`;
  });
let elem = document.getElementById("notes");
if (notesObj.length != 0) {
  elem.innerHTML = html ;
}
else{
    elem.innerHTML = `Please use 'Add a Note' option to write a note.`;
}
}

// function to delete a note 
function deleteItem(index){
    // console.log('I am deleting' , index);

      let notesElement = localStorage.getItem("notes");
      if (notesElement == null) {
        notesObj = [];
      } else {
        notesObj = JSON.parse(notesElement);
      }
      notesObj.splice(index , 1);
      localStorage.setItem("notes", JSON.stringify(notesObj));
      shownotes();
}

//Function for searching 

let search = document.getElementById('searchTxt');
search.addEventListener("input" , function(){

    let inpVal = search.value.toLowerCase();
    // console.log('You are searching' , inpVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if (cardTxt.includes(inpVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})