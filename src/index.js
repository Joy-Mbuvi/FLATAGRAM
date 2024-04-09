function getimagetitle() {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://localhost:3000/images/1", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            titleimage(result);
            getgramimage(result);
            getimagecomments();
        })
        .catch((error) => console.error(error));
}

function titleimage(result) {
    let imagetitle = document.getElementById("card-title");
    imagetitle.innerHTML = result.title;
}

function getgramimage(result) {
    let imagegram = document.getElementById("card-image");
    imagegram.src = result.image;
    imagegram.alt = result.alt;
}

function getimagecomments() {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://localhost:3000/comments", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            document.getElementById("comments-list").innerHTML = "";

            for (let i of result) {
                let comment = document.createElement("li");
                comment.innerText = i.content;
                document.getElementById("comments-list").appendChild(comment);
            }
        })
        .catch((error) => console.error(error));
}

getimagetitle();


document.getElementById("like-button").addEventListener('click', updatedLikes);

let currentLikes=0
function updatedLikes() {
    let like = document.getElementById("like-count");
    like.innerText = ` ${currentLikes ++} likes`;
}


function updateCommentServer(){
    fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(commentformat) 
      })
      .then(response => {
        if (response.ok) {
          return response.json(); 
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then(data => {
        console.log('New comment added', data); 
      })
      .catch(error => {
        console.error('Error:', error); 
      });
 }

 function updateLikeServer(){
    fetch("http://localhost:3000/images/${imageformat.id", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(imageformat) 
      })
      .then(response => {
        if (response.ok) {
          return response.json(); 
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then(data => {

      })
      .catch(error => {
       
      });
 }