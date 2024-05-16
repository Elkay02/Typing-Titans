export function similarity(string1, string2) {
  let distance = levenshteinDistance(string1, string2);
  let maxLength = Math.max(string1.length, string2.length);
  let similarity = 1 - (distance / maxLength);
  return similarity;
}

function levenshteinDistance(s, t) {
  if (s.length === 0) return t.length;
  if (t.length === 0) return s.length;

  let matrix = [];

  // Increment along the first column of each row
  for (let i = 0; i <= t.length; i++) {
    matrix[i] = [i];
  }

  // Increment each column in the first row
  for (let j = 0; j <= s.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (let i = 1; i <= t.length; i++) {
    for (let j = 1; j <= s.length; j++) {
      if (t.charAt(i - 1) === s.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1) // insertion/deletion
        );
      }
    }
  }

  return matrix[t.length][s.length];
}