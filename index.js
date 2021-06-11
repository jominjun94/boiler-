const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser'); // npm 다운로드  바디로 받아주기 위해
const { User } = require("./models/User");  // 만들어놓은 user를 가져올게요

const config = require('./config/key')

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());


const mongoose = require('mongoose') // 몽고db 연결
mongoose.connect(config.mongoURI,{
    useNewUrlParser:true , useUnifiedTopology: true , useCreateIndex: true, useFindAndModify: false
}).then(() =>console.log('MongoDB Connected...'))
.catch(err => console.log(err))





app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post('/register',(req,res)=>{
    // 회원가입할때 필요한 정보를 클라이언트에서 가져오면
    // db에 넣어준다




    const user = new User(req.body) // body parser 로 값을 json으로 받아오면 받는값 
    user.save((err, userInfo)=>{
        if(err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    })

})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})