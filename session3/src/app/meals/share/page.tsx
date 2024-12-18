'use client'
import { shareMeal } from '@/actions/mealActions'
import ImagePicker from '@/components/imagePicker'
import FormSubmit from '@/components/submitButton'
import classes from './page.module.css'
import { useActionState } from 'react'

export default function ShareMealPage() {
  const [formState, formAction] = useActionState<{ message: string }>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    shareMeal as any,
    { message: '' },
  )

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        {formState.message && <p>{formState.message}</p>}
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor='name'>Your name</label>
              <input type='text' id='name' name='name' required />
            </p>
            <p>
              <label htmlFor='email'>Your email</label>
              <input type='email' id='email' name='email' required />
            </p>
          </div>
          <p>
            <label htmlFor='title'>Title</label>
            <input type='text' id='title' name='title' required />
          </p>
          <p>
            <label htmlFor='summary'>Short Summary</label>
            <input type='text' id='summary' name='summary' required />
          </p>
          <p>
            <label htmlFor='instructions'>Instructions</label>
            <textarea
              id='instructions'
              name='instructions'
              rows={10}
              required
            ></textarea>
          </p>
          <ImagePicker />
          <p className={classes.actions}>
            <FormSubmit label='Share Meal' />
          </p>
        </form>
      </main>
    </>
  )
}
