import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { signInWithGoogle, auth } from '../firebase/firebase.utils';

export default function Login() {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      email: 'sunnymalta11@gmail.com',
      password: 'Mohit@12',
    },
  });

  const [submitting, setSubmitting] = useState(false);
  return (
    <form
      onSubmit={handleSubmit(async (formData) => {
        const { email, password } = formData;
        setSubmitting(true);
        try {
          const user = await auth.signInWithEmailAndPassword(email, password);
          console.log('TCL: user', user);
        } catch (error) {
          console.log('Error logging in', error);
        }
        setSubmitting(false);
      })}
    >
      <div>
        <label htmlFor="email">
          Email
          <input
            type="text"
            name="email"
            id="email"
            ref={register({
              required: 'Please enter Email Address',
            })}
          />
        </label>
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            ref={register({
              required: 'Please Enter your Password',
            })}
          />
        </label>
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <div>
        <button type="submit" disabled={submitting}>
          Login
        </button>
        <button type="button" onClick={signInWithGoogle}>
          Sign In with Google
        </button>
      </div>
    </form>
  );
}
