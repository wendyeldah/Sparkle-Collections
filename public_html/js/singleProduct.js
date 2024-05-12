function displayLargeImage(imageSrc) {
    // Get the large image element
    var largeImage = document.getElementById('largeImage');
    // Set the src attribute of the large image to the clicked small image's src
    largeImage.src = imageSrc;
}
