var express = require("express"),
  path = require("path"),
  nodeMailer = require("nodemailer"),
  bodyParser = require("body-parser");

var app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = 8080;
// set the view engine to ejs

// use res.render to load up an ejs view file

// index page
app.get("/", function (req, res) {
  res.render("pages/index");
});

// about page
app.get("/about", function (req, res) {
  res.render("pages/about");
});

app.get("/contact", function (req, res) {
  res.render("pages/contact");
});

app.post("/send-email", function (req, res) {
  let transporter = nodeMailer.createTransport({
    host: "murad.orujov007@gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "murad.orujov007@gmail.com",
      pass: "RWMa5Qyf",
    },
  });
  let mailOptions = {
    from: '"Murad Orucov" <murad.orujov007@gmail.com>', // sender address
    to: req.body.to, // list of receivers
    subject: req.body.subject, // Subject line
    text: req.body.body, // plain text body
    html: "<b>NodeJS Email Tutorial</b>", // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message %s sent: %s", info.messageId, info.response);
    res.render("index");
  });
});
app.listen(port, function () {
  console.log("Server is running at port: ", port);
});
