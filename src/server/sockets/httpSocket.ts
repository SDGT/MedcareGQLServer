
export class socketService{

    gethttpSocket(app, port){
        let http = require('http').Server(app);
        let io = require('socket.io')(http);
        var Kafka = require('no-kafka');
        let socket_port = port;

        io.on('connection', (socket) => {
            console.log('USER CONNECTED');

            socket.on('disconnect', function(){
                console.log('USER DISCONNECTED');
            });

        });

        http.listen(socket_port, () => {
            console.log('started on port ' + socket_port);
            var consumer = new Kafka.SimpleConsumer({
                connectionString: 'localhost:9092',
                clientId: 'no-kafka-client'
            }); 

        // data handler function can return a Promise 
            var dataHandler = function (messageSet, topic, partition) {
                messageSet.forEach(function (m) {
                    console.log(topic, partition, m.offset, m.message.value.toString('utf8'));
                    var queues = { "queues": m.message.value.toString('utf8') };
                    if(topic == "MEDCARE_QMS")
                    {
                        io.emit('encounterToken', { "data": queues });
                    }
                    else
                    {
                        io.emit('message', { "data": queues });
                    }
                });
            };
            var dataNotificationHandler = function (messageSet, topic, partition) {
                messageSet.forEach(function (m) {
                    var queues = { "queues": m.message.value.toString('utf8') };
                    if(topic == "NOTIFICATION") {
                        io.emit('NOTIFICATION', { "data": queues });
                    } else if (topic == "PUSH_NOTIFICATION") {
                        io.emit('PUSH_NOTIFICATION', { "data": queues });
                    }
                });
            };
            return consumer.init().then(function () {
                // Subscribe partitons 0 and 1 in a topic: 
                var v1= consumer.subscribe('MEDCARE_QMS', dataHandler);
                var v2= consumer.subscribe('NOTIFICATION', dataNotificationHandler);
                var v3= consumer.subscribe('PUSH_NOTIFICATION', dataNotificationHandler);
                //var v2= consumer.subscribe('MEDCARE_QMS', [0, 1], dataHandler);
                var arr=[];
                arr.push([v1, v2, v3]);
                //arr.push([v1,v2]);
                console.log("val:"+arr);
                return arr;
                
            });
        });
    }
    
}
