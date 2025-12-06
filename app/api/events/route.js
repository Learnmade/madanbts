import dbConnect from '@/lib/db';
import Event from '@/models/Event';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await dbConnect();
        const events = await Event.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: events });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch events' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();
        const event = await Event.create(body);
        return NextResponse.json({ success: true, data: event }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to create event' }, { status: 400 });
    }
}
