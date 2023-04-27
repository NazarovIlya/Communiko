##  Библиотека для тестов

### Moment.js: легкая работа с датами
- https://momentjs.com/
- https://momentjs.com/docs/
- https://github.com/moment/moment

```
var now = moment();
moment.lang('ru');
console.log(now.format('dddd, MMMM DD YYYY, h:mm:ss'));
// вторник, ноябрь 15 2011, 3:31:03
```

В Postman

```
var moment = require("moment");

pm.environment.set(
    'activenessDate', 
    moment().add(10, 'days')
            .add(3, 'hour')
            .toISOString()
            );
```