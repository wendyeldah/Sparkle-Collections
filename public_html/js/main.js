// js for index.html
document.addEventListener("DOMContentLoaded", function () {
    // JavaScript to add class when scrolled
    window.addEventListener("scroll", function () {
      var navbar = document.querySelector(".second-navbar");
      if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
    // Get references to the filter section and the button to reopen it
    const filterSection = document.querySelector(".filter-section");
    const productSection = document.querySelector(".product-section");
    const reopenButton = document.querySelector(".reopen-filter");
  
    // Hide the button to reopen the filter section initially
    reopenButton.style.display = "none";
  
    // Function to hide the filter section and show the button to reopen
    function minimizeFilterSection() {
      const filterWidth = filterSection.offsetWidth;
      filterSection.style.display = "none";
      reopenButton.style.display = "block";
      productSection.style.width = "100%"; // Expand product section to fill available space
    }
  
    // Function to show the filter section and hide the button to reopen
    function reopenFilterSection() {
      filterSection.style.display = "block";
      reopenButton.style.display = "none";
      productSection.style.width = "80%"; // Adjust this value according to your layout
    }
  
    // Attach click event listener to the close button to minimize the filter section
    document
      .querySelector(".close-filter")
      .addEventListener("click", function () {
        minimizeFilterSection();
      });
  
    // Attach click event listener to the button to reopen the filter section
    reopenButton.addEventListener("click", function () {
      reopenFilterSection();
    });
  });
  