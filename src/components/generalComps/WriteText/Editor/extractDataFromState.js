import { getWordIndexFromStartIndex } from "../../../functions/getWordIndexFromStartIndex";

export const extractDataFromState = ({
  state,
  getMentionsOnly=false,
  getLinesOnly=false,
}) => {
  const { entityMap, blocks } = state;
  if (Object.keys(entityMap).length === 0 && getMentionsOnly) return [];
  if (Object.keys(blocks).length === 0 && getLinesOnly) return [];
  let _mentions = [], content = []
  blocks?.forEach((block, line) => {
    const { entityRanges, text } = block;
    content = [
      ...content,
      {
        text,
        line
      }
    ]
    entityRanges.forEach((entity) => {
      const { offset, length, key } = entity;
      _mentions = [
        ..._mentions,
        {
          offset: getWordIndexFromStartIndex(text, offset),
          length,
          line,
          username: entityMap[key]?.data?.mention?.username,
          id: entityMap[key]?.data?.mention?.id
        },
      ];
    });
  });
  return getMentionsOnly ? _mentions : getLinesOnly ? content : {
    lines: content,
    mentions: _mentions
  }
};
