const addBtn = document.querySelector('.fa-plus'); //추가버튼
const input = document.querySelector('.footer_input'); //input요소
const prioritySelect = document.querySelector('.priority_select'); //우선순위 선택
const items = document.querySelector('.items'); //ul

function createItem(text, priority) {
  console.log(text);
  const itemRow = document.createElement('li');
  itemRow.className = `item priority-${priority}`;

  // 현재 시간 가져오기
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const timeString = `${hours}:${minutes}`; // "HH:MM" 형식

  itemRow.innerHTML = `
          <span class="priority">${priority.toUpperCase()}</span>
          <span>${text}</span>
          <span class="time">${timeString}</span>
          <i class="fa-solid fa-check"></i>
          <i class="fa-solid fa-trash-can"></i>`;

  //체크버튼 클릭시 클래스 추가 이벤트
  itemRow.querySelector('.fa-check').addEventListener('click', () => {
    itemRow.classList.toggle('item_done');
  });

  //삭제버튼 클릭시 itemRow 제거 이벤트
  itemRow
    .querySelector('.fa-trash-can')
    .addEventListener('click', () => itemRow.remove());

  requestAnimationFrame(() => itemRow.scrollIntoView({ block: 'center' }));

  return itemRow;
}

//추가함수
function onAdd() {
  const text = input.value.trim();
  const priority = prioritySelect.value; // 선택된 우선순위 가져오기

  if (!text) {
    input.value = '';
    input.focus();
    return;
  }

  // li를 생성하는 함수 - createItem(text, priority)
  items.appendChild(createItem(text, priority));
  input.value = '';
  input.focus();
}

//이벤트등록
addBtn.addEventListener('click', onAdd);
input.addEventListener('keyup', (e) => e.key === 'Enter' && onAdd());
