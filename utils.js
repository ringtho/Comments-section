import data from "./data.json" assert {type: "json"}

function getPostHtml(comment){
    const post = `
        <section class="section comments">
            <div class="comments-container">
                <div class="section-header">
                    <img class="section-avatar" src=${comment.user.image.png} />
                    <p class="section-username">${comment.user.username}</p>
                    <p class="section-time">${comment.createdAt}</p>
                    <div class="section-reply-btn large-screen">
                        <img class="reply-icon" src="/images/icon-reply.svg" />
                        <span class="btn-text" id="reply-btn" data-id=${comment.user.username}>Reply</span>
                    </div>
                </div>
                <p class="section-comment">${comment.content}</p>
            </div>
            
            <div class="section-btns">
                <div class="section-add-remove-btn">
                    <img class="plus-icon" id="plus-btn" src="images/icon-plus.svg" />
                    <p id="score" class="btn-text">${comment.score}</p>
                    <img class="minus-icon" id="minus-btn" src="images/icon-minus.svg" />
                </div>
                <div id="replyBtn" class="section-reply-btn small-screen">
                    <img class="reply-icon" src="/images/icon-reply.svg" />
                    <span class="btn-text" data-id=${comment.user.username} id="reply-btn">Reply</span>
                </div>
            </div>
        </section>
    `
    let replyHtml = ""
    if (comment.replies.length){
        replyHtml += getReplyHtml(comment.replies)
    }
    const spanEl = `<span id="new-reply"></span>`
    const html = post + replyHtml + spanEl
    return html
}

function getReplyHtml(replyArr){
    let replyHtml = ""
    replyArr.forEach(reply => {
        let isCurrentUser = reply.user.username === data.currentUser.username
        const replies = `
            <section class="section comments">
                <div class="comments-container">
                    <div class="section-header">
                        <img class="section-avatar" src=${reply.user.image.png} />
                        <p class="section-username">${reply.user.username}</p>
                        ${isCurrentUser ? `<span class="you-tag">You</span>`: ""}
                        <p class="section-time">${reply.createdAt}</p>
                        ${isCurrentUser ? 
                        `<div class="delete-edit-btns">
                            <div class="section-reply-btn mg large-screen">
                                <img class="delete-icon" src="/images/icon-delete.svg" />
                                <span class="btn-text red">Delete</span>
                            </div>
                            <div class="section-reply-btn large-screen">
                                <img class="edit-icon" src="/images/icon-edit.svg" />
                                <span class="btn-text">Edit</span>
                        </div>
                        </div>` :
                        `<div class="section-reply-btn large-screen">
                            <img class="reply-icon" src="/images/icon-reply.svg" />
                            <span class="btn-text">Reply</span>
                        </div>`
                        }
                    </div>
                    <p class="section-comment"><span class="reply-username">@${reply.replyingTo}</span> ${reply.content}</p>
                </div>
                <div class="section-btns">
                    <div class="section-add-remove-btn">
                        <img class="plus-icon" src="images/icon-plus.svg" />
                        <p class="btn-text">${reply.score}</p>
                        <img class="minus-icon" src="images/icon-minus.svg" />
                    </div>
                    ${isCurrentUser ?
                    `<div class="section-reply-btn mg small-screen">
                    <img class="delete-icon" src="/images/icon-delete.svg" />
                    <span class="btn-text red">Delete</span>
                    </div>
                    <div class="section-reply-btn small-screen">
                        <img class="edit-icon" src="/images/icon-edit.svg" />
                        <span class="btn-text">Edit</span>
                    </div> `:
                    `<div class="section-reply-btn small-screen">
                        <img class="reply-icon" src="/images/icon-reply.svg" />
                        <span class="btn-text">Reply</span>
                    </div>`
                    }
                </div>
            </section>
        `
        replyHtml += replies

    })
    return `<section class="section-replies">${replyHtml}</section>`
}

function getNewReplyHtml(username){
    return `
    <section class="section comments">
        <div class="add-comment-container">
            <textarea>@${username} </textarea>
            <div class="section-header add-comment">
                <img class="section-avatar" src=${data.currentUser.image.png} />
                <button class="submit-btn">REPLY</button>
            </div>
        </div>
    </section>
    `
}

function getAddNewCommentHtml(data){
    return `
    <section class="section comments">
        <div class="add-comment-container">
            <textarea placeholder="Add a comment..."></textarea>
            <div class="section-header add-comment">
                <img class="section-avatar" src=${data.currentUser.image.png} />
                <button class="submit-btn">SEND</button>
            </div>
        </div>
    </section>
    `
}

export { getPostHtml, getAddNewCommentHtml, getNewReplyHtml }