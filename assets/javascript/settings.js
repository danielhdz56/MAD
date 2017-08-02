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
var uid;
var ref = firebase.database().ref('users');

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    //User is signed in.
    profilePhoto = user.photoURL;
    uid = user.uid;
    if(user.displayName !== null){
      $('#formNameInput').attr('value', user.displayName);
    }
    if(profilePhoto === null){
      $('#profileImage').attr('src', 'assets/images/defaultProfilePhoto.png')
    }
    //Checking for user information and loading it on the page
    ref.child(uid).on('child_added', function(snapshot){
      if(snapshot.val().bio === undefined || snapshot.val().bio === ""){
        $('#formBioTextarea').attr('placeholder', "Tell us a little bit about yourself");
      }
      else {
        $('#formBioTextarea').html(snapshot.val().bio)
      }
    });
    //Makes changes to profile
    $('#updateProfileBtn').on('click', function(){
      event.preventDefault();
      var name = $('#formNameInput').val().trim();
      var bio = $('#formBioTextarea').val().trim();
      var profile = {
        profile: {
          name: name,
          bio: bio
        }
      };
      user.updateProfile({ //This updates the actual user data that google handles through their server
        displayName: name,
      })
      ref.child(uid).update(profile); //This updates the users profile that we handle through firebase
    })
  } else {
    // No user is signed in.
    window.location = 'index.html';
  }
});