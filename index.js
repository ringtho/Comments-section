import data from "./data.json" assert { type: "json" }
import { 
    getPostHtml, getAddNewCommentHtml, getNewReplyHtml, getDeleteModalHtml 
} from "./utils.js"

let comments = data.comments

// let comments = []

const mainEl = document.getElementById("main")
const deleteModal = document.getElementById("delete-modal")
const newCommentTextarea = document.getElementById("new-comment-text")

renderPosts()
document.addEventListener("click", function(e){
    e.preventDefault()
    if(e.target.id === "submit-btn"){
        handleSubmitComment()
    }

    if(e.target.id === "reply-submit"){
        const id = parseInt(e.target.dataset.id)
        handleSubmitReply(id)
    }

    if(e.target.id === "reply-btn"){
        handleReplyLinkClick(e.target.dataset)
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

function handleSubmitReply(id){
    const replyText = document.getElementById("reply-submit-text").value
    const newReply = comments.map(item => {
        if (item.id === id){
            const reply = {
                "id": 10,
                "content": replyText,
                "createdAt" : "1 second ago",
                "score": 0,
                "replyingTo": item.user.username,
                "user": data.currentUser,
            }
            item.replies.push(reply)
            return item
        }else {
            return item
        }
    })
    comments = newReply
    renderPosts()
}

function handleReplyLinkClick(data){
    const username = data.username
    const id = data.id
    const replyLink = document.getElementById(`new-reply-${username}`)
    replyLink.innerHTML = getNewReplyHtml(username, id)
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


