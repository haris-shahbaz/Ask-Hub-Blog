





import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, get, remove, update } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";


const firebaseConfig = {
    apiKey: "AIzaSyC24_6KOWY3uTGRRo32WV76P9Z8DHR-wQ0",
    authDomain: "ask-hub-blogs-1c82d.firebaseapp.com",
    databaseURL: "https://ask-hub-blogs-1c82d-default-rtdb.firebaseio.com",
    projectId: "ask-hub-blogs-1c82d",
    storageBucket: "ask-hub-blogs-1c82d.appspot.com",
    messagingSenderId: "389598094824",
    appId: "1:389598094824:web:6a93795d0f79e3455ab05d",
    measurementId: "G-7G9EW55DGR"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


const blogConatiner = document.querySelector("#blog-container");
const writeConatiner = document.querySelector(".write-main-container");

const saveBtn = document.querySelector("#save-Btn");
const cancelBtn = document.querySelector("#cancel-Btn");


function addData() {
    const title = document.querySelector("#titleInput").value;
    const description = document.querySelector("#description").value;
    const id = Math.floor(Math.random() * 100);

    set(ref(db, 'post/' + id), {
        title: title,
        description: description,
    })
    document.querySelector("#titleInput").value = "";
    document.querySelector("#description").value = "";
    alert("Data Added");
    getData();
}


saveBtn.addEventListener("click", addData);

cancelBtn.addEventListener("click", () => {
    document.querySelector("#titleInput").value = "";
    document.querySelector("#description").value = "";
    console.log("Blog canceled");
})

// Get Data

function getData() {
    const user_ref = ref(db, 'post/')
    get(user_ref).then((snapshot) => {
        const data = snapshot.val()

        let html = "";
        const blog = document.querySelector("#blog-list");

        for (let key in data) {
            const { title, description } = data[key];
            console.log(title);

            html += `
            <li class="blog-li" id="blogLi">
            <h1>${title}</h1>
            <p>${description}</p>
            <div class="list-inner-container">
            <button class="btn1" onclick="update_data(${key})">Edit</button>
            <button class="btn2" onclick="delete_data(${key})">Delete</button>
            </div>
            </li>
            `
        }
        blog.innerHTML = html;
    })
}
getData();


// Delete Data

window.delete_data = function (key) {
    remove(ref(db, `post/${key}`))
    getData();
}

// Update Data

const updateBtn = document.querySelector("#update-Btn");
updateBtn.style.display = "none";

window.update_data = function (key) {
    const user_ref = ref(db, `post/${key}`)
    get(user_ref).then((item) => {
        document.querySelector("#titleInput").value = item.val().title;
        document.querySelector("#description").value = item.val().description;
        blogConatiner.style.display = "none";
        writeConatiner.style.display = "block";
    })
    saveBtn.style.display = "none";
    updateBtn.style.display = "inline-block";

    function updated() {
        const title = document.querySelector("#titleInput").value;
        const description = document.querySelector("#description").value;
        console.log(title, description);
        alert("Updated")

        update (ref(db, `post/${key}`), {
            title: title,
            description: description
        }
        )
        getData()

    }


    updateBtn.addEventListener("click", updated);
}
