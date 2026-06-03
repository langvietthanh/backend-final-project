const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./userModel");
const Photo = require("./photoModel");

/**
 * 10 BÀI TẬP TRUY VẤN MONGODB/MONGOOSE
 * Dựa trên cấu trúc Database của Project (User và Photo).
 * Lưu ý: Trong vấn đáp, thầy cô có thể hỏi cú pháp MongoDB thuần (db.collection.find(...)) 
 * hoặc cú pháp Mongoose (Model.find(...)). Dưới đây là cú pháp Mongoose được dùng trong project.
 */

async function practiceQueries() {
    const sampleUserId = "69f74f087aa3cbe9d965e3ad"; 
    const samplePhotoId = "69f74f087aa3cbe9d965e3b9";
    const sampleCommentId = "60d5ec49f1b2c8b1f8eabcde";

    // ==========================================
    // PHẦN 1: TRUY VẤN (READ)
    // ==========================================
    // const q0 = await User.find().select('_id login_name');
    // console.log(q0);

    // Câu 1: Tìm một User có login_name là "johndoe".
    // (Được sử dụng trong AdminController.adminLogin và UserController.registerUser)
    const q1 = await User.findOne({ login_name: 'malcolm'}); // TODO: Viết code tại đây
    // console.log(q1);
    // Câu 2: Lấy danh sách tất cả các User, nhưng CHỈ LẤY các trường: _id, first_name, last_name.
    // (Được sử dụng trong UserController.getList)
    const q2 = await User.find().select('_id first_name last_name') ;
    // console.log(q2); // TODO: Viết code tại đây

    // Câu 3: Lấy thông tin chi tiết của một User dựa vào _id.
    // (Được sử dụng trong UserController.getUserById)
    const q3 = await User.findById('6a1dbf931ad4f02a2445c3ef');
    // console.log(q3); // TODO: Viết code tại đây

    // Câu 4: Lấy danh sách tất cả các bức ảnh của một User cụ thể (dựa vào user_id).
    // (Được sử dụng trong PhotoController.getPhotosOfUser)
    const q4 = await Photo.find({ user_id: '69f74f087aa3cbe9d965e3ad' }).select('file_name');
    // console.log(q4); // TODO: Viết code tại đây

    // Câu 5: Lấy ảnh của một User cụ thể, và POPULATE (Join) để lấy thêm thông tin 
    // của người đã comment vào ảnh (chỉ lấy _id, first_name, last_name của người comment).
    // (Được sử dụng trong PhotoController.getPhotosOfUser)
    const q5 = await Photo.find({user_id: sampleUserId}).populate(
        {
            path: 'comments.user_id',
            model: 'Users',
            select: '_id first_name last_name'
        }
    ); // TODO: Viết code tại đây
    // console.log(q5);
    // Câu 6: Tìm tất cả các bức ảnh mà một User cụ thể ĐÃ TỪNG BÌNH LUẬN (dựa vào user_id).
    const q6 = await Photo.find({'comments.user_id': sampleUserId}) // TODO: Viết code tại đây

    // Câu 7: Đếm tổng số lượng ảnh mà một user cụ thể đã đăng tải.
    // const q7 = await Photo.find({user_id : sampleUserId});
    const q7 = await Photo.countDocuments({user_id : sampleUserId});
    // console.log(q7); // TODO: Viết code tại đây

    // ==========================================
    // PHẦN 2: THÊM, SỬA, XÓA (CREATE, UPDATE, DELETE)
    // ==========================================

    // Câu 8 (Skip) : Tạo và lưu trữ một User mới vào cơ sở dữ liệu.
    // (Được sử dụng trong UserController.registerUser)
    // TODO: Viết code tại đây

    // Câu 9: Thêm một Comment mới vào mảng `comments` của một bức ảnh.
    // TODO: Viết code tại đây
    // const newComment = {
    //     comment : "Practice DB",
    //     date_time : Date.now(), 
    //     user_id : sampleUserId,
    // }

    // const photoToComment = await Photo.findById(samplePhotoId);
    // photoToComment.comments.push(newComment);
    // await photoToComment.save();


    // Câu 10: Xóa một Comment khỏi mảng `comments` của một bức ảnh.
    // TODO: Viết code tại đây
    const PhotoHaveComment = await Photo.findById(samplePhotoId);
    await PhotoHaveComment.comments.pull(sampleCommentId);
    
    
    const photo = await Photo.findById(samplePhotoId).populate({
        path: 'comments.user_id',
        model: 'Users',
        select: '_id login_name'
    });
    const filteredComments = photo.comments.filter(
        c => c.user_id._id.toString() === sampleUserId
    )
    console.log(filteredComments);
}

async function main() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Đã kết nối tới MongoDB thành công!");
        await practiceQueries();
    } catch (error) {
        console.error("Lỗi khi chạy query:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Đã ngắt kết nối DB!");
    }
}

main();