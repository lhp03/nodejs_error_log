const menuClick = (text) => {
    console.log(text);
    let mneu = document.getElementById("menu");
    let select = menu.Options[menu.selectedIndex].text

    if(select === "Log an error") {
        console.log("Log an error");
    } else if(select === "Log an warning") {
        console.log("Log an warning");
    } else if(select === "View errors") {
        console.log("View errors");
    } else if(select === "View warnings") {
        console.log("View warnings");
    } else if(select === "View all long entires") {
        console.log("View all entires");
    }
}

const logError = async () => {
    console.log("TEST");
    try {
        const response = await fetch("/log_error", {
            method : "POST"
        });
        console.log(response);
    } catch(err) {
        console.log(err);
    }
}

let menu = document.getElementById("menu");
