import { NextRequest, NextResponse } from 'next/server';
import { auth } from './lib/auth';

export async function proxy(request: NextRequest) {
  // ১. বর্তমান রিকোয়েস্টের হেডার থেকে সেশন চেক করুন
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  // ২. সেশন না থাকলে → লগইন পেজে রিডাইরেক্ট
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // ৩. সেশন থাকলে → স্বাভাবিকভাবে এগিয়ে যান
  return NextResponse.next();
}

// ৪. কোন রুটগুলোতে এই প্রোক্সি কাজ করবে তা নির্ধারণ করুন
export const config = {
  matcher: [
    '/add-course', 
    //   '/courses/manage',
  ],
};