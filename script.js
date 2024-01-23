// ---------Responsive-navbar-active-animation-----------
function test() {
  var tabsNewAnim = $("#navbarSupportedContent");
  var selectorNewAnim = $("#navbarSupportedContent").find("li").length;
  var activeItemNewAnim = tabsNewAnim.find(".active");
  var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
  var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
  var itemPosNewAnimTop = activeItemNewAnim.position();
  var itemPosNewAnimLeft = activeItemNewAnim.position();
  $(".hori-selector").css({
    top: itemPosNewAnimTop.top + "px",
    left: itemPosNewAnimLeft.left + "px",
    height: activeWidthNewAnimHeight + "px",
    width: activeWidthNewAnimWidth + "px",
  });
  $("#navbarSupportedContent").on("click", "li", function (e) {
    $("#navbarSupportedContent ul li").removeClass("active");
    $(this).addClass("active");
    var activeWidthNewAnimHeight = $(this).innerHeight();
    var activeWidthNewAnimWidth = $(this).innerWidth();
    var itemPosNewAnimTop = $(this).position();
    var itemPosNewAnimLeft = $(this).position();
    $(".hori-selector").css({
      top: itemPosNewAnimTop.top + "px",
      left: itemPosNewAnimLeft.left + "px",
      height: activeWidthNewAnimHeight + "px",
      width: activeWidthNewAnimWidth + "px",
    });
  });
}
$(document).ready(function () {
  setTimeout(function () {
    test();
  });
});
$(window).on("resize", function () {
  setTimeout(function () {
    test();
  }, 500);
});
$(".navbar-toggler").click(function () {
  $(".navbar-collapse").slideToggle(300);
  setTimeout(function () {
    test();
  });
});

// --------------add active class-on another-page move----------
jQuery(document).ready(function ($) {
  // Get current path and find target link
  var path = window.location.pathname.split("/").pop();

  // Account for home page with empty path
  if (path == "") {
    path = "index.html";
  }

  var target = $('#navbarSupportedContent ul li a[href="' + path + '"]');
  // Add active class to target link
  target.parent().addClass("active");
});

// Add active class on another page linked
// ==========================================
// $(window).on('load',function () {
//     var current = location.pathname;
//     console.log(current);
//     $('#navbarSupportedContent ul li a').each(function(){
//         var $this = $(this);
//         // if the current path is like this link, make it active
//         if($this.attr('href').indexOf(current) !== -1){
//             $this.parent().addClass('active');
//             $this.parents('.menu-submenu').addClass('show-dropdown');
//             $this.parents('.menu-submenu').parent().addClass('active');
//         }else{
//             $this.parent().removeClass('active');
//         }
//     })
// });

document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
    var scrollY = window.scrollY || document.documentElement.scrollTop;

    if (scrollY > 500) {
      document.querySelector(".scroll-up-btn").classList.add("show");
    } else {
      document.querySelector(".scroll-up-btn").classList.remove("show");
    }
  });

  document
    .querySelector(".scroll-up-btn")
    .addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

// Syncing Active Navbar Links with Scroll

let sec = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("#navbarSupportedContent ul li");
let navMove = document.getElementsByClassName("hori-selector");

window.onscroll = () => {
  sec.forEach((part) => {
    let top = window.scrollY;
    let offset = part.offsetTop - 150;
    let height = part.offsetHeight;
    let id = part.getAttribute("id");
    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("#navbarSupportedContent ul li[id*=li_" + id + "]")
          .classList.add("active");
        test();
      });
    }
  });
};

// -------About me section number animation ---------

function numIncrease(start, id, speed) {
  elt = document.getElementById(id);
  endNum = Number(document.getElementById(id).innerHTML);
  incNumRec(start, endNum, elt, speed);
}

// A recursive function to increase the number.
function incNumRec(i, endNum, elt, speed) {
  if (i <= endNum) {
    elt.innerHTML = i;
    setTimeout(function () {
      //Delay a bit before calling the function again.
      incNumRec(i + 1, endNum, elt, speed);
    }, speed);
  }
}

