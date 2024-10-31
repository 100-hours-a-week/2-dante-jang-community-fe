document.addEventListener('DOMContentLoaded', function() {
    const profileForm = document.getElementById('profileForm');
    const successMessage = document.getElementById('successMessage');
    const profileImage = document.getElementById('profile-image');
    const emailDisplay = document.getElementById('email-display');
    const nameInput = document.getElementById('name');

    const leaveButton = document.getElementById('leaveButton');
    const leaveModal = document.getElementById('leaveModal');
    const cancelLeave = document.getElementById('cancelLeave');
    const confirmLeave = document.getElementById('confirmLeave');

    const defaultProfileImage = "/assets/image/default-profile-image-dark.png";

    async function fetchUserData() {
        try {
            const response = await fetch('http://cummnity-study.duckdns.org:9000/user', {
                method: 'GET',
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                const userData = data.rows[0];

                console.log(userData);

                profileImage.src = userData.profile_url || defaultProfileImage;

                emailDisplay.textContent = userData.email || 'Email not available';

                nameInput.value = userData.name || '';

            } else {
                console.log("not response ok");
                throw new Error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            alert('사용자 정보를 불러오는데 실패했습니다. 페이지를 새로고침 해주세요.');
        }
    }

    async function deleteUser() {
        try {
            const response = await fetch('http://cummnity-study.duckdns.org:9000/user', {
                method: 'DELETE',
                credentials: 'include'
            });

            if (response.ok) {
                window.location.href = "/";
            } else {
                console.log("Failed to delete user");
                throw new Error('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('회원 탈퇴에 실패했습니다. 다시 시도해주세요.');
        }
    }

    fetchUserData();

    profileForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const name = nameInput.value.trim();

        if (!name) {
            alert('닉네임을 입력해주세요.');
            return;
        }

        try {
            const response = await fetch('http://cummnity-study.duckdns.org:9000/user', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: name }),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('서버 응답이 실패했습니다.');
            }

            successMessage.style.display = 'block';

            setTimeout(() => {
                successMessage.style.display = 'none';
                window.location.reload();
            }, 1000);

        } catch (error) {
            console.error('Error:', error);
            alert('수정 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    });

    leaveButton.addEventListener('click', function() {
        leaveModal.style.display = 'flex';
    });

    cancelLeave.addEventListener('click', function() {
        leaveModal.style.display = 'none';
    });

    confirmLeave.addEventListener('click', function() {
        deleteUser();
    });

    window.addEventListener('click', function(e) {
        if (e.target === leaveModal) {
            leaveModal.style.display = 'none';
        }
    });
});