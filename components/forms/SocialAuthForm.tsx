"use client";
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { toast } from 'sonner';
import ROUTES from '@/constants/routes';
import { signIn } from 'next-auth/react';

const SocialAuthForm = () => {
    const btnClasses = 'background-dark400_light900 body-menium text-dark200_light800 rounded-2 min-h-12 flex-1 px-4 py-3.5';
    const handleSignIn = async (provider: "github" | "google") => {
        try {
            await signIn(provider,{
                callbacUrl: ROUTES.HOME,
                redirect: false,
            });
           
        } catch (error) {
            console.error(error);
            toast.error("Sign In Failed", {
                description: error instanceof Error ? error.message : "An error occurred while signing in",
            });
        }
    };
  return (
    <div className='mt-10 flex flex-wrap gap-2.5'>
        <Button className={btnClasses} onClick={() => handleSignIn('github')}>
            <Image
                src={'/icons/github.svg'}
                width={20}
                height={20}
                alt='Github Logo'
                className='invert-colors mr-2.5 object-contain'
            />
            <span>Log in with GitHub</span>
        </Button>
        <Button className={btnClasses} onClick={() => handleSignIn('google')}>
            <Image
                src={'/icons/google.svg'}
                width={20}
                height={20}
                alt='Github Logo'
                className='invert-colors mr-2.5 object-contain'
            />
            <span>Log in with Google</span>
        </Button>
    </div>
  )
}

export default SocialAuthForm