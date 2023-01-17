NOTE:
I choose this structure for project instead of the famous MVC because:

1. it is different manner
2. easy to understand
3. avoid to have a big index.js
4. avoid to have a function with lots of argument (if the route has several middewares)


This project includes 3 partition:

1. sequelize-cli
Goal: to implement default records for Category Table

Folders: config, seeders

2. src : includes models, routes, db, runningServer, syncSequelize, errorHandling, middlewaresInApp.js, routers

I Also Explain Every Single Entity inside of it

NOTE::there is documentation for APIs in request.http files


3. .env file, .gitignore, package.json , package-lock.json



NOTE::::
برای دیتای دیفالت دسته بندی ها من از سیدر استفاده کردم
وقتی که اپلیکیشن ران می شه اول میگرده دنبال مایگریشن و بعد از اون از طریق سیدر دیتا رو وارد جدول ها می کنه
 ولی چون مایگریشن وجود نداره سیدر هم نمی تونه جدولی پیدا کنه و ارور میده که ارورش هندل شده 
اگر اپلیکیشن ترمینیت بشه و دوباره ران بشه چون جدول ها ساخته شدن اروری نیست و سیدر هم درست کار میکه