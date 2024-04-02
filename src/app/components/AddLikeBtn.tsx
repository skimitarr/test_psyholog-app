'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { doc } from "firebase/firestore";

import like from '../../../public/like.svg';
import redLike from '../../../public/redLike.svg';
import { db } from '@/app/dataBase/firebase';
import { getDBQuestion, updateDbAnswerLikes } from '@/app/dataBase/databaseServices';
import { Answer, Question } from "../store/types";
import { useGetCurrentUser } from '../PersonalHooks/useFirebaseAuth';

export default function AddLikeBtn({ answer, slug }: { answer: Answer, slug: string }) {
  const [updatedAnswer, setUpdatedAnswer] = useState(answer);
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();
  const currentUser = useGetCurrentUser();

  useEffect(() => {
    const currentUser = localStorage.getItem('key');
    if (currentUser && updatedAnswer.likes.includes(currentUser)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [updatedAnswer])

  const addLike = async (id: string) => {
    if (currentUser && currentUser.email) {
      const userEmail = currentUser.email;
      localStorage.setItem('key', userEmail);
      const index = updatedAnswer.likes.findIndex((item: string) => item === userEmail);

      if (index !== -1) {
        updatedAnswer.likes.splice(index, 1);
      } else {
        updatedAnswer.likes.push(userEmail);
      }

      await updateDbAnswerLikes((doc(db, 'questions', slug)), updatedAnswer, id);

      let question = await getDBQuestion(doc(db, 'questions', slug)) as Question;
      const updatedAnswers = [...question.answers];
      const updatedAnswerIndex = question.answers.findIndex((answer: Answer) => answer.id === id);
      setUpdatedAnswer(updatedAnswers[updatedAnswerIndex]);
    } else {
      router.push('/registration');
    }
  };

  return (
    <>
      <button onClick={() => { addLike(answer.id) }}>
        <Image src={isLiked && currentUser ? redLike : like} width={14} height={13} className='-mt-4' alt='like' />
      </button>
      <p className='text-[13px] -mt-2'>{updatedAnswer.likes.length}</p>
    </>
  )
}
