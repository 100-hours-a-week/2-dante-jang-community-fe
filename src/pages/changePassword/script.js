document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('passwordChangeForm');
    const passwordInput = document.getElementById('password');
    const checkPasswordInput = document.getElementById('checkPassword');
    const passwordError = document.getElementById('passwordError');
    const checkPasswordError = document.getElementById('checkPasswordError');
    const submitButton = document.querySelector('.change-btn');

    function validatePassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
        return regex.test(password);
    }

    function updateSubmitButton() {
        const isValid = validatePassword(passwordInput.value) && 
                        passwordInput.value === checkPasswordInput.value;
        submitButton.disabled = !isValid;
    }

    passwordInput.addEventListener('input', function() {
        if (this.value.length === 0) {
            passwordError.textContent = "*비밀번호를 입력해주세요";
        } else if (!validatePassword(this.value)) {
            passwordError.textContent = "*8~20자의 영문 대/소문자, 숫자, 특수문자를 사용하세요";
        } else {
            passwordError.textContent = "";
        }
        updateSubmitButton();
    });

    checkPasswordInput.addEventListener('input', function() {
        if (this.value !== passwordInput.value) {
            checkPasswordError.textContent = "*비밀번호와 다릅니다.";
        } else {
            checkPasswordError.textContent = "";
        }
        updateSubmitButton();
    });

    function showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.backgroundColor = '#333';
        toast.style.color = '#fff';
        toast.style.padding = '10px 20px';
        toast.style.borderRadius = '5px';
        toast.style.zIndex = '1000';
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (!validatePassword(passwordInput.value) || passwordInput.value !== checkPasswordInput.value) {
            return;
        }

        try {
            const response = await fetch('http://localhost:9000/user/change-password', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    password: passwordInput.value,
                    checkPassword: checkPasswordInput.value
                }),
                credentials: 'include'
            });

            if (response.ok) {
                showToast('수정완료');
                passwordInput.value = '';
                checkPasswordInput.value = '';
                updateSubmitButton();
            } else {
                throw new Error('Password change failed');
            }
        } catch (error) {
            console.error('Error:', error);
            showToast('비밀번호 변경에 실패했습니다.');
        }
    });
});
