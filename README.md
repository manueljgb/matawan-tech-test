# Matawan Services Technical Test

## To start the DEMO, run:

1. `json-server --watch src/database/db.json` 
2. `ng serve -o`

## Decisions Taken:

1. **Simple and Compact Layout**: Implemented a simple page that displays a list of reports. User can directly edit an existing report or create a new one there.
2. **Material Accordion and Card**: The material accordion allows the user to quickly visually check the important info, such as name or surname. Then you can expand the info you are interested in. The Mat-Card also helped with the layout, making it easier for the CSS part.
3. **Mat-Dialog for creating or edit**: By using this solution, the user could quickly edit or create a report, with no unneeded redirections. Once it is closed, the list page will be reloaded only if the close action says so. If not (as canceling the edit/creation) it will remain as it is.
4. **Coloring**: I used a soft color palette, which makes easier to read the info, but also adds some color to the design. I used complementary colors, to make it prettier and smoother. I maintained it simple, using just 2-3 colors and using also the combination of black and white for an even simpler design.

## How to improve:

Next steps will be:
1. **Create a search bar to be able to search by author name**: It will help when we have multiple reports.