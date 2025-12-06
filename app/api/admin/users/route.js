import dbConnect from '@/lib/db';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        await dbConnect();
        // Check for admin role ideally, but middleware handles protection mostly.
        // For extra security we could verify token here again.

        const users = await User.find({}).sort({ createdAt: -1 }).select('-password');
        return NextResponse.json({ success: true, data: users });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch users' }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        await dbConnect();
        const { id } = await req.json();
        await User.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: 'User deleted' });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete user' }, { status: 400 });
    }
}
