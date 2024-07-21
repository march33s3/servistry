const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  firstandLastName: { type: String, required: true },
  emailAddress: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  feeling: { type: String, required: true },
  userType: { type: String, required: true },
  eventID: { type: String, required: true },
  promotionalOffersAndUpdates: { type: String, required: false },

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
