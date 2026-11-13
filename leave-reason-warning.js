(function () {
'use strict';
const attempts = new WeakMap();
function classifyReason(value) {
 const s = value.normalize('NFKC').trim();
 const compact = s.replace(/[\s\p{P}\p{S}\p{Cf}]/gu, '').toLowerCase();
 if (!compact || /^(?:哈|呵|嘻|嘿|ha|he|lol)+$/iu.test(compact) ||
 /^(?:abc\d*|asdf\w*|qwerty\w*|test\d*|123\d*|測試|测试)$/iu.test(compact) ||
 /^(?:被窩不讓我起床|被窝不让我起床|需要拯救世界|拯救世界|你唔使理|關你咩事)$/u.test(compact)) return 'invalid';
 if (/^(?:辦事|办事|有事|私事|處理事情|处理事情|處理事務|处理事务|因為有事所以需要請假處理事情|因有事需要請假|personal reasons|something)$/iu.test(s.replace(/[。.!！]/gu,''))) return 'vague';
 return 'clear';
}
window.classifyLeaveReason = classifyReason;
document.addEventListener('DOMContentLoaded', function () {
 const button = document.getElementById('nf-leave-copy');
 const reason = document.getElementById('nf-leave-reason');
 if (!button || !reason) return;
 const dialog = document.createElement('dialog');
 dialog.id = 'leave-serious-warning';
 dialog.setAttribute('aria-label','請認真對待請假申請');
 dialog.style.cssText='border:0;padding:0;border-radius:20px;width:min(440px,calc(100vw - 32px));max-height:90dvh;overflow:auto;background:white;box-shadow:0 16px 60px #0006;';
 const image = document.createElement('img');
 image.src='leave-serious-warning.svg';
 image.alt='請認真填寫。不接受以亂碼、玩笑或無關內容作為請假理由。請說明實際事由後重新提交。趣味改圖。';
 image.style.cssText='display:block;width:100%;height:auto;';
 const close = document.createElement('button');
 close.type='button';close.textContent='返回認真填寫';
 close.style.cssText='display:block;width:calc(100% - 32px);margin:12px 16px 16px;padding:14px;border:0;border-radius:12px;background:#ba0c19;color:white;font:700 18px sans-serif;cursor:pointer;';
 close.onclick=function(){dialog.close();reason.focus();};
 dialog.append(image,close);document.body.append(dialog);
 const style=document.createElement('style');
 style.textContent='#leave-serious-warning::backdrop{background:#10213bc4}';
 document.head.append(style);
 button.addEventListener('click', function(event){
  const type=document.querySelector('input[name="nf-leave-type"]:checked')?.value;
  if(type==='family'||type==='family_emergency') return;
  const result=classifyReason(reason.value);
  if(result==='clear'){attempts.delete(button);return;}
  event.preventDefault();event.stopImmediatePropagation();
  const count=(attempts.get(button)||0)+1;attempts.set(button,count);
  const status=document.getElementById('nf-leave-status');
  if(status)status.textContent=result==='vague'&&count<2
   ?'請簡述需要辦理的事務，以便管理層了解申請原因。'
   :'請認真填寫與本次請假有關的實際理由。';
  if(result==='invalid'||count>=2){
   if(typeof dialog.showModal==='function'){if(!dialog.open)dialog.showModal();}
   else window.alert('請認真填寫！不接受以亂碼、玩笑或無關內容作為請假理由。');
  }else reason.focus();
 },true);
});
})();
