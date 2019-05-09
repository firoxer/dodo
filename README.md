Dodo – A Minimalistic Habit Tracker
===

[Dodo](https://firoxer.github.io/dodo/) helps you stay on top of your habits. It's an application that lets you list your goals for the day and mark them with checks once you're done with them. For instance, if you aim to practice playing piano every day, add "piano" to the list of goals and keep track of the days you find the time to practice playing. You have until midnight every day to achieve the goal. The objective is to keep the row of daily checks uninterrupted.

The fact that the application in itself does nothing to urge you to attain your goals probably makes it sound useless, but for some people there is a big mental disincentive in breaking a successful streak and that tends to actually make you get up and do the thing. For example, I use the application to make sure I exercise, tidy up my house and practice programming and drawing every day.

Go check a demo out [here](https://firoxer.github.io/dodo/?demo=true) to see what the application should look like after a few days. Then go [here](https://firoxer.github.io/dodo/) to access the real thing and start using it.

The application runs 100% in your browser – there is no backend, and all the data is yours only. On the flip side, the data cannot be synchronized across devices, and if you lose your device, you lose the data too.

Implementation
---

The implementation of the application is interesting in that it uses React without any bundling or transpilation whatsoever – everything is downloaded from unpkg.com as ES modules the first time you need it. This works fairly well, and the only painful moments I had with this setup were with HTTP caching (duh) and splitting CSS into separate files (they have to be linked to in index.html manually).

For the rendering part of React you can't use JSX because there is no transpilation step, so I used [htm](https://www.npmjs.com/package/htm) instead which was totally sufficient and worked without surprises.

License
---

MIT
