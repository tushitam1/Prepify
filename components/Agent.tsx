import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

// 1. Fix enum syntax (commas!)
enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

// 2. Define props type
interface AgentProps {
  userName: string
  callStatus: CallStatus
  isSpeaking: boolean
}

export const Agent = ({ userName }: AgentProps) => {
  const callStatus=CallStatus.FINISHED;
  const isSpeaking=true;
  const messages=[
    'Whats your name?',
    'My name is John,nice talking to you'
  ];
  const lastMessage=messages[messages.length-1];
    return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/images/ai-avatar.png"
              alt="vapi"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak"></span>}
          </div>
          <h3>AI Interview</h3>
        </div>

        <div className="card-border">
          <div className="card-content">
            <Image
              src="/images/user-avatar.png"
              alt="user avatar"
              width={540}
              height={540}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>
      {messages.length>0 && (
        <div className="transcrip-border">
            <div className="transcript">
                <p key={lastMessage} className={cn('transition-opacity duration-500 opacity-0','animate-fadeIn opacity-100 ')}>
                    {lastMessage}

                </p>
            </div>
        </div>
      ) }

      <div className="w-full flex justify-center mt-4">
        {callStatus !== CallStatus.ACTIVE ? (
          <button className="relative btn-call">
            <span className={cn('absolute animate-ping rounded-full opacity-75',callStatus!=='CONNECTING' &'hidden')}
              />
                <span>
                {callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED
                ? 'Call'
                : '...'}
                </span>
            
          </button>
        ) : (
          <button className="btn-disconnect">End</button>
        )}
      </div>
    </>
  )
}
