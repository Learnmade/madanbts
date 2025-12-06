import dbConnect from '@/lib/db';
import User from '@/models/User';
import Event from '@/models/Event';
import Match from '@/models/Match';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await dbConnect();

        const usersCount = await User.countDocuments({});
        const activeTryoutsCount = await Event.countDocuments({ status: { $ne: 'Completed' } }); // Open, Filling Fast, Closed (but not completed)
        const matchesCount = await Match.countDocuments({}); // Or maybe pending verifications proxy?

        // For "Pending Verifications", we'll just return 0 for now as we don't have that field, 
        // or maybe count users without 'ign'.
        const pendingVerifications = await User.countDocuments({ ign: { $exists: false } });

        return NextResponse.json({
            success: true,
            stats: {
                users: usersCount,
                active_tryouts: activeTryoutsCount,
                pending_verifications: pendingVerifications,
                system_status: 'Online'
            }
        });
    } catch (error) {
        console.error("Stats fetch error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch stats" }, { status: 500 });
    }
}
