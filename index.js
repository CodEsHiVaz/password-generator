window.addEventListener("load", () => {
  var copyButton = document.querySelector(".copybtn");
  copyButton.addEventListener("click", async () => {
    const passfil = document.querySelector(".generatedPassword");

    try {
      await navigator.clipboard.writeText(passfil.innerHTML);
      console.log("Content copied to clipboard");
    } catch (error) {
      console.log("Failed to copy: ", error);
    }
    copyButton.innerText = "Copied!";
    setTimeout(function () {
      copyButton.innerText = "Copy Password";
    }, 2000);
  });

  const form = document.querySelector(".form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    var length = parseInt(document.querySelector("#passwordLength").value);
    var includeCaps = document.querySelector("#caps").checked;
    var includeNumbers = document.querySelector("#nums").checked;
    var includeSymbols = document.querySelector("#sym").checked;
    var includeDomain = document.querySelector("#domain").checked;

    var charset = "abcdefghijklmnopqrstuvwxyz";
    var password = "";

    if (includeCaps) {
      charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (includeNumbers) {
      charset += "0123456789";
    }
    if (includeSymbols) {
      charset += "!@#$%^&*()";
    }


    for (var i = 0; i < length; i++) {
      var randomIndex = Math.floor(Math.random() * charset.length);
      password = password+charset[randomIndex];
      
    }

    const passfil = document.querySelector(".generatedPassword");
    passfil.textContent = password
    if (includeDomain) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var url = tabs[0].url;
            var parser = document.createElement("a");
            parser.href = url;
            var domain = parser.hostname
            .replace("www.", "")
            .replace(/\.[^/.]+$/, "");
            
            // document.querySelector(".domain").textContent = domain;
            password = domain+"@"+password;
            passfil.textContent = password;
        });
      }



  });


//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     var url = tabs[0].url;
//     var parser = document.createElement("a");
//     parser.href = url;
//     var domain = parser.hostname.replace("www.", "").replace(/\.[^/.]+$/, "");

//     document.querySelector(".domain").textContent = domain;
//     console.log(domain);
//   });
});
