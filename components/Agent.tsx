'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { vapi } from '@/lib/vapi.sdk'

// Types and enums
enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

interface SavedMessage {
  role: 'user' | 'system' | 'assistant'
  content: string
}

interface AgentProps {
  userName: string
  userId: string
  type: string
}

type StartOptions = {
  variables: {
    role: string
    Type: string
    Level: string
    Techstack: string
    Amount: string
  }
}

export const Agent = ({ userName, userId, type }: AgentProps) => {
  const router = useRouter()
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE)
  const [messages, setMessages] = useState<SavedMessage[]>([])

  // Redirect to home after call finishes
  useEffect(() => {
    if (callStatus === CallStatus.FINISHED) {
      router.push('/')
    }
  }, [callStatus, router])

  const handleDisconnect = async () => {
    await vapi.stop()
    setCallStatus(CallStatus.FINISHED)
  }

  const handleCall = async () => {
    try {
      setCallStatus(CallStatus.CONNECTING)
      console.log("API Key:", process.env.NEXT_PUBLIC_VAPI_KEY);
console.log("Workflow ID:", process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID);

     await vapi.start(
  process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!,
  {
   variables: {
    role: 'frontend developer',
    Type: type,
    Level: 'mid-level',
    Techstack: 'react, typescript',
    Amount: '5',
    },
  } as StartOptions
)

    } catch (err) {
      console.error('Error starting call:', err)
      setCallStatus(CallStatus.FINISHED)
    }
  }

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE)
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED)
    const onSpeechStart = () => setIsSpeaking(true)
    const onSpeechEnd = () => setIsSpeaking(false)
    const onError = (error: Error) => console.error('Vapi Error:', error)

    const onMessage = (message: any) => {
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        const newMessage: SavedMessage = {
          role: message.role || 'assistant',
          content: message.transcript,
        }
        setMessages(prev => [...prev, newMessage])
      }
    }

    vapi.on('call-start', onCallStart)
    vapi.on('call-end', onCallEnd)
    vapi.on('message', onMessage)
    vapi.on('speech-start', onSpeechStart)
    vapi.on('speech-end', onSpeechEnd)
    vapi.on('error', onError)

    return () => {
      vapi.off('call-start', onCallStart)
      vapi.off('call-end', onCallEnd)
      vapi.off('message', onMessage)
      vapi.off('speech-start', onSpeechStart)
      vapi.off('speech-end', onSpeechEnd)
      vapi.off('error', onError)
    }
  }, [])

  const lastMessage = messages[messages.length - 1]

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
              width={120}
              height={120}
              className="rounded-full object-cover"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="transcrip-border">
          <div className="transcript">
            <p
              key={lastMessage?.content}
              className={cn(
                'transition-opacity duration-500 opacity-0',
                'animate-fadeIn opacity-100'
              )}
            >
              {lastMessage?.content}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center mt-4">
        {callStatus !== CallStatus.ACTIVE ? (
          <button onClick={handleCall} className="relative btn-call">
            <span
              className={cn(
                'absolute animate-ping rounded-full opacity-75',
                callStatus !== CallStatus.CONNECTING && 'hidden'
              )}
            />
            <span>
              {callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED
                ? 'Call'
                : '...'}
            </span>
          </button>
        ) : (
          <button onClick={handleDisconnect} className="btn-disconnect">
            End
          </button>
        )}
      </div>
    </>
  )
}
