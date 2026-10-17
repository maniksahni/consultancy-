// Which of the seven destinations a free-text job location belongs to (first match wins).
export const CITY_COUNTRY = [
  [/france|paris|lyon|toulouse|marseille|nice|nantes|bordeaux|lille|strasbourg|montpellier|rennes|grenoble|sophia antipolis|la défense|la defense/i, 'france'],
  [/united kingdom|\buk\b|england|scotland|london|manchester|edinburgh|birmingham|glasgow|bristol|leeds|cambridge|oxford|reading|belfast/i, 'uk'],
  [/ireland|dublin|cork|galway|limerick/i, 'ireland'],
  [/germany|deutschland|berlin|munich|münchen|hamburg|frankfurt|cologne|köln|stuttgart|düsseldorf|dusseldorf|leipzig|dresden|hannover|nuremberg|nürnberg|bremen|essen|dortmund|bonn|karlsruhe|mannheim|heidelberg|freiburg|münster|aachen|augsburg|wiesbaden|potsdam|darmstadt|rosenheim|regensburg|ulm|kiel|lübeck|mainz|bochum|duisburg|wuppertal|bielefeld|braunschweig|kassel|erlangen|ingolstadt|würzburg|jena|magdeburg|rostock|saarbrücken|baden|bayern|bavaria|hessen|nordrhein|sachsen|thüringen|niedersachsen|brandenburg/i, 'germany'],
  [/canada|toronto|vancouver|montr[ée]al|ottawa|calgary|edmonton|waterloo|ontario|qu[ée]bec|british columbia|alberta/i, 'canada'],
  [/australia|sydney|melbourne|brisbane|perth|adelaide|canberra|new south wales|victoria, au|queensland/i, 'australia'],
  [/united states|\busa?\b|new york|san francisco|seattle|boston|chicago|austin|los angeles|denver|atlanta|washington,? d\.?c|miami|dallas|houston|san diego|san jose|palo alto|mountain view|menlo park|sunnyvale|redmond|pittsburgh|philadelphia|portland|salt lake|nashville|raleigh|phoenix|minneapolis|detroit|, (al|ak|az|ar|ca|co|ct|de|fl|ga|hi|id|il|in|ia|ks|ky|la|me|md|ma|mi|mn|ms|mo|mt|ne|nv|nh|nj|nm|ny|nc|nd|oh|ok|or|pa|ri|sc|sd|tn|tx|ut|vt|va|wa|wv|wi|wy)\b/i, 'usa'],
];
export const placeOf = (location) => CITY_COUNTRY.find(([re]) => re.test(location || ''))?.[1] || null;
