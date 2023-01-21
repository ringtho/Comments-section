

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
                        <span class="btn-text">Reply</span>
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
                    <span class="btn-text">Reply</span>
                </div>
            </div>
        </section>
    `
    let replyHtml = ""
    if (comment.replies.length){
        comment.replies.forEach(reply => {
            const replies = `
            <section class="section-replies">
                <section class="section comments">
                    <div class="comments-container">
                        <div class="section-header">
                            <img class="section-avatar" src=${reply.user.image.png} />
                            <p class="section-username">${reply.user.username}</p>
                            <p class="section-time">${reply.createdAt}</p>
                            <div class="section-reply-btn large-screen">
                                <img class="reply-icon" src="/images/icon-reply.svg" />
                                <span class="btn-text">Reply</span>
                            </div>
                        </div>
                        <p class="section-comment"><span class="reply-username">@${reply.replyingTo}</span> ${reply.content}</p>
                    </div>
                    <div class="section-btns">
                        <div class="section-add-remove-btn">
                            <img class="plus-icon" src="images/icon-plus.svg" />
                            <p class="btn-text">${reply.score}</p>
                            <img class="minus-icon" src="images/icon-minus.svg" />
                        </div>
                        <div class="section-reply-btn small-screen">
                            <img class="reply-icon" src="/images/icon-reply.svg" />
                            <span class="btn-text">Reply</span>
                        </div>
                    </div>
                </section>
		    </section>
            `
            replyHtml += replies
            
        })
    }
    const html = post + replyHtml
    return html
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

export { getPostHtml, getAddNewCommentHtml }