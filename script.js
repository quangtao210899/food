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
    foodList = JSON.parse(foodListJson) ?? [];
    console.log(foodList, key)
    renderTable();
}

let form = document.getElementById("form");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    let nameInput = document.getElementById("name");
    let name = nameInput.value.trim();
    if (name !== "") {
        foodList.push(name);
        // prizes.push(
        //     {
        //         text: "Áo thun J2Team",
        //         // img: "images/Ao.png",
        //         number: 1, // 1%,
        //         percentpage: 0.01 // 1%
        //     }
        // )
        nameInput.value = "";
        renderTable();
        saveToLocalStorage();
    }
});

loadFromLocalStorage("foodList");
function notify(message, status) {
    $("#random").notify(message, { className: status, autoHide: false, });
}
document.getElementById("button_remove").addEventListener("click", function () {
    document.getElementById('wrapper').style.display = "none"
    document.getElementById('table_form').style.display = "block"
})
document.getElementById("random").addEventListener("click", function () {
    if (foodList.length) {
        
        // const randomItem = foodList[Math.floor(Math.random() * foodList.length)];
        // if (index_storage == "drinkList") {
            //     notify(`Hôm nay bạn nên uống: ${randomItem}`, "info");
            // }
            // else {
                //     notify(`Hôm nay bạn nên ăn: ${randomItem}`, "info");
                // }
        if(document.getElementsByClassName('hc-luckywheel-list').length){
            document.querySelector('.hc-luckywheel-list').remove()
        }
        document.getElementById('wrapper').style.display = "block"
        document.getElementById('table_form').style.display = "none"
        var prizes = [];
        for (i = 0; i < foodList.length; i++) {
            prizes.push({
                text: foodList[i],
                number: 1
            })
        }
        hcLuckywheel.init({
            id: "luckywheel",
            config: function (callback) {
                callback &&
                    callback(prizes);
            },
            mode: "both",
            getPrize: function (callback) {
                var rand = randomIndex(prizes);
                var chances = rand;
                callback && callback([rand, chances]);
            },
            gotBack: function (data) {
                if (data == null) {
                    Swal.fire(
                        'Chương trình kết thúc',
                        'Đã hết phần thưởng',
                        'error'
                    )
                } else if (data == 'Chúc bạn may mắn lần sau') {
                    Swal.fire(
                        'Bạn không trúng thưởng',
                        data,
                        'error'
                    )
                } else {
                    Swal.fire(
                        'Bạn đã quay trúng món',
                        data,
                        'success'
                    )
                }
            }
        });
    }
    else {
        notify(`Chưa có món nào để random`, "danger")
    }
})


const menuItems = document.querySelectorAll('nav a');

menuItems.forEach(item => {
    item.addEventListener('click', function (element) {
        // Xóa lớp CSS 'active' của tất cả các mục menu
        menuItems.forEach(item => {
            item.classList.remove('active');
        });
        // Thêm lớp CSS 'active' cho mục được chọn
        this.classList.add('active');

        id = element.target.getAttribute('data-id')
        index_storage = id
        if (id == "drinkList") {
            document.getElementById("title").innerHTML = "Quản lý đồ uống"
            document.getElementById("name").placeholder = "Nhập tên đồ uống"
            document.getElementById("th").innerHTML = "Tên đồ uống"
        }
        else {
            document.getElementById("title").innerHTML = "Quản lý đồ ăn"
            document.getElementById("name").placeholder = "Nhập tên món ăn"
            document.getElementById("th").innerHTML = "Tên món ăn"
        }
        loadFromLocalStorage(id)
    });
});

var isPercentage = false;
function randomIndex(prizes) {
    if (isPercentage) {
        var counter = 1;
        for (let i = 0; i < prizes.length; i++) {
            if (prizes[i].number == 0) {
                counter++
            }
        }
        if (counter == prizes.length) {
            return null
        }
        let rand = Math.random();
        let prizeIndex = null;
        console.log(rand);
        switch (true) {
            case rand < prizes[4].percentpage:
                prizeIndex = 4;
                break;
            case rand < prizes[4].percentpage + prizes[3].percentpage:
                prizeIndex = 3;
                break;
            case rand < prizes[4].percentpage + prizes[3].percentpage + prizes[2].percentpage:
                prizeIndex = 2;
                break;
            case rand < prizes[4].percentpage + prizes[3].percentpage + prizes[2].percentpage + prizes[1].percentpage:
                prizeIndex = 1;
                break;
            case rand < prizes[4].percentpage + prizes[3].percentpage + prizes[2].percentpage + prizes[1].percentpage + prizes[0].percentpage:
                prizeIndex = 0;
                break;
        }
        if (prizes[prizeIndex].number != 0) {
            prizes[prizeIndex].number = prizes[prizeIndex].number - 1
            return prizeIndex
        } else {
            return randomIndex(prizes)
        }
    } else {
        var rand = (Math.random() * (prizes.length)) >>> 0;
        if (prizes[rand].number != 0) {
            prizes[rand].number = prizes[rand].number - 1
            return rand
        } else {
            return randomIndex(prizes)
        }
    }
}