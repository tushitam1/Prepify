import React from 'react'
import { Button } from '@/components/ui/button'

import Link from 'next/link'
import Image from 'next/image'
import InterviewCard from '@/components/ui/InterviewCard'




import { cn, getTechLogos, dummyInterviews, feedbackSchema } from "@/lib/utils"

const page = () => {
  return (
    <>
    <section className="card-cta">
      <div className="flex flex-col gap-6 max-w-lg">
        <h2>Get Interview-Ready <br /> with AI-powered<br /> Practice & Feedback</h2>
      <p className="text-lg">
        Practice real interview questions and receive instant, AI-driven feedback to sharpen your skills and boost your confidence.
      </p>
      <Button asChild className="btn-primary max-sm:w-full">
    <Link href="/interview">Start an interview</Link>
      </Button>
      </div>
      <Image src="/assets/robot.png" alt="robo-dude" width={400} height={400}
      className="max-sm:hidden" />
      
    </section>
    <section className="flex flex-col gap-6 mt-8">
    <h2>
      Your interviews
      
    </h2>
    <div className="interviews-section">
      {dummyInterviews.map((interview) => (
  <InterviewCard key={interview.id} {...interview} />
))}



      </div>
    </section>
    <section className="flex flex-col gap-6 mt-8">
      <h2>Take an Interview</h2>
      <div className="interviews-section">
        {dummyInterviews.map((interview) => (
  <InterviewCard key={interview.id} {...interview} />
))}


        
      </div>
    </section>

    </>
  )
}

export default page