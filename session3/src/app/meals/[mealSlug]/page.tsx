import type { Metadata, NextPage } from 'next'
import React from 'react'
import classes from './page.module.css'
import Image from 'next/image'
import { getMeal } from '@/db/dbService'
import { notFound } from 'next/navigation'

interface MealDetailsProps {
  params: Promise<{ mealSlug: string }>
}

export const generateMetadata = async ({ params }: MealDetailsProps) => {
  const mealId = (await params).mealSlug

  const meal = await getMeal(mealId)

  if (!meal) {
    notFound()
  }

  const { title, summary } = meal
  return {
    title: title,
    description: summary,
  } as Metadata
}

const MealDetails: NextPage<MealDetailsProps> = async ({ params }) => {
  const mealId = (await params).mealSlug
  const meal = await getMeal(mealId)

  if (!meal) {
    notFound()
  }

  const { creator, instructions, image, title, summary, creator_email } = meal
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            fill
            src={`https://spyrus-nextjs-image.s3.ap-southeast-2.amazonaws.com/${image}`}
            alt={title}
          />
        </div>
        <div className={classes.headerText}>
          <h1>{title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${creator_email}`}>{creator}</a>
          </p>
          <p className={classes.summary}>{summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: instructions.replace(/\n/g, '<br/>'),
          }}
        />
      </main>
    </>
  )
}

export default MealDetails
