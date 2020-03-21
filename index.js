window.onload = function() {
  //Set array with JSON data to put into main area
  var roles = [];

  $.getJSON("peeps.json", function(data) {
    $.each(data, function(key, val) {
      roles.push(val);
    });
  });

  var rect;

  var mouseHover = function() {
    var getID = $(this).attr("id");

    $(this)
      .css({
        cursor: "pointer",
        "-webkit-filter": "drop-shadow(0px 0px 15px #f8971d)",
        filter: "drop-shadow(0px 0px 25px #f8971d)"
      })
      .before(
        "<div id='peepTitle' class='peep-title'>" +
          roles.find(e => e.id === getID).role +
          "</div>"
      );
  };

  var mouseLeave = function() {
    $(this).css({
      cursor: "default",
      "-webkit-filter": "none",
      filter: "none"
    });

    $("#peepTitle").remove();
  };

  //mouseenter/leave functions

  $(".peep")
    .on("mouseover", mouseHover)
    .on("mouseleave", mouseLeave);

  //Get element position and base popup position off of element position
  function setPopup(position) {
    if (position <= window.innerWidth / 2) {
      placePop = position * 1.05;
    } else if (position > window.innerWidth / 2) {
      placePop = position - (position - rect.left);
      $(".peepInfo").css({
        "text-align": "right",
        transform: "translateX(-105%)",
        top: "5%"
      });
      $("#closeBtn").css({
        "margin-left": "67%"
      });
    }
    return placePop;
  }

  //Click function that popluates the popup with info from JSON file
  var mouseClick = function() {
    $("#peepTitle").remove();

    $(".peep").off();

    rect = this.getBoundingClientRect();
    var getID = $(this).attr("id");

    if (
      ($(this).id = "dna" || "nam" || "edbo" || "dl" || "dbo" || "rvp" || "dm")
    ) {
      $("#zoomBox").addClass("active");
      $(".active").css({
        transform: "scale(1.75)",
        "transform-origin": rect.left + "px " + rect.top * 1.5 + "px"
      });
    } else if (($(this).id = "bss" || "boa" || "bsa" || "css" || "csa")) {
      $("#zoomBox").addClass("active");
      $(".active").css({
        transform: "scale(1.75)",
        "transform-origin": rect.left + "px " + rect.bottom + "px"
      });
    } else if (($(this).id = "am")) {
      $("#zoomBox").addClass("active");
      $(".active").css({
        transform: "scale(1.75)",
        "transform-origin": "center"
      });
    } else if (($(this).id = "arm" || "nr" || "rl" || "amrl")) {
      $("#zoomBox").addClass("active");
      $(".active").css({
        transform: "scale(1.75)",
        "transform-origin": "right center"
      });
    }

    $(this)
      .parent()
      .css({
        "z-index": "1000"
      });

    $(this).css({
      cursor: "default",
      "-webkit-filter": "none",
      filter: "none"
    });

    $(this)
      .parent()
      .parent()
      .before(
        "<div id='popup' class='peepsMore showing'><div id='popupInfo' class='peepInfo'><h3 class='popupTitle'>" +
          roles.find(e => e.id === getID).role +
          "</h3><p class='popupText'>" +
          roles.find(e => e.id === getID).description +
          "</p><div id='closeBtn' class='btn close-btn'>CLOSE <span class='closeX'>X</span></div></div></div>"
      );

    $("#popup")
      .css({
        position: "absolute",
        position: "relative",
        left: "0px",
        top: rect.top + "px"
      })
      .animate(
        {
          width: 100 + "vw",
          background: "rgba(255,255,255,0.8)"
        },
        1000
      );

    var setPop = setPopup(rect.right);

    $(".peepInfo")
      .fadeIn()
      .delay(750)
      .css({
        position: "absolute",
        left: setPop + "px"
      })
      .animate(
        {
          opacity: 1
        },
        750
      );

    //Close peep
    $(".close-btn").on("click", function() {
      $(".peep")
        .on("mouseover", mouseHover)
        .on("mouseleave", mouseLeave)
        .on("click", mouseClick);

      $("#popup").remove();

      $("#zoomBox")
        .removeClass("active")
        .css({
          transform: "scale(1)",
          "transform-origin": "initial"
        });

      $(".peep")
        .parent()
        .css({
          "z-index": "0"
        });
    });
  };

  $("#showall").on("click", function() {
    $("#leadership").removeClass("inactive");
    $("#production").removeClass("inactive");
    $("#support").removeClass("inactive");
    $("#leadershipBtn, #productionBtn, #supportBtn").removeClass("selected");
  });
  $("#leadershipBtn").on("click", function() {
    $("#leadership").removeClass("inactive");
    $("#production").addClass("inactive");
    $("#support").addClass("inactive");

    $("#leadershipBtn").addClass("selected");
    $("#productionBtn, #supportBtn").removeClass("selected");
  });
  $("#productionBtn").on("click", function() {
    $("#leadership").addClass("inactive");
    $("#production").removeClass("inactive");
    $("#support").addClass("inactive");

    $("#productionBtn").addClass("selected");
    $("#leadershipBtn, #supportBtn").removeClass("selected");
  });
  $("#supportBtn").on("click", function() {
    $("#leadership").addClass("inactive");
    $("#production").addClass("inactive");
    $("#support").removeClass("inactive");

    $("#supportBtn").addClass("selected");
    $("#leadershipBtn, #productionBtn").removeClass("selected");
  });

  $(".peep").on("click", mouseClick);
};
