const boxes = document.querySelectorAll(".box");

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.classList.contains("active")) {
      box.classList.remove("active", "clicked");
    } else {
      box.classList.add("active", "clicked");
    }
  });
});
