const terminal = document.getElementById("terminal");

const lines = [
  { text: "Initializing environment...", delay: 1200 },

  { text: "", delay: 400 },

  { text: "> Loading core modules...", delay: 700 },

  { text: "> Verifying network interfaces...", delay: 900 },

  { text: "> Establishing secure session...", delay: 1200 },

  { text: "> Connection established", delay: 500 },

  { text: "> Authentication succeeded", delay: 1500 },

  { text: "> Process completed", delay: 500 },

  { text: "> Remote shell initialized", delay: 1000 },

  { text: "", delay: 500 },
  
  { prompt: true, text: "hello visitor...", delay: 500 },

  { prompt: true, text: "welcome to my interactive portfolio", delay: 400 },

  { prompt: true, text: "type 'help' to see the available commands", delay: 0 }
];

let lineIndex = 0;

function typeLine(item, callback) {

  const line = document.createElement("div");

  line.classList.add("line");

  terminal.appendChild(line);

  if (item.prompt) {

    line.innerHTML = `<span class="prompt">root@joao:~$</span> `;

  }

  let charIndex = 0;

  function typeChar() {

    if (charIndex < item.text.length) {

      line.innerHTML += item.text.charAt(charIndex);

      charIndex++;

      setTimeout(typeChar, 85);

    } else {

      callback();

    }
  }

  typeChar();
}

function showNextLine() {

  if (lineIndex < lines.length) {

    typeLine(lines[lineIndex], () => {

      const currentDelay = lines[lineIndex].delay;

      lineIndex++;

      setTimeout(showNextLine, currentDelay);

    });
  } else {

    createPrompt();

  }
}

showNextLine();

function createPrompt() {

  const line = document.createElement("div");

  line.classList.add("input-line");

  line.innerHTML = `
    <span class="prompt">root@joao:~$</span>
    <input type="text" class="command-input" autofocus>
  `;

  terminal.appendChild(line);

  const input = line.querySelector("input");

  input.focus();

  input.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

      const command = input.value;

      if (command.trim() === "") {

        line.remove();

        createPrompt();

        return;

      }

      line.innerHTML = `
        <span class="prompt">root@joao:~$</span>
        ${command}
      `;

      processCommand(command);

    }

  });
}

function processCommand(command) {

  switch(command.toLowerCase()) {

    case "help":

      showHelp();

      break;

    case "whoami":

      showWhoami();

      break;

    case "skills":

      showSkills();

      break;

    case "github":

      showGithub();

      break;
    
    case "contact":
      
      showContact();

      break;

    case "hello":

      showHello();

      break;

    case "projects":

      showProjects();
      
      break;

    case "clear":

      clearTerminal();

      break;

    default:

      showDefault();

      break;
  }
  
}


function addLine(text) {
  
  const line = document.createElement("div");
  
  line.classList.add("line");
  
  line.textContent = text;
  
  terminal.appendChild(line);

  terminal.scrollTop = terminal.scrollHeight;
}



function showHelp() {
  addLine("Available commands:");
  addLine("");
  
  addLine("> whoami");
  addLine("> skills");
  addLine("> github");
  addLine("> contact");
  addLine("> hello");
  addLine("> projects");
  addLine("> clear");
  
  createPrompt();
}

function showWhoami() {
  addLine("Fetching developer metadata...");

  setTimeout(() => {
    addLine("");
  
    addLine("uid=1000(main-void)");
    addLine("role=junior-developer");
    addLine("focus=backend/security/automation");
    addLine("status=learning");

    createPrompt();

  }, 1000);
}

function showSkills() {
  addLine("Available skills:");
  addLine("");

  addLine("Frontend:");
  addLine("> HTML");
  addLine("> CSS");
  addLine("> PHP");
  addLine("> Javascript");
  addLine("");
  addLine("Backend:");
  addLine("> Python");
  addLine("> Delphi");
  addLine("> SQL");
  addLine("");
  addLine("Tools:");
  addLine("> Git");
  addLine("> Linux");
  addLine("> Bash");
  addLine("");
  addLine("Security:");
  addLine("> Networking");
  addLine("> Pentest Studies");
  addLine("> System Enumeration");

  createPrompt();

}

function showGithub() {

  addLine("Redirecting to external repository...");
  setTimeout(() => {
    window.open("https://github.com/main-void", "_blank");
  }, 1000);

  createPrompt();  

}

function showContact() {

  addLine("Contact Information:");
  addLine("");
  addLine("Email: joao.vigo2505@gmail.com");
  addLine("LinkedIn: https://www.linkedin.com/in/joao-guilherme-vigo/");

  createPrompt();

}

function showHello() {
  addLine("Hello friend! Thanks for visiting my interactive portfolio. Feel free to explore and learn more about me. If you have any questions or want to connect, don't hesitate to reach out typing the command 'contact'!");

  createPrompt();

}

function showProjects() {
  addLine("Project showcase:");
  addLine("");
  addLine("> Interactive Portfolio (this project)");
  addLine("> CTF Writeups (coming soon)");
  addLine("> Python Automation Scripts (coming soon)");

  createPrompt();
}

function clearTerminal() {

  terminal.innerHTML = "";
  addLine("Terminal cleared.");
  terminal.scrollTop = terminal.scrollHeight;

  createPrompt();

}

function showDefault() {
  addLine("Command not found.");

  createPrompt();

}
