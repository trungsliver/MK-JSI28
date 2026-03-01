// Bài 1: Hiển thị dữ liệu từ file js
    // Khai báo danh sách dữ liệu
const students = [
    {id: 1, name: "Hải meme", age: 14},
    {id: 2, name: "Minh Tâm", age: 15},
    {id: 3, name: "Hoàng Long", age: 15}
];
    // Hàm hiển thị dữ liệu
function displayStudents() {
    // Dùng DOM để lấy container (thẻ ul chứa học sinh)
    const container = document.getElementById("studentList");
    // Duyệt danh sách students
    students.forEach(student => {
        // Tạo thẻ li mới
        const li = document.createElement("li");
        // Lấy thông tin student gán vào nội dung thẻ li
        li.textContent = `Name: ${student.name}, Age: ${student.age}`;
        // Thêm thẻ li vào container
        container.appendChild(li);
    });
}
    // Gọi hàm hiển thị dữ liệu
displayStudents();


// Bài 2: Hiển thị dữ liệu từ file data.json
    // Lấy dữ liệu từ file data.json bằng fetch API
fetch('./data.json')
    // chuyển lại dữ liệu lấy về (response) thành dạng JSON
    .then(response => response.json())
    // xử lý dữ liệu JSON đã chuyển đổi
    .then(data => {
        // Dùng DOM lấy conatiner
        const container = document.getElementById("productList");

        // Duyệt dữ liệu trong data.json
        data.forEach(item => {
            // Tạo thẻ div có class="product-card"
            const card = document.createElement("div");
            card.classList.add("product-card");

            // Lấy img
            const img = document.createElement("img");
            img.src = item.image;

            // Lấy tên sản phẩm           
            const name = document.createElement("h3");
            name.textContent = item.name;

            // Lấy giá sản phẩm
            const price = document.createElement("p");
            price.textContent = `Price: $${item.price}`;

            // Thêm img, tên, giá vào thẻ product-card
            card.appendChild(img);
            card.appendChild(name);
            card.appendChild(price);
            // Thêm thẻ product-card vào container
            container.appendChild(card);
        });
    });

// Bài 3: Fetch API - Lấy dữ liệu từ API
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
        // Dùng DOM lấy container
        const container = document.getElementById("postList");

        // Duyệt dữ liệu lấy về từ API
        for(let i = 0; i < 10; i++) {
            const post = data[i];
            // Tạo thẻ div có class="post-card"
            const card = document.createElement("div");
            card.classList.add("post-card");

            // Tạo tiêu đề bài viết
            const title = document.createElement("h3");
            title.textContent = post.title;

            // Tạo nội dung bài viết
            const body = document.createElement("p");
            body.textContent = post.body;

            // Thêm tiêu đề và nội dung vào card
            card.appendChild(title);
            card.appendChild(body);

            // Thêm card vào container
            container.appendChild(card);
        }
    });