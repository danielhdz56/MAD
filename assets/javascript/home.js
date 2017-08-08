firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    //User is signed in.
    email = user.email;
    emailVerified = user.emailVerified;
    uid = user.uid;
    profilePhoto = user.photoURL;
    var ref = firebase.database().ref('users/'+uid);
    var refRoster = firebase.database().ref('users/'+uid+'/roster');
    var refGrades = firebase.database().ref('users/'+uid+'/grades');
    var grades = [];
    var gradesA = 0;
    var gradesB = 0;
    var gradesC = 0;
    var gradesD = 0;
    var gradesF = 0;



    //Firebase to run after all childs have been added
    refRoster.on('child_added', function(snapshot, prevChildKey){
      // var tableRow = $('<tr>');
      // $('#roster-body').append(tableRow);
      var student = snapshot.val();
      // tableRow.append('<td>' + student.ID + '</td>');
      // tableRow.append('<td>' + student.Student + '</td>');
      // tableRow.append('<td>' + student.Period + '</td>');
      // tableRow.append('<td>' + student.Grade + '</td>');
      // tableRow.append('<td>' + student.Homework + '</td>');
      // tableRow.append('<td>' + student.Messages + '</td>');
      grades.push(Number(student.Grade));
      gradeBreakDown(student.Grade);
      function gradeBreakDown(grade){
        if(0<=grade && grade<70){
          gradesF++;
        }
        else if(70<=grade && grade<75){
          gradesD++;
        }
        else if(75<=grade && grade<80){
          gradesC++;
        }
        else if(80<=grade && grade<90){
          gradesB++;
        }
        else{
          gradesA++;
        }
      }
    });
    refRoster.limitToLast(1).on('child_added', function(snapshot) {
      //I use this to calculate the total grades
      var sum = grades.reduce((a, b) => a + b, 0);
      console.log(grades)
      console.log(sum)
      var gradesData = {
        total: sum,
        records: grades.length,
        average: Math.round(sum/grades.length),
        a: gradesA,
        b: gradesB,
        c: gradesC,
        d: gradesD,
        f: gradesF
      }
      refGrades.update(gradesData);

      // Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(drawChart);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawChart() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Grade');
        data.addColumn('number', 'Amount');
        data.addRows([
          ['A\'s', gradesA],
          ['B\'s', gradesB],
          ['C\'s', gradesC],
          ['D\'s', gradesD],
          ['F\'s', gradesF]
        ]);

        // Set chart options
        var options = {
          'backgroundColor': 'transparent',
          pieSliceText: 'label',
          colors: [ "rgb(132, 84, 244)", 
            "rgb(87, 206, 227)",
            "rgb(189, 84, 244)", 
            "rgb(227, 158, 137)", 
            "rgb(92, 218, 183)", 
            "rgb(226, 130, 131)"],
          chartArea: {
            width: '100%',
            height: '100%',
          },
          'is3D': true,
          legend: {
            textStyle: {
              color: 'blue', 
              fontSize: 16
            },
            alignment: 'center',
            position: 'none'
          }
        };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
    });
  } else {
    // No user is signed in.
    window.location = 'index.html';
  }
});