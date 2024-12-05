//admin@123

// $(document).ready(function(){    
//     var firebaseConfig = {
//         apiKey: "AIzaSyBin1evT-H6jfR49WIhtVPsGMLzbEklIQY",
//         authDomain: "library-management-syste-f2a85.firebaseapp.com",
//         databaseURL: "https://library-management-syste-f2a85.firebaseio.com",
//         projectId: "library-management-syste-f2a85",
//         storageBucket: "library-management-syste-f2a85.appspot.com",
//         messagingSenderId: "914416876417",
//         appId: "1:914416876417:web:bf9e7762c1c283ba"
//       };


$(document).ready(function(){    
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

    $("#login-form").submit(function(e) {
        e.preventDefault();
    });

    $('#submit_data').click(function() {
      login();
    });

    $('#back_button').click(function()
    {
        logout();
    });

    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            window.location = 'admin_portal.html'; //After successful login, user will be redirected to home.html     
            }
        });

  });
  
function login(){
    var email = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if(email === "admin@gmail.com")
    {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert(errorMessage);
        });
    }
    
}
function logout()
{
    firebase.auth().signOut().then(function() {
    // Sign-out successful.
    }).catch(function(error) {
    // An error happened.
    });
}
