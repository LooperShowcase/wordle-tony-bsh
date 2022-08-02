const LINE_COUNT = 6;
const CHAR_COUNT = 5;

const tries = document.getElementById("words");

for (let i = 0; i < LINE_COUNT; i++) {
  const worDiv = document.createElement("div");
  worDiv.className = "word";

  for (let j = 0; j < CHAR_COUNT; j++) {
    const chardiv = document.createElement("div");
    chardiv.className = "char";
    worDiv.appendChild(chardiv);
  }

  tries.appendChild(worDiv);
}

let currentchar = 0;
let currentword = 0;
document.addEventListener("keydown", async (event) => {
  const firstword = tries.children[currentword];

  if (event.code == "Enter") {
    if ((currentchar = CHAR_COUNT)) {
      const answer = getCurrentWord();
      const result = await guess(answer);
      colorize(result);
      currentword++;
      currentchar = 0;
    }
  } else if (event.code == "Backspace") {
    if (currentchar > 0) {
      const animeChar = worDiv.children[currentword];
      firstword.children[currentchar].innerHTML = "";
      await animateCSS(animeChar, "wobble");
      currentchar--;
    }
  } else if (currentchar < CHAR_COUNT) {
    firstword.children[currentchar].innerHTML = event.key;
    currentchar++;
  }
});

async function guess(word) {
  const request = await fetch("/guess/" + word);
  const result = await request.json();
  return result;
}

function getCurrentWord() {
  var word = "";
  var wordDiv = document.getElementById("words").children[currentword];
  for (var i = 0; i < wordDiv.children.length; i++) {
    word = word + wordDiv.children[i].innerHTML;
  }
  return word;
}

function colorize(results) {
  const wordDiv =
    document.getElementById("words").children[currentword].children;
  for (let i = 0; i < results.length; i++) {
    if (results[i] == 1) {
      wordDiv[i].style.backgroundColor = "green";
    } else if (results[i] == 0) {
      wordDiv[i].style.backgroundColor = "yellow";
    } else {
      wordDiv[i].style.backgroundColor = "gray";
    }
  }
}

function animateCSS(element, animation, prefix = "animate__") {
  // We create a Promise and return it
  return new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;

    element.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      element.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }
    element.addEventListener("animationend", handleAnimationEnd, {
      once: true,
    });
  });
}
