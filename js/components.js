function getServiceComponentStatus(url) {
    return new Promise(function (resolve, reject) {
        fetch(url, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        }).then(function (response) {
            resolve(response.ok);
        }).catch(reject);
    });
}

var componenets = [{
    name: "Welcome",
    url: "https://maxsoft-mock-server-demo.web.app/say/hello?name=Osanda"
}, {
    name: "Users",
    url: "https://maxsoft-mock-server-demo.web.app/users/1"
}, {
    name: "Videos",
    url: "https://maxsoftlk-services/api/2964"
}, {
    name: "Photos",
    url: "https://maxsoft-mock-server-demo.web.app/photos/29647"
}, {
    name: "Docs",
    url: "https://maxsoftlk-api/api/453"
}]

var statusPromises = [];

componenets.forEach(function (component) {
    statusPromises.push(getServiceComponentStatus(component.url));
});

Promise.all(statusPromises).then(function (statusArray) {
    var template = document.querySelector(".check-template");

    function createUIComponents(node) {
        var fragment = document.createDocumentFragment();
        statusArray.forEach(function (status, index) {
            var div = template.cloneNode(true);

            div.setAttribute("class", "status-" + (status ? "up" : "down"));
            div.querySelector(".name").textContent = componenets[index].name || "unnamed";
            fragment.appendChild(div);
        });

        document.querySelectorAll('.' + "status-down").forEach(function (element) {
            element.remove();
        });

        document.querySelectorAll('.' + "status-up").forEach(function (element) {
            element.remove();
        });

        node.parentNode.insertBefore(fragment, node.nextSibling);
    }

    if (window.location.hash) {
        var panel;

        var pairs = window.location.hash.substr(1).split("&");
        for (var i = 0, pair; pair = pairs[i]; i++) {
            if (pair.indexOf("theme=") != -1) {
                document.body.setAttribute("class", pair.replace("=", "-"));
                continue;
            }

            var parts = pair.split("=");
            var h1 = document.createElement("H1");
            h1.dataset.readonlyKey = parts[0];
            if (parts[1]) {
                h1.innerText = decodeURIComponent(parts[1]);
            }

            if (!panel) {
                panel = document.getElementById("panel");
                panel.innerHTML = "";
            }
            panel.appendChild(h1);
        }
    }

    document.querySelectorAll("h1").forEach(createUIComponents);

    setInterval(function () {
        document.querySelectorAll("h1").forEach(createUIComponents);
    }, 
    5000);
});