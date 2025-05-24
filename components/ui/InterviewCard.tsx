import React from 'react'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'

import { getRandomInterviewCover } from '@/app/lib/utils'
import { Button } from './button'
import DisplayTechIcons from './DisplayTechIcons'

interface InterviewCardProps {
  id: string
  userId: string
  role: string
  type: string
  techstack: string[]
  level: string
  questions: string[]
  finalized: boolean
  createdAt: string
}

const InterviewCard = ({
  id,
  userId,
  role,
  type,
  techstack,
  level,
  questions,
  finalized,
  createdAt,
}: InterviewCardProps) => {
  const feedback = null as Feedback | null
  const normalizedType = /mix/gi.test(type) ? 'Mixed' : type
  const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format('MMM D, YYYY')

  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-96">
      <div className="card-interview">
        <div>
          <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
            <p className="badge-text">{normalizedType}</p>
          </div>

          <Image
            src={getRandomInterviewCover()}
            alt="cover image"
            width={90}
            height={90}
            className="rounded-full object-cover size-[90px]"
          />

          <h3 className="mt-5 capitalize">{role} interview</h3>

          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2 items-center">
              <Image src="/images/calendar.svg" alt="calendar" width={22} height={22} />
              <p>{formattedDate}</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Image src="/images/star.svg" alt="star" width={22} height={22} />
              <p>{feedback?.totalScore ?? '---'}/100</p>
            </div>
          </div>

          <p className="line-clamp-2 mt-5">
            {feedback?.finalAssessment ?? "You haven't taken the interview yet. Take it now to improve your skills."}
          </p>
        </div>

        <div className="flex flex-row justify-between items-center mt-4">
          <DisplayTechIcons techStack={techstack} />
          <Button className="btn-primary">
            <Link href={feedback ? `/interviews/${id}/feedback` : `/interviews/${id}`}>
              {feedback ? 'Check Feedback' : 'View Interview'}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default InterviewCard
