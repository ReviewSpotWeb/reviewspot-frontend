[x] - Change album rating labels to icons on small screen
[ ] - set bg on profile page profile pic
[ ] - sort/filter review list on user profile page and album page
[ ] - sort/filter comment list on review page
[ ] - list item animations on load (slide in or cascade down)
[x] - review list item profile pic size responsiveness!! - may need to fully refactor
[x] - profile page profile pic size responsiveness
[ ] - reviewspot logo icon
[ ] - conditionally render pagination bars
[ ] - album cover too big on mobile layout?
[x] - album list item responsiveness (bottom of album cover not lining up with bottom of album rating)
[x] - combine album list item into one component
[ ] - better location for UserBadge on review list item?
[x] - link to artist spotify url
[ ] - a way to simplify onAlbumPage conditional rendering checks
[ ] - yellow border not showing up for reviewspot ratings on album list items
[ ] - show review related to search term!!
[ ] - extra flex boxes in review spot list item? refactor simpler
[ ] - custom row and column components ??
[ ] - loading component
[ ] - useMemo ??
[] - Abstract rating configs

[x] - clicking back button from album page doesnt update home albums - probably true for other pages too

[ ] - refactor profile page style (not sure if I like where the name and badge are)

[ ] - see notes app

[ ] - simplify album item components if possible (album-item-browser, album-item-mobile, album-list, album-list-item)

- pull out current album-list-item into new component
- have album-list-item conditionally render album-item-browser, album-item-mobile, and the newly abstracted component (was album-list-item)
  -- on album page and screen < small - album-item-mobile
  -- album-item-browser always on screen > medium
  -- (was album-list-item) on screen < medium if not on album page | if on album page then on only render small < screen < medium
