const express = require("express");

const router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var url =
  "mongodb+srv://laosoft_fixed:ergWFADmivyb11i5@cluster0.n9dhd.mongodb.net/test?authSource=admin&replicaSet=atlas-cca7ke-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

router.post("/Login", async (req, res, next) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("fixed_db");
    var query = { cust_code: req.body.cust_code };
  //  var query1 = { password: req.body.password};
    //var query = { address: "Park Lane 38" };
    dbo
      .collection("customers")
      .find(query)
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        if (result) {
          // res.send(result[0].password);
          //res.send(req.body.password.msg);

          if (req.body.password === result[0].password) {
            res.status(201).json({
              code: "`done",
              message: "ເຂົາສູ້ລະບົບສຳເລັດ ",
            });
            // var zz = {code : 1, msg: "ເຂົາສູ້ລະບົບສຳເລັດ"};
          } else {
           res.status(400).json({
            code: "error",
            message:"ລະຫັດຜ່ານບໍຖືກ"
           });
          }
        } else {
          console.log(err);
          res.state(500).json({
            code: "error",
            message: "ບໍມີຊື່ໃນລະບົບ ",
          });

          // var err = {code : -1, msg : "ບໍມີຊື່ໃນລະບົບ"};
          // res.send(err);
        }

        db.close();
      });
  });

  // const member = {
  //     cust_code: req.body.cust_code,
  //     customer_name: req.body.customer_name,
  //     tel: req.body.tel,
  //     password: req.body.password,
  //     prov_id: req.body.prov_id,
  //     address: req.body.address,
  //     photo: req.body.photo,
  //   };
  //    cust_code.equal(null, err);
  // MongoClient.connect(url, function (err, db) {
  //     if (err) throw err;
  //     var dbo = db.db("fixed_db");
  //    var query = {};
  //    var collection = dbo.collection("customers");
  //    collection.insert(member);
  //   });
});
//@desc Adding new user
//@route POST /adduser
router.post("/adduser", async (req, res, next) => {
  const test = {
    cust_code: req.body.cust_code,
    customer_name: req.body.customer_name,
    tel: req.body.tel,
    password: req.body.password,
    prov_id: req.body.prov_id,
    address: req.body.address,
    photo: req.body.photo,
  };

  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log(err);
      res.state(500).json;
      error: err;
    } else {
      res.status(201).json({
        message: "User creates successfult ..!.. ",
      });
    }
    var dbo = db.db("fixed_db");
    var query = {};
    var collection = dbo.collection("customers");
    collection.insert(test);
  });
});
//@desc Get info on a user
//@route GET /getinfo
router.get("/getinfo",async (req, res, next) =>{
  var dbo = db.db("fixed_db");
  dbo.collection("customers").find({}, {'password': true}).toArray(function(err, results) {
    console.dir(results);
});
});



module.exports = router;
