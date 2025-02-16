// popup.js

let alreadyEnriched = false;

document.querySelector("#enrich").addEventListener("click", enrich);

function enrich() {
     // Query the active tab before injecting the content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!alreadyEnriched) {
        alreadyEnriched = true;
        // Use the Scripting API to execute a script
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: doEnrich
        });
      }
      window.close();
    });
  }

  function doEnrich() {
    const domNodes = document.getElementsByTagName("login-env-switcher-tile");
    for (let node of domNodes) {
      const tileNode = node.getElementsByClassName("gid-env-switcher-tile")[0];

      // Make taller to fit the details in
      tileNode.setAttribute("style","height:130px");
      
      // Get Org Details
      let org = {};
      org.Id = node.dataset.key.slice(node.dataset.key.lastIndexOf("/")+1);

      let detailsNode = node.getElementsByClassName("gid-env-switcher-tile__details")[0];

      // Style Org Types
      const typeElem = tileNode.querySelector('[data-tid="cloud-name-with-tenant-type"]');
      let styleStr = '';
      console.log(org.Id, typeElem.innerHTML)
      if (typeElem.innerHTML.includes("Production")) {
        tileNode.style.borderWidth = "3px";
        tileNode.style.borderColor = "#0D9DDA";
      } else {
        tileNode.style.borderWidth = "1px";
      }

      // Add Org Id
      p = document.createElement("p");
      p.innerHTML = `Org Id: ${org.Id}`;
      detailsNode.append(p);
    }
  }
  