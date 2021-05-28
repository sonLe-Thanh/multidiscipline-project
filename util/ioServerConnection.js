const activeKey = "aio_pukx68auKHJQ4lcYiWUy8pTKd5F012";
const apiHeader = "https://io.adafruit.com/api/v2/";
//Specificly send data to magnetic switch only
function sendDataToFeed(topic, deviceID, deviceName, sendData, unit) {
    url = apiHeader + topic+ "/data";
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "X-AIO-Key": activeKey,
        },
        body: JSON.stringify({
            "id":deviceID.toString(),
            "name": deviceName,
            "data":sendData.toString(),
            "unit":unit
        }).then((response)=>response.json())
        .then((json)=>{
            console.log("Sent data to topic "+topic+" with value: "+sendData);
            console.log("Result: ",json);
        })
        .catch((error)=>{
            console.error(error)
        })
    })
}

async function receivedDataFromFeed(topic, mode) {
    url = apiHeader+topic+"/data/"+mode;
    var data, unit;
    fetch(url, {
        method: "GET",
        headers: {
            "X-AIO-Key": activeKey,
        }
    }).then((response)=>response.json())
    .then((json)=>{
        // console.log("Lasted info on topic "+topic+":",json);
        // console.log(json.value);
        var receivedObj = JSON.parse(json.value)
        // console.log(receivedObj)
        data = receivedObj.data;
        unit = receivedObj.unit;
        console.log("Extracted data: " +data + unit)
    })
    return await [data, unit];
}

export {sendDataToFeed, receivedDataFromFeed}