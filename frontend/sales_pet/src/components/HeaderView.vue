<template>
    <div class="header-view">
        <header>
            <nav class="navbar navbar-expand-lg navbar-secondary bg-secondary">
                <!-- Logo -->
                <router-link class="navbar-brand" to="/">
                    <img src="../assets/image/book.png" alt="logo" class="logo">
                </router-link>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <!-- Home page -->
                        <li class="nav-item">
                            <router-link to="/" class="nav-link">Sách <span class="sr-only">(current)</span></router-link>
                        </li>

                        <!-- Get all dog page -->
                        <li class="nav-item">
                            <router-link to="/nhaxuatban" class="nav-link">Nhà Xuất Bản <span
                                    class="sr-only">(current)</span></router-link>
                        </li>

                        <!-- Get all cat page -->
                        <li class="nav-item">
                            <router-link to="/nhanvien" class="nav-link">Nhân viên <span
                                    class="sr-only">(current)</span></router-link>
                        </li>

                        <li class="nav-item">
                            <router-link to="/docgia" class="nav-link">Độc Giả <span
                                    class="sr-only">(current)</span></router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/theodoimuonsach" class="nav-link">Theo dõi mượn sách <span
                                    class="sr-only">(current)</span></router-link>
                        </li>
                    </ul>



                    <!-- Dropdown menu -->
                    <ul class="nav navbar-nav navbar-right" v-if="this.checkStorage">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle mb-1" href="#" id="navbarDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {{ this.nameUser }}
                            </a>


                            <div v-if="this.role == 'Admin'" class="dropdown-menu dropdown-menu-right mt-2 menu-admin"
                                aria-labelledby="navbarDropdown">

                                <!-- Add pet page -->
                                <router-link to="/admin/pets/create" class="dropdown-item text-dark menu-dropdown-user">
                                    Thêm thú cưng
                                </router-link>

                                <!-- Stored pet page -->
                                <router-link to="/admin/stored/pets" class="dropdown-item text-dark  menu-dropdown-user">
                                    Xem kho
                                </router-link>

                                <router-link v-on:click="logoutUser()" to="/"
                                    class="dropdown-item text-dark btn btn-link">Đăng xuất</router-link>

                            </div>

                            <div class="dropdown-menu text-dark mt-2 menu-user" aria-labelledby="navbarDropdown">
                                <router-link v-on:click="logoutUser()" class="dropdown-item text-dark" to="/">
                                    <i class="fas fa-sign-out-alt"></i>
                                    Đăng xuất
                                </router-link>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    </div>
</template>

<script>

export default {
    computed: {
        checkStorage() {
            return localStorage.getItem("id") != null;
        },
        nameUser() {
            const name = JSON.parse(localStorage.getItem("id"))[0];
            return name || null;
        },
        role() {
            const position = JSON.parse(localStorage.getItem("id"))[1];
            return position || null;
        },
    },

    methods: {
        logoutUser() {
            localStorage.clear();
            window.location.reload();
        }
    }
}
</script>

<style scoped>
.logo {
    width: 40px;
    margin: 0 14px;
}

a {
    color: #fff;
    text-decoration: none;
}

.nav-item {
    color: red;
}

i {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    margin: 0 8px 0 0;
}

.menu-dropdown-user:hover {
    background-color: #eee;
    color: #0e0edc !important;
}
</style>