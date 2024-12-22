import rookie from '@rookie-rs/api';

const res = await fetch(
  'https://app.joinhandshake.com/stu/postings?category=Posting&ajax=true&including_all_facets_in_searches=true&page=1&per_page=25&sort_direction=desc&sort_column=default&_=1734355282760',
  {
    credentials: 'include',
    headers: {
      Accept: 'application/json, text/javascript, */*; q=0.01',
      'X-Requested-With': 'XMLHttpRequest',
      cookie: rookie
        .load(['joinhandshake.com'])
        .map(({ name, value }) => `${name}=${value}`)
        .join('; '),
    },
  },
);
const data = (await res.json()) as any as HandShakeJobPostRes;
data.results.forEach((el) => {
  console.log(el);
  console.log(el.job);
});
