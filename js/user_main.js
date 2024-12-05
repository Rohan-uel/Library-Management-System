// $(document).ready(function() {

//     var firebaseConfig = {
//         apiKey: "AIzaSyBA2O5kze6cSrMqrUpDYoP5KZepBsNEa4k",
//         authDomain: "library-management-syste-37dc2.firebaseapp.com",
//         databaseURL: "https://library-management-syste-37dc2-default-rtdb.firebaseio.com",
//         projectId: "library-management-syste-37dc2",
//         storageBucket: "library-management-syste-37dc2.firebasestorage.app",
//         messagingSenderId: "962676782645",
//         appId: "1:962676782645:web:c008daf774bcee5a80e37c",
//         measurementId: "G-NZ9VJF0LJ2"
//     };

//     // Initialize Firebase
//     firebase.initializeApp(firebaseConfig);
    
//     var db = firebase.firestore();
    
    
//     db.collection("books").get().then(function(querySnapshot) {
//         querySnapshot.forEach(function(doc) {
//             $('#books').append(
//                 "<div><h2>"+doc.data().bookcode+"-" +doc.data().bookname+"</h2>"+
//                 "<h3>"+doc.data().author1 + " , " +doc.data().author2 +"</h3>"+
//                 "<h3>"+doc.data().subject+"</h3>"+
//                 "<p>" + doc.data().tags + "</p>"+
//                 "</div><hr>");
//         });
//     });


//     firebase.auth().onAuthStateChanged(user => {
//         if(user) {
//             db.collection("users").where("Email","==",user.email)
//             .get()
//             .then(function(querySnapshot) {
//                 querySnapshot.forEach(function(doc) {
//                     // doc.data() is never undefined for query doc snapshots
//                     console.log(doc.id, " => ", doc.data());
//                     var book = [];
//                     book = doc.data().books;
//                     books_set = "<ul>";
//                     for(var i=0;i<book.length;i++)
//                     {
//                         books_set = books_set +"<li>"+ book[i] + "</li>" ;
//                     }
//                     books_set = books_set + "</ul>";
                    
//                     $('#about_me').append(
//                     "<div><h1>"+"Name :" +doc.data().name+"</h1>"+
//                     "<h2>"+"Roll Number : "+doc.data().Roll_Number+"</h2>"+
//                     "<h2>"+"Date of Birth : " + doc.data().DOB +"</h2>"+
//                     "<h2>"+"E-mail Id: " + doc.data().Email +"</h2><hr>"+
//                      " <h2> Books </h2>" +   
//                     books_set+
//                     "</div>");
//                 });
//             })
//             .catch(function(error) {
//                 console.log("Error getting documents: ", error);
//             });
    
        
//         }
//         });
//         firebase.auth().onAuthStateChanged(user => {
//             if(!user) {
//                 window.location = 'index.html';
//             }
//         });
//     $('#log_button').click(function()
//     {
//         logout();
//     });

// });

// function logout()
// {
//     firebase.auth().signOut().then(function() {
//         console.log("logout done");
//         window.location = 'admin_login.html';
//     }).catch(function(error) {
//         console.log("error");
//     });
// }




// function searchBooks() {
//     var db = firebase.firestore();
//     var query = document.getElementById("search-input").value.toLowerCase(); // Get the input value and convert to lowercase for case-insensitive search

//     if (query.trim() === "") {
//         alert("Please enter a search term.");
//         return;
//     }

//     // Search the 'books' collection in Firestore using a compound query
//     db.collection("books")
//         .where("bookname", ">=", query)
//         .where("bookname", "<=", query + "\uf8ff")
//         .get()
//         .then((querySnapshot) => {
//             if (querySnapshot.empty) {
//                 document.getElementById("search-results").innerHTML = "No books found.";
//                 return;
//             }

//             var results = "";
//             querySnapshot.forEach((doc) => {
//                 var bookData = doc.data();
//                 results += `
//                     <div class="book-result">
//                         <h3>${bookData.bookname}</h3>
//                         <p>Author(s): ${bookData.author1}, ${bookData.author2}</p>
//                         <p>Subject: ${bookData.subject}</p>
//                         <p>Tags: ${bookData.tags}</p>
//                     </div>
//                 `;
//             });
//             document.getElementById("search-results").innerHTML = results;
//         })
//         .catch((error) => {
//             console.error("Error searching books: ", error);
//             alert("Error occurred while searching books.");
//         });
// }

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
    firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore();

    // Fetch books from Firestore and display
    db.collection("books").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            $('#books').append(
                "<div><h2>"+doc.data().bookcode+"-" +doc.data().bookname+"</h2>"+
                "<h3>"+doc.data().author1 + " , " +doc.data().author2 +"</h3>"+
                "<h3>"+doc.data().subject+"</h3>"+
                "<p>" + doc.data().tags + "</p>"+
                "</div><hr>");
        });
    });

    // Check if the user is authenticated
    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            // Display the logged-in user's email
            $('#about_me').append(
                "<div><h1>Email: " + user.email + "</h1></div>"
            );
            
            // Fetch user data from Firestore
            db.collection("users").where("Email", "==", user.email)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // Display the user's email and other data
                    $('#about_me').append(
                        "<div><h1>Email: " + doc.data().Email + "</h1></div>"
                    );
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
        } else {
            // Redirect if the user is not logged in
            window.location = 'index.html';
        }
    });

    // Logout functionality
    $('#log_button').click(function() {
        logout();
    });

    function logout() {
        firebase.auth().signOut().then(function() {
            console.log("Logout successful");
            window.location = 'admin_login.html';
        }).catch(function(error) {
            console.log("Error logging out: ", error);
        });
    }

    // Search books functionality
    function searchBooks() {
        var query = document.getElementById("search-input").value.toLowerCase();

        if (query.trim() === "") {
            alert("Please enter a search term.");
            return;
        }

        // Search the 'books' collection in Firestore
        db.collection("books")
            .where("bookname", ">=", query)
            .where("bookname", "<=", query + "\uf8ff")
            .get()
            .then((querySnapshot) => {
                if (querySnapshot.empty) {
                    document.getElementById("search-results").innerHTML = "No books found.";
                    return;
                }

                var results = "";
                querySnapshot.forEach((doc) => {
                    var bookData = doc.data();
                    results += `
                        <div class="book-result">
                            <h3>${bookData.bookname}</h3>
                            <p>Author(s): ${bookData.author1}, ${bookData.author2}</p>
                            <p>Subject: ${bookData.subject}</p>
                            <p>Tags: ${bookData.tags}</p>
                        </div>
                    `;
                });
                document.getElementById("search-results").innerHTML = results;
            })
            .catch((error) => {
                console.error("Error searching books: ", error);
                alert("Error occurred while searching books.");
            });
    }
});
