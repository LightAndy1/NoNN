fetch("quotes.json")
  .then((response) => response.json())
  .then((data) => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const quote = data[`November ${day}`];

    const quoteElement = document.querySelector(".quote");
    quoteElement.textContent = `Quote of the day: ${quote}`;
  })
  .catch((error) => {
    console.error("Error:", error);
  });

document.querySelectorAll(".box").forEach((box) => {
  let clickCount = 0;

  box.addEventListener("click", () => {
    clickCount++;

    if (clickCount === 1) {
      box.classList.remove("off");
      box.classList.add("on");
    } else if (clickCount === 2) {
      box.classList.remove("on");
      box.classList.add("off");
      clickCount = 0;
    } else {
      box.classList.remove("on", "off");
      clickCount = 1;
    }
  });
});

function createStatusJSON() {
  const boxes = [];

  const boxElements = document.getElementsByClassName("box");
  for (let i = 0; i < boxElements.length; i++) {
    const boxElement = boxElements[i];
    let status = "disabled";

    if (boxElement.classList.contains("on")) {
      status = "on";
    } else if (boxElement.classList.contains("off")) {
      status = "off";
    }

    const box = {
      id: i + 1,
      status: status,
    };
    boxes.push(box);
  }

  const jsonString = JSON.stringify(boxes);

  const blob = new Blob([jsonString], { type: "application/json" });

  saveAs(blob, "NoNN-Journey.json");
}

function handleImport() {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "application/json";

  fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = function (e) {
      const jsonContent = e.target.result;
      const boxes = JSON.parse(jsonContent);

      updateBoxClasses(boxes);
    };

    reader.readAsText(file);
  });

  fileInput.click();
}

function updateBoxClasses(boxes) {
  const boxElements = document.getElementsByClassName("box");
  for (let i = 0; i < boxElements.length; i++) {
    const boxElement = boxElements[i];
    const box = boxes[i];

    boxElement.classList.remove("on", "off", "disabled");

    if (box.status === "on") {
      boxElement.classList.add("on");
    } else if (box.status === "off") {
      boxElement.classList.add("off");
    } else if (box.status === "disabled") {
      boxElement.classList.add("disabled");
    }
  }
}

function handleReset() {
  const boxElements = document.getElementsByClassName("box");
  for (let i = 0; i < boxElements.length; i++) {
    const boxElement = boxElements[i];
    boxElement.classList.remove("on", "off");
    boxElement.removeAttribute("style");
  }
}
