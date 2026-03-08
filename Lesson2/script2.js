// Bài 1: Dark Mode - light mode
    // Dùng DOM lấy phần tử button 
const themebtn = document.getElementById("themeBtn");

    // Sự kiện ấn nút
themebtn.onclick = () => {
    // Thêm hoặc xóa class dark vào body
    document.body.classList.toggle("dark");
    // Lưu trạng thái dark mode vào localStorage
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
};

    // load theme từ localStorage khi reload trang
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark");
}