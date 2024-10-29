let isEmailVerified = false;

document
  .getElementById("checkEmailButton")
  .addEventListener("click", async function () {
    const email = document.getElementById("email").value.trim();
    const emailError = document.getElementById("emailError");
    const emailSuccess = document.getElementById("emailSuccess");

    if (!email) {
      emailError.textContent = "이메일을 입력해주세요.";
      emailSuccess.textContent = "";
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:9000/user/check-email?email=${email}`
      );
      if (!response.data.isDuplicated) {
        emailSuccess.textContent = "사용 가능한 이메일입니다.";
        emailError.textContent = "";
        isEmailVerified = true;
      } else {
        emailError.textContent = "이미 사용 중인 이메일입니다.";
        emailSuccess.textContent = "";
        isEmailVerified = false;
      }
    } catch (error) {
      emailError.textContent = "이메일 확인 중 오류가 발생했습니다.";
      emailSuccess.textContent = "";
      isEmailVerified = false;
      console.log(error);
    }
  });

document
  .getElementById("signupForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    // 에러 메시지 초기화
    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("passwordError").textContent = "";
    document.getElementById("confirmPasswordError").textContent = "";

    // 폼 데이터 가져오기
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // 유효성 검사
    let isValid = true;

    if (name.length < 2) {
      document.getElementById("nameError").textContent =
        "이름은 2글자 이상이어야 합니다.";
      isValid = false;
    }

    if (!email.includes("@")) {
      document.getElementById("emailError").textContent =
        "유효한 이메일 주소를 입력해주세요.";
      isValid = false;
    }

    if (!isEmailVerified) {
      document.getElementById("emailError").textContent =
        "이메일 중복 확인을 해주세요.";
      isValid = false;
    }

    if (password.length < 8) {
      document.getElementById("passwordError").textContent =
        "비밀번호는 8자 이상이어야 합니다.";
      isValid = false;
    }

    if (password !== confirmPassword) {
      document.getElementById("confirmPasswordError").textContent =
        "비밀번호가 일치하지 않습니다.";
      isValid = false;
    }

    if (isValid) {
      try {
        const response = await axios.post("http://localhost:9000/user", {
          name,
          email,
          password,
          confirmPassword
        });
        alert("회원가입이 완료되었습니다!");
        // 회원가입 성공 후 처리 (예: 로그인 페이지로 리다이렉트)
      } catch (error) {
        alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
        console.error("회원가입 오류:", error);
      }
    }
  });
