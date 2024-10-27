let isLogin = false; // 로그인 상태
let sideNavStatus = false; // 사이드 내비게이션 상태

function initializeSideNavigation() {
  console.log("initializeSideNavigation is running"); // 확인 메시지

  const headerRight = document.querySelector(".header-right");
  if (!headerRight) {
    console.error("Error: .header-right element not found");
    return;
  }

  const profileIcon = document.createElement("div");
  profileIcon.className = isLogin ? "profile-icon" : "hamburger-icon";
  profileIcon.onclick = toggleSideNav;
  headerRight.prepend(profileIcon); // profileIcon을 header-right에 추가

  // 로그인 상태에 따라 login-status 텍스트 변경
  document.getElementById("login-status").textContent = isLogin
    ? "마이페이지"
    : "로그인";
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

// 로그아웃 및 설정 함수 (예시)
function logout() {
  console.log("Logging out...");
}

function settings() {
  console.log("Opening settings...");
}
