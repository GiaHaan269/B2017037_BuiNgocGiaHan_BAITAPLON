const express = require('express');

// Import các router
const docgiaRouter = require('./docgia');
const nhanvienRouter = require('./nhanvien');
const nhaxuatbanRouter = require('./nhaxuatban');
const sachRouter = require('./sach');
const theodoimuonsachRouter = require('./theodoimuonsach');

function route(app) {
    // Định nghĩa các route cho từng tài nguyên
    app.use('/api/docgia', docgiaRouter);
    app.use('/api/nhanvien', nhanvienRouter);
    app.use('/api/nhaxuatban', nhaxuatbanRouter);
    app.use('/api/sach', sachRouter);
    app.use('/api/theodoimuonsach', theodoimuonsachRouter);

    // Định nghĩa route mặc định
    app.get('/', (req, res) => {
        res.send('Chào mừng bạn đến với API quản lý thư viện!');
    });
}

module.exports = route;