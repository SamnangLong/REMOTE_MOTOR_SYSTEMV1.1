var connection_status= false;


setTimeout(function() {
    ConnectToMQTT();
  }, 2000);
function ConnectToMQTT(){
    // Generate a random number for the client ID
    const randomClientNumber = Math.floor(Math.random() * 1000) + 1;
    const clientID = 'MOTOR 3PHASE' + randomClientNumber;
          host = 'blithesome-chiropractor.cloudmqtt.com';
          port = 443;

    // Create a client instance
    // client = new Paho.MQTT.Client('e8f424ec.emqx.cloud', 8083, "test");
    client = new Paho.MQTT.Client(host, Number(port), clientID);

    // set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // connect the client
    client.connect({
      onSuccess: onConnect,
      // onFailure: onFailure,
      useSSL: true,

      userName: 'rwufzabs',
      password: 'kVZNw5Tuj6e5',
      mqttVersion:4
  });
}


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  connection_status = true ;
  // alert("Connect to server is success.");
  setTimeout(() => {
    console.log('Connection successful!');
  }, 2000);

  const subTopic1 = 'controller1_data1';
  const subTopic2 = 'controller1_con_status_speed';
  const subTopic3 = 'status lamp';
  const subTopic4 = 'ALLARM';
  qos = 0;
  client.subscribe(subTopic1);
  client.subscribe(subTopic2);
  client.subscribe(subTopic3);
  client.subscribe(subTopic4);
}

// FUNCTION FOR PUBLISH DATA INTO TOPIC
function publishToMQTT(value) {
  client.send('controller1_con_pub1', value);
}
  
// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+ responseObject.errorMessage);
    alert("MQTT Connection Lost");
  }
}



// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
    
  const values = message.payloadString.split(',');

  // Display Data
  if (values[0]=='data1'&&values[1]=='c1'){
    document.getElementById('box_frquency').value = values[2] || '';
    document.getElementById('box_voltage').value = values[3] || '';
    document.getElementById('box_current').value = values[4] || '';
  }

  // if (values[0]=='L1'&&values[1]=='10L2'){
  //   document.getElementById('checkbox')= checked;
  // }

  // if (values[1]=='10L2' || values[1]=='0L2' && values[2]=='10'){
  //   document.getElementById('checkbox1')= checked;
  // }
  
  // else{
  //   document.getElementById('checkbox')= Unchecked;
  //   document.getElementById('checkbox1')= Unchecked;    
  // }
}
    