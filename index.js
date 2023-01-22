import data from "./data.json" assert { type: "json" }
import { getPostHtml, getAddNewCommentHtml, getNewReplyHtml } from "./utils.js"

const mainEl = document.getElementById("main")


document.addEventListener("click", function(e){
    if(e.target.id === "reply-btn"){
        handleReplyBtnClick(e.target.dataset.id)
    }
})

function handleReplyBtnClick(username){
    document.getElementById(`new-reply-${username}`).innerHTML = getNewReplyHtml(username)
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