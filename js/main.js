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
        console.log("clicked");
        findUser(json, uNameInput.value, uEmailInput.value); //get response, convert to json, find the right user
      });
    });
}

const findUser = (receivedJson, username, email) => {
  //find user in json
  let assignedId = -1;
  receivedJson.forEach((element) => {
    if (username === element.username && email === element.email) {
      //if you found the right user, proceed with Success function, and if no user found, do Fail function
      assignedId = element.id;
      localStorage.setItem("userFetchedName", element.username); //save title for later
      console.log("found user!");
    }
  });

  if (assignedId == -1) {
    console.log("fail");
    //didn't find user
    const timeOfAnimation = 500;
    let header = document.getElementById("loginText");
    let divver = document.getElementById("loginDivver");
    divver.style.animation = `shake ${timeOfAnimation / 1000}s`; //shake the login page to sign failed
    header.style.color = "rgb(100, 17, 17)";
    setTimeout(() => {
      divver.style.animation = "none";
      header.style.color = "#252525";
    }, timeOfAnimation);
  } else {
    successFunc(assignedId);
  }
};

function successFunc() {
  console.log("success");
  //found user
  localStorage.setItem(
    "UserIDURL",
    `https://jsonplaceholder.typicode.com/posts?userId=${id}`
  );
  window.location.replace(postFetchPage); //move and fetch posts
}

function failFunc() {}

function postLoader() {
  //once we've gone to the post page
  const assignedIDURL = localStorage.getItem("UserIDURL"); //get the user url
  fetch(assignedIDURL).then(getResponse).then(processJson); //add the stuff
}
const getResponse = (response) => {
  //to json
  return response.json();
};

const processJson = (json) => {
  //add to html
  output = ``;
  const userName = localStorage.getItem("userFetchedName");
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
