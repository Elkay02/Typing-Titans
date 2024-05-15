const server = import.meta.env.VITE_SERVER_DOMAIN || 'http://localhost:3000';

export async function updateProgress(id: number, speed: number, accuracy: number) {
  const url = `${server}/daily`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: id,
        newDate: new Date(),
        newSpeed: speed,
        newAccuracy: accuracy
      })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data
  } catch (error) {
    console.error('Error fetching progress:', error);
  }
}


export async function fetchProgress(id: number, day: Date) {
  const url = `${server}/daily`;
  const dateString = day.toISOString().slice(0, 10);  // Format date as YYYY-MM-DD

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: id,
        date: dateString
      })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();  // Assuming the server sends back JSON
  } catch (error) {
    console.error('Error fetching progress:', error);
  }
}

export async function fetchDailySentence() {
  const url = `${server}/daily/api`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    return data.quote.slice(0, -1);
  } catch (error) {
    console.error('Error fetching daily sentence:', error);
  }
}

