const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Registration', RegistrationSchema);



//const registrationModal = {
//    promotionalOffersAndUpdates: false,
//    password: '',
//    userType: '',
//    eventID: '',
//    feeling: '',
//    emailAddress: '',
//    firstandLastName: '',
//}
//export default registrationModal;
