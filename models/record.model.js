import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    amount: {
      type: Number,
      required: [true, 'Amount is required']
    },

    type: {
      type: String,
      enum: ['income', 'expense'],
      required: true
    },

    category: {
      type: String,
      required: true,
      trim: true
    },

    date: {
      type: Date,
      default: Date.now
    },

    notes: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Record = mongoose.model('Record', recordSchema);

export default Record;