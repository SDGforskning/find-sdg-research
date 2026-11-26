const shortString = (value, length, reverse = false) => {
  const stopChars = [" ", "/", "&"];
  const acceptableShortness = length * 0.8;
  const text = reverse ? value.split("").reverse().join("") : value;
  let short = "";

  for (let index = 0; index < length - 1; index++) {
    short += text[index];
    if (index >= acceptableShortness && stopChars.indexOf(text[index]) >= 0) {
      break;
    }
  }

  if (reverse) {
    return short.split("").reverse().join("");
  }
  return short;
};

export const truncateUrl = (url, length = 50) => {
  if (url.length <= length) {
    return url;
  }

  const chunkLength = length / 2;
  const startChunk = shortString(url, chunkLength, false);
  const endChunk = shortString(url, chunkLength, true);
  return `${startChunk}...${endChunk}`;
};
