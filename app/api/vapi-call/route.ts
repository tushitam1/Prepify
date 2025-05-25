import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log('📦 Received in /api/vapi-call:', JSON.stringify(body, null, 2))

    const vapiRes = await fetch('https://api.vapi.ai/call/web', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_VAPI_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await vapiRes.json()
    console.log('📨 Response from Vapi:', JSON.stringify(data, null, 2)) // ✅ important

    return NextResponse.json(data, { status: vapiRes.status })
  } catch (err) {
    console.error('❌ Error in proxy:', err)
    return NextResponse.json({ error: 'Server error calling Vapi' }, { status: 500 })
  }
}
