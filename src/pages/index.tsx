import Head from 'next/head';
import Header from '@components/layout/header';
import Footer from '@components/layout/footer';
import Link from 'next/link';
import { useAppSelector } from '~/store';

export default function Home() {
  const config = useAppSelector((state) => state.userConfig);
  const theme = config.theme;
  const language = config.language;

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
              Build what you imagine
            </h1>
            <p className="mb-8 text-xl font-bold">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              venenatis volutpat velit, quis iaculis velit bibendum a. Maecenas
              accumsan fermentum nisl.
            </p>
            <div className="-m-2 mb-20 flex flex-wrap justify-center">
              <div className="w-full p-2 md:w-auto">
                <Link
                  className="block w-full rounded-full bg-blue-500 px-8 py-3.5 text-center text-lg font-bold text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-200"
                  href="/kitchen"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
