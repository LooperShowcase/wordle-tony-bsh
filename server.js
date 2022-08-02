const express = require("express");

const server = express();
const port = process.env.PORT || 3000
const theanswer = "quest";
server.get("/guess/:name", (request, response) => {
  const userword = request.params.name;
  let answer = [];
  for (let i = 0; i < userword.length; i++) {
    const ch = userword[i];
    if (ch == theanswer[i]) {
      answer.push(1);
    } else if (theanswer.includes(ch)) {
      answer.push(0);
    } else {
      answer.push(-1);
    }
  }
  response.json(answer);
});

server.use(express.static("public"));

server.listen(port, () => {
  console.log("server is running on port 3000");
});
