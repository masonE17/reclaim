"""Run from ReClaim repository root. Adds /my-listings route without touching teammates' pages."""
from pathlib import Path
p = Path('client/src/main.tsx')
s = p.read_text(encoding='utf-8')
import_line = "import MyListingsPage from './pages/MyListingsPage.tsx'"
if import_line not in s:
    anchor = "import SellPage from './pages/SellPage.tsx'"
    if s.count(anchor) != 1:
        raise SystemExit('Unexpected main.tsx imports; add route manually. No changes made.')
    s = s.replace(anchor, anchor + '\n' + import_line, 1)
route = '    path: "/my-listings",\n    element: <MyListingsPage />,\n'
if 'path: "/my-listings"' not in s:
    anchor = '  {\n    path: "/sell",\n    element: <SellPage />,\n  },'
    if s.count(anchor) != 1:
        raise SystemExit('Unexpected route setup; add route manually. No changes made.')
    s = s.replace(anchor, anchor + '\n  {\n' + route + '  },', 1)
p.write_text(s, encoding='utf-8')
print('Added /my-listings route; existing routes preserved.')
