const table = document.getElementById("grid-container");
table.style.opacity = "0";
async function fetchData() {
    const loader = document.querySelector(".loader");
    const tableBody = document.querySelector("#grid-container tbody");
    try {
        let response = await fetch("https://military-holy-begonia.glitch.me/data");
        let students = await response.json();
        console.log(students)
        tableBody.innerHTML = '';
        students.forEach(student => {
            let row = document.createElement("tr");
            row.innerHTML = `
                        <td>${student.id}</td>
                        <td><img src="${student.image}" alt="${student.title}"></td>
                        <td>${student.title}</td>
                        <td>${student.category}</td>
                        <td>RS.${student.price}</td>
                        <td>
                            <button onclick="editData(${student.id})">Edit</button>
                            <button onclick="deleteData(${student.id})">Delete</button>
                        </td>`;
            tableBody.appendChild(row);
        });
        if (students.length === 0) {
            loader.innerText = "Data Not Available";
        } else {
            loader.style.display = "none";
            table.style.opacity = "1";
        }
    } catch (error) {
        console.error(error);
        loader.textContent = "Failed to load content.";
    }
}

function validateInput() {
    let isValid = true;
    const name = document.getElementById("name").value.trim();
    const image = document.getElementById("image").value.trim();
    const category = document.getElementById("category").value.trim();
    const price = document.getElementById("price").value.trim();

    document.getElementById("nameError").innerText = name ? "" : "Name is required.";
    document.getElementById("imageError").innerText = image ? "" : "Image URL is required.";
    document.getElementById("categoryError").innerText = category ? "" : "Category is required";
    document.getElementById("priceError").innerText = price ? "" : "Price is required";
    if (!name || !image || !category || !price) isValid = false;
    return isValid;
}


async function saveData() {
    let nameMessage = document.getElementById("name");
    let imageMessage = document.getElementById("image");
    let categMessage = document.getElementById("category");
    let priceMessage = document.getElementById("price")

    if (!validateInput()) {
        nameMessage.style.outline = "3px solid #E16A54";
        imageMessage.style.outline = "3px solid #E16A54";
        categMessage.style.outline = "3px solid #E16A54";
        priceMessage.style.outline = "3px solid #E16A54";
    }
    else {
        nameMessage.style.outline = "none"
        imageMessage.style.outline = "none"
        categMessage.style.outline = "none"
        priceMessage.style.outline = "none"
        const studentId = document.getElementById("id").value;
        const name = document.getElementById("name").value;
        const image = document.getElementById("image").value;
        const category = document.getElementById("category").value;
        const price = document.getElementById("price").value;

        let obj = { 
            'title': name, 
            'image': image,
            'category': category, 
            'price': price
        };
        const method = studentId ? "PUT" : "POST";
        const url = studentId ? `https://military-holy-begonia.glitch.me/data/${studentId}` : `https://military-holy-begonia.glitch.me/data`;
        try {
            let response = await fetch(url, {
                method,
                "headers": { "Content-Type": "application/json" },
                "body": JSON.stringify(obj)
            });
            if (!response.ok) throw new Error(response.statusText);
            alert("Data saved successfully!");
            fetchData();
            clearInputs();
        } catch (error) {
            console.error(error);
            alert("Error saving data.");
        }
    }
}

function clearInputs() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("image").value = "";
    document.getElementById("category").value = "";
    document.getElementById("price").value = "";

    let nameMessage = document.getElementById("name");
    let imageMessage = document.getElementById("image");
    let categMessage = document.getElementById("category");
    let priceMessage = document.getElementById("price");

    nameMessage.style.outline = "none"
    imageMessage.style.outline = "none"
    categMessage.style.outline = "none"
    priceMessage.style.outline = "none"
}

async function deleteData(id) {
    await fetch(`https://military-holy-begonia.glitch.me/data/${id}`, { method: "DELETE" });
    clearInputs();
    alert("Data Delete Successfully");
    fetchData();
}

async function editData(id) {
    document.getElementById("nameError").innerText = "";
    document.getElementById("imageError").innerText = "";
    document.getElementById("categoryError").innerText = "";
    document.getElementById("priceError").innerText = "";

    const response = await fetch(`https://military-holy-begonia.glitch.me/data/${id}`);
    console.log(response)
    const student = await response.json();
    console.log(student)

    document.getElementById("id").value = student.id;
    let name = document.getElementById("name");
    name.value = student.title;
    console.log(name)
    let image = document.getElementById("image");
    image.value = student.image;
    let category = document.getElementById("category")
    category.value = student.category;
    let price = document.getElementById("price")
    price.value = student.price;

    name.style.outline = "3px solid #E16A54";
    image.style.outline = "3px solid #E16A54";
    category.style.outline = "3px solid #E16A54";
    price.style.outline = "3px solid #E16A54";

    image.classList.add("pushUp");
    name.classList.add("pushUp");
    category.classList.add("pushUp");
    price.classList.add("pushUp");
    setTimeout(() => {
        image.classList.remove("pushUp");
        name.classList.remove("pushUp");
        category.classList.add("pushUp");
        price.classList.add("pushUp");
    }, 500);
}

document.addEventListener("DOMContentLoaded", fetchData);