import { HandshakeJobDataType } from '@/utils/db/schema';

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(async ({ reason }) => {
    if (reason !== 'install') return;

    // Open a tab on install
    await browser.tabs.create({
      url: browser.runtime.getURL('/spa.html'),
      active: true,
    });
  });

  // Send Handshake request to fetch data
  browser.runtime.onMessage.addListener(
    async (message, sender, sendResponse) => {
      if (message.type === 'Handshake-fetchJobData') {
        const { jobId, token } = message.data;
        const data = await fetchJobData(jobId, token);
        // __AUTO_GENERATED_PRINT_VAR_START__
        console.log('foo', data); // __AUTO_GENERATED_PRINT_VAR_END__
        sendResponse(data);
      }
    }
  );
});

async function fetchJobData(jobId: number, token: string) {
  const response = await fetch('https://app.joinhandshake.com/hs/graphql', {
    method: 'POST',
    credentials: 'include', // includes cookies automatically
    headers: {
      'Content-Type': 'application/json',
      'x-csrf-token': token, // still required
    },
    body: JSON.stringify({
      operationName: 'JobSearchQuery',
      variables: {
        first: 25,
        after: 'MA==',
        input: {
          filter: { jobIds: [jobId] }, // only fetch the job you care about
          sort: { direction: 'ASC', field: 'RELEVANCE' },
        },
      },
      query: `query JobSearchQuery($first: Int, $after: String, $input: JobSearchInput) {
        jobSearch(first: $first, after: $after, input: $input) {
          edges {
            node {
              job {
                id
                title
                description
                employer { id name logo { url } }
              }
            }
          }
        }
      }`,
    }),
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}
