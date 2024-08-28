import { FC } from 'react';
import Heading from '../components/Heading/Heading';

const notes = [
  { id: 1, message: "Kiwi Florist tin rằng hoa không chỉ là một món quà, mà hơn thế nữa Hoa còn là Tình Yêu, là Thành Ý." },
  { id: 2, message: "Kiwi Florist là một đơn vị bán hoa tươi với mục tiêu mang đến những bó hoa đẹp và sáng tạo nhất cho khách hàng." },
  { id: 3, message: "Chúng tôi cung cấp các loại hoa tươi chất lượng cao, được chọn lựa kỹ càng từ các trang trại hoa tươi đảm bảo nguồn gốc và sự tươi mới." },
  { id: 4, message: "Với đội ngũ nhân viên tận tâm và chuyên nghiệp, Kiwi Florist cam kết đem đến những sản phẩm hoa tươi đẹp mắt và ấn tượng nhất bằng tất cả tấm lòng." },
]

const Notes: FC = () => {
  return (
    <section className="element-container container-sm">
      <Heading title="Lời nhắn từ Kiwi Florist" isBreak />
      <div className="notes-content my-6 mx-9">
        <div className="notes-content-message text-justify">
          {notes.map(note => (
            <p key={note.id} className="my-6 ff-playball fs-6">{note.message}</p>
          ))}
        </div>
        <div className="notes-content-image opacity-50">
          <img className="element-image" src="/logo.png" alt="" />
        </div>
      </div>
    </section>
  );
};

export default Notes;
