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

const form = document.getElementById("note-form");
const input = document.getElementById("note-input");
const notesList = document.getElementById("notes-list");
const emptyState = document.getElementById("empty-state");

const notesRef = collection(db, "notes_demo");
const notesQuery = query(notesRef, orderBy("createdAt", "desc"));

form.addEventListener("submit", async (event) => {
	event.preventDefault();

	const text = input.value.trim();
	if (!text) {
		return;
	}

	try {
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

onSnapshot(
	notesQuery,
	(snapshot) => {
		notesList.innerHTML = "";

		if (snapshot.empty) {
			emptyState.style.display = "block";
			return;
		}

		emptyState.style.display = "none";

		snapshot.forEach((item) => {
			const note = item.data();

			const li = document.createElement("li");
			li.className = "note-item";

			const textSpan = document.createElement("span");
			textSpan.textContent = note.text;

			const deleteBtn = document.createElement("button");
			deleteBtn.textContent = "Xoa";
			deleteBtn.type = "button";
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
