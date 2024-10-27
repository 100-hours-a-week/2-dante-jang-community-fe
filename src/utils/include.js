function includeHTML() {
    const elements = document.querySelectorAll("[data-include-file]");

    elements.forEach(element => {
        const file = element.getAttribute("data-include-file");

        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
            .then(data => {
                element.innerHTML = data;
                // 로드 후, 특정 초기화 함수가 필요하면 아래에서 호출 가능
                if (element.classList.contains("header-wrap")) {
                    initializeSideNavigation(); // 예시: 헤더일 경우 사이드 내비게이션 초기화
                }
            })
            .catch(error => {
                console.error("Error loading file:", error);
            });
    });
}

// 페이지가 로드되면 includeHTML 함수 호출
document.addEventListener("DOMContentLoaded", includeHTML);
