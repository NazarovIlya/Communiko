-- Ручное тестирование таблицы Activities
DROP TABLE IF EXISTS "Activities";
DROP TABLE IF EXISTS "__EFMigrationsHistory";

SELECT
  *
FROM "Activities"
LIMIT 5;

SELECT
  *
FROM "Activities"
WHERE "Activities"."City" = 'Город #1'
LIMIT 5;

SELECT
  *
FROM "Activities"
WHERE "Activities"."PointTime" > '2023-09-24';