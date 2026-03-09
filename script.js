/* theme */

function toggleTheme(){

document.body.classList.toggle("light")

}


/* novels */

const books=[]

for(let i=1;i<=60;i++){

books.push({

title:"Novel "+i,
img:"images/"+((i%6)+1)+".jpg",
desc:"An epic adventure story."

})

}


/* build shelves */

function buildRows(){

const row1=document.getElementById("row1")
const row2=document.getElementById("row2")

if(row1){

books.slice(0,30).forEach((b,i)=>{

row1.innerHTML+=`

<a class="book-card" data-title="${b.title}" href="novel.html?id=${i}">

<img src="${b.img}">

</a>

`

})

}

if(row2){

books.slice(30,60).forEach((b,i)=>{

row2.innerHTML+=`

<a class="book-card" data-title="${b.title}" href="novel.html?id=${i}">

<img src="${b.img}">

</a>

`

})

}

}

buildRows()


/* search */

const search=document.getElementById("searchInput")

if(search){

search.addEventListener("keyup",()=>{

let value=search.value.toLowerCase()

document.querySelectorAll(".book-card").forEach(card=>{

let title=card.dataset.title.toLowerCase()

card.style.display=title.includes(value)?"block":"none"

})

})

}


/* novel page */

const params=new URLSearchParams(window.location.search)

const id=params.get("id")

if(id){

let book=books[id]

document.getElementById("title").innerText=book.title
document.getElementById("cover").src=book.img
document.getElementById("description").innerText=book.desc

let chapters=document.getElementById("chapters")

if(chapters){

for(let i=1;i<=40;i++){

chapters.innerHTML+=`

<a href="chapter.html?c=${i}">

Chapter ${i}

</a>

`

}

}

/* ratings */

let ratingBox=document.getElementById("rating")

for(let i=1;i<=5;i++){

ratingBox.innerHTML+=`<span class="star" onclick="rate(${i})">★</span>`

}

}


/* rating */

function rate(value){

localStorage.setItem("rating",value)

alert("You rated "+value+" stars")

}


/* comments */

function addComment(){

let text=document.getElementById("commentInput").value

let comments=JSON.parse(localStorage.getItem("comments")||"[]")

comments.push(text)

localStorage.setItem("comments",JSON.stringify(comments))

showComments()

}


function showComments(){

let list=document.getElementById("commentList")

if(!list) return

let comments=JSON.parse(localStorage.getItem("comments")||"[]")

list.innerHTML=""

comments.forEach(c=>{

list.innerHTML+=`<div class="comment">${c}</div>`

})

}

showComments()

/* chapter auto generator */

const chapterId = new URLSearchParams(window.location.search).get("c")

if(chapterId){

const title = document.getElementById("chapterTitle")
const text = document.getElementById("chapterText")

title.innerText = "Chapter " + chapterId

let story = ""

for(let i=0;i<40;i++){

story += `
<p>
The night wind moved quietly through the ancient forest. 
Our hero continued walking forward, unaware that destiny 
was already preparing the next trial ahead.
</p>
`

}

text.innerHTML = story

}