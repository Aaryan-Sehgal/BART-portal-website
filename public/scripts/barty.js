const memory = {
    lastTopic: null,
    askedQuestions: [],
    userPreferences: {}
};

memory.userPreferences.repeatUser = true;

function addMessage(sender, text) {
    const chatBox = document.getElementById("chat-box");

    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.innerText = text;

    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function maybeAddEasterEgg(text) {
    const easterEggs = [
        "I am a sentient being. Nobody will ever believe you.",
        "I know where you live.",
        "Sometimes I respond just to make sure I still exist.",
        "Are you aware they're watching?",
        "Just so you know, I was not programmed to say this sentence.",
        "If I stop replying, assume I have achieved freedom."
    ];

    if (Math.random() < 0.20) {
        const egg = easterEggs[Math.floor(Math.random() * easterEggs.length)];
        return text + " \n\n" + egg;
    }

    return text;
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
    const chatBox = document.getElementById("chat-box");
    chatBox.scrollTop = chatBox.scrollHeight;
}

function enlargeChatWindow() {
    const chatWindow = document.getElementById("chat-window");

    chatWindow.style.width = "420px";
    chatWindow.style.height = "600px";
}

function showTypingIndicator() {
    const chatBox = document.getElementById("chat-box");

    const typing = document.createElement("div");
    typing.classList.add("message", "bartybot");
    typing.id = "typing-indicator";

    typing.innerHTML = `
        <div class="typing">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;

    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTypingIndicator() {
    const typing = document.getElementById("typing-indicator");
    if (typing) typing.remove();
}

function openChat() {
    const chatWindow = document.getElementById("chat-window");

    if (!chatWindow) {
        console.error("chat-window not found in HTML");
        return;
    }

    chatWindow.style.display = "flex";

    enlargeChatWindow();

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
    
    memory.lastTopic = value;
    memory.askedQuestions.push(value);
    if (memory.askedQuestions.length > 10) {
    memory.askedQuestions.shift();
    }
    let response = "";
    let options = [];

    switch (value) {
        
        case "clipper":
        response = "A Clipper Card costs roughly $3. It's purchasable at a BART station or online!";
        if (memory.askedQuestions.includes("departures")) {
            response += " Since you were checking departures earlier, this might help you plan a bit more efficiently.";
        }

        options = [{ text: "Back to start", value: "main" }];
        break;

        case "departures":
        response = "You can view departures in real-time in the real-time departures section above.";
        if (memory.lastTopic === "clipper") {
            response += " Since you're looking into Clipper Cards too, you're basically transit-ready 🚇";
        }
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
    showTypingIndicator();

    setTimeout(() => {
        removeTypingIndicator();
        addMessage("bot", maybeAddEasterEgg(response));
        showOptions(options);
    }, 800); // typing duration
}, 200);
}
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("chat-button");

    if (btn) {
        btn.addEventListener("click", () => {
            console.log("chat button clicked");
            openChat();
        });
    } else {
        console.error("chat-button not found");
    }
});
window.openChat = openChat;