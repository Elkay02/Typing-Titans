const NINJA_QUOTES_API = 'https://api.api-ninjas.com/v1/quotes';

export const fetchSentence = async (): Promise<string> => {

  const response = await fetch(NINJA_QUOTES_API, {
    method: 'GET',
    headers: {
      'X-Api-Key': process.env.VITE_API_KEY || '',
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch sentence');
  }

  const data = await response.json();

  return data[0].quote;
}

export const fetchShortSentence = async (): Promise<string> => {

  let sentence = await fetchSentence();

  while (sentence.length > 100) {
    sentence = await fetchSentence();
  }

  return sentence;
}
