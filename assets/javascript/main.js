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

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    //User is signed in.
    email = user.email;
    emailVerified = user.emailVerified;
    uid = user.uid;
    profilePhoto = user.photoURL;
    var ref = firebase.database().ref('users/'+uid);
    var refRoster = firebase.database().ref('users/'+uid+'/roster');
    if(profilePhoto === null){
      $('#profileImage').attr('src', 'assets/images/defaultProfilePhoto.png')
    }
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




// var refRoster = firebase.database().ref('roster');
// var refGrades = firebase.database().ref('grades');
// var grades = [];
// var gradesA = 0;
// var gradesB = 0;
// var gradesC = 0;
// var gradesD = 0;
// var gradesF = 0;



// refRoster.on('child_added', function(snapshot, prevChildKey){
//   var tableRow = $('<tr>');
//   $('#roster-body').append(tableRow);
//   var student = snapshot.val();
//   tableRow.append('<td>' + student.name + '</td>');
//   tableRow.append('<td>' + student.period + '</td>');
//   tableRow.append('<td>' + student.grade + '</td>');
//   tableRow.append('<td>' + student.homework + '</td>');
//   tableRow.append('<td>' + student.messages + '</td>');
//   grades.push(student.grade);
//   gradeBreakDown(student.grade);
// });

// function gradeBreakDown(grade){
//   if(0<=grade && grade<70){
//     gradesF++;
//   }
//   else if(70<=grade && grade<75){
//     gradesD++;
//   }
//   else if(75<=grade && grade<80){
//     gradesC++;
//   }
//   else if(80<=grade && grade<90){
//     gradesB++;
//   }
//   else{
//     gradesA++;
//   }
// }

// refRoster.limitToLast(1).on('child_added', function(snapshot) {
//   //I use this to calculate the total grades
//   var sum = grades.reduce((a, b) => a + b, 0);
//   var gradesData = {
//     total: sum,
//     records: grades.length,
//     average: Math.round(sum/grades.length),
//     a: gradesA,
//     b: gradesB,
//     c: gradesC,
//     d: gradesD,
//     f: gradesF
//   }
//   refGrades.update(gradesData);

//   // Load the Visualization API and the corechart package.
//   google.charts.load('current', {'packages':['corechart']});

//   // Set a callback to run when the Google Visualization API is loaded.
//   google.charts.setOnLoadCallback(drawChart);

//   // Callback that creates and populates a data table,
//   // instantiates the pie chart, passes in the data and
//   // draws it.
//   function drawChart() {

//     // Create the data table.
//     var data = new google.visualization.DataTable();
//     data.addColumn('string', 'Grade');
//     data.addColumn('number', 'Amount');
//     data.addRows([
//       ['A\'s', gradesA],
//       ['B\'s', gradesB],
//       ['C\'s', gradesC],
//       ['D\'s', gradesD],
//       ['F\'s', gradesF]
//     ]);

//     // Set chart options
//     var options = {'width':400,
//                    'height':300};

//     // Instantiate and draw our chart, passing in some options.
//     var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
//     chart.draw(data, options);
//     $('#chart_div').prepend('<h4>Grades</h4><span class="text-muted">Distribution</span>');
//   }

// });








