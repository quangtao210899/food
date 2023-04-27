let foodList = [];
let index_storage = "foodList"
function renderTable() {
    let tbody = document.getElementById("tbody");
    tbody.innerHTML = "";
    for (let i = 0; i < foodList.length; i++) {
        let tr = document.createElement("tr");
        let idTd = document.createElement("td");
        idTd.innerText = i + 1;
        let nameTd = document.createElement("td");
        nameTd.innerText = foodList[i];
        let deleteTd = document.createElement("td");
        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Xóa";
        deleteButton.addEventListener("click", function () {
            foodList.splice(i, 1);
            renderTable();
            saveToLocalStorage();
        });
        deleteTd.appendChild(deleteButton);
        tr.appendChild(idTd);
        tr.appendChild(nameTd);
        tr.appendChild(deleteTd);
        tbody.appendChild(tr);
    }
}

function saveToLocalStorage() {
    localStorage.setItem(index_storage, JSON.stringify(foodList));
}

function loadFromLocalStorage(key) {
    let foodListJson = localStorage.getItem(key);
    foodList = JSON.parse(foodListJson)??[];
    console.log(foodList,key)
    renderTable();
}

let form = document.getElementById("form");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    let nameInput = document.getElementById("name");
    let name = nameInput.value.trim();
    if (name !== "") {
        foodList.push(name);
        nameInput.value = "";
        renderTable();
        saveToLocalStorage();
    }
});

loadFromLocalStorage("foodList");
function notify(message,status) {
    $("#random").notify(message, { className:status,  autoHide: false,});
}
document.getElementById("random").addEventListener("click", function () {
    if (foodList.length) {
        const randomItem = foodList[Math.floor(Math.random() * foodList.length)];
        if(index_storage=="drinkList"){
            notify(`Hôm nay bạn nên uống: ${randomItem}`,"info");
        }
        else {
            notify(`Hôm nay bạn nên ăn: ${randomItem}`,"info");
        }
    }
    else {
        notify(`Chưa có món nào để random`,"danger")
    }
})


const menuItems = document.querySelectorAll('nav a');

menuItems.forEach(item => {
  item.addEventListener('click', function(element) {
    // Xóa lớp CSS 'active' của tất cả các mục menu
    menuItems.forEach(item => {
      item.classList.remove('active');
    });
    // Thêm lớp CSS 'active' cho mục được chọn
    this.classList.add('active');

    id = element.target.getAttribute('data-id')
    index_storage = id
    if(id=="drinkList"){
        document.getElementById("title").innerHTML = "Quản lý đồ uống"
        document.getElementById("name").placeholder  = "Nhập tên đồ uống"
        document.getElementById("th").innerHTML  = "Tên đồ uống"
    }
    else {
        document.getElementById("title").innerHTML = "Quản lý đồ ăn" 
        document.getElementById("name").placeholder  = "Nhập tên món ăn"
        document.getElementById("th").innerHTML  = "Tên món ăn"
    }
    loadFromLocalStorage(id)
  });
});