export const loadMoreData = (allData, currentLength, chunkSize = 6) => {
  const nextChunk = allData.slice(currentLength, currentLength + chunkSize);
  return nextChunk;
};