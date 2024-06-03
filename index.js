const API_URL =
  "https://api.github.com/repos/Pitis6/street-fighter/contents/resources/api/fighters.json";
const SECURITY_HEADERS = {
  headers: {
    authorization: "token ...",
  },
};

const rootElement = document.getElementById("root");
const loadingElement = document.getElementById("loading-overlay");

const responsePromise = fetch(API_URL, SECURITY_HEADERS);
responsePromise
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed load data");
    }
    return response.json();
  })
  .then((file) => {
    const fighters = JSON.parse(atob(file.content));
    const names = fighters.map((it) => it.name);
    const namesStr = names.join("\n");
    rootElement.innerText = namesStr;
  })
  .catch((error) => {
    console.warn(error);
    rootElement.innerText = "Failed to load data";
  })
  .finally(() => {
    loadingElement.remove();
  });
