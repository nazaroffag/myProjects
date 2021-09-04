const express = require("express");
const app = express();

app.set("view engine", "pug");

const productBase = [
  {
    typeId: "564564867361351",
    quantity: "96",
    id: "564564867361360",
    price: "180",
    removed: "0",
    image:
      "https://images.ua.prom.st/50389447_w640_h640_ncheskaya_s_grushej_200_g..jpg",
    date: "2017-11-01 12:09:03",
    name: "Молочный Груша 200",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "89",
    id: "564564867361360",
    price: "150",
    removed: "0",
    image: null,
    date: "2017-11-01 12:09:03",
    name: "Парус апельсин 1л",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "9",
    id: "564564867361360",
    price: "25.1",
    removed: "0",
    image: "https://www.utkonos.ru/images/photo/3265/3265004H.jpg",
    date: "2017-11-01 12:09:03",
    name: "Молочный Яблоко 100",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "62",
    id: "564564867361361",
    price: "46.3",
    removed: "0",
    image:
      "https://mariupolcena.com/files/products/9ff44136e6ccb0afb404ad26f727e67d.jpeg",
    date: "2017-11-03 13:11:06",
    name: "Русская картошка чедар 50",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "67",
    id: "564564867361361",
    price: "39",
    removed: "0",
    image:
      "http://produkty-online.ru/wa-data/public/shop/products/31/83/18331/images/1359/1359.970.jpg",
    date: "2017-11-03 13:11:06",
    name: "Молочный Сказка 100",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "51",
    id: "564564867361361",
    price: "63",
    removed: "0",
    image: "https://www.utkonos.ru/images/photo/3139/3139296H.jpg",
    date: "2017-11-03 13:11:06",
    name: "Тоник 0,5л",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "4",
    id: "564564867361361",
    price: "102",
    removed: "0",
    image:
      "https://www.komus.ru/medias/sys_master/root/hd3/h93/9286922043422.jpg",
    date: "2017-11-03 13:11:06",
    name: "Молочный Изюм 100",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "60",
    id: "564564867361361",
    price: "121",
    removed: "0",
    image:
      "http://ecosned.ru/image/cache/catalog/categories/iz_fermerskogo_moloka/tvorog/7/ge-catalog-categories-iz_fermerskogo_moloka-tvorog-tvorozhnaya_massa_s_kuragoy-800x800.jpg",
    date: "2017-11-03 13:11:06",
    name: "Творог 9% с курагой",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "61",
    id: "564564867361361",
    price: "65",
    removed: "0",
    image: null,
    date: "2017-11-03 13:11:06",
    name: "Виноград 0,3л",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "41",
    id: "564564867361361",
    price: "36.5",
    removed: "0",
    image:
      "http://xn--4-8sbu.xn--p1ai/thumb/4KQdJOhw0Uu5AnP0PPIrMQ/200r200/761268/3152.png",
    date: "2017-11-03 13:11:06",
    name: "Беседа. 50гр",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "3",
    id: "564564867361362",
    price: "102",
    removed: "0",
    image:
      "https://www.komus.ru/medias/sys_master/root/hd3/h93/9286922043422.jpg",
    date: "2017-11-03 13:11:06",
    name: "Молочный Изюм 100",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "96",
    id: "564564867361362",
    price: "131",
    removed: "0",
    image: "https://www.utkonos.ru/images/photo/3176/3176192H.jpg",
    date: "2017-11-03 13:11:06",
    name: "Сыр 125г",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "31",
    id: "564564867361362",
    price: "63",
    removed: "0",
    image: "https://www.utkonos.ru/images/photo/3139/3139296H.jpg",
    date: "2017-11-03 13:11:06",
    name: "Тоник 0,5л",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "52",
    id: "564564867361362",
    price: "150",
    removed: "0",
    image: null,
    date: "2017-11-03 13:11:06",
    name: "Парус лимон 1л",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "16",
    id: "564564867361362",
    price: "16.9",
    removed: "0",
    image:
      "http://www.svoda.ru/site/userfiles/images/%D0%9A%D0%90%D0%9F%D0%9B%D0%AF%20%D0%A0%D0%9E%D0%A1%D0%AB%201.5%D0%9B%20%D0%93%D0%90%D0%97%D0%98%D0%A0%D0%9E%D0%92%D0%90%D0%9D%D0%9D%D0%90%D0%AF.jpg",
    date: "2017-11-03 13:11:06",
    name: "Капля росы негаз 1.5л",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "81",
    id: "564564867361362",
    price: "52.41",
    removed: "0",
    image:
      "http://www.calorizator.ru/sites/default/files/imagecache/product_512/product/tvorog-prostokvashino-1.jpg",
    date: "2017-11-03 13:11:06",
    name: "Нежирный творог",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "23",
    id: "564564867361362",
    price: "121",
    removed: "0",
    image:
      "http://ecosned.ru/image/cache/catalog/categories/iz_fermerskogo_moloka/tvorog/7/ge-catalog-categories-iz_fermerskogo_moloka-tvorog-tvorozhnaya_massa_s_kuragoy-800x800.jpg",
    date: "2017-11-03 13:11:06",
    name: "Творог 9% с курагой",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "52",
    id: "564564867361362",
    price: "336",
    removed: "0",
    image:
      "https://tashkentcena.com/files/products/893eebe7b69146290886dc504a3328ef.jpeg",
    date: "2017-11-03 13:11:06",
    name: "Горький коньяк 100",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "12",
    id: "564564867361362",
    price: "73.9",
    removed: "0",
    image: "https://www.utkonos.ru/images/photo/3054/3054289H.jpg",
    date: "2017-11-03 13:11:06",
    name: "Аленка карамель 100г Акционный товар Большая скидка",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "6",
    id: "564564867361363",
    price: "46.3",
    removed: "0",
    image:
      "https://mariupolcena.com/files/products/9ff44136e6ccb0afb404ad26f727e67d.jpeg",
    date: "2017-11-29 19:31:03",
    name: "Русская картошка чедар 50",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "18",
    id: "564564867361363",
    price: "30",
    removed: "0",
    image:
      "https://teremok.sm.ua/wa-data/public/shop/products/82/25/82582/images/35179/35179.750@2x.jpg",
    date: "2017-11-29 19:31:03",
    name: "Сметана и лук 25г",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "99",
    id: "564564867361363",
    price: "36.5",
    removed: "0",
    image:
      "http://xn--4-8sbu.xn--p1ai/thumb/4KQdJOhw0Uu5AnP0PPIrMQ/200r200/761268/3152.png",
    date: "2017-11-29 19:31:03",
    name: "Беседа. 50гр",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "94",
    id: "564564867361363",
    price: "336",
    removed: "0",
    image:
      "https://tashkentcena.com/files/products/893eebe7b69146290886dc504a3328ef.jpeg",
    date: "2017-11-29 19:31:03",
    name: "Горький коньяк 100",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "64",
    id: "564564867361363",
    price: "131",
    removed: "0",
    image: "https://www.utkonos.ru/images/photo/3176/3176192H.jpg",
    date: "2017-11-29 19:31:03",
    name: "Сыр 125г",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "52",
    id: "564564867361363",
    price: "25.1",
    removed: "0",
    image: "https://www.utkonos.ru/images/photo/3265/3265004H.jpg",
    date: "2017-11-29 19:31:03",
    name: "Молочный Яблоко 100",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "43",
    id: "564564867361363",
    price: "150",
    removed: "0",
    image: null,
    date: "2017-11-29 19:31:03",
    name: "Парус апельсин 1л",
  },
  {
    typeId: "564564867361352",
    quantity: "64",
    id: "564564867361364",
    price: "115",
    removed: "0",
    image:
      "http://irecommend.ru/sites/default/files/imagecache/copyright1/user-images/299388/Ydfgl76IXe0nEM2gO6Ww.JPG",
    date: "2017-11-29 18:29:00",
    name: "Молочный Традиция 100",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "3",
    id: "564564867361365",
    price: "46.3",
    removed: "0",
    image:
      "https://mariupolcena.com/files/products/9ff44136e6ccb0afb404ad26f727e67d.jpeg",
    date: "2017-11-29 17:26:57",
    name: "Русская картошка чедар 50",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "88",
    id: "564564867361365",
    price: "65",
    removed: "0",
    image: null,
    date: "2017-11-29 17:26:57",
    name: "Виноград 0,3л",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "20",
    id: "564564867361365",
    price: "52.41",
    removed: "0",
    image:
      "http://www.calorizator.ru/sites/default/files/imagecache/product_512/product/tvorog-prostokvashino-1.jpg",
    date: "2017-11-29 17:26:57",
    name: "Нежирный творог",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "64",
    id: "564564867361365",
    price: "63",
    removed: "0",
    image: "https://www.utkonos.ru/images/photo/3139/3139296H.jpg",
    date: "2017-11-29 17:26:57",
    name: "Тоник 0,5л",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "54",
    id: "564564867361365",
    price: "39",
    removed: "0",
    image:
      "http://produkty-online.ru/wa-data/public/shop/products/31/83/18331/images/1359/1359.970.jpg",
    date: "2017-11-29 17:26:57",
    name: "Молочный Сказка 100",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "88",
    id: "564564867361365",
    price: "150",
    removed: "0",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg",
    date: "2017-11-29 17:26:57",
    name: "Парус апельсин 1л",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "33",
    id: "564564867361365",
    price: "30",
    removed: "0",
    image:
      "https://teremok.sm.ua/wa-data/public/shop/products/82/25/82582/images/35179/35179.750@2x.jpg",
    date: "2017-11-29 17:26:57",
    name: "Сметана и лук 25г",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "6",
    id: "564564867361365",
    price: "36.5",
    removed: "0",
    image:
      "http://xn--4-8sbu.xn--p1ai/thumb/4KQdJOhw0Uu5AnP0PPIrMQ/200r200/761268/3152.png",
    date: "2017-11-29 17:26:57",
    name: "Беседа. 50гр",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "65",
    id: "564564867361365",
    price: "150",
    removed: "0",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg",
    date: "2017-11-29 17:26:57",
    name: "Парус лимон 1л",
    operation: "Приход",
  },
  {
    typeId: "564564867361352",
    quantity: "45",
    id: "564564867361367",
    price: "121",
    removed: "0",
    image:
      "http://ecosned.ru/image/cache/catalog/categories/iz_fermerskogo_moloka/tvorog/7/ge-catalog-categories-iz_fermerskogo_moloka-tvorog-tvorozhnaya_massa_s_kuragoy-800x800.jpg",
    date: "2017-10-16 12:07:07",
    name: "Творог 9% с курагой",
    operation: "Расход",
  },
  {
    typeId: "564564867361352",
    quantity: "44",
    id: "564564867361367",
    price: "25.1",
    removed: "0",
    image: "https://www.utkonos.ru/images/photo/3265/3265004H.jpg",
    date: "2017-10-16 12:07:07",
    name: "Молочный Яблоко 100",
    operation: "Расход",
  },
  {
    typeId: "564564867361352",
    quantity: "62",
    id: "564564867361367",
    price: "115",
    removed: "0",
    image:
      "http://irecommend.ru/sites/default/files/imagecache/copyright1/user-images/299388/Ydfgl76IXe0nEM2gO6Ww.JPG",
    date: "2017-10-16 12:07:07",
    name: "Молочный Традиция 100",
    operation: "Расход",
  },
  {
    typeId: "564564867361352",
    quantity: "87",
    id: "564564867361367",
    price: "65",
    removed: "0",
    image: null,
    date: "2017-10-16 12:07:07",
    name: "Виноград 0,3л",
    operation: "Расход",
  },
  {
    typeId: "564564867361352",
    quantity: "86",
    id: "564564867361367",
    price: "46.3",
    removed: "0",
    image:
      "https://mariupolcena.com/files/products/9ff44136e6ccb0afb404ad26f727e67d.jpeg",
    date: "2017-10-16 12:07:07",
    name: "Русская картошка чедар 50",
    operation: "Расход",
  },
  {
    typeId: "564564867361352",
    quantity: "80",
    id: "564564867361367",
    price: "180",
    removed: "0",
    image:
      "https://images.ua.prom.st/50389447_w640_h640_ncheskaya_s_grushej_200_g..jpg",
    date: "2017-10-16 12:07:07",
    name: "Молочный Груша 200",
    operation: "Расход",
  },
  {
    typeId: "564564867361352",
    quantity: "94",
    id: "564564867361367",
    price: "73.9",
    removed: "0",
    image: "https://www.utkonos.ru/images/photo/3054/3054289H.jpg",
    date: "2017-10-16 12:07:07",
    name: "Аленка карамель 100г Акционный товар Большая скидка",
    operation: "Расход",
  },
  {
    typeId: "564564867361352",
    quantity: "83",
    id: "564564867361367",
    price: "131",
    removed: "0",
    image: "https://www.utkonos.ru/images/photo/3176/3176192H.jpg",
    date: "2017-10-16 12:07:07",
    name: "Сыр 125г",
    operation: "Расход",
  },
  {
    typeId: "564564867361354",
    quantity: "20",
    id: "564564867361368",
    price: "44",
    removed: "0",
    image:
      "http://карапузик.com.images.1c-bitrix-cdn.ru/upload/iblock/b28/b28f089d41db757b74cfebfe21609228.jpg",
    date: "2017-10-16 15:09:08",
    name: "Яблоко-Виноград 0,5л",
    operation: "Расчет",
  },
  {
    typeId: "564564867361354",
    quantity: "65",
    id: "564564867361368",
    price: "180",
    removed: "0",
    image:
      "https://images.ua.prom.st/50389447_w640_h640_ncheskaya_s_grushej_200_g..jpg",
    date: "2017-10-16 15:09:08",
    name: "Молочный Груша 200",
    operation: "Расчет",
  },
  {
    typeId: "564564867361354",
    quantity: "41",
    id: "564564867361368",
    price: "121",
    removed: "0",
    image:
      "http://ecosned.ru/image/cache/catalog/categories/iz_fermerskogo_moloka/tvorog/7/ge-catalog-categories-iz_fermerskogo_moloka-tvorog-tvorozhnaya_massa_s_kuragoy-800x800.jpg",
    date: "2017-10-16 15:09:08",
    name: "Творог 9% с курагой",
    operation: "Расчет",
  },
  {
    typeId: "564564867361354",
    quantity: "72",
    id: "564564867361368",
    price: "102",
    removed: "0",
    image:
      "https://www.komus.ru/medias/sys_master/root/hd3/h93/9286922043422.jpg",
    date: "2017-10-16 15:09:08",
    name: "Молочный Изюм 100",
    operation: "Расчет",
  },
  {
    typeId: "564564867361354",
    quantity: "39",
    id: "564564867361368",
    price: "65",
    removed: "0",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg",
    date: "2017-10-16 15:09:08",
    name: "Виноград 0,3л",
    operation: "Расчет",
  },
  {
    typeId: "564564867361351",
    quantity: "60",
    id: "564564867361369",
    price: "115",
    removed: "0",
    image:
      "http://irecommend.ru/sites/default/files/imagecache/copyright1/user-images/299388/Ydfgl76IXe0nEM2gO6Ww.JPG",
    date: "2017-10-16 18:11:09",
    name: "Молочный Традиция 100",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "99",
    id: "564564867361369",
    price: "73.9",
    removed: "0",
    image: "https://www.utkonos.ru/images/photo/3054/3054289H.jpg",
    date: "2017-10-16 18:11:09",
    name: "Аленка карамель 100г Акционный товар Большая скидка",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "51",
    id: "564564867361369",
    price: "46.3",
    removed: "0",
    image:
      "https://mariupolcena.com/files/products/9ff44136e6ccb0afb404ad26f727e67d.jpeg",
    date: "2017-10-16 18:11:09",
    name: "Русская картошка чедар 50",
    operation: "Приход",
  },
  {
    typeId: "564564867361351",
    quantity: "15",
    id: "564564867361369",
    price: "33.1",
    removed: "0",
    image: "https://www.utkonos.ru/images/photo/3117/3117496H.jpg",
    date: "2017-10-16 18:11:09",
    name: "Русская картошка икра 50",
    operation: "Приход",
  },
];

