"use server";

import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { db } from "@/app/firebase/admin";
import { feedbackSchema } from "@/app/constants";
import { Interview, Feedback } from "@/app/types";

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript, feedbackId } = params;

  try {
    const formattedTranscript = transcript
      .map((line) => `- ${line.role}: ${line.content}\n`)
      .join("");

    const { object } = await generateObject({
      model: google("gemini-2.0-flash-001", {
        structuredOutputs: false,
      }),
      schema: feedbackSchema,
      prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed. Don't be lenient.
        Transcript:
        ${formattedTranscript}
        Please score the candidate from 0 to 100 in these areas:
        - Communication Skills
        - Technical Knowledge
        - Problem-Solving
        - Cultural & Role Fit
        - Confidence & Clarity
      `,
      system:
        "You are a professional interviewer analyzing a mock interview and assigning scores to the candidate.",
    });

    const feedback = {
      interviewId,
      userId,
      totalScore: object.totalScore,
      categoryScores: object.categoryScores,
      strengths: object.strengths,
      areasForImprovement: object.areasForImprovement,
      finalAssessment: object.finalAssessment,
      createdAt: new Date().toISOString(),
    };

    const feedbackRef = feedbackId
      ? db.collection("feedback").doc(feedbackId)
      : db.collection("feedback").doc();

    await feedbackRef.set(feedback);

    return { success: true, feedbackId: feedbackRef.id };
  } catch (error) {
    console.error("❌ Error saving feedback:", error);
    return { success: false };
  }
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  const doc = await db.collection("interviews").doc(id).get();
  return doc.exists ? { id: doc.id, ...doc.data() } as Interview : null;
}

export async function getFeedbackByInterviewId(params: {
  interviewId: string;
  userId: string;
}): Promise<Feedback | null> {
  const { interviewId, userId } = params;
  const snapshot = await db
    .collection("feedback")
    .where("interviewId", "==", interviewId)
    .where("userId", "==", userId)
    .limit(1)
    .get();

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() } as Feedback;
}

export async function getLatestInterviews(params: {
  userId: string;
  limit?: number;
}): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;

  const snapshot = await db
    .collection("interviews")
    .where("finalized", "==", true)
    .where("userId", "!=", userId)
    .orderBy("userId")
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get();

  if (snapshot.empty) return null;

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function getInterviewsByUserId(
  userId: string
): Promise<Interview[] | null> {
  const snapshot = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  if (snapshot.empty) return null;

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}
