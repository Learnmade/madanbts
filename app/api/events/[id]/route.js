import dbConnect from '@/lib/db';
import Event from '@/models/Event';
import { NextResponse } from 'next/server';

export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await req.json();
        const event = await Event.findByIdAndUpdate(id, body, { new: true });
        if (!event) {
            return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: event });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to update event' }, { status: 400 });
    }
}

export async function DELETE(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;
        const event = await Event.findByIdAndDelete(id);
        if (!event) {
            return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete event' }, { status: 400 });
    }
}
