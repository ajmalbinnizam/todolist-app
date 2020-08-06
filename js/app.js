
//select the element
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//classes name
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//variable
let LIST ,id ;
//get item
let data = localStorage.getItem("TODO");

if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);

}else{
LIST = [];
id = 0;
}

function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}
//clear local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});
    
//todays date
const options = {weekday : "short", month : "long", day : "numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);
 
// add to do funcion
function addToDo(toDo, id, done, trash){
    
    if(trash){ return; }
    
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    
    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;
    
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}
//addToDo("learn anything");

//add an item to list by enter key

document.addEventListener("keyup",function(even){
if (event.keyCode == 13){
    const toDo = input.value;

    if(toDo){
        addToDo(toDo, id, false, false);
        LIST.push({
            name : toDo,
            id : id,
            done : false,
            trash : false
        });

        localStorage.setItem("TODO", JSON.stringify(LIST));

        id++;
    }

    input.value = "";

}
});
function completeTodo(element){
    element.classlist.toggle(CHECK);
    element.classlist.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classlist.toggle(LINE_THROUGH);
    LIST[ element.id].done = list[element.id].done ? false:true;
}
//remove 
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}
//target the item
list.addEventListener("click", function(event){
    const element = event.target; //return clikes element
    const elementJob = element.attributes.job.value;//complete or delete
 
    if(elementJob == "complete"){
     completeTodo(element);
 }else if(elementJob == "delete"){
     removeToDo(element);
 }
 localStorage.setItem("TODO",JSON.stringify(LIST));
 });



