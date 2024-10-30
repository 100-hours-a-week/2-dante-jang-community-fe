axios.defaults.withCredentials = true;

document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('loginError');

    errorElement.textContent = '';

    try {
        const response = await axios.post('http://localhost:9000/user/login', {
            email,
            password
        });

        if (response.status === 200 && getCookie('connect.sid')) {
            alert('로그인 성공!');
            window.location.href = '/';
        } else {
            errorElement.textContent = '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.';
        }
    } catch (error) {
        console.error('로그인 오류:', error);
        errorElement.textContent = '로그인 중 오류가 발생했습니다. 나중에 다시 시도해주세요.';
    }
});

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
