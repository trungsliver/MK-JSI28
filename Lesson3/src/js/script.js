import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { db } from "./firebase-config.js";

// Dùng DOM để lấy các thẻ từ HTML
const form = document.getElementById("note-form");
const input = document.getElementById("note-input");
const notesList = document.getElementById("notes-list");
const emptyState = document.getElementById("empty-state");

// Tham chiếu đến collection "notes_demo" trong Firestore
const notesRef = collection(db, "notes_demo");
// Tạo query để lấy dữ liệu sắp xếp theo createdAt giảm dần
const notesQuery = query(notesRef, orderBy("createdAt", "desc"));

// Sự kiện khi ấn nút 'Them'
form.addEventListener("submit", async (event) => {
    // Ngăn chặn việc reload khi submit form
	event.preventDefault();

    // Lấy nội dung trong ô input
	const text = input.value.trim();

    // Nếu ô input không có nội dung, không xử lý
	if (!text) {
		return;
	}

	try {
        // Thêm phần tử mới (document) vào Firestore
		await addDoc(notesRef, {
			text,
			createdAt: serverTimestamp()
		});
		form.reset();
		input.focus();
	} catch (error) {
		console.error("Khong the them ghi chu:", error);
		alert("Them ghi chu that bai. Kiem tra Firestore Rules va thu lai.");
	}
});

// Nếu dữ liệu firestore thay đổi => update giao diện HTML
onSnapshot(
	notesQuery,
	(snapshot) => {
		notesList.innerHTML = "";

        // Nếu không có ghi chú nào, hiển thị trạng thái rỗng
		if (snapshot.empty) {
			emptyState.style.display = "block";
			return;
		}

		emptyState.style.display = "none";

        // Duyệt qua từng document trong snapshot và tạo phần tử HTML tương ứng
		snapshot.forEach((item) => {
			const note = item.data();

			const li = document.createElement("li");
			li.className = "note-item";

			const textSpan = document.createElement("span");
			textSpan.textContent = note.text;

			const deleteBtn = document.createElement("button");
			deleteBtn.textContent = "Xóa";
			deleteBtn.type = "button";

            // Sự kiện khi ấn nút 'Xoa'
			deleteBtn.addEventListener("click", async () => {
				try {
					await deleteDoc(doc(db, "notes_demo", item.id));
				} catch (error) {
					console.error("Khong the xoa ghi chu:", error);
					alert("Xoa ghi chu that bai.");
				}
			});

			li.append(textSpan, deleteBtn);
			notesList.appendChild(li);
		});
	},
	(error) => {
		console.error("Khong the doc du lieu Firestore:", error);
		emptyState.style.display = "block";
		emptyState.textContent = "Khong doc duoc du lieu. Kiem tra Firestore Rules.";
	}
);
