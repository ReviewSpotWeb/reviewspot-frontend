[x] - Change album rating labels to icons on small screen
[ ] - set bg on profile page profile pic
[ ] - sort/filter review list on user profile page and album page
[ ] - sort/filter comment list on review page
[ ] - list item animations on load (slide in or cascade down)
[x] - review list item profile pic size responsiveness!! - may need to fully refactor
[x] - profile page profile pic size responsiveness
[ ] - reviewspot logo icon
[x] - conditionally render pagination bars
[x] - album cover too big on mobile layout?
[x] - album list item responsiveness (bottom of album cover not lining up with bottom of album rating)
[x] - combine album list item into one component
[ ] - better location for UserBadge on review list item?
[x] - link to artist spotify url
[x] - a way to simplify onAlbumPage conditional rendering checks
[x] - yellow border not showing up for reviewspot ratings on album list items
[ ] - extra flex boxes in review spot list item? refactor simpler
[ ] - loading component
[ ] - useMemo ??
[] - Abstract rating configs
[ ] - disallow whitespace in username/password
[x] - clicking back button from album page doesnt update home albums - probably true for other pages too
[ ] - delete account
[ ] - search for users
[ ] - forgot password
[x] - PAGINATION
[ ] - CACHE ALBUMS IN STATE (e.g. popularReviews)
[ ] - USE LOADER WHERE POSSIBLE - https://reactrouter.com/en/main/route/loader
[ ] - updatedAt and createdAt timestamps on reviews/comments
[ ] - edit review from review page
[ ] - delete review from album page
[ ] - update number of comments on review page when adding/deleting comments

[ ] - simplify album item components if possible (album-item-browser, album-item-mobile, album-list, album-list-item)

- pull out current album-list-item into new component
- have album-list-item conditionally render album-item-browser, album-item-mobile, and the newly abstracted component (was album-list-item)
  -- on album page and screen < small - album-item-mobile
  -- album-item-browser always on screen > medium
  -- (was album-list-item) on screen < medium if not on album page | if on album page then on only render small < screen < medium
