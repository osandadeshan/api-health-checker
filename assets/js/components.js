(() => {
  const container = document.getElementById("health-boxes");
  const apiUrls = [
    {
      name: "Welcome",
      description: "Sample description",
      url: "https://maxsoft-mock-server-demo.web.app/say/hello?name=Osanda",
    },
    {
      name: "Users",
      description: "Sample description",
      url: "https://maxsoft-mock-server-demo.web.app/users/1",
    },
    {
      name: "Videos",
      description: "Sample description",
      url: "https://maxsoft-mock-server-demo.web.app/api/2964",
    },
    {
      name: "Photos",
      description: "Sample description",
      url: "https://maxsoft-mock-server-demo.web.app/photos/29647",
    },
    {
      name: "Docs",
      description: "Sample description",
      url: "https://maxsoft-mock-server-demo.web.app/docs/453",
    }
  ];

  // Looping through the api endpoints and get the status
  apiUrls.map((endpoint) => {
    fetch(endpoint.url, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((res) => {
      appendElements(endpoint.name, endpoint.description, res.status);
    });
  });

  function appendElements(name, description, status) {
    const el = document.createElement("div");
    el.classList.add(
      "col-md-6",
      "col-lg-3",
      "d-flex",
      "align-items-stretch",
      "mb-5",
      "mb-lg-0"
    );
    el.setAttribute("data-aos", "zoom-in");
    el.setAttribute("data-aos-delay", "zoom-in200");
    container.appendChild(el).innerHTML = `
    <div class="icon-box" style="margin-bottom:15px; ${
      status !== 200 ? "background-color:red; color:##FFF;" : ""
    }">
        <div class="icon"><i class="ri-stack-line"></i></div>
        <h4 class="title"><a href="">${name}</a></h4>
        <p class="description"><b>Response code: ${status}</b></p>
        <p class="description">${description}</p>
    </div>
    `;
  }
})();