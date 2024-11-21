<template>
    <HeaderView />

    <div class="home-view container">
        <div class="sections row">
            <!-- Hiển thị thông báo nếu không có sách -->
            <div v-if="books.length === 0" class="col-12">
                <p>Không có sách nào.</p>
            </div>

            <!-- Nút thêm sách mới -->
            <div class="col-12">
                <button class="btn btn-primary mb-3" @click="showAddForm = !showAddForm">
                    Thêm Sách Mới
                </button>
            </div>

            <!-- Form thêm sách mới -->
            <div v-if="showAddForm" class="col-12">
                <form method="POST" @submit.prevent="addBook">
                    <div class="mb-3">
                        <label for="title" class="form-label">Mã Sách</label>
                        <input v-model="newBook.MaSach" type="text" class="form-control" id="title" required>
                    </div>
                    <div class="mb-3">
                        <label for="title" class="form-label">Tên Sách</label>
                        <input v-model="newBook.TenSach" type="text" class="form-control" id="title" required>
                    </div>
                    <div class="mb-3">
                        <label for="author" class="form-label">Tác Giả</label>
                        <input v-model="newBook.TacGia" type="text" class="form-control" id="author" required>
                    </div>
                    <div class="mb-3">
                        <label for="price" class="form-label">Đơn Giá</label>
                        <input v-model="newBook.DonGia" type="number" class="form-control" id="price" required>
                    </div>
                    <div class="mb-3">
                        <label for="year" class="form-label">Năm Xuất Bản</label>
                        <input v-model="newBook.NamXuatBan" type="number" class="form-control" id="year" required>
                    </div>
                    <div class="mb-3">
                        <label for="quantity" class="form-label">Số Quyển</label>
                        <input v-model="newBook.SoQuyen" type="number" class="form-control" id="quantity" required>
                    </div>
                    <div class="mb-3">
                        <label for="publisher" class="form-label">Mã Nhà Xuất Bản</label>
                        <input v-model="newBook.MaNXB" type="text" class="form-control" id="publisher" required>
                    </div>
                    <button type="submit" class="btn btn-success">Thêm Sách</button>
                    <button type="button" class="btn btn-secondary ml-2" @click="showAddForm = false">Hủy</button>
                </form>
            </div>

            <!-- Bảng danh sách sách -->
            <table class="table table-striped mt-4" v-if="books.length > 0">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên Sách</th>
                        <th>Tác Giả</th>
                        <th>Đơn Giá</th>
                        <th>Năm Xuất Bản</th>
                        <th>Số Quyển</th>
                        <th>Nhà Xuất Bản</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(book, index) in books" :key="book.MaSach">
                        <th>{{ index + 1 }}</th>
                        <td>{{ book.TenSach }}</td>
                        <td>{{ book.TacGia }}</td>
                        <td>{{ formatPrice(book.DonGia) }}</td>
                        <td>{{ book.NamXuatBan }}</td>
                        <td>{{ book.SoQuyen }}</td>
                        <td>{{ getPublisherName(book.MaNXB) }}</td>
                        <td>
                            <button class="btn btn-danger" @click="deleteBook(book._id)">Xóa</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <FooterView />
</template>

<script>
import axios from 'axios';
import HeaderView from '../components/HeaderView.vue';
import FooterView from '../components/FooterView.vue';

