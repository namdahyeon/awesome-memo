async function editMemo(e){
   // console.log(e.target.dataset.id);
   const id = e.target.dataset.id;
   const editInput = prompt("수정할 값을 입력하세요~!");
   // console.log(editInput);
   const res = await fetch(`/memos/${id}`, {
      method: "PUT", // PUT: 값을 바꿀 때.
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         id, //id: id 일경우 하나로 생략 가능
         content: editInput,
      }),
   });
   readMemo();
}

async function deleteMemo(e){
   const id = e.target.dataset.id;
   const res = await fetch(`/memos/${id}`, {
      method: "DELETE", // DELETE: 값을 지울 때.
   });
   readMemo();
}

function displayMemo(memo){
   const ul = document.querySelector("#memo-ul");

   const li = document.createElement("li"); // createElement(): 지정한 tagName 의 HTML 요소를 만들어 반환
   li.innerText = `${memo.content}`;

   const editBtn = document.createElement("button");
   editBtn.innerText = "수정하기";
   editBtn.addEventListener("click", editMemo);
   editBtn.dataset.id = memo.id; // 태그 속성을 javaScript에서 넣어주는 것.

   const delBtn = document.createElement("button");
   delBtn.innerText = '삭제';
   delBtn.addEventListener("click", deleteMemo);
   delBtn.dataset.id = memo.id;

   li.appendChild(editBtn);
   li.appendChild(delBtn);
   ul.appendChild(li);
}

async function readMemo(){
   const res = await fetch('/memos') //get요청을 한다.
   const jsonRes = await res.json();
   const ul = document.querySelector('#memo-ul');
   ul.innerHTML = '';
   jsonRes.forEach(displayMemo);
}

async function createMemo(value){
   const res = await fetch("/memos", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         id: new Date().getTime(),
         content: value,
      }),
   }); // await 사용 시 async가 함수 앞에 붙어야 사용 가능.
   readMemo();
}



function handleSubmit(e){
   e.preventDefault(); //submit을 누르면 새로고침되는 현상을 막기 위함.이벤트 막기
   const input = document.querySelector('#memo-input');
   createMemo(input.value);
   input.value = '';
}

const form = document.querySelector('#memo-form');
form.addEventListener("submit", handleSubmit);

readMemo();
