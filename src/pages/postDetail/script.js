const formatDate = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function formatNumber(num) {
    if (num >= 10000) {
        return `${Math.floor(num / 1000)}K`;
    } else if (num >= 1000) {
        return `${Math.floor(num / 100) / 10}K`;
    }
    return num.toString();
}

function createPostHTML(post) {
    return `
        <article>
            <div class="post-header">
                <div>
                    <h1 class="post-title">${post.title}</h1>
                </div>
                <div class="author-info">
                    <div>
                        <img src="${post.user_profile || '/assets/image/default-profile-image-dark.png'}" alt="" class="profile-image">
                        <span>${post.user_name}</span>
                        <span class="timestamp">${formatDate(post.writed_at)}</span>
                    </div>
                    ${post.isMyPost ? `
                        <div class="action-buttons">
                            <button class="btn edit-btn" onclick="window.location.href='/modify-post?postId=${post.post_id}'">수정</button>
                            <button class="btn delete-btn">삭제</button>
                        </div>
                    ` : ''}
                </div>
            </div>

            <div class="post-content">
                ${post.content}
            </div>

            <div class="engagement-metrics">
                <div class="metric">
                    <div>${0}</div>
                    <div>좋아요</div>
                </div>
                <div class="metric">
                    <div>${formatNumber(post.view_count)}</div>
                    <div>조회수</div>
                </div>
                <div class="metric">
                    <div>${0}</div>
                    <div>댓글</div>
                </div>
            </div>

            <div class="comment-section">
                <textarea 
                    class="comment-input" 
                    placeholder="댓글을 남겨주세요!"
                    rows="3"
                ></textarea>
                <button class="comment-submit">댓글 등록</button>

                <div class="comment-list">
                    ${post.comment_list.map(comment => `
                        <div class="comment">
                            <img src="${comment.user_profile || 'default-avatar.png'}" alt="" class="profile-image">
                            <div class="comment-content">
                                <div>
                                    <strong>${comment.user_name}</strong>
                                    <span class="timestamp">${formatDate(comment.created_at)}</span>
                                    ${comment.isMyComment ? `
                                        <div class="action-buttons">
                                            <button class="btn edit-btn">수정</button>
                                            <button class="btn delete-btn">삭제</button>
                                        </div>
                                    ` : ''}
                                </div>
                                <p>${comment.content}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </article>
    `;
}

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('postId');

fetch(`http://cummnity-study.duckdns.org:9000/post?postId=${postId}`, {
    method: "GET",
    credentials: 'include'
})
.then(response => response.json())
.then(post => {
    document.getElementById('post-container').innerHTML = createPostHTML(post);
    
    // Add event listeners
    if (post.isMyPost) {
        document.querySelector('.edit-btn')?.addEventListener('click', () => {
            // Handle edit
            console.log('Edit post');
        });
        
        document.querySelector('.delete-btn')?.addEventListener('click', () => {
            // Handle delete
            console.log('Delete post');
        });
    }

    document.querySelector('.comment-submit')?.addEventListener('click', () => {
        const content = document.querySelector('.comment-input').value;
        if (content.trim()) {
            // Handle comment submission
            console.log('Submit comment:', content);
        }
    });
})
.catch(error => {
    console.error('Error fetching post:', error);
    document.getElementById('post-container').innerHTML = '포스트를 불러오는데 실패했습니다.';
});