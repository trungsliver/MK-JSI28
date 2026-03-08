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

// Bài 2: Note List
    // Lấy ghi chú trong localStorage hoặc khởi tạo danh sách rỗng
let notes = JSON.parse(localStorage.getItem('notes')) || [];
    // Hàm hiển thị danh sách ghi chú lên trang
function displayNotes() {
     const list = document.getElementById("noteList");
    list.innerHTML = "";
    notes.forEach((item, index) => {
        list.innerHTML += `<li>${item}</li>`;
    });
}
displayNotes();;
    // Sự kiện ấn nút (thêm ghi chú)
const addNoteBtn = document.getElementById("addNote");
addNoteBtn.onclick = () => {
    // lấy dữ liệu trong ô input
    let content = document.getElementById("noteInput").value.trim();
    if (content) {
        // Thêm ghi chú mới vào mảng
        notes.push(content);
        // Lưu mảng ghi chú vào localStorage
        localStorage.setItem('notes', JSON.stringify(notes));
        // Hiển thị lại danh sách ghi chú
        displayNotes();
    }
};