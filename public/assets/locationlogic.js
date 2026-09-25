var latitudeofuser;
var longitudeofuser;
console.log("inside location")
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
    return "A";
}

function fetchdata(event) {
  if (event) {
    event.preventDefault();
  }

  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var age = document.getElementById('age').value;
  var mobile = document.getElementById('mobile').value;
  var email = document.getElementById('email').value;
  var name = document.getElementById('name').value;

  if (!username || !password || !email || !name) {
    alert('Please fill in name, email, username and password.');
    return false;
  }

  var data = {
    latitudeofuser: latitudeofuser,
    longitudeofuser: longitudeofuser,
    username: username,
    password: password,
    age: age,
    mobile: mobile,
    email: email,
    name: name,
  };

  var options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  fetch('/register', options)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      if (result && result.success) {
        window.location.href = '/login';
      } else {
        alert((result && result.message) || 'Registration failed. Please try a different username.');
      }
    })
    .catch(function (err) {
      console.error(err);
      alert('Something went wrong while registering. Please try again.');
    });

  return false;
}

function showPosition(position) {
    latitudeofuser = position.coords.latitude;
    longitudeofuser = position.coords.longitude;
    console.log(latitudeofuser, longitudeofuser);

    // let longionpage=document.getElementById("long");
    // longionpage.value=longitudeofuser;
    // let lationpage=document.getElementById("lat");
    // lationpage.value=latitudeofuser;
}

// this is to show the user's position on google map
// function showPosition(position) {
//   var latlon = position.coords.latitude + "," + position.coords.longitude;

//   var img_url = "https://maps.googleapis.com/maps/api/staticmap?center= " +latlon+ "&zoom=14&size=400x300&sensor=false&key=AIzaSyByMFz_0ZnY4fItqJhFpLKVrq5GIX5L_wU";

//   document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
// }

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
}

// module.exports={latitudeofuser,longitudeofuser};
