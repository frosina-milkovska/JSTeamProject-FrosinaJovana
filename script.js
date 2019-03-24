    function redirect(){
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    if ( username.value == "sedc" && password.value == "sedc2019") {
        return true;
    }
    else{
        document.getElementById("wrong-input").innerText = "Wrong input. Try again.";
        return false;
    }}


    function Student(name, lastname, birth, hometown) {
        this.name = name;
        this.lastname = lastname;
        this.birth = birth;
        this.hometown = hometown;
    
    };

let addStudent = document.getElementById("btn-add");
let listOfStudents = document.getElementById("student-list");
var students = [];

function printStudent(students) {
    listOfStudents.innerHTML = "";
    let index = 0;
    listOfStudents.innerHTML += 
    `<tr> 
        <th>First Name</th>
        <th>Last Name</th>
        <th>Date of birth</th>
        <th>Hometown</th>
    </tr>
    
    `
    for (let items of students) {
        
        listOfStudents.innerHTML += 
            
            `<tr> 
            <td id="table-name-${index}" class="basic">${items.name}</td> 
            <td id="table-lastname-${index}" class="basic">${items.lastname}</td> 
            <td class="basic">${items.birth}</td> 
            <td  class="basic">${items.hometown}</td >
            <td> 
                <button class="btn-edit" id="btn-edit-${index}"> edit </button>
                <button class="btn-delete" id="btn-delete-${index}">delete</button></td>
            </tr>`
            index++;
    }
    
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("birth").value = "";
    document.getElementById("hometown").value = "";
 }

addStudent.addEventListener("click", function () {
    let name = document.getElementById("name").value;
    let lastname = document.getElementById("lastname").value;
    let birth = document.getElementById("birth").value;
    let hometown = document.getElementById("hometown").value;

    var newStudent = new Student(name, lastname, birth, hometown);
    students.push(newStudent);
    printStudent(students);
    clearForm();

});


function edit(index){
    var modal = document.getElementById('editModal');
    modal.style.display = "block";
    var modal_name = students[index]["name"];
    var modal_lastname = students[index]["lastname"];
    
    document.getElementById("modal_index").value=index;
    document.getElementById("modal_name").value = modal_name;
    document.getElementById("modal_lastname").value = modal_lastname;
     
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.getElementById("modal_index").value= "";
            document.getElementById("modal_name").value="";
            document.getElementById("modal_lastname").value="";
        }
    }
}
function finish_update()
{
    var index = document.getElementById("modal_index").value;
    var name = document.getElementById("modal_name").value;
    var lastname = document.getElementById("modal_lastname").value;
    document.getElementById("table-name-"+index).innerHTML = name;
    document.getElementById("table-lastname-"+index).innerHTML = lastname;
    modal_close('edit');
}


function remove(index){
    var modal = document.getElementById('removeModal');
    modal.style.display = "block";
    var full_name = students[index]["name"]+" "+students[index]["lastname"];
    
    document.getElementById("remove-full-name").innerHTML="Are you sure you want to delete "+full_name+" ?";
    document.getElementById("modal_remove_index").value=index;

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.getElementById("modal_remove_index").value= "";
            document.getElementById("modal_name").value="";
            document.getElementById("modal_lastname").value="";
        }
    }
}
function finish_remove()
{
    var index = document.getElementById("modal_remove_index").value;
    students.splice(index, 1);
    printStudent(students);
    modal_close('remove');
}

function modal_close(type)
{
   if(type == "edit")
   {
      document.getElementById("editModal").style.display = "none";
      document.getElementById("modal_index").value= "";
      document.getElementById("modal_name").value="";
      document.getElementById("modal_lastname").value="";
   }
   if(type == "remove")
   {
      document.getElementById("removeModal").style.display = "none";
      document.getElementById("modal_index").value= "";
      document.getElementById("modal_name").value="";
      document.getElementById("modal_lastname").value="";
   }
}

document.addEventListener("click", function(event){
    if(event.target.className == "btn-edit"){
        let index = parseInt(event.target.id.split("-")[2]);
        edit(index);
    }
    if(event.target.className == "modal-update")
    {
        finish_update();
    }
    if(event.target.className == "modal-close")
    {
        modal_close('edit');
    }
    if(event.target.className == "btn-delete") {
        let index = parseInt(event.target.id.split("-")[2]);
        remove(index);
    }
    if(event.target.className == "modal-remove-yes") {
        finish_remove();
    }
    if(event.target.className == "modal-remove-no") {
        modal_close('remove');
    }
});