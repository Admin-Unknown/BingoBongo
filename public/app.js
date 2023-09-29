import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBeKhpOAeXuR0Z8xDMjbyG2jyF7n1vZTm8",
    authDomain: "bingo-4fecb.firebaseapp.com",
    projectId: "bingo-4fecb",
    storageBucket: "bingo-4fecb.appspot.com",
    messagingSenderId: "47365649512",
    appId: "1:47365649512:web:9f19432254bdc14cb177dd",
    measurementId: "G-4W37DGJEF9"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = firebase.firestore();
let bingoItems = [];

// Fetch Bingo items from Firestore
db.collection("bingoItems").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        bingoItems.push(doc.data().item);
    });
});

function generateBingo() {
    let shuffledItems = shuffleArray(bingoItems).slice(0, 25);
    let tableHTML = "";

    for(let i = 0; i < 5; i++) {
        tableHTML += "<tr>";
        for(let j = 0; j < 5; j++) {
            if(i === 2 && j === 2) {
                tableHTML += "<td>Free</td>";
            } else {
                tableHTML += "<td>" + shuffledItems[i*5 + j] + "</td>";
            }
        }
        tableHTML += "</tr>";
    }

    document.getElementById("bingoTable").innerHTML = tableHTML;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
