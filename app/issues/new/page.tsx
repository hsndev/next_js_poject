'use client'
import { Button, Callout, TextArea, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/validationSchemas'
import { z } from 'zod'
import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'

type IssueForm = z.infer<typeof createIssueSchema>;

// interface IssueForm {
//     title: String;
//     description: String;
// }



const NewIssuePage = () => {
    const [error, setError] = useState('');
    const [addStatus, setAddStatus] = useState('');
    const router = useRouter();
    const { register, handleSubmit, formState: { isSubmitted, errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });


    const onSubmit = handleSubmit(async (data) => {
        try {
            // externilaser cette ligne si vraiment on cree des issuer ailleur 
            await axios.post('/api/issues', data);
            router.push('/issues');
            setAddStatus('New bug added with succes.');
        }
        catch (error) {
            console.log("error = ", error);
            setError('An Exception error occured.');
        }
    })

    return (
        <div className="max-w-xl space-y-3">
            {
                error && (
                    <Callout.Root color='red'>
                        <Callout.Icon>
                            <CrossCircledIcon />
                        </Callout.Icon>
                        <Callout.Text>{error}</Callout.Text>
                    </Callout.Root>
                )
            }
            {
                addStatus && (
                    <Callout.Root color='green'>
                        <Callout.Icon>
                            <CheckCircledIcon />
                        </Callout.Icon>
                        <Callout.Text>{addStatus}</Callout.Text>
                    </Callout.Root>
                )
            }

            <form className='space-y-3' onSubmit={onSubmit}>
                <TextField.Root placeholder="new issue" {...register('title')}>
                    <TextField.Slot />
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <TextArea placeholder="Add a description" {...register('description')} />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitted && !errors}>Add new issue {isSubmitted && !errors && <Spinner />} </Button>
            </form >
        </div>
    )
}

export default NewIssuePage