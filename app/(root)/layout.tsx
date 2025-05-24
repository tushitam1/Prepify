'use client'

import React, { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  children: ReactNode
}

const RootLayout = ({ children }: Props) => {
  
  return (
    <div className="root-layout">
      <nav className="p-4 shadow flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.svg" alt="Logo" width={38} height={32} />
          <h2 className="text-primary-100 text-xl font-bold">Prepify</h2>
        </Link>
      </nav>
      <main>{children}</main>
    </div>
  )
}

export default RootLayout
