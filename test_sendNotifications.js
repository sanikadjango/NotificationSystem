const axios = require("axios");

let url = `http://localhost:3000/send-notification`;

let counter=1;

const sendOneReqPerSecond = setInterval(async ()=>{
  let resp = await axios.post(url, {
    msg:"ping pong "+counter
  })
  console.log(resp)
  counter+=1;
},1000);

//clear the interval after approx 1 min
setTimeout(()=>{
clearInterval(sendOneReqPerSecond)
},31000)

