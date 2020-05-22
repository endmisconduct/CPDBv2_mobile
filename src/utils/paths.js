/**
 * Return the same key for some paths identify the same page
 *
 *  - Officer paths such as /officer/123/ and /officer/123/social/ should give the same key
 *  - Pinboard paths such as /pinboard/268a5e58/old-name/ and /pinboard/268a5e58/new-name/ should give the same key
 */
export const getPathNameKey = (pathname) => {
  let pathnameKey = pathname.replace(/^\/edit(.*)/, '$1');

  const patterns = [
    /\/officer\/\d+\//,
    /\/pinboard\/[A-Za-z0-9]+\//,
  ];
  for (let ind in patterns) {
    const pattern = patterns[ind];
    if (pathname.match(pattern)) {
      pathnameKey = pathnameKey.match(pattern)[0];
    }
  }
  return pathnameKey;
};

export const PINBOARD_PAGE_PATTERN = /.*\/pinboard\/([a-fA-F0-9]+)\/.*/;
export const OFFICER_PAGE_PATTERN = /^\/officer\/\d+\/.*/;
export const CR_PAGE_PATTERN = /^\/complaint\/\d+\/.*/;

export const onPinboardPage = pathname => PINBOARD_PAGE_PATTERN.test(pathname);

export const onOfficerPage = pathname => OFFICER_PAGE_PATTERN.test(pathname);

export const onCrPage = pathname => CR_PAGE_PATTERN.test(pathname);
