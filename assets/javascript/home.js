firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    //User is signed in.
    email = user.email;
    emailVerified = user.emailVerified;
    uid = user.uid;
    profilePhoto = user.photoURL;
    var ref = firebase.database().ref('users/'+uid);
    var refRoster = firebase.database().ref('users/'+uid+'/roster');
    //Firebase to run after all childs have been added
    refRoster.on('child_added', function(snapshot, prevChildKey){
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