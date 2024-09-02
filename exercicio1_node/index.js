import { MongoClient } from "mongodb";
import {
  getRandomSensor,
  getRandomTemp,
  tempCheck,
  docGenerator,
} from "./sensors.js";

const uri = "mongodb://localhost:27017/";

const client = new MongoClient(uri);

const blancDoc = [
  {
    nomeSensor: "Sensor1",
    valorSensor: 0,
    unidadeMedida: "C",
    sensorAlarmado: false,
  },
  {
    nomeSensor: "Sensor2",
    valorSensor: 0,
    unidadeMedida: "C",
    sensorAlarmado: false,
  },
  {
    nomeSensor: "Sensor3",
    valorSensor: 0,
    unidadeMedida: "C",
    sensorAlarmado: false,
  },
];

async function update(doc, client) {
  console.log("Sensor: " + doc.nomeSensor + " temperatura: " + doc.valorSensor)
  if(doc.valorSensor > 38){
    console.log("Temperatura muito alta!")
    doc.sensorAlarmado = true
  }
   await client.updateOne(
    { nomeSensor: doc.nomeSensor },
    { $set: doc }
  );
}



async function run() {
  try {
    await client.connect();
    const database = client.db("bancoiot");
    const sensores = database.collection("sensores");
    blancDoc.forEach(async doc => await sensores.insertOne(doc))
    setInterval(async () => {
      const sensor = getRandomSensor();
      const temp = getRandomTemp();
      const doc = docGenerator(sensor, temp);
      const result = await update(doc, sensores);
    }, 2000);
  } catch(error) {
    console.error(error)
  }
}
run().catch(console.dir);
