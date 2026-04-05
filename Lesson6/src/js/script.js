// Import các module cần thiết từ Firebase
// - initializeApp: Khởi tạo kết nối Firebase
// - getAuth: Quản lý xác thực người dùng
// - getFirestore: Quản lý cơ sở dữ liệu
// - Các hàm khác: Xử lý đăng ký, đăng nhập, đăng xuất và quản lý dữ liệu
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { firebaseConfig } from './firebase-config.js';

// Khởi tạo Firebase với cấu hình từ file firebase-config.js
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Khởi tạo Authentication service
const db = getFirestore(app); // Khởi tạo Firestore database