// Define the tour!
var tour = {
  id: "hello-hopscotch",
  steps: [
    {
      title: "My Header",
      content: "The main toolbar allows you to navigate between projects without leaving the translation workspace",
      target: "header",
      placement: "bottom",
      onNext: function() {
          $("#progress aside.menu").css("display", "block");
        }
    },
    {
      title: "My content",
      content: "Here is where I put my content.",
      target: '#progress .menu',
      placement: "bottom",
      nextOnTargetClick: true,
    },

    {
      title: "My content",
      content: "Here is where I put my content.",
      target: 'aside.menu',
      placement: "bottom",
    },

  ]
};

// Start the tour!

$(document).ready(function() {
  setTimeout(function() {
    hopscotch.startTour(tour);
  }, 1000);
});
