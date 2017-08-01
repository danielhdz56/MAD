// Initialize Firebase
var config = {
  apiKey: "AIzaSyAJNS71JJNa_k3bKMuSS-SqUeHRFik_8QE",
  authDomain: "madproject-2c3b4.firebaseapp.com",
  databaseURL: "https://madproject-2c3b4.firebaseio.com",
  projectId: "madproject-2c3b4",
  storageBucket: "",
  messagingSenderId: "445214233554"
};
firebase.initializeApp(config);
var refRoster = firebase.database().ref('roster');
refRoster.on('child_added', function(snapshot, prevChildKey){
  var tableRow = $('<tr>');
  $('#roster-body').append(tableRow);
  var student = snapshot.val();
  tableRow.append('<td>' + student.name + '</td>');
  tableRow.append('<td>' + student.period + '</td>');
  tableRow.append('<td>' + student.grade + '</td>');
  tableRow.append('<td>' + student.homework + '</td>');
  tableRow.append('<td>' + student.messages + '</td>');
});

