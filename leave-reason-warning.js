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
 const button=document.getElementById('nf-leave-copy'),reason=document.getElementById('nf-leave-reason');
 if(!button||!reason)return;
 const dialog=document.createElement('dialog');dialog.id='leave-serious-warning';
 dialog.style.cssText='border:0;padding:0;border-radius:20px;width:min(440px,calc(100vw - 32px));max-height:90dvh;overflow:auto;background:white;box-shadow:0 16px 60px #0006;';
 const image=document.createElement('img');image.style.cssText='display:block;width:100%;height:auto;';
 const explanation=document.createElement('p');explanation.style.cssText='margin:16px;color:#8b1320;font:700 16px/1.6 sans-serif;';
 const close=document.createElement('button');close.type='button';close.style.cssText='display:block;width:calc(100% - 32px);margin:12px 16px 16px;padding:14px;border:0;border-radius:12px;background:#ba0c19;color:white;font:700 18px sans-serif;cursor:pointer;';
 close.onclick=()=>{dialog.close();reason.focus();};
 dialog.append(image,explanation,close);document.body.append(dialog);
 const style=document.createElement('style');style.textContent='#leave-serious-warning::backdrop{background:#10213bc4}';document.head.append(style);
 const words=()=>({
  'zh-TW':['請補充實際請假理由','嚴重警告：請認真填寫請假申請','返回修改','理由太空泛。請寫清楚實際事情，以及為何需要在請假當日處理。','請認真填寫與本次請假有關的實際理由。','⚠️ 已再次提醒：','請核對日期'],
  'zh-CN':['请补充实际请假理由','严重警告：请认真填写请假申请','返回修改','理由太笼统，请说明实际事情及当天需要请假的原因。','请认真填写与本次请假有关的实际理由。','⚠️ 再次提醒：','请核对日期'],
  en:['Please clarify your leave reason','Repeated warning: please give an actual reason','Return and edit','Describe the actual matter requiring leave.','Please enter a relevant, meaningful leave reason.','Repeated reminder: ','Please check the dates'],
  ja:['実際の休暇理由を記入してください','再警告：実際の理由を記入してください','戻って修正','休暇が必要な実際の用事を記入してください。','休暇に関係する実際の理由を記入してください。','再度のお願い：','日付を確認してください'],
  ko:['실제 휴가 사유를 작성하세요','재차 경고: 실제 사유를 작성하세요','돌아가서 수정','휴가가 필요한 실제 용무를 작성하세요.','휴가와 관련된 실제 사유를 작성하세요.','재차 안내: ','날짜를 확인하세요']
 })[window.__leaveFormLanguage||'zh-TW'];
 function record(category,count) {
  const value=id=>document.getElementById(id)?.value?.trim()||'';
  const payload={name:value('nf-leave-name')||value('nf-leave-english'),alias:value('nf-leave-alias'),type:document.querySelector('input[name="nf-leave-type"]:checked')?.value,reason:reason.value,category,attempt:count};
  // Retry the same snapshot; never attribute a later edit to an earlier attempt.
  const send=()=>fetch('https://batsjsznudkeqaaijxsg.supabase.co/functions/v1/public-leave-anomaly',{method:'POST',headers:{'Content-Type':'application/json'},keepalive:true,body:JSON.stringify(payload)}).then(r=>{if(!r.ok)throw Error('Log not saved');});
  send().catch(()=>setTimeout(()=>send().catch(()=>{}),1500));
 }
 window.resetLeaveReasonWarnings=()=>attempts.delete(button);
 window.showLeaveReasonWarning=function(message,category='vague',countWarning=true) {
  const w=words(),count=(attempts.get(button)||0)+(countWarning?1:0);
  if(countWarning)attempts.set(button,count);
  const severe=countWarning&&count>=2;
  image.src=severe?'leave-serious-warning.svg':'leave-reason-reminder.svg';
  image.alt=severe?w[1]:w[0];
  // A date correction is not a misconduct warning and never increases the count.
  image.hidden=!countWarning;
  dialog.setAttribute('aria-label',!countWarning?w[6]:severe?w[1]:w[0]);
  const text=typeof message==='string'&&message.trim()?message.slice(0,500):category==='invalid'?w[4]:w[3];
  explanation.textContent=(severe?w[5]:'')+text;
  close.textContent=w[2];
  const status=document.getElementById('nf-leave-status');if(status)status.textContent=explanation.textContent;
  if(countWarning)record(category==='invalid'?'invalid':'vague',count);
  if(typeof dialog.showModal==='function'){if(!dialog.isConnected)document.body.append(dialog);if(!style.isConnected)document.head.append(style);if(!dialog.open)dialog.showModal();}
  else window.alert(explanation.textContent);
 };
 document.addEventListener('click',function(event){
  if(!event.target.closest('#nf-leave-copy')||button.disabled||!reason.value.trim())return;
  const type=document.querySelector('input[name="nf-leave-type"]:checked')?.value;
  const result=classifyReason(reason.value);
  // Do not reset on a locally clear phrase: the server AI may still need clarification.
  if(result==='clear'||((type==='family'||type==='family_emergency')&&result==='vague'))return;
  event.preventDefault();event.stopImmediatePropagation();
  window.showLeaveReasonWarning('',result,true);
 },true);
});
})();
