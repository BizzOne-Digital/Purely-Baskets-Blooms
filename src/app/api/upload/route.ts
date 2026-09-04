import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getSignedUploadParams } from '@/lib/cloudinary';
import {
  getClientIdentifier,
  rateLimit,
  createRateLimitResponse,
} from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const ip = getClientIdentifier(request.headers);
    const limit = rateLimit(`upload:${ip}`, {
      limit: 20,
      windowMs: 60_000,
    });

    if (!limit.success) {
      return createRateLimitResponse(limit.retryAfterMs ?? 60_000);
    }

    const body = await request.json().catch(() => ({}));
    const folder =
      typeof body.folder === 'string' ? body.folder : undefined;

    const signature = getSignedUploadParams(folder);

    return NextResponse.json(signature);
  } catch (error) {
    console.error('Upload signature error:', error);
    return NextResponse.json(
      { error: 'Failed to generate upload signature' },
      { status: 500 }
    );
  }
}
