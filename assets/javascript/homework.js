firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    //User is signed in.
    email = user.email;
    emailVerified = user.emailVerified;
    uid = user.uid;
    profilePhoto = user.photoURL;
    var ref = firebase.database().ref('users/'+uid);
    var refHomework = firebase.database().ref('users/'+uid+'/homework');
    var refRoster = firebase.database().ref('users/'+uid+'/roster');
    document.getElementById('file').addEventListener('change', function(evt){
      for (var i = 0; i < evt.target.files.length; i++) {
        var docFile = evt.target.files[i];
        uploadDocFilesAsPromise(docFile);
      }
    });
    //Handle waiting to upload each file using promise
    function uploadDocFilesAsPromise (docFile) {
      var metadata = {
        'contentType': docFile.type
      };
      return new Promise(function (resolve, reject) {
        refStorage.child(uid + '/homework/' + docFile.name).put(docFile, metadata).then(function(snapshot) {
          homeworkMetaData = snapshot.metadata;
          console.log(homeworkMetaData)
          dataObject = {
            url: snapshot.downloadURL,
            name: homeworkMetaData.name,
            size: homeworkMetaData.size,
            timeCreated: homeworkMetaData.timeCreated,
            type: homeworkMetaData.type,
            updated: homeworkMetaData.updated,
            generation: homeworkMetaData.generation
          }
          refHomework.push(dataObject); //This updates the users profile that we handle through firebase
        }).catch(function(error) {
          // [START onfailure]
          console.error('Upload failed:', error);
          console.log(uid)
          // [END onfailure]
        });
        // [END oncomplete]
      })
    }
    refHomework.on('child_added', function(snapshot){
      var downloadHomework = $('<li>');
      downloadHomework.append('<a href="' + snapshot.val().url + '">hello</a>');
      $('#fileView ul').append(downloadHomework);

    })
  } else {
    // No user is signed in.
    window.location = 'index.html';
  }
});