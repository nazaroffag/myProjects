тестовое задание для ГК Системные технологии SQL-JS-PUG

Для подготовки JSON использовал SQLPro for SQLite

--- SQL запрос ---

SELECT date, docTypes.name, typeId, docs.id, products.name, image, price, quantity, rows.removed FROM docs, docTypes, "rows", products WHERE docs.id = rows.docId AND docs.typeId = docTypes.id AND rows.productId = products.id AND docs.removed = 0

-- Compile --
npm install
node app.js

--- Дополнительно можно сделать ---
[ ] загрузка JSON файла напрямую с диска, либо подключение JSON-server
[ ] вынесение карточки документа и продукта в отдельные компоненты
[ ] подключение js-скрипта из отдельного файла
