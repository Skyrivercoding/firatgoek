document.addEventListener("DOMContentLoaded", onLoaded);

async function onLoaded() {
  await loadApps();
}

async function loadApps() {
  const appsList = document.getElementById("appsList");

  appsList.innerHTML = "";

  var response = await fetch("./");
  console.log(response);
}
