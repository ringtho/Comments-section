import data from "./data.json" assert { type: "json" }
import { getPostHtml, getAddNewCommentHtml } from "./utils.js"

const mainEl = document.getElementById("main")

document.addEventListener("click", function(e){
    console.log(e.target)
})

console.log(data)


function getPosts(data){

    let commentsHtml = ""

    data["comments"].forEach(comment => {
        const post = getPostHtml(comment)
        console.log(post)
        commentsHtml += post
    })
    return commentsHtml
    
}

function renderPosts(data){
    mainEl.innerHTML = getPosts(data)
    mainEl.innerHTML += getAddNewCommentHtml(data)
    
}

renderPosts(data)