import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true }, // Keeping simple string for MVP, usually Date
    slots: { type: String, required: true },
    status: { type: String, enum: ['Open', 'Filling Fast', 'Closed', 'Completed'], default: 'Open' },
    map: { type: String, required: true },
    type: { type: String, enum: ['Squad', 'Solo', 'Duo'], default: 'Squad' },
    likes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Event || mongoose.model('Event', EventSchema);
