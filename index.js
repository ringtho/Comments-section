import data from "./data.json" assert { type: "json" }
import { 
    getPostHtml, getAddNewCommentHtml, getNewReplyHtml, getDeleteModalHtml 
} from "./utils.js"

const mainEl = document.getElementById("main")



document.addEventListener("click", function(e){
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
    document.body.innerHTML += getDeleteModalHtml()
    
}

renderPosts(data)
