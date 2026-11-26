const STORAGE_KEY = "case1_books_v1";

const DEFAULT_BOOKS = [
  { id: 1, title: "Hunger Games", author: "Suzanne Collins", category: "Young Adult Dystopian", copies: 100 },
  { id: 2, title: "Hunger Games: Catching Fire", author: "Suzanne Collins", category: "Young Adult Dystopian", copies: 100 },
  { id: 3, title: "Hunger Games: Mockingjay", author: "Suzanne Collins", category: "Young Adult Dystopian", copies: 100 }
];

function getRecords() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_BOOKS));
    return [...DEFAULT_BOOKS];
  }
  try {
    return JSON.parse(raw);
  } catch {
    return [...DEFAULT_BOOKS];
  }
}

function saveRecords(records) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function getRecordById(id) {
  return getRecords().find(item => Number(item.id) === Number(id)) || null;
}

function addRecord(data) {
  const records = getRecords();
  const nextId = records.length ? Math.max(...records.map(r => Number(r.id))) + 1 : 1;
  records.push({ id: nextId, ...data });
  saveRecords(records);
}

function updateRecord(id, data) {
  const records = getRecords().map(item =>
    Number(item.id) === Number(id) ? { id: Number(id), ...data } : item
  );
  saveRecords(records);
}

function deleteRecord(id) {
  const records = getRecords().filter(item => Number(item.id) !== Number(id));
  saveRecords(records);
}

function resetSampleData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_BOOKS));
}
