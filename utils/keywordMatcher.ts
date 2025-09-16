// this should just use cosine of similarity under the hood
// its possible to take the dot product of two different size matrices by adding an if statement
export function keywordMatcher({
  map1,
  map2,
}: {
  map1: ReturnType<typeof extractKeywords>;
  map2: ReturnType<typeof extractKeywords>;
}): number {
  throw 'Not implemented';
}
