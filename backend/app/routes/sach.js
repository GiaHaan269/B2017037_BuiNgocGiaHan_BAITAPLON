const express = require('express');
const Sach = require('../models/Sach');
const router = express.Router();

// Thêm mới một sách
router.post('/add', (req, res) => {
    const newSach = new Sach(req.body);
    newSach.save()
        .then(sach => res.json(sach))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Lấy tất cả sách
router.get('/', (req, res) => {
    Sach.find()
        .then(sach => res.json(sach))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Lấy một sách theo mã sách
router.get('/:id', (req, res) => {
    Sach.findById(req.params.id)
        .then(sach => res.json(sach))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Cập nhật thông tin sách
router.put('/:id', (req, res) => {
    Sach.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(sach => res.json(sach))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Xóa một sách
router.delete('/:id', (req, res) => {
    Sach.findByIdAndDelete(req.params.id)
        .then(() => res.json('Sách đã được xóa'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;