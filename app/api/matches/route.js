import dbConnect from '@/lib/db';
import Match from '@/models/Match';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await dbConnect();
        const matches = await Match.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: matches });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch matches' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();
        const match = await Match.create(body);
        return NextResponse.json({ success: true, data: match }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to create match' }, { status: 400 });
    }
}
