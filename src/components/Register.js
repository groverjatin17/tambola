import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { auth, createUserProfileDocument } from '../firebase/firebase.utils';
import { Redirect } from 'react-router-dom';

export default function Registration() {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      displayName: 'Sunny Malta',
      email: 'sunnymalta11@gmail.com',
      password: 'Mohit@12',
      confirmPassword: 'Mohit@12',
    },
  });
  const [submitting, setSubmitting] = useState(false);
  const [homepage, showHomepage] = useState(false);
  return (
    <>
      {!homepage ? (
        <form
          onSubmit={handleSubmit(async (formData) => {
            const { displayName, email, password, confirmPassword } = formData;
            if (password === confirmPassword) {
              setSubmitting(true);
              try {
                const { user } = await auth.createUserWithEmailAndPassword(
                  email,
                  password
                );
                console.log('user', user);
                await createUserProfileDocument(user, { displayName });
              } catch (error) {
                console.log('Error while registering user ', error);
              }
              setSubmitting(false);
              // showHomepage(true);
            }
          })}
        >
          <div>
            <label htmlFor="displayName">
              Name
              <input
                type="text"
                name="displayName"
                id="displayName"
                ref={register({
                  required: 'Please Enter your Name',
                  minLength: {
                    value: 8,
                    message: 'Name must be 8 Characters long',
                  },
                })}
              />
            </label>
            {errors.displayName && <p>{errors.displayName.message}</p>}
          </div>
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
                  minLength: {
                    value: 8,
                    message: 'Name must be 8 Characters long',
                  },
                  validate: (value) => {
                    return (
                      [
                        /[a-z]/,
                        /[A-Z]/,
                        /[0-9]/,
                        /[^a-zA-Z0-9]/,
                      ].every((pattern) => pattern.test(value)) ||
                      'Enter upper, lower, number and alpha'
                    );
                  },
                })}
              />
            </label>
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <div>
            <label htmlFor="confirmPassword">
              Confirm Password
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                ref={register({
                  required: 'Please Re-renter your Password',
                })}
              />
            </label>
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </div>
          <div>
            <button type="submit" disabled={submitting}>
              Register
            </button>
          </div>
        </form>
      ) : (
        <Redirect exact to="/" />
      )}
    </>
  );
}
