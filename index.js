import data from "./data.json" assert { type: "json" }
import { 
    getPostHtml, getAddNewCommentHtml, getNewReplyHtml, getDeleteModalHtml 
} from "./utils.js"

// let comments = data.comments
let comments = []

const mainEl = document.getElementById("main")

const deleteModal = document.getElementById("delete-modal")
const newCommentTextarea = document.getElementById("new-comment-text")


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
    const item = {
        "id": data.comments.length + 1,
        "content": newCommentTextarea.value,
        "score": 0,
        "user": data.currentUser,
        "replies": []
    }
    comments.push(item)
    renderPosts()
    console.log(comments)
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

console.log(getPosts(comments))

function renderPosts(){
    mainEl.innerHTML = getPosts(comments)
    mainEl.innerHTML += getAddNewCommentHtml(data)
    document.body.innerHTML += getDeleteModalHtml()
    
}
renderPosts()

