import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const { Schema, model } = mongoose;

const EntrySchema = new Schema(
  {
    type: { type: String, enum: ['hours', 'material'], required: true },
    description: { type: String, required: true },
    qty: { type: Number, required: true },
    rate: { type: Number, required: true }
  },
  { _id: false }
);

const DeliveryNoteSchema = new Schema(
  {
    date: { type: Date, required: true },
    company: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    client: { type: mongoose.Types.ObjectId, ref: 'Client', required: true },
    project: { type: mongoose.Types.ObjectId, ref: 'Project', required: true },
    entries: { type: [EntrySchema], required: true },
    signed: { type: Boolean, default: false },
    signature: {
      ipfsHash: { type: String },
      urlPDF: { type: String }
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

DeliveryNoteSchema.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });

export default model('DeliveryNote', DeliveryNoteSchema);
