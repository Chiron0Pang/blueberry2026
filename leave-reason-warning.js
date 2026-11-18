(function () {
'use strict';
const attempts = new WeakMap();
function classifyReason(value) {
 const s = value.normalize('NFKC').trim();
 const compact = s.replace(/[\s\p{P}\p{S}\p{Cf}]/gu, '').toLowerCase();
 if (!compact || /^\p{N}+$/u.test(compact) || /^(?:哈|呵|嘻|嘿|ha|he|lol)+$/iu.test(compact) ||
 /^(?:abc\d*|asdf\w*|qwerty\w*|test\d*|123\d*|測試|测试)$/iu.test(compact) ||
 /^(?:被窩不讓我起床|被窝不让我起床|需要拯救世界|拯救世界|你唔使理|關你咩事)$/u.test(compact)) return 'invalid';
 if (/^(?:(?:因為|因为|因|需要|需|我要|我想|想要|想|要|已)?(?:請事假|请事假|事假|預約辦事|预约办事|預約|预约|辦事|办事|私人原因|個人原因|个人原因|私人事務|私人事务|個人事務|个人事务|家庭事務|家庭事务|有事|有事情|處理事情|处理事情|處理私事|处理私事|私事|有安排|其他)|personal\s*(?:leave|reasons?|matters?)|private\s*(?:reasons?|matters?)|an?\s*appointment|appointment|family\s*matters?|errands?|something\s*to\s*do|私用休暇|私用|家庭の事情|用事|予約|개인\s*(?:사유|용무)(?:\s*휴가)?|예약)$/iu.test(s.replace(/[\p{P}\p{S}\p{Cf}]/gu,'').replace(/\s+/gu,' ').trim())) return 'vague';
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
 image.src='leave-reason-reminder.svg';
 image.alt='請認真填寫。不接受以亂碼、玩笑或無關內容作為請假理由。請說明實際事由後重新提交。趣味改圖。';
 image.style.cssText='display:block;width:100%;height:auto;';
 const close = document.createElement('button');
 close.type='button';close.textContent='返回認真填寫';
 close.style.cssText='display:block;width:calc(100% - 32px);margin:12px 16px 16px;padding:14px;border:0;border-radius:12px;background:#ba0c19;color:white;font:700 18px sans-serif;cursor:pointer;';
 close.onclick=function(){dialog.close();document.getElementById('nf-leave-reason').focus();};
 const explanation = document.createElement('p');
 explanation.style.cssText='margin:16px;color:#8b1320;font:700 16px/1.6 sans-serif;';
 explanation.textContent='理由太空泛。請寫清楚實際事情，以及為何需要在請假當日處理。只填「預約辦事／私人原因／有事／處理事情」不能提交。';
 const reasonExplanation=explanation.textContent;
 dialog.append(image,explanation,close);document.body.append(dialog);
 const style=document.createElement('style');
 style.textContent='#leave-serious-warning::backdrop{background:#10213bc4}';
 document.head.append(style);
 document.addEventListener('click', function(event){
  if(!event.target.closest('#nf-leave-copy'))return;
  const button=document.getElementById('nf-leave-copy');
  const reason=document.getElementById('nf-leave-reason');
  const type=document.querySelector('input[name="nf-leave-type"]:checked')?.value;
  if(!reason.value.trim())return;
  const result=classifyReason(reason.value);
  if(result==='clear'||((type==='family'||type==='family_emergency')&&result==='vague')){attempts.delete(button);return;}
  event.preventDefault();event.stopImmediatePropagation();
  const count=(attempts.get(button)||0)+1;attempts.set(button,count);
  const severe=count>=2;
  image.src=severe?'leave-serious-warning.svg':'leave-reason-reminder.svg';
  image.alt=severe?'嚴重警告：你！請認真填寫！請說明實際事由後重新提交。':'請認真填寫請假理由。';
  dialog.setAttribute('aria-label',severe?'嚴重警告：請認真填寫請假申請':'請補充實際請假理由');
  explanation.textContent=(severe?'⚠️ 已再次提醒：':'')+reasonExplanation;
  const value=id=>document.getElementById(id)?.value?.trim()||'';
  const record=()=>fetch('https://batsjsznudkeqaaijxsg.supabase.co/functions/v1/public-leave-anomaly',{
   method:'POST',headers:{'Content-Type':'application/json'},keepalive:true,
   body:JSON.stringify({name:value('nf-leave-name')||value('nf-leave-english'),alias:value('nf-leave-alias'),type,reason:reason.value,category:result,attempt:count})
  }).then(r=>{if(!r.ok)throw Error('Log not saved');});
  record().catch(()=>setTimeout(()=>record().catch(()=>{
   const box=document.getElementById('nf-leave-status');
   if(box&&reason.value===value('nf-leave-reason'))box.textContent+='（異常紀錄暫未同步，請聯絡管理層。）';
  }),1500));
  const status=document.getElementById('nf-leave-status');
  if(status)status.textContent=result==='vague'
   ?explanation.textContent
   :'請認真填寫與本次請假有關的實際理由。';
  if(result==='invalid'||result==='vague'){
   if(typeof dialog.showModal==='function'){if(!dialog.isConnected)document.body.append(dialog);if(!style.isConnected)document.head.append(style);if(!dialog.open)dialog.showModal();}
   else window.alert('請認真填寫！不接受以亂碼、玩笑或無關內容作為請假理由。');
  }else reason.focus();
 },true);
});
})();
