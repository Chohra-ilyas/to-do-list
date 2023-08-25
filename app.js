//getElements
let textinput = document.querySelector('.textinput');
let todobody = document.querySelector('.todobody');
let done = document.querySelector('.done');
let deleteall = document.querySelector('.deleteall')
//add data
let todolist;
if(localStorage.list!= null){
    todolist = JSON.parse(localStorage.list)
}else{
    todolist=[]
}
function addData(){
    if(textinput.value != ''){
        let task = textinput.value;
        todolist.push(task)
        localStorage.setItem('list', JSON.stringify(todolist))
        textinput.value = ''
    }
    showData()
}
//showData in page
function showData(){
    todobody.innerHTML = ''
    let tasks = ''
    for (let i = 0 ; i < todolist.length; i++) {
        tasks += `<p class="tasknum${i}"><input onclick="ifCheck(${i})" class="btn" type="checkbox"><span>${todolist[i]}</span><img onclick="deleteTask(${i})" src="/images/icons8-effacer.svg" alt=""><img class="edit" onclick="edit(${i})" src="" alt=""></p>`
        todobody.innerHTML = tasks
    }
    if(todobody.innerHTML === ''){
        deleteall.style.display= "none"
        todobody.innerHTML= `<h2 class="nothing">there is not tasks to do</h2>`
    }else{
        deleteall.style.display= "inline-block"
    }
}
//delete task
function deleteTask(i){
    todolist.splice(i,1)
    localStorage.list = JSON.stringify(todolist);
    showData()
}
//finish task
function ifCheck(i){
    let tasknum = document.querySelector(`.tasknum${i}`);
    tasknum.classList.toggle('checked');
}
//edit
function edit(i){
    textinput.value = todolist[i];
    deleteTask(i)
}
//search
const input = document.querySelector('#search')
input.addEventListener('keyup',e=>{
    const titles = document.querySelectorAll("span")
    console.log(titles)
    titles.forEach(title=>{
        
        if (title.textContent.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())){
            title.parentNode.style.display='flex'
        }else{
            title.parentNode.style.display='none'
        }
    })
})
//deleteall
function deleteAlThem(){
    localStorage.clear()
    todolist.splice(0)
    showData()
}
showData()