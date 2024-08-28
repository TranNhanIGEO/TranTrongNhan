import { RefObject, useCallback } from 'react';
import StringHelper from 'helpers/stringHelper';

const useHightlight = (tdRef: RefObject<HTMLTableCellElement>, searchTerm?: string) => {
    
  const handleHighlight = useCallback(() => {
    if (!tdRef.current) return;
    const pTags = tdRef.current.querySelectorAll('p');

    pTags.forEach(pTag => {
      if (!pTag?.textContent) return;
      const content = pTag.textContent.trim();

      if (!!searchTerm && content.toLowerCase().includes(searchTerm.toLowerCase())) {
        const [beforeMatch, match, afterMatch] = StringHelper.toMatchStringArray(searchTerm, content);
        pTag.innerHTML = `<span>${beforeMatch}</span><span class="table-searching">${match}</span><span>${afterMatch}</span>`;
      } else {
        pTag.innerHTML = `${content}`;
      }
    });
  }, [tdRef, searchTerm]);

  return {
    handleHighlight,
  };
};

export default useHightlight;
