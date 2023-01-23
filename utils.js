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
                        <span class="btn-text" id="reply-btn" data-username=${comment.user.username} 
                        data-id=${comment.id}>Reply</span>
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
                    <span class="btn-text" data-username=${comment.user.username} 
                    data-id=${comment.id} id="reply-btn">Reply</span>
                </div>
            </div>
        </section>
        <span id="new-reply-${comment.user.username}"></span>
    `
    let replyHtml = ""
    if (comment.replies.length){
        replyHtml += getReplyHtml(comment.replies)
    }
    const html = post + replyHtml
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
                                <span class="btn-text red" id="delete-btn" data-id=${reply.id}>Delete</span>
                            </div>
                            <div class="section-reply-btn large-screen">
                                <img class="edit-icon" src="/images/icon-edit.svg" />
                                <span class="btn-text" id="edit-btn" data-content=${reply.content}>Edit</span>
                        </div>
                        </div>` :
                        `<div class="section-reply-btn large-screen">
                            <img class="reply-icon" src="/images/icon-reply.svg" />
                            <span class="btn-text" data-username=${reply.user.username} 
                            data-id=${reply.id} id="reply-btn">Reply</span>
                        </div>`
                        }
                    </div>
                    <span id="content">
                        <p class="section-comment">
                        <span class="reply-username">@${reply.replyingTo}</span> ${reply.content}</p>
                    </span>
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
                    <span class="btn-text red" id="delete-btn" data-id=${reply.id}>Delete</span>
                    </div>
                    <div class="section-reply-btn small-screen">
                        <img class="edit-icon" src="/images/icon-edit.svg" />
                        <span class="btn-text" id="edit-btn" data-content=${reply.content}>Edit</span>
                    </div> `:
                    `<div class="section-reply-btn small-screen">
                        <img class="reply-icon" src="/images/icon-reply.svg" />
                        <span class="btn-text" data-username=${reply.user.username} 
                        data-id=${reply.id} id="reply-btn">Reply</span>
                    </div>`
                    }
                </div>
            </section>
            <span id="new-reply-${reply.user.username}"></span>
        `
        replyHtml += replies

    })
    return `<section class="section-replies">${replyHtml}</section>`
}

function getNewReplyHtml(username, id){
    return `
    <section class="section comments">
        <div class="add-comment-container">
            <textarea id="reply-submit-text">@${username} </textarea>
            <div class="section-header add-comment">
                <img class="section-avatar" src=${data.currentUser.image.png} />
                <button class="submit-btn" id="reply-submit" data-id=${id}>REPLY</button>
            </div>
        </div>
    </section>
    `
}

function getAddNewCommentHtml(data){
    return `
    <section class="section comments">
        <div class="add-comment-container">
            <textarea placeholder="Add a comment..." id="new-comment-text"></textarea>
            <div class="section-header add-comment">
                <img class="section-avatar" src=${data.currentUser.image.png} />
                <button class="submit-btn" id="submit-btn">SEND</button>
            </div>
        </div>
    </section>
    `
}

function getDeleteModalHtml(){
    return `
    <section id="delete-modal" class="modal hide" >
        <section class="section" id="delete">
            <p class="modal-header">Delete comment</p>
            <p class="section-comment">Are you sure you want to delete this comment? This will remove the comment and can’t be undone.
            </p>
            <div class="modal-btns">
                <button class="cancel-btn" id="cancel-btn">NO, CANCEL</button>
                <button class="delete-btn" id="delete-submit">YES, DELETE</button>
            </div>
        </section>
    </section>
    `
}

export { getPostHtml, getAddNewCommentHtml, getNewReplyHtml, getDeleteModalHtml }