const sendPost = (url) => {
  const form = document.createElement("form");
  form.setAttribute("method", "POST");
  form.setAttribute("action", url);
  document.characterSet = "utf-8";
  document.body.appendChild(form);
  form.submit();
};

const sendGet = (url) => {
  const form = document.createElement("form");
  form.setAttribute("method", "GET");
  form.setAttribute("action", url);
  document.characterSet = "utf-8";
  document.body.appendChild(form);
  form.submit();
};

const menuClick = async () => {
  let menu = document.getElementById("menu");
  let select = menu.options[menu.selectedIndex].value;

  console.log(select);

  if (select === "log_an_error") {
    sendPost("/log_error");
  } else if (select === "log_an_warning") {
    sendPost("/log_warning");
  } else if (select === "view_errors") {
    document.location.href = "/errors";
  } else if (select === "view_warnings") {
    document.location.href = "/warnings";
  } else if (select === "view_all") {
    document.location.href = "/all";
  }
};

const logError = async () => {
  console.log("TEST");
  try {
    const response = await fetch("/log_error", {
      method: "GET",
    });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

let menu = document.getElementById("menu");