export default {
    components: {
        HeaderView,
        FooterView
    },
    data() {
        return {
            books: [],  // Dữ liệu sách
            publishers: [],  // Dữ liệu nhà xuất bản
            showAddForm: false,  // Hiển thị form thêm sách
            showAddPublisherForm: false,  // Hiển thị form thêm nhà xuất bản (missing property)
            newBook: {  // Dữ liệu sách mới
                MaSach: '',  // Mã sách, sẽ tự động tạo nếu không có
                TenSach: '',
                TacGia: '',
                DonGia: '',
                SoQuyen: '',
                NamXuatBan: '',
                MaNXB: ''
            },
        };
    },
    methods: {
        // Định dạng giá tiền
        formatPrice(price) {
            return price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
        },

        // Lấy tên nhà xuất bản theo mã
        getPublisherName(maNXB) {
            const publisher = this.publishers.find(p => p.MaNXB === maNXB);
            return publisher?.TenNXB || 'Không tìm thấy';
        },

        // Xóa dữ liệu form
        clearForm() {
            console.log("Clearing form...");
            this.newBook = {
                MaSach: '',
                TenSach: '',
                TacGia: '',
                DonGia: '',
                SoQuyen: '',
                NamXuatBan: '',
                MaNXB: ''
            };
        },

        // Kiểm tra dữ liệu sách
        validateBookData() {
            const { MaSach, TenSach, TacGia, DonGia, SoQuyen, NamXuatBan, MaNXB } = this.newBook;
            if (!MaSach || !TenSach || !TacGia || !DonGia || !SoQuyen || !NamXuatBan || !MaNXB) {
                window.alert("Vui lòng nhập đầy đủ thông tin.");
                return false;
            }
            if (DonGia <= 0 || SoQuyen <= 0 || NamXuatBan <= 0) {
                window.alert("Giá, số lượng và năm xuất bản phải là số dương.");
                return false;
            }
            return true;
        },

        // Lấy danh sách sách từ API
        fetchBooks() {
            axios.get('http://localhost:3000/api/sach')
                .then(res => {
                    this.books = res.data;
                })
                .catch(err => console.error("Lỗi khi lấy dữ liệu sách:", err));
        },

        // Lấy danh sách nhà xuất bản từ API
        fetchPublishers() {
            axios.get('http://localhost:3000/api/nhaxuatban')
                .then(res => {
                    this.publishers = res.data;
                })
                .catch(err => console.error("Lỗi khi lấy dữ liệu nhà xuất bản:", err));
        },

        // Thêm sách mới
        addBook() {
            if (!this.validateBookData()) return;

            // Generate MaSach if it is not provided
            if (!this.newBook.MaSach) {
                this.newBook.MaSach = `BOOK_${Date.now()}`;
            }

            axios.post('http://localhost:3000/api/sach/add', this.newBook)
                .then(res => {
                    if (res.data.status == 200) {
                        window.alert("Thêm sách thành công!");
                        this.clearForm();  // Optional: Clears the form after adding the book
                        this.showAddForm = false;  // Hide the form
                        this.fetchBooks();  // Fetch updated list of books
                    } else {
                        window.alert("Thêm sách thành công!");
                        this.clearForm();  // Optional: Clears the form after adding the book
                        this.showAddForm = false;  // Hide the form
                        this.fetchBooks();  // Fetch updated list of books
                    }
                })
                .catch(err => {
                    console.error("Lỗi khi gửi yêu cầu:", err.response?.data || err.message);
                    const errorMessage = err.response?.data?.error || "Đã xảy ra lỗi không xác định.";
                    window.alert(`Thêm sách thất bại: ${errorMessage}`);
                });
        },
        deleteBook(bookId) {
            if (window.confirm('Bạn có chắc chắn muốn xóa sách này?')) {
                axios.delete(`http://localhost:3000/api/sach/${bookId}`)
                    .then(res => {
                        window.alert('Xóa sách thành công!');
                        // Refresh the book list after deletion
                        this.fetchBooks();
                    }
                    )
                    .catch(err => {
                        console.error('Lỗi khi gửi yêu cầu xóa sách:', err.response?.data || err.message);
                        window.alert('Xóa sách thất bại!');
                    });
            }
        }
    },

    created() {
        this.fetchBooks();
        this.fetchPublishers();
    },
};
</script>

<style scoped>
.home-view {
    margin: 16px auto;
}

.table {
    margin-top: 20px;
}

.form-label {
    font-weight: bold;
}

.mb-3 {
    margin-bottom: 15px;
}
</style>
