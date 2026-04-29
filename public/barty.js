
function addMessage(sender, text) {
    const chatBox = document.getElementById("chat-box");

    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.innerText = text;

    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showOptions(options) {
    const optionsDiv = document.getElementById("chat-options");
    optionsDiv.innerHTML = "";

    options.forEach(opt => {
        const button = document.createElement("button");
        button.innerText = opt.text;

        button.onclick = () => {
            addMessage("user", opt.text);
            handleOption(opt.value);
        };

        optionsDiv.appendChild(button);
    });
}

function openChat() {
    const chatWindow = document.getElementById("chat-window");
    chatWindow.style.display = "block";

    if (chatWindow.dataset.opened) return;
    chatWindow.dataset.opened = "true";

    addMessage(
        "bot",
        "Hi, I'm BARTy, your reliable Bart-info-buddy! What can I help you with?"
    );

    showOptions([
        { text: "How much does a Clipper Card cost?", value: "clipper" },
        { text: "Where can I see real-time departures?", value: "departures" },
        { text: "How can I pay for a Clipper Card?", value: "card" }
    ]);
}

// FIXED NAME
function handleOption(value) {
    let response = "";
    let options = [];

    switch (value) {

        case "clipper":
            response = "A Clipper Card costs roughly $3. It's purchasable at a BART station or online!";
            options = [{ text: "Back to start", value: "main" }];
            break;

        case "departures":
            response = "You can view departures in real-time in the real-time departures section above.";
            options = [{ text: "Back to start", value: "main" }];
            break;

        case "card":
            response = "We accept cash, cards, and contactless payments. Accessibility is our priority!";
            options = [{ text: "Back to start", value: "main" }];
            break;

        case "main":
            response = "Is there anything else I can help you with? :)";
            options = [
                { text: "How much does a Clipper Card cost?", value: "clipper" },
                { text: "Where can I see real-time departures?", value: "departures" },
                { text: "How can I pay for a Clipper Card?", value: "card" }
            ];
            break;

        default:
            response = "I'm not sure about that yet.";
            options = [{ text: "Back to start", value: "main" }];
    }

    setTimeout(() => {
        addMessage("bot", response);
        showOptions(options);
    }, 400);
}