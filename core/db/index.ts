//database connection, it's a self executing function, so whereever this file is required, it will executes..
import mongoose from 'mongoose'

mongoose.Promise = Promise

mongoose.connection.on('connected', () => {
    console.log('********Connection Established********')
})

mongoose.connection.on('reconnected', () => {
    console.log('********Connection Reestablished********')
})

mongoose.connection.on('disconnected', () => {
    console.log('********Connection Disconnected********')
})

mongoose.connection.on('close', () => {
    console.log('********Connection Closed********')
})

mongoose.connection.on('error', (error) => {
    console.log('Connection ERROR: ' + error)
})

export const connect = async () => {
    await mongoose.connect( `${process.env.DB_URL}`,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    mongoose.set('useFindAndModify', false);

}

connect().catch(error => console.error(error));

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        process.exit(0);
    });
});