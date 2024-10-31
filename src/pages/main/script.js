document.addEventListener('DOMContentLoaded', function () {
    const postList = document.getElementById('postList');
    const writePostBtn = document.getElementById('writePostBtn');

    writePostBtn.addEventListener('click', function () {
        window.location.href = '/write-post';
    });

    const checkUser = async () => {
        try {
            const response = await fetch('http://cummnity-study.duckdns.org:9000/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (response.ok) {
                writePostBtn.style.display = "inline-block";
            } else {
                writePostBtn.style.display = "none";
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            writePostBtn.style.display = "none";
        }
    };

    const formatNumber = (num) => {
        if (num >= 10000) {
            return `${Math.floor(num / 1000)}K`;
        } else if (num >= 1000) {
            return `${Math.floor(num / 100) / 10}K`;
        }
        return num.toString();
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).replace(/\./g, '-');
    }

    async function fetchPosts() {
        try {
            const response = await fetch('http://cummnity-study.duckdns.org:9000/post/list',{
                method: "GET",
            });
            const posts = await response.json();

            posts.forEach((post, index) => {
                const postItem = document.createElement('div');
                postItem.classList.add('post-item');

                postItem.addEventListener('click', () => {
                    window.location.href = `/post?postId=${post.post_id}`;
                });

                postItem.innerHTML = `
                    <div class="post-title">${post.title}</div>
                    <div class="post-meta">
                        <div class="post-stats">
                            <span>좋아요 ${0}</span>
                            <span>댓글 ${0}</span>
                            <span>조회수 ${formatNumber(post.view_count)}</span>
                        </div>
                        <time datetime="${post.writed_at}">${formatDate(post.writed_at)}</time>
                    </div>
                    <div class="post-author">
                        <img src="${post.image_url || '/path/to/default-avatar.png'}" alt="Author Image">
                        <span>${post.user_name}</span>
                    </div>
                `;

                postList.appendChild(postItem);
            });
        } catch (error) {
            console.error('Error fetching posts:', error);
            postList.innerHTML = '<p>게시글을 불러오는 중 오류가 발생했습니다.</p>';
        }
    }

    fetchPosts();
    checkUser();
});
