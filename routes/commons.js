const router = require("express").Router();
const config = require("config");
const Products = require("../models/products.model");


router.post("/create", async (req, res) => {
  try{
    const prod = new Products(req.body)
    await prod.save()
    res.status(200).json("success")
  }
  catch(err){
    console.log("create: ",err);
    res.status(400).send("error");
  }

});
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
    await Products.findByIdAndDelete(id,(err)=>{
      if(err){
        console.log("delete: ",err);
        res.status(400).send("error"); 
      }
      else {
        res.status(200).send("success"); 
      }
    })

});
router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
    await Products.findByIdAndUpdate(id,req.body,(err)=>{
      if(err){
        console.log("update: ",err);
        res.status(400).send("error"); 
      }
      else {
        res.status(200).send("success"); 
      }
    })
});
router.get("/find/:name", async (req, res) => {
  let reg;
  if(req.params.name)
    reg = new RegExp(`^${req.params.name}`, "i")
  else reg = new RegExp(".*")
  Products.find({ name: {$regex: reg} }, function (err, pdts) {
    if(err){
      console.log("find: ",err);
      res.status(400).send("error"); 
    }
    console.log(pdts);
    res.json(pdts);
  });
})
router.get("/find", async (req, res) => {
  Products.find({}, function (err, pdts) {
    if(err){
      console.log("find: ",err);
      res.status(400).send("error"); 
    }
    console.log(pdts);
    res.json(pdts);
  });
})
module.exports = router;
