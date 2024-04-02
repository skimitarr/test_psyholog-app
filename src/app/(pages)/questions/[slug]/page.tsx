import { redirect } from "next/navigation";
import Image from "next/image";
import { collection, doc, getDocs } from "firebase/firestore";

import { db } from "@/app/dataBase/firebase";
import { getDBQuestion } from "@/app/dataBase/databaseServices";
import { Question } from "@/app/store/types";
import AddLikeBtn from "@/app/components/AddLikeBtn";
import YoutubeAsideList from "@/app/components/YoutubeAsideList";

// это код для создания ssg в серверных компонентах
export const dynamicParams = false;
export const generateStaticParams = async () => {
  const questionsRef = collection(db, 'questions');
  const querySnapshot = await getDocs(questionsRef);
  const slugs = querySnapshot.docs.map(doc => ({ slug: doc.id }));
  return slugs;
}

export default async function Question(params: { params: { slug?: string } }) {
  let slug = '';
  if (params.params && typeof params.params.slug === "string") {
    slug = params.params.slug;
  }
  if (!slug) {
    redirect("/error");
  }

  let question = await getDBQuestion(doc(db, "questions", slug)) as Question;
  const sortedAnswers = [...question.answers];
  sortedAnswers.sort((a, b) => {
    return b.likes.length - a.likes.length;
  });
  question = { ...question, answers: sortedAnswers };

  return (
    <div className="grid grid-cols-[27.4%_45.2%_27.4%]">
      <aside className="p-[30px] pl-[120px]" >
        <YoutubeAsideList />
      </aside>
      <section className="flex justify-center p-[30px]">
        <div className="h-fit p-2 rounded-xl shadow-[0_11px_9px_6px_rgba(0,0,0,0.3)]">
          <h2 className="m-3 py-2 text-center bg-yellow-400 rounded-xl font-medium text-gray-600">
            {question.title}
          </h2>
          {question.answers && question.answers.length > 0 &&
            question.answers.map((answer, index) => (
              <article className="m-3 mt-5" key={answer.id}>
                <h2 className="mb-2 -mt-2 font-medium">{answer.title}</h2>
                <p className="font-thin">{answer.text}</p>
                <div className="mt-2">
                  <AddLikeBtn answer={answer} slug={slug} />
                </div>
                {index !== question.answers.length - 1 && <hr className="h-[1px] mt-4 border-0 bg-gray-400 mx-5" />}
              </article>
            ))}
        </div>
      </section>

      <div className="p-[30px] pr-0">
        <Image src="/imageMan.webp" width={500} height={993} alt="Picture of the author" />
      </div>
    </div>
  )
}
