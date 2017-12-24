const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleID:{
        type: String,
        required: true
    },
    email: {
        type: String,
        requied: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    image: {
        type: String
    }
});

//สร้าง users collection ที่ mlab (mongdDB) และเพิ่ม userSchema เข้าไป
mongoose.model('users', userSchema);