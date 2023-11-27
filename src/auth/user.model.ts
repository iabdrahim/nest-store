import { models, model, Schema } from 'mongoose';
let ProfileSchema = new Schema(
  {
    name: { type: String, default: 'unknown' },
    password: String,
    email: {
      type: String,
      unique: [true, 'This email is aleardy exist with another account'],
    },
    avatar: { type: String, default: '/user.png' },
    location: { type: String, default: '' },
    phoneNumber: { type: String, default: '' },
    saved: { type: [String], default: [] },
    cart: { type: [String], default: [] },
  },
  {
    _id: true, // Enable auto-generated _id field
    timestamps: true, // Enable createdAt and updatedAt fields
  },
);
// delete models.Profile;

let Profile = models.Profile;
if (!Profile) {
  Profile = model('Profile', ProfileSchema);
}
export default Profile;
