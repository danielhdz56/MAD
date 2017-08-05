// Initialize Firebase
var config = {
  apiKey: "AIzaSyAJNS71JJNa_k3bKMuSS-SqUeHRFik_8QE",
  authDomain: "madproject-2c3b4.firebaseapp.com",
  databaseURL: "https://madproject-2c3b4.firebaseio.com",
  projectId: "madproject-2c3b4",
  storageBucket: "madproject-2c3b4.appspot.com",
  messagingSenderId: "445214233554"
};
var name, email, photoUrl, uid, emailVerified;
var ref;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    //User is signed in.
  	email = user.email;
  	emailVerified = user.emailVerified;
  	uid = user.uid;
    ref = firebase.database().ref('users/'+uid);
    var refRoster = firebase.database().ref('users/'+uid+'/roster');
    //Firebase to run after all childs have been added
    refRoster.on('child_added', function(snapshot, prevChildKey){
      console.log(snapshot.val());
      var tableRow = $('<tr>');
      $('#roster-body').append(tableRow);
      var student = snapshot.val();
      tableRow.append('<td>' + student.ID + '</td>');
      tableRow.append('<td>' + student.Student + '</td>');
      tableRow.append('<td>' + student.Period + '</td>');
      tableRow.append('<td>' + student.Grade + '</td>');
      tableRow.append('<td>' + student.Homework + '</td>');
      tableRow.append('<td>' + student.Messages + '</td>');
    });
  } else {
    // No user is signed in.
    window.location = 'index.html';
  }
});
