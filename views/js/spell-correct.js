async function correct() {
  // Declare variables
  var input, filter, divText;
  divText = document.getElementById("divText");
  input = document.getElementById("correctInput");
  filter = input.value.trim().toLowerCase();
  try {
    const correct = await fetch(`http://localhost:3000/correct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: filter,
      }),
    });

    var result = await correct.json();
    console.log(result);
    divText.innerHTML = `<p class="theText">${result}</p>`;
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
}
