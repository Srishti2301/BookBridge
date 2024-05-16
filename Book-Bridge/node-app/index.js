
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})
const upload = multer({ storage: storage })
const bodyParser = require('body-parser')
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 4000;
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/') // Connect to mydatabase

const Users = mongoose.model('User', { username: String , password: String });
const Books = mongoose.model('Books', { bname: String , bdesc: String ,price:String,category:String, bimage:String });
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/add-books',upload.single('uploads'),(req,res)=>{
  console.log(req.body);
  console.log(req.files);
  const bname = req.body.bname;
  const bdesc = req.body.bdesc;
  const price = req.body.price;
  const category = req.body.category;
  const bimage = req.files;
  const books = new Books({ bname,bdesc,price,category,bimage });
  books.save()
  .then(() => {
    res.send({ message:'saved success'})
  })
  .catch(()=>{
    res.send({message :'server '})

  })
  
});

app.post('/signup', (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  const user = new Users({ username: username, password: password });
  user.save()
  .then(() => {
    res.send({ message:'saved success'})
  })
  .catch(()=>{
    res.send({message :'server '})

  })
});

app.post('/login', (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  
  Users.findOne({username : username})
  .then((result) => {
    console.log(result ,"user data")
    if(!result){
        res.send({message: 'user not found.'})
    }else{

      if(result.password == password){
        const token =jwt.sign({
          data: result
        }, 'MYKEY', { expiresIn: '1h' });
        res.send({message: 'find success.', token: token})
      }
      if(result.password != password){
        res.send({ message:'password wrong'})

      }
      
    }
    
  })
  .catch(()=>{
    res.send({message :'server '})

  })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});