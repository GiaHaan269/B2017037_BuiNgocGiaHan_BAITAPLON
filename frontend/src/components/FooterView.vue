<template>
    <div>
        <!-- Footer -->
        <footer class="text-center text-lg-start bg-dark text-white">
            <!-- Section: Social media -->
            <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                <!-- Left -->
                <div class="me-5 d-none d-lg-block">
                    <span>Follow us on social networks:</span>
                </div>
                <!-- Left -->

                <!-- Right -->
                <div>
                    <a href="" class="me-4 link-light">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="" class="me-4 link-light">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="" class="me-4 link-light">
                        <i class="fab fa-google"></i>
                    </a>
                    <a href="" class="me-4 link-light">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="" class="me-4 link-light">
                        <i class="fab fa-linkedin"></i>
                    </a>
                    <a href="" class="me-4 link-light">
                        <i class="fab fa-github"></i>
                    </a>
                </div>
                <!-- Right -->
            </section>
            <!-- Section: Social media -->

            <!-- Section: Links  -->
            <section class="">
                <div class="container text-center text-md-start mt-5">
                    <!-- Grid row -->
                    <div class="row mt-3">
                        <!-- Grid column -->
                        <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
                            <!-- Content -->
                            <h6 class="text-uppercase fw-bold mb-4">
                                <i class="fas fa-book me-3 text-white"></i>Thư Viện Mượn Sách
                            </h6>
                            <p>
                                Thư Viện Mượn Sách là nơi cung cấp các dịch vụ mượn sách chất lượng, từ các sách giáo khoa,
                                sách văn học, đến các sách nghiên cứu. Chúng tôi luôn cập nhật những đầu sách mới nhất cho
                                bạn đọc.
                            </p>
                        </div>
                        <!-- Grid column -->

                        <!-- Grid column -->
                        <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                            <!-- Links -->
                            <h6 class="text-uppercase fw-bold mb-4">
                                Dịch Vụ
                            </h6>
                            <p>
                                Mượn Sách
                            </p>
                            <p>
                                Trả Sách
                            </p>
                            <p>
                                Gia Hạn Sách
                            </p>
                            <p>
                                Tìm Kiếm Sách
                            </p>
                        </div>
                        <!-- Grid column -->

                        <!-- Grid column -->
                        <div class="col-md-7 col-lg-7 col-xl-7 mx-auto mb-4">
                            <!-- Links -->
                            <h6 class="text-uppercase fw-bold mb-4">
                                Chi Nhánh
                            </h6>
                            <p>
                                Thư Viện Cần Thơ: 123 Đường 3 Tháng 2, Quận Ninh Kiều, Cần Thơ.
                            </p>
                            <p>
                                Thư Viện Hồ Chí Minh: 456 Đường Quang Trung, Quận Gò Vấp, TP.HCM.
                            </p>
                            <p>
                                Thư Viện Hà Nội: 789 Đường Nghi Tàm, Quận Tây Hồ, Hà Nội.
                            </p>
                            <p>
                                Thư Viện Đà Lạt: 101 Đường Lý Nam Đế, TP. Đà Lạt, Lâm Đồng.
                            </p>
                        </div>
                        <!-- Grid column -->
                    </div>
                    <!-- Grid row -->
                </div>
            </section>
            <!-- Section: Links  -->

            <!-- Copyright -->
            <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.025);">
                © 2023 Copyright: Thư Viện Mượn Sách - All Rights Reserved
            </div>
            <!-- Copyright -->
        </footer>
        <!-- Footer -->
    </div>
</template>

<script>
export default {
    name: "LibraryFooter"
}
</script>

<style scoped>
footer {
    background-color: #343a40;
}

footer .link-light {
    color: #f8f9fa;
}

footer .link-light:hover {
    color: #007bff;
}

footer h6 {
    color: #f8f9fa;
}

footer p {
    color: #d1d1d1;
}
</style>