document.addEventListener("aos:in", () => {
  numIncrease(0, "inc", 120);
  numIncrease(24500, "speed", 5);
  numIncrease(0, "tick", 200);
});

// --------------- Home Animation ------------

var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

// ----------Toggle Scroll Bar ------------

window.addEventListener("scroll", () => {
  showScroll();
});

const onScrollStop = (showScroll) => {
  let scrolling;
  window.addEventListener(
    "scroll",
    () => {
      clearTimeout(scrolling);
      scrolling = setTimeout(() => {
        showScroll();
      }, 500);
    },
    false
  );
};

onScrollStop(() => {
  hideScroll();
});

function showScroll() {
  let doc = document.querySelector("body");
  doc.classList.remove("hide-scroll");
}

function hideScroll() {
  let doc = document.querySelector("body");
  doc.classList.add("hide-scroll");
}

// -------- Certificate Section ------------

let certImage = document.getElementById("c-img");
let cDesc = document.getElementById("c-desc");
let cIndex = 0;

let certified = [
  {
    filePath: "/assets/certificates/c1.jpeg",
    desc: "Achieved by showcasing innovative problem-solving skills and collaborative teamwork in a national hackathon competition. This certificate attests to my ability to devise creative solutions and contribute effectively to complex web development challenges.",
  },
  {
    filePath: "/assets/certificates/c2.jpeg",
    desc: "Secured by emerging as a top performer in a national hackathon competition, showcasing adept problem-solving and collaboration skills. This certificate underscores my prowess as a Java and web developer, contributing significantly to the success of the team and solving intricate challenges.",
  },
  {
    filePath: "/assets/certificates/c3.jpeg",
    desc: "Awarded for outstanding performance during a challenging web development internship. This certificate reflects my practical experience, adaptability, and ability to contribute meaningfully to real-world projects, gaining valuable insights into the professional landscape.",
  },
  {
    filePath: "/assets/certificates/c4.jpeg",
    desc: "Earned through the successful completion of an intensive web development course, demonstrating proficiency in various programming languages, frameworks, and best practices. This certification validates my commitment to continuous learning and staying abreast of the latest industry trends.",
  },
  {
    filePath: "/assets/certificates/c5.jpeg",
    desc: "Attained upon successfully finishing a comprehensive Java programming course, affirming my proficiency in this language. This certification signifies my commitment to mastering Java, a fundamental skill for any web developer, and serves as a testament to my dedication to continuous learning in the ever-evolving tech landscape.",
  },
  {
    filePath: "/assets/certificates/c6.jpeg",
    desc: "Awarded for the successful completion of an intensive web development course, emphasizing proficiency in various web technologies and frameworks. This certificate reinforces my expertise in crafting dynamic and responsive web applications, reflecting my commitment to staying current with the latest advancements in web development.",
  },
];

function setCertificate() {
  cDesc.style.opacity = 0;
  certImage.style.opacity = 0;
  cDesc.style.transform = "translate(0px, 10px)";
  certImage.style.transform = `rotateY(0deg)`;
  setTimeout(() => {
    certImage.style.transform = `rotateY(360deg)`;
    cDesc.style.transform = "translate(0px, 0px)";
    cDesc.style.opacity = 1;
    certImage.style.opacity = 1;
    certImage.src = certified[cIndex].filePath;
    cDesc.innerText = certified[cIndex].desc;
  }, 1000);
}

function changeContent() {
  if (cIndex <= 4) {
    cIndex += 1;
  } else {
    cIndex = 0;
  }
  setCertificate();
}

window.addEventListener("load", () => {
  setInterval(changeContent, 7000);
});

// ------ Toggle Mode --------

// let modeBtn = document.getElementById("mode");

// function toggleMode() {
//   let mode = document.body;
//   mode.classList.toggle("dark");
// }

// modeBtn.addEventListener("click", () => {
//   toggleMode();
// });
