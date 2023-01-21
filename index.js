import data from "./data.json" assert { type: "json" }
import { getPostHtml, getAddNewCommentHtml, getNewReplyHtml } from "./utils.js"

const mainEl = document.getElementById("main")
const replyBtn = document.getElementById("reply-btn")

document.addEventListener("click", function(e){
    if(e.target.id === "reply-btn"){
        handleReplyBtnClick(e.target.dataset.id)
    }
})

console.log(getPosts(data))

function handleReplyBtnClick(username){
    console.log(username)
    document.getElementById("new-reply").innerHTML = getNewReplyHtml(username)
}

function getPosts(data){
    let commentsHtml = ""
    data["comments"].forEach(comment => {
        const post = getPostHtml(comment)
        commentsHtml += post
    })
    return commentsHtml
    
}

function renderPosts(data){
    mainEl.innerHTML = getPosts(data)
    mainEl.innerHTML += getAddNewCommentHtml(data)
    
}

renderPosts(data)