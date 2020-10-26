const serviceCurrentStatus = {};

const generateServiceTiles = () => {
  const container = document.getElementById("health-boxes");
  const services = [
    {
      id: "mockServer",
      name: "Mock Server",
      description: "This service will be using for all the mock server functions.",
      url: "http://localhost:8000",
    },
    {
      id: "user",
      name: "User Management",
      description: "This service will be using to view, create, edit, and delete a user.",
      url: "https://maxsoft-mock-server-demo.web.app/users/1",
    },
    {
      id: "barcode",
      name: "Barcode Management",
      description: "This service will be using for all the barcode management functions.",
      url: "https://maxsoft-mock-server-demo.web.app/barcode",
    },
    {
      id: "document",
      name: "Document Management",
      description: "This service will be using for all the document management functions.",
      url: "https://maxsoft-mock-server-demo.web.app/photos/29647",
    },
    {
      id: "career",
      name: "Careers Management",
      description: "This service will be using for all the career management functions.",
      url: "https://maxsoft-mock-server-demo.web.app/careers",
    }
  ];

  // Looping through the api endpoints and get the status
  services.map((service) => {
    fetch(service.url, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((res) => {
      if(!serviceCurrentStatus[service.id] || serviceCurrentStatus[service.id] !== res.status) {
        appendElements(service, res.status);
        serviceCurrentStatus[service.id] = res.status;
      }
    })
    .catch(function() {
      const errorStatus = "Connection Refused";
      if(!serviceCurrentStatus[service.id] || serviceCurrentStatus[service.id] !== errorStatus) {
        console.log(errorStatus + " for " + service.url);
        appendElements(service, errorStatus);
        serviceCurrentStatus[service.id] = errorStatus;
      }
    });
  });

  function appendElements({id, name, description}, status) {
    const elementId = `component_${id}`;
    const currentElement = document.getElementById(elementId);

    const tileBackgroundColor = status !== 200 ? "background-color:#ef5c5c;" : "";
    const iconStyle = status !== 200 ? "color:#fff;" : "color:#2487ce;";
    const titleStyle = status !== 200 ? "color:#fff;" : "color:#124265;";
    const responseCodeStyle = status !== 200 ? "color:#fff;" : "color:#124265;";
    const descriptionStyle = status !== 200 ? "color:#fff;" : "color:#124265;";

    if (currentElement) {
      document.getElementById(`tile_${elementId}`).style = tileBackgroundColor;
      document.getElementById(`icon_${elementId}`).style = iconStyle;
      document.getElementById(`title_${elementId}`).style = titleStyle;
      document.getElementById(`response_code_${elementId}`).style = responseCodeStyle;
      document.getElementById(`description_${elementId}`).style = descriptionStyle;

      document.getElementById(`response_code_${elementId}`).innerHTML = `<b>Response code: ${status}</b>`;
    } else {
      const el = document.createElement("div");
      el.setAttribute("id", elementId);
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
      <div class="icon-box" id="tile_${elementId}" style="margin-bottom:15px; ${tileBackgroundColor}">
          <div class="icon" id="icon_${elementId}" style="${iconStyle}"><i class="ri-stack-line"></i></div>
          <h4 class="title"><a href="" id="title_${elementId}" style="${titleStyle}">${name}</a></h4>
          <p class="description" id="response_code_${elementId}"style="${responseCodeStyle}"><b>Response code: ${status}</b></p>
          <p class="description" id="description_${elementId}"style="${descriptionStyle}">${description}</p>
      </div>
      `;
    }
  }
};

generateServiceTiles();

setInterval(generateServiceTiles, 30000);