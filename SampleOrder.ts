import mongoose, { Document, Schema } from 'mongoose';
export interface ISampleOrder extends Document {
  trackingId: string;
  name: string;
  address: string;
  phone: string;
  email?: string;
  sampleIds: string[];
  region: string;
  status: 'pending' | 'processed' | 'shipped' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}
const sampleOrderSchema: Schema = new Schema({
  trackingId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  sampleIds: [{ type: String, required: true }],
  region: { type: String, required: true },
  status: { type: String, enum: ['pending','processed','shipped','cancelled'], default: 'pending' }
}, { timestamps: true });
sampleOrderSchema.index({ trackingId: 1 });
export default (mongoose.models.SampleOrder as mongoose.Model<ISampleOrder>) || mongoose.model('SampleOrder', sampleOrderSchema);
