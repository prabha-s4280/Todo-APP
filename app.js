let todoContainer=document.getElementById("todoContainer");
let addBtn=document.getElementById("addButton");
let saveBtn=document.getElementById("saveButton");

function getTodoItems(){
    let stringifiedItem=localStorage.getItem("todoList");
    let parsedItem=JSON.parse(stringifiedItem);

    if(parsedItem===null){
        return []
    }
    else{
        return parsedItem;
    }
}

let todoList=getTodoItems()

saveBtn.onclick=function(){
    localStorage.setItem("todoList",JSON.stringify(todoList))
}

function createAndAppendTodo(todo){
    let todoId="todoItem"+todo.id;
    let checkBoxId="checkbox"+todo.id;
    let labelId="label"+todo.id;

    let todoElement=document.createElement("li");
    todoElement.id=todoId;
    todoElement.classList.add("item","col","d-flex","flex-col")
    todoContainer.appendChild(todoElement);


    let checkBox=document.createElement("input");
    checkBox.type="checkbox";
    checkBox.id=checkBoxId;
    checkBox.checked=todo.isChecked;
    checkBox.onclick=function(){
        onClickingCheckBox(labelId,todoId);
    }

    todoElement.appendChild(checkBox);

    let labelElement=document.createElement("label");
    labelElement.setAttribute("for",checkBoxId);
    labelElement.textContent=todo.item;
    labelElement.id=labelId;

    if(todo.isChecked===true){
        labelElement.classList.add("checked");
    }
    todoElement.appendChild(labelElement)

    let deleteContainer=document.createElement("div");
    deleteContainer.classList.add("del-button");

    todoElement.appendChild(deleteContainer)

    let deleteIcon=document.createElement("button");
    deleteIcon.innerHTML='<i class="fas fa-trash-alt"></i>'
    deleteIcon.classList.add("del-icon");
    deleteIcon.onclick=function(){
        onDeleteToDo(todoId)
    }

    deleteContainer.appendChild(deleteIcon);


}

for(let eachItem of todoList){
    createAndAppendTodo(eachItem)
}

function onClickingCheckBox(labelId,todoId){
    let labelElement=document.getElementById(labelId);
    /*
    if(checkBoxElement.checked===true){
        labelElement.classList.add("checked");
    }
    else{
        labelElement.classList.remove("checked");
    }
    */

    labelElement.classList.toggle("checked");

    let todoObjectIndex=todoList.findIndex(function(eachItem){
        let eachItemId="todoItem"+eachItem.id;
        if(eachItemId===todoId){
            return true;
        }
        else{
            return false;
        }
    });

    let todoObject=todoList[todoObjectIndex];

    if(todoObject.isChecked===true){
        todoObject.isChecked=false;
    }
    else{
        todoObject.isChecked=true;
    }
}

function onDeleteToDo(todoId){
    let todoElement=document.getElementById(todoId);
    todoContainer.removeChild(todoElement);


    let deleteItemIndex=todoList.findIndex(function(eachItem){
        let eachItemId="todoItem"+eachItem.id;
        if(eachItemId===todoId){
            return true;
        }
        else{
            return false;
        }
    });
    todoList.splice(deleteItemIndex,1);

    console.log(todoList);

}



function onAddToDo(){
    let todoCount=todoList.length;
    let userInput=document.getElementById("inputTasks");
    let taskValue=userInput.value;

    if(taskValue===""){
        alert("Enter Valid Task");
        return
    }

    todoCount=todoCount+1
    let newToDo={
        item:taskValue,
        id:todoCount,
        isChecked:false,
    };

    todoList.push(newToDo);
    createAndAppendTodo(newToDo);
    userInput.value="";
    
}

function onAddButton(){
    onAddToDo()
}


