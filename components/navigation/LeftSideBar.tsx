import ROUTES from '@/constants/routes';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button';
import { auth, signOut } from '@/auth';
import { LogOut } from 'lucide-react';
import NavLinks from './navbar/NavLinks';

const LeftSideBar = async () => {
    const session = await auth();
    const userId = session?.user?.id;

    return (
        <section className='custom-scrollbar background-light900_dark200 light-border sticky left-0 top-0 flex h-screen w-fit flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]'>
            <div className='flex flex-1 flex-col gap-6'>
                <NavLinks userId={userId} />
            </div>
            <div className='flex flex-col gap-3'>
                {userId ? (
                    <form
                        action={async () => {
                            "use server";
                            await signOut();
                        }}
                    >
                        <Button
                            type='submit'
                            className='base-medium w-fit !bg-transparent px-4 py-3'>
                            <LogOut className='size-5 text-black dark:text-white' />
                            <span className='text-dark300_light900 max-lg:hidden'>Log Out</span>
                        </Button>
                    </form>
                ) : (
                    <>
                        <Button className='inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-9 small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none' asChild>
                            <Link href={ROUTES.SIGN_IN}>
                                <Image
                                    alt='login'
                                    width={20}
                                    height={20}
                                    src={'/icons/account.svg'}
                                    style={{ color: "transparent" }}
                                    className='invert-colors lg:hidden'
                                />
                                <span className='primary-text-gradient max-lg:hidden text-sm'>Log In</span>
                            </Link>
                        </Button>
                        <Button className='inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-slate-300 bg-slate-900 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-9 small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none' asChild>
                            <Link href={ROUTES.SIGN_UP}>
                                <Image
                                    alt='signup'
                                    width={20}
                                    height={20}
                                    src={'/icons/sign-up.svg'}
                                    style={{ color: "transparent" }}
                                    className='invert-colors lg:hidden'
                                />
                                <span className='max-lg:hidden text-sm'>Sign Up</span>
                            </Link>
                        </Button>
                    </>
                )}
            </div>
        </section >
    )
}

export default LeftSideBar