
function getRandomTemp() {
    return Math.floor(Math.random() * (40 - 30 + 1)) + 30;
}

function getRandomSensor() {
    return Math.floor(Math.random() * 3) + 1;
}
function tempCheck(temp){
    if(temp > 38)
        return true
    else return false
}

function docGenerator(sensor, temp){
    switch(sensor){
        case 1: 
         const doc1 = {
            nomeSensor: "Sensor1",
            valorSensor: temp,
            unidadeMedida: "C",
            sensorAlarmado: tempCheck(temp),
        }
        return doc1;
        case 2:
            const doc2 = {
                nomeSensor: "Sensor2",
                valorSensor: temp,
                unidadeMedida: "C",
                sensorAlarmado: tempCheck(temp),
            }
            return doc2
        case 3:
        const doc3 = {
            nomeSensor: "Sensor3",
            valorSensor: temp,
            unidadeMedida: "C",
            sensorAlarmado: tempCheck(temp),
        }
        return doc3
    }
}


// setInterval(() => {
//     const sensor = getRandomSensor();
//     const temp = getRandomTemp();
//     const doc = docGenerator(sensor,temp);
//     insertDoc(doc)

// }, 2000)

// async function insertDoc(doc) {
//     try {
//         const database = client.db("bancoiot");
//         const sensors = database.collection("sensores");
//         const result = await sensors.insertOne(doc);

//         console.log(`A document was inserted with the _id: ${result.insertedId}` + doc.nomeSensor + doc.valorSensor + doc.unidadeMedida + doc.sensorAlarmado);
//       }catch (error){
//         console.error("Erro ao inserir temperatura: " + error)
//       }
//     }

export {
    getRandomSensor,
    getRandomTemp,
    tempCheck,
    docGenerator
};