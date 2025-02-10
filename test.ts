import { Repository } from "@octopus/octopus";

function assertEquals(actual: string, expected: string): void {
  if (actual !== expected) {
    const actualLines = actual.split("\n");
    const expectedLines = expected.split("\n");
    const differences = actualLines.map((line, index) => {
      if (line.trim() !== expectedLines[index].trim()) {
        return `Line ${index + 1}:\nActual: ${line.trim()}\nExpected: ${
          expectedLines[index].trim()
        }`;
      }
      return null;
    }).filter((diff) => diff !== null).join("\n\n");
    throw new Error(`Assertion failed:\n${differences}`);
  }
}

Deno.test("Repository Generation", async () => {
  const list = new Repository({
    user: "GabsEdits",
    forks: false,
    includes: ["id", "name", "description"],
    excludes: [
      "712811181", "792687760", "664547931",
      "587856905", "618456550", "738950114",
      "592005146", "802429917", "812249965",
      "704967796", "646239823", "570959294",
      "576392551", "609080563", "615993375",
      "606407867", "757512923", "576395982",
      "720429582", "611226878", "657729652",
    ],
  });

  const expected = `
    [
      {
        "id": 913403761,
        "name": "ai-detector",
        "description": "Check if an text is AI generated"
      },
      {
        "id": 789441225,
        "name": "aploe",
        "description": "Lightweight and minimalistic Vue.js components and styles for informational websites"
      },
      {
        "id": 645861964,
        "name": "boekestijn",
        "description": "The Source Code for Boekestijn's Website in Moldova"
      },
      {
        "id": 917809732,
        "name": "certifyit",
        "description": "Generate diplomas quickly, with verification"
      },
      {
        "id": 909728212,
        "name": "compliment-generator",
        "description": "A simple webapp that generates compliments and API"
      },
      {
        "id": 581536308,
        "name": "deb-gnome",
        "description": "Debian GNOME customizations from Gabs"
      },
      {
        "id": 839409510,
        "name": "desktop-tweaks",
        "description": "An image that includes tweaks to the base desktop image for Vanilla OS"
      },
      {
        "id": 910837856,
        "name": "emoji2emoticon",
        "description": "Quckly convert Emojis to Emoticons, or vice versa!"
      },
      {
        "id": 581817631,
        "name": "fed",
        "description": "Fedora Workstation Personal Post Install"
      },
      {
        "id": 875303479,
        "name": "feed",
        "description": "A modern, fast, and easy-to-use RSS, JSON and Atom feed generator for Deno and the web."
      },
      {
        "id": 918154295,
        "name": "feeder",
        "description": "A simple RSS/Atom Reader Webapp & API"
      },
      {
        "id": 910763313,
        "name": "funfact-generator",
        "description": "Simple Funfact Generator (API & Frontend)"
      },
      {
        "id": 827294688,
        "name": "gangi",
        "description": "Calculate the time between two dates"
      },
      {
        "id": 929841892,
        "name": "ghApi",
        "description": "Simple Deno package to fetch GitHub's API"
      },
      {
        "id": 741370992,
        "name": "gxbs.dev",
        "description": "My personal website were you are going to find my projects, about me and how to find me."
      },
      {
        "id": 664047022,
        "name": "keimeno",
        "description": "Just Text. Just Notes. Save."
      },
      {
        "id": 925338110,
        "name": "lynx",
        "description": "Create short links, fast, and simple!"
      },
      {
        "id": 780036387,
        "name": "quick-links",
        "description": "An easy way to access your quick links from anywhere in the world"
      },
      {
        "id": 852319062,
        "name": "rm-ds",
        "description": "Remove .DS_Store files seemlessly"
      },
      {
        "id": 828934347,
        "name": "sencilla",
        "description": null
      },
      {
        "id": 912166207,
        "name": "text-analyzer",
        "description": "Analyze text with ease"
      },
      {
        "id": 807141829,
        "name": "tipps",
        "description": "Showcase your tips and tricks to the world!"
      }
    ]
    `.replace(/\n\s+/g, "\n").trim();

  assertEquals(await list.build(), expected);
});
