// listen for form submit

document.getElementById("myForm").addEventListener("submit", saveBookmark);

// save bookmark
function saveBookmark(e) {
  // get form values
  var siteName = document.getElementById("sitename").value;
  var siteURL = document.getElementById("siteURL").value;

  if(!siteName || !siteURL){
      alert('Please fill in the form');
      return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteURL.match(regex)){
      alert('Please enter a valid URL');
      return False;
  }

  var bookmark = {
    name: siteName,
    url: siteURL
  };

  // local storage test

  if (localStorage.getItem("bookmarks") === null) {
    var bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
     
    // check if bookmark already exists'
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].name == siteName) {
          alert('Bookmark already exists')
          return false
        }
      }

    // add bookmark to array
    bookmarks.push(bookmark);
    // re-set to local storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }



  document.getElementById('myForm').reset();

  fetchBookmarks();

  // prevent form from submitting
  e.preventDefault();
}

// delete bookmark
function deleteBookmark(url) {
  // get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  // loop through bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      bookmarks.splice(i, 1);
    }
  }
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  // re-fetch bookmarks
  fetchBookmarks();
}

// fetch bookmarks
function fetchBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  // get output id
  var bookmarksResults = document.getElementById("bookmarksResults");

  bookmarksResults.innerHTML = "";
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;
    bookmarksResults.innerHTML +=
      '<div class="well">' +
      "<h3>" +
      name +
      ' <a class="btn btn-default" target="_blank" href="' +
      url +
      '">visit</a> ' +
      " <a onclick=\"deleteBookmark('" +
      url +
      '\')" class="btn btn-danger" href="#">delete</a> ' +
      "</h3>" +
      "</div>";
  }
}
