const btnPost = document.getElementById("subBtn"); //submit button on page index
const postFetchPage = "../html/posts.html"; //for location moving
const userURL = `https://jsonplaceholder.typicode.com/users`; //url to fetch all user info
const uNameInput = document.getElementById("uNameInput"); //get Username Input
const uEmailInput = document.getElementById("uEmailInput"); // get Email Input

function loginLoader() {
  fetch(userURL)
    .then(getResponse)
    .then((json) => {
      btnPost.addEventListener("click", () => {
        findUser(json, uNameInput.value, uEmailInput.value); //get response, convert to json, find the right user
      });
    });
}

const findUser = (receivedJson, username, email) => {
  //find user in json
  var assignedId = -1;
  receivedJson.forEach((element) => {
    if (username === element.username && email === element.email) {
      //if you found the right user, proceed with Success function, and if no user found, do Fail function
      assignedId = element.id;
      localStorage.setItem("userFetchedName", element.username); //save title for later
      console.log("found user!");
    }
  });

  if (assignedId == -1) {
    //didn't find user
    var divver = document.getElementById("loginDivver");
    divver.style.animation = "shake 0.5s"; //shake the login page to sign failed
  } else {
    //found user
    localStorage.setItem(
      "UserIDURL",
      `https://jsonplaceholder.typicode.com/posts?userId=${assignedId}`
    );
    window.location.replace(postFetchPage); //move and fetch posts
  }
};

function postLoader() {
  //once we've gone to the post page
  var assignedIDURL = localStorage.getItem("UserIDURL"); //get the user url
  fetch(assignedIDURL).then(getResponse).then(processJson); //add the stuff
}
const getResponse = (response) => {
  //to json
  return response.json();
};

const processJson = (json) => {
  //add to html
  output = ``;
  var userName = localStorage.getItem("userFetchedName");
  json.forEach((element) => {
    console.log(element);

    output += ` 
              <li class="title">${element.title} - ${userName}</li>
              <li class="textBody">${element.body}</li>
              <hr>
          `; //builds the post
  });
  document.getElementById("userPosts").innerHTML = output; //add new stuff to UL
};
