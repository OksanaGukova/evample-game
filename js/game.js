const startBtn = document.querySelector(".start-btn");
const container = document.querySelector(".container");
const result = document.querySelector(".result-text");

function handleStartBtn() {
  result.innerHTML = "";
  const promises = [...container.children].map(() => {
    return new Promise((resolve, reject) => {
      const random = Math.random() > 0.5;

      if (random) {
        resolve("🤑");
      } else {
        reject("👿");
      }
    });
  });

  Promise.allSettled(promises).then((items) => {
    const isWinner =
      items.every((item) => item.status === "fulfilled") ||
      items.every((item) => item.status === "rejected");

    items.forEach((item, index) => {
      container.children[index].textContent = "";
      setTimeout(() => {
        container.children[index].textContent = item.value || item.reason;

        if (index === items.length - 1) {
          result.innerHTML = isWinner ? "Winner" : "Loser";
        }
      }, 1000 * (index + 1));
    });
  });
}

startBtn.addEventListener("click", handleStartBtn);
