import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        await dbConnect();
        const { name, email, password, ign, discordId } = await req.json();

        // Check existing
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create User (Default role: user)
        // quick hack for demo: if email contains 'admin', make admin
        const role = email.includes('admin') ? 'admin' : 'user';

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            ign,
            role, // In real app, this is strictly 'user' or controlled by admin
            discordId // Make sure to add this to schema if needed, or put in ign for now
        });

        return NextResponse.json({ message: 'User created successfully' }, { status: 201 });

    } catch (error) {
        console.error('Register error:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
