import mongoose from 'mongoose';

// Flexible match schema for Schedule and Squad Wars
const MatchSchema = new mongoose.Schema({
    title: { type: String, required: true },
    time: { type: String, required: true },
    day: { type: String, default: 'Today' }, // Helper for grouping
    date: { type: String, required: true },
    type: { type: String, enum: ['Tryout', 'War', 'Tournament'], default: 'Tryout' },
    map: { type: String, default: 'Erangel' },
    status: { type: String, enum: ['Upcoming', 'Live', 'Completed'], default: 'Upcoming' },
    teamA: { type: String }, // Optional for Squad Wars
    teamB: { type: String }, // Optional for Squad Wars
    bannerUrl: { type: String }, // Image URL for the match banner
    winner: { type: String }, // Result
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Match || mongoose.model('Match', MatchSchema);
