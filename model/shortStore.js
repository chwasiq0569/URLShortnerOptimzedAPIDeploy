import mongoose from 'mongoose';

const shortSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
    index: true
  },
  short: {
    type: String,
    required: true,
  }
});

shortSchema.index({ full: 1 });

export default mongoose.model("ShortUrl", shortSchema);