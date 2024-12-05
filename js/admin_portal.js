$(document).ready(function() {
    var firebaseConfig = {
        apiKey: "AIzaSyBA2O5kze6cSrMqrUpDYoP5KZepBsNEa4k",
        authDomain: "library-management-syste-37dc2.firebaseapp.com",
        databaseURL: "https://library-management-syste-37dc2-default-rtdb.firebaseio.com",
        projectId: "library-management-syste-37dc2",
        storageBucket: "library-management-syste-37dc2.firebasestorage.app",
        messagingSenderId: "962676782645",
        appId: "1:962676782645:web:c008daf774bcee5a80e37c",
        measurementId: "G-NZ9VJF0LJ2"
    };

    // Initialize Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that app
    }

    var db = firebase.firestore();

    // Fetch and display all books
    db.collection("books").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            $('#books').append(
                "<div><h2>" + doc.data().bookcode + " - " + doc.data().bookname + "</h2>" +
                "<h3>" + doc.data().author1 + " , " + doc.data().author2 + "</h3>" +
                "<h3>" + doc.data().subject + "</h3>" +
                "<p>" + doc.data().tags + "</p>" +
                "</div><hr>"
            );
        });
    });

    // Fetch and display all users (email ids included)
    db.collection("users").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var book = doc.data().books || [];
            var books_set = "<ul>";
            book.forEach(function(b) {
                books_set += "<li>" + b + "</li>";
            });
            books_set += "</ul>";

            $('#users').append(
                "<div><h2>" + doc.data().name + "</h2>" +
                "<h3>" + "Roll Number: " + doc.data().Roll_Number + "</h3>" +
                "<h3>" + "Date of Birth: " + doc.data().DOB + "</h3>" +
                "<h3>" + "E-mail Id: " + doc.data().Email + "</h3>" +
                books_set +
                "</div><hr>"
            );
        });
    });

    // Prevent default form submission for searches
    $("#Students_search").submit(function(e) {
        e.preventDefault();
    });

    $("#Books_search").submit(function(e) {
        e.preventDefault();
    });

    // Hide the users and books sections by default
    var d1 = document.getElementById("books");
    var d2 = document.getElementById("users");
    d2.style.display = "none";
    d1.style.display = "none";

    // Show books section
    $('#show_books').click(function() {
        show_books();
    });

    // Show students section
    $('#show_students').click(function() {
        show_students();
    });

    // Log out function
    $('#log_button').click(function() {
        logout();
    });

    // Check if the user is authenticated
    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            window.location = 'index.html';
        }
    });
});

// Function to show books
function show_books() {
    var d1 = document.getElementById("books");
    var d2 = document.getElementById("users");
    d2.style.display = "none";
    d1.style.display = "block";
}

// Function to show students
function show_students() {
    var d1 = document.getElementById("books");
    var d2 = document.getElementById("users");
    d1.style.display = "none";
    d2.style.display = "block";
}

// Logout function
function logout() {
    firebase.auth().signOut().then(function() {
        console.log("Logout successful");
        window.location = 'admin_login.html';
    }).catch(function(error) {
        console.log("Error during logout: " + error);
    });
}
