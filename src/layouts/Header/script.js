let isLogin = false; // 로그인 상태
let sideNavStatus = false; // 사이드 내비게이션 상태
const defaultProfileImage = "/assets/image/default-profile-image-dark.png";

async function checkLoginStatus() {

  try {
    const response = await fetch('http://localhost:9000/user', {
      method: 'GET',
      credentials: 'include' // 쿠키 포함 요청
    });

    if (response.ok) {
      const data = await response.json();
      const userData = data.rows[0]; // 유저 정보가 rows 배열의 첫 번째 요소에 있음

      isLogin = true;
      const userProfileImage = userData.profile || defaultProfileImage; // 프로필 이미지 설정
      document.getElementById("profile-image").src = userProfileImage; // 프로필 이미지 업데이트
      
    }
  } catch (error) {
    console.error('Error checking login status:', error);
    isLogin = false; // 오류가 발생하면 로그인 상태를 false로 설정
  }

  initializeSideNavigation(); // 사이드 내비게이션 초기화
}

function initializeSideNavigation() {
  console.log("initializeSideNavigation is running"); // 확인 메시지

  const headerRight = document.querySelector(".header-right");
  if (!headerRight) {
    console.error("Error: .header-right element not found");
    return;
  }

  // 로그인 상태에 따라 login-status 텍스트 변경
  const loginStateBtn = document.getElementById("login-status");
  loginStateBtn.textContent = isLogin ? "마이페이지" : "로그인";
  loginStateBtn.onclick = () => {
    window.location.href = isLogin ? "/my-page" : "/login";
  };

  if (isLogin) {
    document.getElementById("logout-status").classList.toggle("hidden", false);
  }

  // 외부 클릭으로 사이드 내비게이션 닫기
  document.addEventListener("mousedown", (event) => {
    const sideNav = document.getElementById("side-navigation");
    if (sideNav && !sideNav.contains(event.target) && sideNavStatus) {
      sideNav.classList.add("hidden");
      sideNavStatus = false;
    }
  });
}

// 사이드 내비게이션 토글
function toggleSideNav() {
  sideNavStatus = !sideNavStatus;
  document
    .getElementById("side-navigation")
    .classList.toggle("hidden", !sideNavStatus);
}

async function logout() {
  console.log("Logging out...");

  try {
    const response = await fetch("http://localhost:9000/user/logout", {
      method: "POST",
      credentials: "include", // 쿠키를 포함하여 요청
      headers: {
        "Content-Type": "application/json", // JSON 데이터 형식으로 요청
      },
      body: JSON.stringify({}) // 빈 본문 전송
    });

    if (response.ok) {
      window.location.reload();
    } else {
      console.error("Logout failed:", response);
    }
  } catch (error) {
    console.error("Error during logout:", error);
  }
}

function settings() {
  console.log("Opening settings...");
}