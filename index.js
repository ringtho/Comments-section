import data from "./data.json" assert { type: "json" }
import { 
    getPostHtml, getAddNewCommentHtml, getNewReplyHtml, getDeleteModalHtml 
} from "./utils.js"

// let comments = data.comments

let comments = []

const mainEl = document.getElementById("main")
const deleteModal = document.getElementById("delete-modal")
const newCommentTextarea = document.getElementById("new-comment-text")

renderPosts()
document.addEventListener("click", function(e){
    e.preventDefault()
    if(e.target.id === "submit-btn"){
        handleSubmitComment()
    }
    if(e.target.id === "reply-btn"){
        handleReplyBtnClick(e.target.dataset.id)
    }

    if(e.target.id === "edit-btn"){
        console.log(e.target.dataset.content)
        handleEditBtnClick(e.target.dataset)
    }

    if (e.target.id === "delete-btn"){
        handleDeleteBtnClick()
    }

    if (e.target.id === "cancel-btn"){
        handleCancelBtnClick()
    }
})

function handleSubmitComment(){
    const newCommentTextarea = document.getElementById("new-comment-text")
    comments.push({
        "id": data.comments.length + 1,
        "content": newCommentTextarea.value,
        "createdAt" : "1 second ago",
        "score": 0,
        "user": data.currentUser,
        "replies": []
    })
    renderPosts()
}

function handleReplyBtnClick(username){
    const replyBtn = document.getElementById(`new-reply-${username}`)
    replyBtn.innerHTML = getNewReplyHtml(username)
}

function handleEditBtnClick(content){
    const contentEl = document.getElementById("content")
}

function handleDeleteBtnClick(){
    const deleteModal = document.getElementById("delete-modal")
    deleteModal.classList.remove("hide")
}

function handleCancelBtnClick(){
    const deleteModal = document.getElementById("delete-modal")
    deleteModal.classList.add("hide")
}

function getPosts(comments){
    let commentsHtml = ""
    comments.forEach(comment => {
        const post = getPostHtml(comment)
        commentsHtml += post
    })
    return commentsHtml
    
}

function renderPosts(){
    const displayHtml = `
    ${getPosts(comments)}
    ${getAddNewCommentHtml(data)}
    ${getDeleteModalHtml()}
    `
    mainEl.innerHTML = displayHtml
}


