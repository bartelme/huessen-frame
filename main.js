const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()
const port = 8080

currentAction = 2

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

//log requests
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} request to: ${req.url}`);
    next(); // Pass control to the next middleware
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//init
app.post('/xiaowooya/api/v1/dev/frame/init', (req, res) => {
  console.log("requested init")
  console.log(req.body)
  res.json({
    "code": "success",
    "message": "897ee8bf283e4176a365c90d179b714d35f650@E133251300143"
  });
})

//I think frame always requesting periodic status, 0 means no-op 2 would drive to playlist/detail request 3 to setting detail request.  After these requests a action_status requests is sent.
app.post('/xiaowooya/api/v1/callback/action_status', (req, res) => {
  console.log("requested action status")
  console.log(req.body)
  res.json({
    "code": "success",
    "message": "action code updated succefully."
  });
})


app.post('/static/ref/ref_index.json', (req, res) => {
  console.log("requested ref index")
  console.log(req.body)
  res.json({
    "manualVersion": "1.0.03",
    "manual_1": "http://us.xiaowooya.eframe.sungale.com.cn/static/ref/manual_1.bmp",
    "manual_2": "http://us.xiaowooya.eframe.sungale.com.cn/static/ref/manual_2.bmp",
    "creatDate": "2026-03-20"
  });
})

//status
app.post('/xiaowooya/api/v1/dev/frame/status', (req, res) => {
  console.log("requested status sending action "+currentAction)
  console.log(req.body)
  res.json({
    "lastUpdate": Date.now().toString(),
    //action 0 if different image to display will change picture.  If picture cdhagnes will call action status
    //action 2 force request to playlist/detail which then adds or removes an image based on the new list.
    //action 3 detail status?
    "action": currentAction,
    "firstImageToDisplay": 0,
    //Apparently all add up to final time.  But not to exceed 48 hours 172000 in each entry
    "wakeUpSchedule": [172800, 172800, 172800, 0]
  });
  currentAction = 0
})

app.post('/xiaowooya/api/v1/dev/setting/detail', (req, res) => {
  console.log("requested detail")
  console.log(req.body)
  res.json({
    "id": 1249,
    "slideShowInterval": "60",
    "wakeUpInterval": "3600",
    "firmware": "2.0.26",
    "batteryPercentage": 0.0,
    "rssi": 0,
    "slideShowSwitch": 0,
    "frame": null,
    "timeZone": "America/New_York",
    "wakeupScheduleTime": "00:00",
    "timingType": 1,
    "displayOrientation": 1
  });
})

app.post('/xiaowooya/api/v1/dev/playlist/detail', (req, res) => {
  console.log("requested playlist")
  console.log(req.body)
  const files = fs.readdirSync('./images/')
  list = []
  files.forEach(file => {
    console.log("listing" + file);
    //file name must be 20 characters long
    list.push({
      'id': Number(file.split('.')[0]),
      //id: 1,
      'name':file,
      'createDate': fs.statSync('./images/'+file).birthtime.toISOString().replace(/T/,' ').replace(/\..+/, ''),
      'path': "http://us.xiaowooya.eframe.sungale.com.cn:8080/images/"+file,
      'thumbPath': "http://us.xiaowooya.eframe.sungale.com.cn:8080/images/"+file
    })
  })

  res.json({
    "list": list
  })
})

app.use('/images/', express.static('images'))
app.use('/static/ref/manuals/', express.static('manuals'))

app.use((req, res, next) => {
  console.log('Unknown Request:', {
    method: req.method,
    url: req.originalUrl,
    headers: req.headers,
    query: req.query,
    body: req.body
  });
  res.status(404).send('Unknown route');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

fs.watch('./images/', (eventType, filename) => {
  if (filename && eventType == 'rename') {
    console.log(`${filename} was added or removed`);
    currentAction = 2
  }
});

