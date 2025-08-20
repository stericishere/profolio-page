'use client'

import { SimpleNavbar } from '@/components/layout/SimpleNavbar'
import { SkillDetailSkeleton } from '@/components/ui/SkillDetailSkeleton'

export default function SkillDetailLoading() {
  return (
    <>
      <SimpleNavbar />
      <SkillDetailSkeleton />
    </>
  )
}