
const express = require('express')
const bodyParser = require("body-parser")
 const request = require('request')
const https = require("https")
require("dotenv").config()

var list= process.env.List_key

const port = process.env.PORT || 3000

const app = express()

app.use(express.static("public"))
 app.use(bodyParser.urlencoded({extended:true}));


  
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")

  
//   res.send("up")
});

  app.post("/", function(req, res){ 
    var firstname = (req.body.firstName)
    var lastname = (req.body.lastName)
    var phone = (req.body.Phone)
    var email = (req.body.email)
    
    // var address = (req.body.Address)
    // var phone = (req.body.Phone)
     // var birthday = (req.body.Birthday)
    // res.send(firstname+" "+lastname+" "+email)
  
    if(res.statusCode === 200){
        res.sendFile(__dirname + "/successPage.html")
    } else{
            res.sendFile(__dirname + "/errorPage.html")
            // res.send("try again")
        }      
        app.post("/errorPage.html" ,function (req, res) {
            res.redirect("/")
           })
   
    const data ={
      members:[
         {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME:firstname,
            LNAME:lastname,
            // ADDRESS: address,
             PHONE:phone
            // BIRTHDAY:birthday
          
          }
         }
      ]
      
    }
    
    const jsonData = JSON.stringify(data);
      const url ="https://us21.api.mailchimp.com/3.0/lists/"+list+" "

      const options={
        method: "POST",
        auth:process.env.API_key
       
      }

     
    const request = https.request(url, options, function(response) {
        response.on("data", function(data) {
           console.log(JSON.parse(data))
                  
        })
      }) 
       request.write(jsonData) 
    request.end()


    
   
 })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})