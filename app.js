const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn= document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput =document.querySelector('#task');

// load all event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners(){
    //DOM Load event
     document.addEventListener('DOMContentLoaded',getTasks);
    //Add task event
    form.addEventListener('submit',addTask); 
    //emove task event
    taskList.addEventListener('click',removeTask);
    //clear task event
    clearBtn.addEventListener('click',clearTasks)
    //Filter task event
    filter.addEventListener('keyup',filterTasks);
}

//Get Tasks from LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
     tasks =[];
    }else{
      tasks= JSON.parse(localStorage.getItem('tasks'));
    }
   tasks.forEach(function(task){
         //Create li element
    const li = document.createElement('li');
    //Add class
    li.className='collection-item';
    //Create text node and appnend to li
   li.appendChild(document.createTextNode(task));
   //Add new link element
   const link = document.createElement('a');
   //Add class 
   link.className= 'delete-item secondary-content';
   //Add icon html
   link.innerHTML='<i class="fa fa-remove"></i>';
   //Append the link to li
   li.appendChild(link);

   //Append the li to ul
   taskList.appendChild(li);

   })
}

//Add Task
function addTask(e){
    if(taskInput.value===''){
        alert('Add a task');

    }
    //Create li element
    const li = document.createElement('li');
    //Add class
    li.className='collection-item';
    //Create text node and appnend to li
   li.appendChild(document.createTextNode(taskInput.value));
   //Add new link element
   const link = document.createElement('a');
   //Add class 
   link.className= 'delete-item secondary-content';
   //Add icon html
   link.innerHTML='<i class="fa fa-remove"></i>';
   //Append the link to li
   li.appendChild(link);

   //Append the li to ul
   taskList.appendChild(li);

   //Store in LS
   storeTaskInLocalStorage(taskInput.value);
   
   //clear input
   taskInput.value='';
    e.preventDefault();
}
//Store Task

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
     tasks =[];
    }else{
      tasks= JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Remove task

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item'))
    {
       if(confirm('Are you sure?')){
        e.target.parentElement.parentElement.remove();

        //Remove From LS
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
      }
    }
}
//Remove From LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
     tasks =[];
    }else{
      tasks= JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
      if(taskItem.textContent===tasks){
          tasks.splice(index,1);
      }
    });
     localStorage.setItem('tasks',JSON.stringify(tasks));
}

//clear task

function clearTasks(){
//taskList.innerHTML='';

//FASTER

while(taskList.firstChild){
taskList.removeChild(taskList.firstChild);
}
//jsperf.com/innerHtml vs first child
}

//Filter task 
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item =task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text)!= -1){
                task.style.display ='block'
            }else{
                task.style.display='none';
            }
        }
    )
}