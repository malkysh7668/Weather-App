firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        const name = user.displayName;
        const id   = user.uid;
        // alert(`Welcome! ${name}. Your id is ${id}`);
    } else {
        // user not signed in, do nothing
    }
});
$('#btn-signin').on('click', function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'consent' });
    firebase.auth().signInWithPopup(provider);
});