// Initialize Firebase
var config = {
apiKey: "AIzaSyAJNS71JJNa_k3bKMuSS-SqUeHRFik_8QE",
authDomain: "madproject-2c3b4.firebaseapp.com",
databaseURL: "https://madproject-2c3b4.firebaseio.com",
projectId: "madproject-2c3b4",
storageBucket: "madproject-2c3b4.appspot.com",
messagingSenderId: "445214233554"
};
firebase.initializeApp(config);
var name, email, photoUrl, uid, emailVerified;
var ref = firebase.database().ref('users');
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    //User is signed in.
	email = user.email;
	emailVerified = user.emailVerified;
	uid = user.uid;
    ref.child(uid).on('value', function(snapshot){
    	console.log(snapshot.val());
    });
   
  } else {
    // No user is signed in.
    window.location = 'index.html';
  }
});
