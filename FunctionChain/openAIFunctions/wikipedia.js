const fetchSearchResults = async (query) => {
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network response was not ok");
  const data = await response.json();
  return data.query.search.map(result => result.title);
};
const fetchPageContent = async (page) => {
  const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exlimit=max&explaintext&titles=${page}&format=json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network response was not ok");
  const data = await response.json();
  const pages = data.query.pages;
  const pageId = Object.keys(pages)[0];
  return pages[pageId].extract;
};

const execute = async (options) => {
  const { query, top_k_results = 3, doc_content_chars_max = 4000 } = options;

  const titles = await fetchSearchResults(query);
  let content = "";
  
  for (let i = 0; i < Math.min(top_k_results, titles.length); i++) {
    const pageContent = await fetchPageContent(titles[i]);
    content += `Page: ${titles[i]}\nSummary: ${pageContent.slice(0, doc_content_chars_max)}\n\n`;
  }

  return content || "No good Wikipedia Search Result was found";
};

const details = {
  name: 'wikipedia',
  description: 'Fetches top Wikipedia search results and their content for a given query',
  parameters: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'The search query',
      },
      top_k_results: {
        type: 'number',
        description: 'The number of top results to fetch',
      },
      doc_content_chars_max: {
        type: 'number',
        description: 'The maximum character limit for each search result content',
      },
    },
    required: ['query'],
  },
  example: 'Search for "JavaScript" on Wikipedia and get the content of the top 3 results',
};

export const wikipedia = {
  execute,
  details,
};
