const subredditForm = document.getElementById("subredditForm");
const subredditInput = document.getElementById("subredditInput");
const saveArtButton = document.getElementById("saveArtButton");
const art = document.querySelector(".art");

subredditForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const subreddit = subredditInput.value;
  const apiUrl = `https://www.reddit.com/r/${subreddit}/new.json`;

  // Fetch data from Reddit API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Filter URLs of images
      const imageUrls = data.data.children
        .filter(post => post.data.post_hint === "image")
        .map(post => post.data.url);

      // Set a random image as the background
      const randomIndex = Math.floor(Math.random() * imageUrls.length);
      art.style.backgroundImage = `url(${imageUrls[randomIndex]})`;
    })
    .catch(error => console.error(error));
});

saveArtButton.addEventListener("click", function() {
  const imageUrl = art.style.backgroundImage.slice(4, -1).replace(/"/g, "");
  const a = document.createElement("a");
  a.href = imageUrl;
  a.download = "art.jpg";
  a.click();
});