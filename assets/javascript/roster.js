// Initialize Firebase
var config = {
  apiKey: "AIzaSyAJNS71JJNa_k3bKMuSS-SqUeHRFik_8QE",
  authDomain: "madproject-2c3b4.firebaseapp.com",
  databaseURL: "https://madproject-2c3b4.firebaseio.com",
  projectId: "madproject-2c3b4",
  storageBucket: "madproject-2c3b4.appspot.com",
  messagingSenderId: "445214233554"
};
var name, email, photoUrl, uid, emailVerified, todayDate;
var ref;
var students = [];
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    //User is signed in.
  	email = user.email;
  	emailVerified = user.emailVerified;
  	uid = user.uid;
    todayDate = new Date();
    ref = firebase.database().ref('users/'+uid);
    var refRoster = firebase.database().ref('users/'+uid+'/roster');
    var refAttendance = firebase.database().ref('users/'+uid+'/attendance/'+todayDate)
    //Firebase to run after all childs have been added
    refRoster.on('child_added', function(snapshot, prevChildKey){
      var tableRow = $('<tr>');
      $('#roster-body').append(tableRow);
      var student = snapshot.val();
      tableRow.append('<td class="studentID">' + student.ID + '</td>');
      tableRow.append('<td class="studentName">' + student.Student + '</td>');
      tableRow.append('<td class="studentPeriod">' + student.Period + '</td>');
      tableRow.append('<td class="studentGrade">' + student.Grade + '</td>');
      tableRow.append('<td class="studentHomework">' + student.Homework + '</td>');
      tableRow.append('<td class="studentMessages">' + student.Messages + '</td>');
    });
    $('#attendance').on('click', function(event){
      event.preventDefault();
      $('#tableGrade, .studentGrade, #tableHomework, .studentHomework, #tableMessages, .studentMessages').hide();
      $('#roster').prepend('<th id="tableAttendance">Attendance</th>');
      $("tbody tr").each(function( index ) {
        var checkID = $(this).children('.studentID').text();
        students.push(checkID);
        $(this).prepend('<td id="' + checkID + '">'+
        '<label class="radio-inline mr-2">'+
        '<input data-att="T" type="radio" name="optradio' + checkID + '"> T'+
        '</label>'+
        '<label class="radio-inline mr-2">'+
        '<input data-att="P" type="radio" name="optradio' + checkID + '"> P'+
        '</label></td>');
      });
      $('table').append('<button id=attendanceBtn class="btn">submit</button>');
      //This grabs all checked students (tardy or present)
      $(document).on('click', '#attendanceBtn', function(){
        var resultChecked = [];
        var dataToSendChecked;
        $("input[type=radio]:checked").each(function(){
          var studentId = $(this).parent().parent().attr('id');
          var dataChecked = {
              ID: studentId,
              attendance: $(this).attr('data-att')
          }
          resultChecked.push(dataChecked)
        })
        //This makes the property be the name of the object
        dataToSendChecked = resultChecked.reduce((prev, current) => { prev[current.ID] = current; return prev; }, {});
        //This grabs all unchecked students (those who were not marked tardy or present)
        var resultUnchecked = [];
        var dataToSendUnchecked;
        for(i=0;i<students.length;i++){
          if (!(students[i] in dataToSendChecked)) {
            var dataUnchecked = {
              ID: students[i],
              attendance: 'A'
            }
            resultUnchecked.push(dataUnchecked)
          }
        }
        //This makes the property be the name of the object
        dataToSendUnchecked = resultUnchecked.reduce((prev, current) => { prev[current.ID] = current; return prev; }, {});
        //This 'merges' both objects into one
        var dataToSend = $.extend(dataToSendChecked, dataToSendUnchecked);
        refAttendance.update(dataToSend)
      })
    })
  } else {
    // No user is signed in.
    window.location = 'index.html';
  }
});
