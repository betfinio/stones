# UI Components and functions/hooks

## Almost all of UI components are based on [shadcn/ui](https://ui.shadcn.com/) which are based on [radix-ui](https://www.radix-ui.com/)

### Shadcn Components

To import components, you can use the following import statement:

```tsx
import {Badge} from "betfinio_app/badge";
```

replace `Badge` with the component you want to import.

Currently available components:

- [Badge](https://ui.shadcn.com/docs/components/badge)
- [Button](https://ui.shadcn.com/docs/components/button)
- [Checkbox](https://ui.shadcn.com/docs/components/checkbox)
- [Command](https://ui.shadcn.com/docs/components/command)
- [Dialog](https://ui.shadcn.com/docs/components/dialog)
- [Drawer](https://ui.shadcn.com/docs/components/drawer)
- [Dropdown Menu](https://ui.shadcn.com/docs/components/dropdown-menu)
- [Input](https://ui.shadcn.com/docs/components/input)
- [Popover](https://ui.shadcn.com/docs/components/popover)
- [Scroll Area](https://ui.shadcn.com/docs/components/scroll-area)
- [Select](https://ui.shadcn.com/docs/components/select)
- [Separator](https://ui.shadcn.com/docs/components/separator)
- [Sheet](https://ui.shadcn.com/docs/components/sheet)
- [Skeleton](https://ui.shadcn.com/docs/components/skeleton)
- [Table](https://ui.shadcn.com/docs/components/table)
- [Tabs](https://ui.shadcn.com/docs/components/tabs)
- [Tooltip](https://ui.shadcn.com/docs/components/tooltip)
- [Toast](https://ui.shadcn.com/docs/components/toast)

### Custom Components

```tsx
import {BetValue} from "betfinio_app/BetValue";
```

Component for displaying bet value with a BET logo and tooltip.
