let foodList = [];

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
    localStorage.setItem("foodList", JSON.stringify(foodList));
}

function loadFromLocalStorage() {
    let foodListJson = localStorage.getItem("foodList");
    if (foodListJson) {
        foodList = JSON.parse(foodListJson);
    }
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

loadFromLocalStorage();
function notify(message,status) {
    $("#random").notify(message, { className:status,  autoHide: false,});
}
document.getElementById("random").addEventListener("click", function () {
    if (foodList.length) {
        const randomItem = foodList[Math.floor(Math.random() * foodList.length)];
        notify(`Hôm nay bạn nên ăn: ${randomItem}`,"info");
    }
    else {
        notify(`Chưa có món ăn nào để random`,"danger")
    }
})

