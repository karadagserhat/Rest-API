const router = require('express').Router()

const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')
const userController = require('../controllers/userController')


//tüm kullanıcıları sadece admin listeleyebilir
router.get('/', [authMiddleware, adminMiddleware], userController.tumUserlariListele)

//oturum açaan user bilgilerini listeler
router.get('/me', authMiddleware, userController.oturumAcanKullaniciBilgileri)

//oturum açaan user güncelleme işlemleri
router.patch('/me', authMiddleware, userController.oturumAcanKullaniciGuncelleme)


router.post('/', userController.yeniUserOlustur)

router.post('/giris', userController.girisYap)

router.patch('/:id', userController.adminUserGuncelleme)

router.get('/deleteAll', [authMiddleware, adminMiddleware], userController.tumKullanicilariSil)

router.delete('/me', authMiddleware, userController.kullaniciKendiniSil)



router.delete('/:id', [authMiddleware, adminMiddleware], userController.yoneticiKullaniciSil)


module.exports = router