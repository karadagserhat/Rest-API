const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/restful_api', {useFindAndModify:false,useCreateIndex: true ,useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => console.log("Veritabanına bağlandı"))
    .catch(hata => console.log("db bağlantı hatası"))


