const hataYakalayici = (err, req, res, next) => {
    
    if(err.code === 11000) {
        return res.json({
            mesaj: Object.keys(err.keyValue) + " için girdiğiniz " + Object.values(err.keyValue) + " daha önce veritabanında olduğu için tekrar  eklenemez/güncellenemez, unique olmalıdır",
            hataKodu: 400
        })
    }
    if(err.code === 66) {
        return res.json({
            mesaj: "Değişirilemez bir alanı güncellemeye çalıştınız",
            hataKodu: 400
        })
    }

    res.status(err.statusCode || 500)
    res.json({
        hataKodu: err.statusCode || 500,
        mesaj: err.message
    })
   
}

module.exports = hataYakalayici