const express = require("express");
var otpGenerator = require("otp-generator");
const userSchema = require("./Schema");

const routes = express.Router();

routes.post("/generateOtp", async (req, res) => {
  const otp = await otpGenerator.generate(6, {
    upperCase: false,
    digits: true,
    alphabets: false,
    specialChars: false,
  });

  const datas = await userSchema.findOne({ email: req.body.email }).exec();
  if (datas) {
    console.log("already there");
    const doc = {
      code: otp,
    };
    await userSchema
      .findByIdAndUpdate(datas._id, doc, { new: true })
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        res.send(err);
      });
  } else {
    console.log("already not there");

    const data = new userSchema({
      email: req.body.email,
      code: otp,
    });
    await data
      .save()
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        res.send(err);
      });
  }
});

routes.post("/checkOtp", async (req, res) => {
  const data = await userSchema.findOne({
    $or: [
      {
        email: req.body.email,
        code: req.body.code,
      },
    ],
  });
  if (data) {
    console.log("response");
    res.send(data);
  } else {
    console.log("error.....");
    res.send("error");
  }
});

module.exports = routes;