const month = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

// массив дат
let dateArray = [];
// массив номеров операций
let operationArrayNum = [];
// временный массив для сбора данных
const tempArray = [];
// массив документов (группировка по дате, а затем по номеру операции)
let documentArray = [];

// перебираю исходный массив, достаю даты, преобразовываю в формат для шаблона ДД-ММММ, пушу в массив дат + делаю массив документов с номером в уникальной базе, копией продуктов оттуда и датой в новом формате. Наполяню массив операций, чтобы затем сформировать уникальный массив операций
for (let i = 0; i < productBase.length; i++) {
  let monthNum = productBase[i].date.toString().substr(5, 2);
  let day = productBase[i].date.toString().substr(8, 2);
  let date = day + " " + month[monthNum];
  dateArray.push(date);
  tempArray.push({ baseIndex: i, date: date, product: productBase[i] });
  operationArrayNum.push(productBase[i].id);
}

// осталяем только уникальные значения в массиве
function unique(arr) {
  let result = [];
  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }
  return result;
}

// уникальные массивы дат и операций
dateArray = unique(dateArray);
operationArrayNum = unique(operationArrayNum);

// последовательный перебор массива дат с подбором продуктов на эту дату, а  затем массива операций с подбором продуктов под эту операцию
// Получился объект с группировкой продуктов и суммой по всем требуемым полям
for (let i = 0; i < dateArray.length; i++) {
  let products = [];
  let documentSum = 0;
  let dateOperations = [];
  for (let y = 0; y < tempArray.length; y++) {
    if (dateArray[i] === tempArray[y].date) {
      products.push(tempArray[y]);
      documentSum += Number(tempArray[y].product.price);
      for (let i = 0; i < operationArrayNum.length; i++) {
        let products = [];
        let operationSum = 0;
        for (let y = 0; y < tempArray.length; y++) {
          if (operationArrayNum[i] === tempArray[y].product.id) {
            products.push(tempArray[y]);
            operationSum += Number(tempArray[y].product.price);
          }
        }
        dateOperations.push({
          operationNum: operationArrayNum[i],
          operationSum: operationSum.toFixed(2),
          operationProducts: products,
        });
      }
    }
  }
  documentArray.push({
    date: dateArray[i],
    dateSum: documentSum.toFixed(2),
    dateProducts: products,
    dateOperations: dateOperations,
  });
}

app.get("/", (req, res) => {
  res.render("index.pug", {
    base: documentArray,
  });
});

app.listen(3000, () => {
  console.log("Server is running on 3000");
});
