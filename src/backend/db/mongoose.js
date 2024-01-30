const mongoose = require( "mongoose" );
// mongodb+srv://sushmadeegoju98:<password>@easyhire.kgdvab8.mongodb.net/

mongoose.connect("mongodb+srv://sushmadeegoju98:Sushm%4019981981@easyhire.kgdvab8.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true, // Add this option to use the new Server Discover and Monitoring engine
});