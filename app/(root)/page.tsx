import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { questions } from "@/constants/questions";
import ROUTES from "@/constants/routes";
import { api } from "@/lib/api";
import handleError from "@/lib/handlers/error";
import { SearchParams } from "@/types/global";
import Link from "next/link";


const Home = async ({searchParams} : SearchParams) => {
  const { page, pageSize, query, filter } = await searchParams;

  const filteredQuestions = questions.filter((question) => {
  const matchesQuery = question.title.toLowerCase().includes(query?.toLowerCase());
  const matchesFilter = filter ? question.tags.some(tag => tag.name.toLowerCase() === filter) : true;
  return matchesQuery && matchesFilter;
  });

  return (
    <>
      <section className="w-full flex flex-col-reverse md:flex-row justify-between items-center gap-4">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900" asChild>
          <Link href={ROUTES.ASK_QUESTION}>
            Ask a Question
          </Link>
        </Button>
      </section>
      <section className="mt-11">
      <LocalSearch route='/' imgSrc='/icons/search.svg' placeholder='Search for Questions here...' otherClasses="flex-1"/>
      </section>
      <HomeFilter />
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <QuestionCard key={question.title} question={question} />
          ))}
      </div>
    </>
  )
}

export default Home
