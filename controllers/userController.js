const User = require('../models/userModel')
const createError = require('http-errors')
const bcrypt = require('bcrypt')

const tumUserlariListele = async (req, res) => {
    const tumUserlar = await User.find({})
    res.json(tumUserlar)
}

const oturumAcanKullaniciBilgileri = (req, res) => {
    res.json(req.user)
}

const oturumAcanKullaniciGuncelleme = async (req, res) => {
    delete req.body.createdAt
    delete req.body.updatedAt

    if (req.body.hasOwnProperty('sifre')) {
        req.body.sifre = await bcrypt.hash(req.body.sifre, 8)
    }

    const { error, value } = User.joiValidationForUpdate(req.body)
    if (error) {
        next(createError(400, error))
    } else {
        try {
            const sonuc = await User.findByIdAndUpdate({ _id: req.user._id }, req.body, { new: true, runValidators: true })
            if (sonuc) {
                return res.json(sonuc)
            } else {
                return res.status(404).json({
                    mesaj: "Kullanıcı bulunamadı"
                })
            }
        } catch (err) {
            next(err)
        }
    }

}

const yeniUserOlustur = async (req, res, next) => {
    try {
        const eklenecekUser = new User(req.body)
        eklenecekUser.sifre = await bcrypt.hash(eklenecekUser.sifre, 8)
        const { error, value } = eklenecekUser.joiValidation(req.body)
        if (error) {
            next(createError(400, error))
        } else {
            const sonuc = await eklenecekUser.save()
            res.json(sonuc)
        }

    } catch (err) {
        next(err)
    }
}

const girisYap = async (req, res, next) => {
    try {
        const user = await User.girisYap(req.body.email, req.body.sifre)
        const token = await user.generateToken()
        res.json({
            user,
            token
        })
    } catch (err) {
        next(err)
    }
}

const adminUserGuncelleme = async (req, res, next) => {
    delete req.body.createdAt
    delete req.body.updatedAt

    if (req.body.hasOwnProperty('sifre')) {
        req.body.sifre = await bcrypt.hash(req.body.sifre, 8)
    }

    const { error, value } = User.joiValidationForUpdate(req.body)
    if (error) {
        next(createError(400, error))
    } else {
        try {
            const sonuc = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            if (sonuc) {
                return res.json(sonuc)
            } else {
                return res.status(404).json({
                    mesaj: "Kullanıcı bulunamadı"
                })
            }
        } catch (err) {
            next(err)
        }
    }


}

const tumKullanicilariSil = async (req, res, next) => {
    try {
        const sonuc = await User.deleteMany({ isAdmin: false })
        if (sonuc) {
            return res.json({
                mesaj: "Tüm kullanıcılar silindi"
            })
        } else {
            // const hataNesnesi = new Error('Kullanıcı bulunamadı')
            // hataNesnesi.hataKodu = 404
            throw createError(404, 'Kullanıcı bulunamadı')
            // return res.status(404).json({
            //     mesaj: "Kullanıcı bulunamadı"
            // })
        }
    } catch (err) {
        next(createError(400, err))
    }

}

const kullaniciKendiniSil = async (req, res, next) => {
    try {
        const sonuc = await User.findByIdAndRemove({ _id: req.user._id })
        if (sonuc) {
            return res.json({
                mesaj: "Kullanıcı silindi"
            })
        } else {
            // const hataNesnesi = new Error('Kullanıcı bulunamadı')
            // hataNesnesi.hataKodu = 404
            throw createError(404, 'Kullanıcı bulunamadı')
            // return res.status(404).json({
            //     mesaj: "Kullanıcı bulunamadı"
            // })
        }
    } catch (err) {
        next(createError(400, err))
    }

}

const yoneticiKullaniciSil = async (req, res, next) => {
    try {
        const sonuc = await User.findByIdAndRemove({ _id: req.params.id })
        if (sonuc) {
            return res.json({
                mesaj: "Kullanıcı silindi"
            })
        } else {
            // const hataNesnesi = new Error('Kullanıcı bulunamadı')
            // hataNesnesi.hataKodu = 404
            throw createError(404, 'Kullanıcı bulunamadı')
            // return res.status(404).json({
            //     mesaj: "Kullanıcı bulunamadı"
            // })
        }
    } catch (err) {
        next(createError(400, err))
    }

}

module.exports = {
    tumUserlariListele,
    oturumAcanKullaniciBilgileri,
    oturumAcanKullaniciGuncelleme,
    yeniUserOlustur,
    girisYap,
    adminUserGuncelleme,
    tumKullanicilariSil,
    kullaniciKendiniSil,
    yoneticiKullaniciSil
}