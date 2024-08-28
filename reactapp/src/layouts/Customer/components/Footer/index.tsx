import "./style.scss";
import { Link } from "react-router-dom";
import { FaPhoneVolume } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import { IoStorefront } from "react-icons/io5";

const Footer = () => {
  return (
    <div className="footer-container container-sm">
      <div className="footer-overlay element-overlay"></div>
      <div className="footer-wrapper element-flex-wrap">
        <div className="footer-message col-lg-4 py-2 px-4">
          <div className="footer-title mt-2 mb-4">
            <p className="ff-playball fs-4 fw-bolder">Kiwi Florist</p>
          </div>
          <div className="footer-messages footer-content text-justify">
            <p className="mb-3 ff-montserrat fs-6">Tự hào là nơi hội tụ của vô số các loại hoa được chọn lọc tỉ mỉ và được thực hiện bởi những bàn tay tinh tế và đầy chuyên nghiệp của những nghệ nhân nhiều kinh nghiệm.</p>
            <p className="mb-3 ff-montserrat fs-6">Giúp bạn gửi đi món quà hoa tươi, mang thông điệp và những lời chúc ý nghĩa tới người nhận.</p>
          </div>
        </div>
        <div className="footer-helper col-lg-4 py-2 px-4">
          <div className="footer-title mt-2 mb-4">
            <p className="ff-montserrat fs-6 fw-bolder">Chăm sóc khách hàng</p>
          </div>
          <ul className="footer-links footer-content list-disc ms-5">
            <li className="mb-3">
              <Link className="cursor-pointer ff-montserrat fs-6" to="#">
                Thắc mắc và khiếu nại
              </Link>
            </li>
            <li className="mb-3">
              <Link className="cursor-pointer ff-montserrat fs-6" to="#">
                Cam kết hài lòng 100%
              </Link>
            </li>
            <li className="mb-3">
              <Link className="cursor-pointer ff-montserrat fs-6" to="#">
                Chính sách bảo mật thông tin
              </Link>
            </li>
            <li className="mb-3">
              <Link className="cursor-pointer ff-montserrat fs-6" to="#">
                Chính sách và điều khoản
              </Link>
            </li>
            <li className="mb-3">
              <Link className="cursor-pointer ff-montserrat fs-6" to="#">
                Hướng dẫn đặt hàng
              </Link>
            </li>
            <li className="mb-3">
              <Link className="cursor-pointer ff-montserrat fs-6" to="#">
                Chính sách bảo mật thanh toán
              </Link>
            </li>
            <li className="mb-3">
              <Link className="cursor-pointer ff-montserrat fs-6" to="#">
                Hướng dẫn thanh toán
              </Link>
            </li>
            <li className="mb-3">
              <Link className="cursor-pointer ff-montserrat fs-6" to="#">
                Phí giao hàng
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-contact col-lg-4 py-2 px-4">
          <div className="footer-title mt-2 mb-4">
            <p className="ff-montserrat fs-6 fw-bolder">Thông tin</p>
          </div>
          <div className="footer-informations footer-content">
            <p className="mb-3 ff-montserrat fs-6">
              <IoStorefront />
              <span className="ms-1"> Địa chỉ: 673 Bình Khánh, Cần Giờ</span>
            </p>
            <p className="mb-3 ff-montserrat fs-6">
              <TfiEmail />
              <span className="ms-1">Email: kiwiflorit@gmail.com</span>
            </p>
            <p className="mb-3 ff-montserrat fs-6">
              <FaPhoneVolume />
              <span className="ms-1">Số điện thoại: 0705145774</span>
            </p>
          </div>
          <div className="footer-socials element-flex-start mb-5">
            <div className="me-3 cursor-pointer">
              <img src="/svg/facebook.svg" alt="" loading="lazy" />
            </div>
            <div className="me-3 cursor-pointer">
              <img src="/svg/tiktok.svg" alt="" loading="lazy" />
            </div>
            <div className="me-3 cursor-pointer">
              <img src="/svg/instagram.svg" alt="" loading="lazy" />
            </div>
          </div>
          <div className="footer-certificates">
            <img src="/img/certificate.png" alt="" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
