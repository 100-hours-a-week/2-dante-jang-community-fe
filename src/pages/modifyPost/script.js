document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('postForm');
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');
    const fileSelectButton = document.getElementById('fileSelectButton');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    const submitButton = document.getElementById('submitButton');

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');

    try {
        const response = await fetch(`http://cummnity-study.duckdns.org:9000/post/modify?postId=${postId}`, {
            method: 'GET',
            credentials: 'include'
        });

        if (response.ok) {
            const post = await response.json();
            titleInput.value = post.title;
            contentInput.value = post.content;
        } else {
            throw new Error('Failed to fetch post details');
        }
    } catch (error) {
        console.error('Error fetching post details:', error);
        alert('게시글을 불러오는데 실패했습니다.');
    }

    fileSelectButton.addEventListener('click', () => {
        alert('이미지 업로드 기능은 아직 구현되지 않았습니다.');
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const title = titleInput.value.trim();
        const content = contentInput.value.trim();

        if (!title || !content) {
            alert('제목과 내용을 모두 입력해주세요.');
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = '처리중...';

        try {
            const response = await fetch(`http://cummnity-study.duckdns.org:9000/post?postId=${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('서버 응답이 실패했습니다.');
            }

            alert('게시글이 성공적으로 수정되었습니다.');
            window.location.href = `/post?postId=${postId}`;
        } catch (error) {
            console.error('Error:', error);
            alert('게시글 수정에 실패했습니다.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = '완료';
        }
    });
});