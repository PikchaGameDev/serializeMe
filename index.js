function serializeArray(arrayNumbers) {
  let result = "";
  let frequencyDict = new Map();

  arrayNumbers.forEach((num) => {
    frequencyDict.set(num, (frequencyDict.get(num) || 0) + 1);
  });

  frequencyDict.keys().forEach((num) => {
    result += String.fromCharCode(num);
    result += String(frequencyDict.get(num));
  });

  return result;
}

function deserializeString(serializedString) {
  let numbers = [];
  let i = 0;

  while (i < serializedString.length) {
    let num = serializedString.charCodeAt(i);
    i++;
    let count = serializedString.substring(i, i + 1);
    i++;

    for (let j = 0; j < count; j++) {
      numbers.push(num);
    }
  }

  return numbers;
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const testsMap = [
  "Для массива из 50 случайных чисел от 1 до 300",
  "Для массива из 100 случайных чисел от 1 до 300",
  "Для массива из 500 случайных чисел от 1 до 300",
  "Для массива из 1000 случайных чисел от 1 до 300",
  "Для массива из 1000 случайных чисел от 1 до 9, где числа одного знака",
  "Для массива из 1000 случайных чисел от 10 до 99, где числа двух знаков",
  "Для массива из 1000 случайных чисел от 100 до 300, где числа трёх знаков",
  "Для массива из 900 чисел от 1 до 300, где каждого числа по 3",
];

function testsSerializationHandler(test, testNumber) {
  const basicSerializedSize = JSON.stringify(test).length;
  const compressionSerializedSize = serializeArray(test).length;

  const compressionResult = Math.floor(
    (compressionSerializedSize / basicSerializedSize) * 100
  );

  console.log(
    testsMap[testNumber - 1],
    " ",
    "базовый размер - ",
    basicSerializedSize,
    " ",
    "размер после компрессии - ",
    compressionSerializedSize,
    " ",
    "Процент компрессии - ",
    `${100 - compressionResult}%`
  );

  return 100 - compressionResult;
}

const test1 = Array.from({ length: 50 }, () => getRandomArbitrary(1, 300));
const test2 = Array.from({ length: 100 }, () => getRandomArbitrary(1, 300));
const test3 = Array.from({ length: 500 }, () => getRandomArbitrary(1, 300));
const test4 = Array.from({ length: 1000 }, () => getRandomArbitrary(1, 300));
const test5 = Array.from({ length: 1000 }, () => getRandomArbitrary(1, 9));
const test6 = Array.from({ length: 1000 }, () => getRandomArbitrary(10, 99));
const test7 = Array.from({ length: 1000 }, () => getRandomArbitrary(100, 300));
const arrayForTest = Array.from({ length: 300 }, (_, i) => i + 1);
const test8 = [...arrayForTest, ...arrayForTest, ...arrayForTest];

const tests = [test1, test2, test3, test4, test5, test6, test7, test8];

console.log("Тесты для проверки сериализации\n");

const compressionResult = [];

tests.forEach((test, i) =>
  compressionResult.push(testsSerializationHandler(test, i + 1))
);

console.log(
  "Среднее значение компрессии:",
  `${compressionResult.reduce((a, b) => a + b, 0) / compressionResult.length}%`,
  "\n"
);

console.log("Тесты для проверки десериализации\n");

console.log(
  "Изначальный массив (отсортированный): ",
  test1.sort((a, b) => a - b),
  "\n"
);
const serializedResult = serializeArray(test1);
console.log("Массив после сериализации: ", serializedResult, "\n");
console.log(
  "Десериализация полученной строки (отсортированный массив): ",
  deserializeString(serializedResult).sort((a, b) => a - b)
);
