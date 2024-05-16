const NINJA_QUOTES_API = 'https://api.api-ninjas.com/v1/quotes';

export const fetchSentence = async (): Promise<string> => {

  try {
    const response = await fetch(NINJA_QUOTES_API, {
      method: 'GET',
      headers: {
        'X-Api-Key': process.env.NINJA_API_KEY || '',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch sentence');
    }

    const data = await response.json();

    return data[0].quote;
  } catch (error) {
    console.error('Error fetching shortcuts:', error);
    throw error;
  }
}

export const fetchShortSentence = async (): Promise<string> => {

  let sentence = await fetchSentence();

  while (sentence.length > 100) {
    sentence = await fetchSentence();
  }

  return sentence;
}

export const fetchShortcuts = async (): Promise<any> => {
  try {
    const serverDomain = process.env.SERVER_DOMAIN || 'http://localhost:3000';
    const response = await fetch(`${serverDomain}/shortcuts`);

    if (!response.ok) {
      throw new Error('Failed to fetch shortcuts');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching shortcuts:', error);
    throw error;
  }
}

export const fetchMovies = async (): Promise<any> => {
  try {
    const serverDomain = process.env.SERVER_DOMAIN || 'http://localhost:3000';
    const response = await fetch(`${serverDomain}/movies`);

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}
