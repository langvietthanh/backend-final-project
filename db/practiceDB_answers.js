const mongoose = require("mongoose");
const User = require("./userModel");
const Photo = require("./photoModel");

/**
 * 10 BÀI TẬP TRUY VẤN MONGODB/MONGOOSE - BẢN ĐÁP ÁN (DÙNG ĐỂ THAM KHẢO KHI CẦN)
 */

async function practiceQueriesAnswers() {
    const sampleUserId = "60d5ec49f1b2c8b1f8e12345"; 
    const samplePhotoId = "60d5ec49f1b2c8b1f8e67890";
    const sampleCommentId = "60d5ec49f1b2c8b1f8eabcde";

    // ==========================================
    // PHẦN 1: TRUY VẤN (READ)
    // ==========================================

    // Câu 1: Tìm một User có login_name là "johndoe".
    const q1 = await User.findOne({ login_name: "johndoe" });

    // Câu 2: Lấy danh sách tất cả các User, nhưng CHỈ LẤY các trường: _id, first_name, last_name.
    const q2 = await User.find({}, "_id first_name last_name").lean(); 
    // Giải thích thêm: .lean() giúp trả về plain JS object thay vì Mongoose Document (nhanh hơn).

    // Câu 3: Lấy thông tin chi tiết của một User dựa vào _id.
    const q3 = await User.findById(sampleUserId);

    // Câu 4: Lấy danh sách tất cả các bức ảnh của một User cụ thể (dựa vào user_id).
    const q4 = await Photo.find({ user_id: sampleUserId });

    // Câu 5: Lấy ảnh của một User cụ thể, và POPULATE (Join) để lấy thêm thông tin 
    // của người đã comment vào ảnh (chỉ lấy _id, first_name, last_name của người comment).
    const q5 = await Photo.find({ user_id: sampleUserId })
        .populate({
            path: "comments.user_id",
            model: "Users", // Tên model phải khớp với lúc mongoose.model("Users", userSchema)
            select: "_id first_name last_name"
        });

    // Câu 6: Tìm tất cả các bức ảnh mà một User cụ thể ĐÃ TỪNG BÌNH LUẬN (dựa vào user_id).
    // Tuy nhiên, truy vấn DB trực tiếp bằng MongoDB sẽ tối ưu hơn, đây là câu hỏi để lấy điểm cao).
    const q6 = await Photo.find({ "comments.user_id": sampleUserId });

    // Câu 7: Đếm tổng số lượng ảnh mà một user cụ thể đã đăng tải.
    const q7 = await Photo.countDocuments({ user_id: sampleUserId });

    // ==========================================
    // PHẦN 2: THÊM, SỬA, XÓA (CREATE, UPDATE, DELETE)
    // ==========================================

    // Câu 8: Tạo và lưu trữ một User mới vào cơ sở dữ liệu.
    const newUser = new User({
        first_name: "John",
        last_name: "Doe",
        login_name: "johndoe",
        password: "securepassword",
        location: "Vietnam",
        description: "Student",
        occupation: "Developer"
    });
    // const q8 = await newUser.save();

    // Câu 9: Thêm một Comment mới vào mảng `comments` của một bức ảnh.
    // Có 2 cách tiếp cận:
    // Cách 1 (Project đang dùng trong CommentController): Lấy ảnh ra -> push mảng -> save lại
    const photoToComment = await Photo.findById(samplePhotoId);
    if(photoToComment) {
        photoToComment.comments.push({
            comment: "Great photo!",
            date_time: new Date(),
            user_id: sampleUserId
        });
        // await photoToComment.save();
    }
    
    // Cách 2 (Truy vấn Update trực tiếp bằng $push - Rất hay bị hỏi vấn đáp):
    // await Photo.findByIdAndUpdate(
    //     samplePhotoId, 
    //     { $push: { comments: { comment: "Great photo!", user_id: sampleUserId, date_time: Date.now() } } }
    // );

    // Câu 10: Xóa một Comment khỏi mảng `comments` của một bức ảnh.
    // Cách 1 (Project đang dùng): Dùng hàm .pull() của Mongoose array.
    const photoToDeleteComment = await Photo.findById(samplePhotoId);
    if(photoToDeleteComment) {
        photoToDeleteComment.comments.pull(sampleCommentId);
        // await photoToDeleteComment.save();
    }

    // Cách 2 (Truy vấn Update trực tiếp bằng $pull - MongoDB thuần):
    // await Photo.findByIdAndUpdate(
    //     samplePhotoId,
    //     { $pull: { comments: { _id: sampleCommentId } } }
    // );

}

module.exports = practiceQueriesAnswers;