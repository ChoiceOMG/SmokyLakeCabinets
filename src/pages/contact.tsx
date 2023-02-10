import Head from 'next/head';
import Image from 'next/image';

import Header from '@components/layout/header';

import Footer from '@components/layout/footer';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <section className="overflow-hidden bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="overflow-hidden rounded-3xl bg-white py-16 px-8">
            <div className="mx-auto max-w-5xl">
              <div className="mx-auto mb-10 text-center md:max-w-md">
                <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-blue-500">
                  Contact Us
                </span>
                <h2 className="font-heading mb-6 text-4xl font-black tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                  Get connected
                </h2>
                <p className="font-bold text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Malesuada tellus vestibulum, commodo pulvinar.
                </p>
              </div>
              <form className="rounded-3xl border border-gray-100 bg-gray-100 p-10">
                <div className="-m-5 mb-1 flex flex-wrap">
                  <div className="w-full p-5 md:w-1/2">
                    <label
                      className="mb-2 block text-sm font-bold text-gray-500"
                      htmlFor="contactLightReverseInput2-1"
                    >
                      Full Name
                    </label>
                    <input
                      className="w-full appearance-none rounded-full bg-white px-6 py-3.5 text-lg font-bold text-gray-500 placeholder-gray-500 outline-none focus:ring-4 focus:ring-blue-200"
                      id="contactLightReverseInput2-1"
                      type="text"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="w-full p-5 md:w-1/2">
                    <label
                      className="mb-2 block text-sm font-bold text-gray-500"
                      htmlFor="contactLightReverseInput2-2"
                    >
                      Emaill address
                    </label>
                    <input
                      className="w-full appearance-none rounded-full bg-white px-6 py-3.5 text-lg font-bold text-gray-500 placeholder-gray-500 outline-none focus:ring-4 focus:ring-blue-200"
                      id="contactLightReverseInput2-2"
                      type="text"
                      placeholder="Email address"
                    />
                  </div>
                </div>
                <div className="-m-5 flex flex-wrap">
                  <div className="w-full p-5 md:w-1/2">
                    <label
                      className="mb-2 block text-sm font-bold text-gray-500"
                      htmlFor="contactLightReverseInput2-3"
                    >
                      Phone
                    </label>
                    <input
                      className="w-full appearance-none rounded-full bg-white px-6 py-3.5 text-lg font-bold text-gray-500 placeholder-gray-500 outline-none focus:ring-4 focus:ring-blue-200"
                      id="contactLightReverseInput2-3"
                      type="text"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="w-full p-5 md:w-1/2">
                    <label
                      className="mb-2 block text-sm font-bold text-gray-500"
                      htmlFor="contactLightReverseInput2-4"
                    >
                      Subject
                    </label>
                    <input
                      className="w-full appearance-none rounded-full bg-white px-6 py-3.5 text-lg font-bold text-gray-500 placeholder-gray-500 outline-none focus:ring-4 focus:ring-blue-200"
                      id="contactLightReverseInput2-4"
                      type="text"
                      placeholder="Type your subject"
                    />
                  </div>
                </div>
                <div className="-m-3.5 flex flex-wrap">
                  <div className="w-full p-3.5">
                    <label
                      className="mb-2 block text-sm font-bold text-gray-500"
                      htmlFor="contactLightReverseInput2-5"
                    >
                      Message
                    </label>
                    <textarea
                      className="w-full appearance-none rounded-3xl bg-white px-6 py-5 text-lg font-bold text-gray-500 placeholder-gray-500 outline-none focus:ring-4 focus:ring-blue-200"
                      id="contactLightReverseInput2-5"
                      rows={8}
                      placeholder="Enter your message"
                    ></textarea>
                  </div>
                  <div className="w-full p-3.5">
                    <div className="-m-2 flex flex-wrap items-center">
                      <div className="w-full p-2 md:w-1/2">
                        <div className="flex">
                          <input
                            className="absolute h-5 w-5 opacity-0"
                            id="contactLightReverseCheckbox2-1"
                            type="checkbox"
                          />
                          <div className="mr-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border border-gray-200 bg-white text-transparent">
                            <svg
                              width="9"
                              height="7"
                              viewBox="0 0 9 7"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0.603516 3.77075L2.68685 5.85409L7.89518 0.645752"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                            </svg>
                          </div>
                          <label
                            className="text-sm font-bold text-gray-500"
                            htmlFor="contactLightReverseCheckbox2-1"
                          >
                            I’d llike to occasionally receive other
                            communication from Zanrly, such as content and
                            product news.
                          </label>
                        </div>
                      </div>
                      <div className="w-full p-2 md:w-1/2">
                        <div className="-m-2 flex flex-wrap md:justify-end">
                          <div className="w-full p-2 md:w-auto">
                            <a
                              className="block w-full rounded-full bg-blue-500 px-8 py-3.5 text-center text-lg font-bold text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 md:px-16"
                              href="#"
                            >
                              Send Message
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <div className="-m-4 flex flex-wrap">
                <div className="w-full p-4 md:w-1/3">
                  <div className="h-full rounded-3xl p-10 text-center">
                    <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 16C14 17.77 13.23 19.37 12 20.46C10.94 21.42 9.54 22 8 22C4.69 22 2 19.31 2 16C2 13.9753 3.01397 12.1814 4.5554 11.0973C4.80358 10.9228 5.1393 11.0422 5.27324 11.3144C6.21715 13.2332 7.95419 14.6699 10.02 15.23C10.65 15.41 11.31 15.5 12 15.5C12.4872 15.5 12.9539 15.4538 13.4074 15.3687C13.6958 15.3146 13.9828 15.4995 13.9955 15.7925C13.9985 15.862 14 15.9314 14 16Z"
                          fill="#3B82F6"
                        ></path>
                        <path
                          d="M18 8C18 8.78 17.85 9.53 17.58 10.21C16.89 11.95 15.41 13.29 13.58 13.79C13.08 13.93 12.55 14 12 14C11.45 14 10.92 13.93 10.42 13.79C8.59 13.29 7.11 11.95 6.42 10.21C6.15 9.53 6 8.78 6 8C6 4.69 8.69 2 12 2C15.31 2 18 4.69 18 8Z"
                          fill="#3B82F6"
                        ></path>
                        <path
                          d="M22 16C22 19.31 19.31 22 16 22C15.2555 22 14.5393 21.8643 13.8811 21.6141C13.5624 21.4929 13.503 21.0851 13.7248 20.8262C14.8668 19.4938 15.5 17.786 15.5 16C15.5 15.66 15.47 15.32 15.42 15V15C15.3902 14.8155 15.4844 14.6342 15.6478 14.5437C16.9719 13.8107 18.0532 12.6875 18.727 11.3153C18.8609 11.0427 19.1968 10.923 19.4452 11.0977C20.9863 12.1818 22 13.9755 22 16Z"
                          fill="#3B82F6"
                        ></path>
                      </svg>
                    </div>
                    <h3 className="font-heading mb-2 text-xl font-black text-gray-900">
                      Send Email
                    </h3>
                    <p className="font-bold text-gray-500">info@zanrly.com</p>
                    <p className="font-bold text-gray-500">
                      support@zanrly.com
                    </p>
                  </div>
                </div>
                <div className="w-full p-4 md:w-1/3">
                  <div className="h-full rounded-3xl p-10 text-center">
                    <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 16C14 17.77 13.23 19.37 12 20.46C10.94 21.42 9.54 22 8 22C4.69 22 2 19.31 2 16C2 13.9753 3.01397 12.1814 4.5554 11.0973C4.80358 10.9228 5.1393 11.0422 5.27324 11.3144C6.21715 13.2332 7.95419 14.6699 10.02 15.23C10.65 15.41 11.31 15.5 12 15.5C12.4872 15.5 12.9539 15.4538 13.4074 15.3687C13.6958 15.3146 13.9828 15.4995 13.9955 15.7925C13.9985 15.862 14 15.9314 14 16Z"
                          fill="#3B82F6"
                        ></path>
                        <path
                          d="M18 8C18 8.78 17.85 9.53 17.58 10.21C16.89 11.95 15.41 13.29 13.58 13.79C13.08 13.93 12.55 14 12 14C11.45 14 10.92 13.93 10.42 13.79C8.59 13.29 7.11 11.95 6.42 10.21C6.15 9.53 6 8.78 6 8C6 4.69 8.69 2 12 2C15.31 2 18 4.69 18 8Z"
                          fill="#3B82F6"
                        ></path>
                        <path
                          d="M22 16C22 19.31 19.31 22 16 22C15.2555 22 14.5393 21.8643 13.8811 21.6141C13.5624 21.4929 13.503 21.0851 13.7248 20.8262C14.8668 19.4938 15.5 17.786 15.5 16C15.5 15.66 15.47 15.32 15.42 15V15C15.3902 14.8155 15.4844 14.6342 15.6478 14.5437C16.9719 13.8107 18.0532 12.6875 18.727 11.3153C18.8609 11.0427 19.1968 10.923 19.4452 11.0977C20.9863 12.1818 22 13.9755 22 16Z"
                          fill="#3B82F6"
                        ></path>
                      </svg>
                    </div>
                    <h3 className="font-heading mb-2 text-xl font-black text-gray-900">
                      Call Us
                    </h3>
                    <p className="font-bold text-gray-500">+1 8424 199 941</p>
                    <p className="font-bold text-gray-500">+1 0221 234 554</p>
                  </div>
                </div>
                <div className="w-full p-4 md:w-1/3">
                  <div className="h-full rounded-3xl p-10 text-center">
                    <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 16C14 17.77 13.23 19.37 12 20.46C10.94 21.42 9.54 22 8 22C4.69 22 2 19.31 2 16C2 13.9753 3.01397 12.1814 4.5554 11.0973C4.80358 10.9228 5.1393 11.0422 5.27324 11.3144C6.21715 13.2332 7.95419 14.6699 10.02 15.23C10.65 15.41 11.31 15.5 12 15.5C12.4872 15.5 12.9539 15.4538 13.4074 15.3687C13.6958 15.3146 13.9828 15.4995 13.9955 15.7925C13.9985 15.862 14 15.9314 14 16Z"
                          fill="#3B82F6"
                        ></path>
                        <path
                          d="M18 8C18 8.78 17.85 9.53 17.58 10.21C16.89 11.95 15.41 13.29 13.58 13.79C13.08 13.93 12.55 14 12 14C11.45 14 10.92 13.93 10.42 13.79C8.59 13.29 7.11 11.95 6.42 10.21C6.15 9.53 6 8.78 6 8C6 4.69 8.69 2 12 2C15.31 2 18 4.69 18 8Z"
                          fill="#3B82F6"
                        ></path>
                        <path
                          d="M22 16C22 19.31 19.31 22 16 22C15.2555 22 14.5393 21.8643 13.8811 21.6141C13.5624 21.4929 13.503 21.0851 13.7248 20.8262C14.8668 19.4938 15.5 17.786 15.5 16C15.5 15.66 15.47 15.32 15.42 15V15C15.3902 14.8155 15.4844 14.6342 15.6478 14.5437C16.9719 13.8107 18.0532 12.6875 18.727 11.3153C18.8609 11.0427 19.1968 10.923 19.4452 11.0977C20.9863 12.1818 22 13.9755 22 16Z"
                          fill="#3B82F6"
                        ></path>
                      </svg>
                    </div>
                    <h3 className="font-heading mb-2 text-xl font-black text-gray-900">
                      Address
                    </h3>
                    <p className="font-bold text-gray-500">
                      380 St Killda Road, Mellbourne
                    </p>
                    <p className="font-bold text-gray-500">
                      VIC 3004, Australia
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}