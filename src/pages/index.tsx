import Head from 'next/head';
import Header from '@components/layout/header';
import Footer from '@components/layout/footer';
import Link from 'next/link';
import { useAppSelector } from '~/store';
import JobQuestionsForm from '@components/jobQuestions/JobQuestionsForm';
import router from 'next/router';

export default function Home() {
  const config = useAppSelector((state) => state.userConfig);
  const theme = config.theme;
  const language = config.language;
  const handleStepChange = (step: number) => {
    console.log('step', step);
    router.push({
      pathname: '/kitchen',
      query: {
        step: 1,
      },
    });
  };

  return (
    <>
      <Header />
      <div className="overflow-hidden rounded-t-3xl bg-white">
        <div className="px-8 pt-20">
          <div className="mx-auto text-center md:max-w-2xl">
            <span className="mb-3 inline-block text-sm font-bold uppercase tracking-widest text-blue-500">
              Best caption here {language} {theme}
            </span>
            <h1 className="font-heading mb-6 text-5xl font-black tracking-tight text-gray-900 lg:text-6xl">
              Looking for the best deal on cabinets?
            </h1>
            <p className="mb-8 text-xl font-bold">
              Get a cabinet quote today and see how much you can save!
            </p>
            <div className="-m-2 mb-20 flex flex-wrap justify-center">
              <div className="w-full p-2 md:w-auto">
                <JobQuestionsForm handleStepChange={handleStepChange} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
