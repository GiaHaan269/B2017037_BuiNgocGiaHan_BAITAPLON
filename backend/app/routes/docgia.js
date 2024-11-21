const express = require('express');
const Docgia = require('../models/Docgia');
const router = express.Router();

// Create new Docgia
router.post('/add', (req, res) => {
    const newDocgia = new Docgia(req.body);
    newDocgia.save()
        .then(docgia => res.json(docgia))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/delete/:id', (req, res) => {
    const maDocGia = req.params.id; // Lấy MaDocGia từ tham số URL

    // Tìm và xóa độc giả theo MaDocGia
    Docgia.findOneAndDelete({ MaDocGia: maDocGia })
        .then(() => {
            res.json({ message: 'Độc giả đã bị xóa thành công!' });
        })
        .catch(err => {
            res.status(400).json('Error: ' + err);
        });
});

// Get all Docgia
router.get('/', (req, res) => {
    Docgia.find()
        .then(docgia => res.json(docgia))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;