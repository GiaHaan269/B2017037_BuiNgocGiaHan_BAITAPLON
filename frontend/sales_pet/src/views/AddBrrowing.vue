<template>
    <HeaderView />

    <div class="container">
        <div class="row mt-4">
            <!-- Display message when there are no borrowings -->
            <div v-if="borrowings.length === 0" class="col-12">
                <p>Chưa có thông tin mượn sách.</p>
            </div>

            <!-- Button to toggle the Add Borrowing form -->
            <div class="col-12">
                <button class="btn btn-primary mb-3" @click="showAddForm = !showAddForm">
                    Thêm Người Mượn Sách
                </button>
            </div>

            <!-- Add Borrowing Form -->
            <div v-if="showAddForm" class="col-12">
                <form @submit.prevent="addBorrowing">
                    <div class="mb-3">
                        <label for="readerId" class="form-label">Mã Độc Giả</label>
                        <input v-model="newBorrowing.MaDocGia" type="text" class="form-control" id="readerId" required>
                    </div>
                    <div class="mb-3">
                        <label for="bookId" class="form-label">Mã Sách</label>
                        <input v-model="newBorrowing.MaSach" type="text" class="form-control" id="bookId" required>
                    </div>
                    <div class="mb-3">
                        <label for="borrowDate" class="form-label">Ngày Mượn</label>
                        <input v-model="newBorrowing.NgayMuon" type="date" class="form-control" id="borrowDate" required>
                    </div>
                    <div class="mb-3">
                        <label for="returnDate" class="form-label">Ngày Dự Kiến Trả</label>
                        <input v-model="newBorrowing.NgayTra" type="date" class="form-control" id="returnDate">
                    </div>
                    <button type="submit" class="btn btn-success">Thêm Mượn Sách</button>
                    <button type="button" class="btn btn-secondary ml-2" @click="showAddForm = false">Hủy</button>
                </form>
            </div>

            <!-- Table of Borrowings -->
            <table class="table table-striped mt-4" v-if="borrowings.length > 0">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Mã Độc Giả</th>
                        <th>Mã Sách</th>
                        <th>Ngày Mượn</th>
                        <th>Ngày Dự Kiến Trả</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(borrowing, index) in borrowings" :key="borrowing._id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ borrowing.MaDocGia }}</td>
                        <td>{{ borrowing.MaSach }}</td>
                        <td>{{ formatDate(borrowing.NgayMuon) }}</td>
                        <td>{{ borrowing.NgayTra ? formatDate(borrowing.NgayTra) : 'Chưa trả' }}</td>
                        <td>
                            <button class="btn btn-danger" @click="deleteBorrowing(borrowing._id)">
                                Xóa
                            </button>
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
            borrowings: [],  // List of borrowings
            showAddForm: false,  // Toggle form visibility
            newBorrowing: {  // Data for the new borrowing
                MaDocGia: '',
                MaSach: '',
                NgayMuon: '',
                NgayTra: ''
            }
        };
    },
    methods: {
        // Format date to display in readable format
        formatDate(date) {
            const d = new Date(date);
            return d.toLocaleDateString('vi-VN');
        },

        // Fetch all borrowings from the server
        fetchBorrowings() {
            axios.get('http://localhost:3000/api/theodoimuonsach')
                .then(res => {
                    this.borrowings = res.data;
                })
                .catch(err => console.error("Error fetching borrowings:", err));
        },

        // Add a new borrowing record
        addBorrowing() {
            // Ensure all required fields are filled
            if (!this.newBorrowing.MaDocGia || !this.newBorrowing.MaSach || !this.newBorrowing.NgayMuon) {
                alert('Vui lòng nhập đầy đủ thông tin.');
                return;
            }

            // Send POST request to add a new borrowing
            axios.post('http://localhost:3000/api/theodoimuonsach/add', this.newBorrowing)
                .then(res => {

                    alert('Thêm người mượn sách thành công!');
                    this.fetchBorrowings();  // Refresh the list
                    this.showAddForm = false;  // Hide the form
                    this.clearForm();  // Clear the form data

                })
                .catch(err => {
                    console.error('Error adding borrowing:', err);
                    alert('Có lỗi khi thêm người mượn sách.');
                });
        },

        // Delete a borrowing record
        deleteBorrowing(maDocGia) {
            if (window.confirm('Bạn có chắc chắn muốn xóa độc giả này?')) {
                axios.delete(`http://localhost:3000/api/theodoimuonsach/${maDocGia}`)
                    .then(res => {
                        window.alert('Xóa độc giả thành công!');
                        this.fetchBorrowings();  // Lấy lại danh sách độc giả
                    })
                    .catch(err => {
                        console.error('Lỗi khi gửi yêu cầu xóa độc giả:', err.response?.data || err.message);
                    });
            }
        },


        // Clear form after submission
        clearForm() {
            this.newBorrowing = { MaDocGia: '', MaSach: '', NgayMuon: '', NgayTra: '' };
        }
    },

    created() {
        this.fetchBorrowings();  // Fetch the initial list of borrowings
    }
};
</script>
<style scoped>
.container {
    margin-top: 20px;
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

.btn {
    margin-top: 10px;
}

.mt-4 {
    margin-top: 40px;
}
</style>
