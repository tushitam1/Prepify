// app/api/vapi/generate/route.ts
import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { getRandomInterviewCover } from '@/ai_mock_interviews/lib/utils';

import { db } from "@/ai_mock_interviews/firebase/admin";
// GET handler (simple test)
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'API is working!',
  });
}

// ✅ FIXED: "async" typo and added logic for POST handler
export async function POST(request: Request) {
  const { type, role, level, techstack, amount, userid, } = await request.json();

  try {
    const { text:questions } = await generateText({
      model: google('gemini-2.0-flash-001'),
      prompt: `Prepare questions for a job interview.
The job role is ${role}.
The job experience level is ${level}.
The tech stack used in the job is: ${techstack}.
The focus between behavioural and technical questions should lean towards: ${type}.
The amount of questions required is: ${amount}.
Please return only the questions, without any additional text.
The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
Return the questions formatted like this:
["Question 1", "Question 2", "Question 3"]

Thank you! <3`,
    });

    return NextResponse.json({
      success: true,
      data: text,
    });
    const interview={
        role,type,level,techstack:techstack.split(','),
        questions:JSON.parse(questions),
        userId:userid,
        finalized:true,
        coverImage:getRandomInterviewCover(),
        createdAt:new Date(),toISOString()
    }
    await db.collection("interviews").add(interview);
return Response.json({success:true},{status:200})
  } catch (error) {
    console.error(error); // fixed syntax
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
