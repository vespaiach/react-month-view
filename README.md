# Why

If you just need a quick calendar view by month for your React app, this piece of ui will help.

# Usage

1. Install package

```
npm i @vespaiach/month-view -S

```

2. The gist

```jsx
import '@vespaiach/month-view/dist/base.css'; // Tailwindcss's preflight. This is optional, but recommended
import '@vespaiach/month-view/dist/month.css';

import './app.css';

import * as React from 'react';

import { MonthView } from '@vespaiach/month-view';
import { MonthNum } from '@vespaiach/month-view/dist/type';

export default function App() {
    const [date, setDate] = React.useState(new Date());

    return (
        <MonthView year={date.getFullYear()} month={date.getMonth() as MonthNum} />
    );
}

```

3. Properties

| Properties  | Note                                             | type                                                    | required |
| ----------- | ------------------------------------------------ | ------------------------------------------------------- | -------- |
| `year`      | Year                                             | number                                                  | yes      |
| `month`     | Month (start from 0)                             | number                                                  | yes      |
| `events`    | List of events will be displayed on the calendar | { title:string; start: Date; minutes: number}[]         | no       |
| `className` | Css class                                        | string                                                  | no       |
| `onClick`   | Click event handler                              | (date: Date, events: Event[], evt: MouseEvent>) => void | no       |
| `DAYS`      | Custom name of day (Sun, Mon...)                 | string[]                                                | no       |
| `MONTHS`    | Custom name of month (Jan, Feb...)               | string[]                                                | no       |
| `colors`    | Custom color of calendar\*\*                     | object[]                                                | no       |

\*\*

```jsx
    colors?: {
        gridLine?: string;
        sheetBackground?: string;
        dayText?: string;
        grayedOutText?: string;
        normalText?: string;
        lightText?: string;
        todayCircle?: string;
        eventListDot?: string;
    };
```

# Development

This React component is bootstrapping with [ViteJS](https://vitejs.dev/), styling with [Tailwindcss](https://tailwindcss.com/), testing with [Vitest](https://vitest.dev/) and building with [Microbundle](https://github.com/developit/microbundle) and [Postcss](https://postcss.org/).

**NPM commands**

-   To start development page: `npm run dev`
-   To test the lib: `npm run test`.
-   To build for production: `npm run build`.

**Note**

In fact, [Microbundle](https://github.com/developit/microbundle) can build css files too, but it automatically merges css files into one which also includes Tailwindcss's `preflight` set, and that may not what users want. Tailwindcss's preflight set should be excluded and let users decide to add it in their project whether or not. So let [Postcss](https://postcss.org/) takes the job of building css instead.

# License

MIT
