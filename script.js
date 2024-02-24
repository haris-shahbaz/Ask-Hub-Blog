






import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";


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
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


const googleBtn = document.querySelector("#google-btn");
const logOutBtn = document.querySelector("#logOut-btn");
const homeBtn = document.querySelector("#home-btn");
const writePage = document.querySelector("#writePage");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const login = document.querySelector("#login")
const blogConatiner = document.querySelector("#blog-container");
const writeConatiner = document.querySelector(".write-main-container");


const currentPage = window.location.pathname.split("/").pop();


const onload = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (currentPage !== "home.html") {
        window.location.href = "home.html";
      }
      console.log(user);
    } else {
      if (currentPage !== "index.html" && currentPage !== "") {
        window.location.href = "/";
      }
    }
  });

}
onload();


const sigInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
}


const logOut = () => {
  signOut(auth).then(() => {

  }).catch((error) => {
    console.log(error);
  });

}


const logIn = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {

    const user = userCredential.user;
    console.log(user);
   
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  });
}


login && login.addEventListener("click", logIn);

googleBtn && googleBtn.addEventListener("click", sigInWithGoogle)

logOutBtn && logOutBtn.addEventListener("click", logOut)

writePage && writePage.addEventListener("click", () => {
  blogConatiner.style.display = "none";
  writeConatiner.style.display = "block"
})

homeBtn && homeBtn.addEventListener("click", () => {
  writeConatiner.style.display = "none";
  blogConatiner.style.display = "block";
})

writeConatiner.style.display = "none";


