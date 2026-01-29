function package() {
    console.log(`
        {
  "name": "thiep-tet-9a4-server",
  "version": "1.0.5",
  "description": "Server cho thiệp Tết 9A4",
  "author": "Trần Hữu Nhật Nam",
  "contributors": [
    "Huỳnh Gia Kiệt", "Hoàng Thanh Trúc"
        ],
  "main": "main.js",
  "scripts": {
    "start": "node main.js",
    "dev": "nodemon main.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "dotenv": "^17.2.3"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
  `)
}


const originalWrite = process.stdout.write;

process.stdout.write = function (chunk) {
    const message = chunk.toString();

    if (message.includes("injecting env")) {
        originalWrite.call(process.stdout, `
+════════════════════════════════════════════════════════════════════+
║    THIỆP TẾT 9A4 - ĐÃ KÍCH HOẠT SERVER                             ║
+════════════════════════════════════════════════════════════════════+\n`);
        return;
    }
    return originalWrite.apply(process.stdout, arguments);
};


require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;
const MAIN = process.env.MAIN || "localhost";
const DATA_DIR = path.join(__dirname, "data");

app.use("/images", express.static(path.join(DATA_DIR, "images")));
app.use("/sounds", express.static(path.join(DATA_DIR, "sounds")));

function isSameOrigin(req) {
    const referer = req.headers.referer;
    if (!referer) return false;

    try {
        const refUrl = new URL(referer);
        return refUrl.host === req.headers.host;
    } catch {
        return false;
    }
}

// =====================
// ROUTES
// =====================

// Trang chính
app.get("/", (req, res) => {
    res.sendFile(path.join(DATA_DIR, "index.html"));
});

app.get("/style", (req, res) => {
    if (!isSameOrigin(req)) {
        return res.status(403).send(`
    <pre style="    
    display: block;
    font-family: monospace;
    unicode-bidi: isolate;
    white-space: pre;
    margin-block: 1em 1em;
    margin-inline: 0px;">Cannot GET /style</pre>`);
    }

    res.type("text/css");
    res.sendFile(path.join(DATA_DIR, "style.css"));
});

app.get("/index", (req, res) => {
    if (!isSameOrigin(req)) {
        return res.status(403).send(`
    <pre style="    
    display: block;
    font-family: monospace;
    unicode-bidi: isolate;
    white-space: pre;
    margin-block: 1em 1em;
    margin-inline: 0px;">Cannot GET /index</pre>`);
    }

    res.type("application/javascript");
    res.sendFile(path.join(DATA_DIR, "index.js"));
});

app.get("/style.css", (_, res) => res.status(403).send(`
    <pre style="    
    display: block;
    font-family: monospace;
    unicode-bidi: isolate;
    white-space: pre;
    margin-block: 1em 1em;
    margin-inline: 0px;">Cannot GET /style.css</pre>`));
app.get("/index.js", (_, res) => res.status(403).send(`
    <pre style="    
    display: block;
    font-family: monospace;
    unicode-bidi: isolate;
    white-space: pre;
    margin-block: 1em 1em;
    margin-inline: 0px;">Cannot GET /index.js</pre>`));

// =====================
// START SERVER
// =====================
app.listen(PORT, "0.0.0.0", () => {
    try {
        package();
        console.log(`
+════════════════════════════════════════════════════════════════════+
║    THIỆP TẾT 9A4 SERVER                                            ║
║════════════════════════════════════════════════════════════════════║
║    Local:   http://localhost:${PORT}/                                 ║
║    Url: http://${MAIN}:${PORT}/                                 ║
║════════════════════════════════════════════════════════════════════║
║    Protected: CSS & JS files                                       ║
+════════════════════════════════════════════════════════════════════+
    `);
    } catch (error) {
        console.error("Error start the server", error.message)
    };
});
