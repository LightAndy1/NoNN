document.querySelectorAll(".box").forEach((box) => {
  let clickCount = 0;
  const originalColor = box.style.backgroundColor;

  box.addEventListener("click", () => {
    clickCount++;

    if (clickCount === 1) {
      box.style.backgroundColor = "#69dda7";
    } else if (clickCount === 2) {
      box.style.backgroundColor = "#ca7d80";
    } else {
      box.style.backgroundColor = originalColor;
      clickCount = 0;
    }
  });
});
