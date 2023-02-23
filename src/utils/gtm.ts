export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;

type window = {
  dataLayer: {
    push: (arg: { event: string; page: string }) => void;
  };
};

export const pageview = (url: string) => {
  const dataLayer = (window as unknown as window).dataLayer;
  try {
    dataLayer.push({
      event: 'pageview',
      page: url,
    });
  } catch (e) {
    console.error('gtm error ', e);
  }
};
