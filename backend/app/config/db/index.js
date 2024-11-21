const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/BaoCao');
        console.log('ket noi thanh cong');
    } catch (error) {
        console.log('Contact fail!!!')
    };
}

module.exports = { connect };