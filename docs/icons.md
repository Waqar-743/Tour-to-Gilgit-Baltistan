# Gilgit-Baltistan icon collection

The site has 30 original line icons and one mountain-and-sun brand mark. The React components in `src/components/Travel/Icon.jsx` are the source of truth. Matching standalone SVG files are available in `public/icons/` without a React dependency.

## Design grammar

- Use a `0 0 24 24` viewBox for interface icons, with a 1.5 px stroke at the native 24 px size.
- Keep outlines unfilled and use round line caps and joins.
- Use `currentColor` so an inline icon follows its surrounding text colour.
- Keep the visual weight consistent. Scale the whole SVG proportionally; do not stretch its width or height independently.
- Prefer 20–32 px for interface use. Check intricate glyphs such as the fort and embroidery motif at their final size.
- The separate mountain mark uses a 48 px grid, 2.2 px rounded outlines and a filled sun.

The fort recalls tapered walls and a projecting timber balcony associated with Hunza's historic architecture. Other motifs suggest shared meals, chai, village buildings, embroidery and a drum. These are illustrative interpretations, not architectural surveys or measured cultural artefacts. They should not be used to claim that all valleys share one tradition.

## Available files

| Purpose                    | Icon names                                                                                                                         |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Landscape and weather      | `mountain`, `lake`, `leaf`, `sun`, `snow`                                                                                          |
| Heritage and everyday life | `fort`, `village`, `bowl`, `teapot`, `craft`, `music`, `people`, `book`                                                            |
| Journeys and place         | `pin`, `compass`, `calendar`, `route`, `walking`, `globe`                                                                          |
| Navigation and actions     | `arrow-right`, `arrow-up-right`, `arrow-left`, `chevron-down`, `close`, `menu`, `search`, `heart`, `check`, `download`, `external` |
| Branding                   | `mountain-mark` (named React export: `MountainMark`)                                                                               |

Every name maps to `public/icons/{name}.svg`. The 30 UI glyphs map to the `name` prop of the default `Icon` component. An unknown React icon name falls back to `compass`.

## Accessible React usage

The React components are decorative by default: `aria-hidden="true"` and `focusable="false"`. Let nearby visible text explain an icon where possible.

```jsx
import Icon, { MountainMark } from './components/Travel/Icon';

<button type="button" aria-label="Save Hunza">
  <Icon name="heart" size={20} />
</button>

<a href="#places">
  Explore places <Icon name="arrow-right" size={18} />
</a>
```

For an icon that conveys information without accompanying text, override the decorative default and supply an accessible name. Describe its meaning in context rather than its geometry.

```jsx
<Icon
  name="snow"
  aria-hidden={false}
  role="img"
  aria-label="Winter travel conditions"
/>

<MountainMark
  aria-hidden={false}
  role="img"
  aria-label="Gilgit-Baltistan travel journal"
/>
```

Label an interactive control itself when an icon is its only content. Avoid giving the button and its decorative icon duplicate spoken labels. Add `aria-pressed` to toggle buttons when the icon represents a saved or selected state.

## Standalone SVG usage

Each exported SVG has a title and can be opened or edited independently. In HTML, provide an appropriate `alt` value on the image; the surrounding document should not rely on an external SVG's internal title.

```html
<!-- Meaningful image -->
<img src="icons/fort.svg" width="24" height="24" alt="Historic fort" />

<!-- Decorative image beside visible text -->
<a href="#culture">
  <img src="icons/teapot.svg" width="24" height="24" alt="" />
  Culture and everyday life
</a>
```

Include the site's base path when resolving these files on GitHub Pages. In this Vite project, use `${import.meta.env.BASE_URL}icons/fort.svg`.

To inherit a surrounding CSS `color`, paste the SVG inline or use the React component. An SVG loaded through an `<img>` does not inherit the parent document's `currentColor`; it uses its own colour context. If an inline SVG is repeated, give any `<title>` a unique `id` and point `aria-labelledby` to that id, or replace those attributes with an appropriate `aria-label`. For decorative inline use, remove the title association and set `aria-hidden="true"`.

## Editing and adding icons

Edit `Icon.jsx` first, following the grid and stroke rules above. Keep action symbols familiar and regional motifs legible at small sizes. Update the corresponding standalone SVG and this inventory with the same paths, then inspect the icon at its intended size and confirm that its accessible name describes its use.
