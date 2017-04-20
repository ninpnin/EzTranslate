function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    inLanguage: document.querySelector("#inLanguage").value,
    outLanguage: document.querySelector("#outLanguage").value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#inLanguage").value = result.inLanguage || "en";
    document.querySelector("#outLanguage").value = result.outLanguage || "fi";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("inLanguage");
  getting.then(setCurrentChoice, onError);

  getting = browser.storage.local.get("outLanguage");
  getting.then(setCurrentChoice, onError);


}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);