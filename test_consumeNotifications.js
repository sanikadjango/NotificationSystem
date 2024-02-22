//consume all notifications from queue

const axios = require("axios");

let url = `http://localhost:3000/get-notification`;

axios.get(url)
.then(resp=>{
  console.log(resp)
})

