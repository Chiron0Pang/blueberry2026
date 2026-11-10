(function(){
const translations={
'zh-TW':['📝 請假及離職通知表格','填寫後複製內容，自行發送給管理層。','📝 員工請假申請表','英文姓名 *','別名（選填）','請假類型 *','事假','病假','其他','開始日期 *','結束日期 *','預計返工日期 *','理由 *','請盡早通知管理層；病假或突發情況請盡快通知。通知不代表已獲批准。','我確認資料正確，並會自行發送給管理層。','📋 複製請假申請','📋 員工離職通知表','提出通知日期 *','提前通知日數 *','自訂日數','輸入日數（0–365）','離職原因 *','為方便安排人手，請盡量提前兩星期（14日）通知管理層。實際通知要求以適用合約及法律為準。','📋 複製離職通知','表格只會複製文字，不會上傳或儲存資料。','共 {n} 個日曆日','預計最後工作日期：{date}（提前 {n} 日）','請填妥所有必填資料，並確認資料正確。','已複製，請自行發送管理層。','複製失敗，請手動複製以下內容：','無','通知日數不足14日，建議盡快與管理層溝通。','最後工作日期','通知日期','請假日期','原因'],
'zh-CN':['📝 请假及离职通知表格','填写后复制内容，自行发送给管理层。','📝 员工请假申请表','英文姓名 *','别名（选填）','请假类型 *','事假','病假','其他','开始日期 *','结束日期 *','预计返工日期 *','理由 *','请尽早通知管理层；病假或突发情况请尽快通知。通知不代表已获批准。','我确认资料正确，并会自行发送给管理层。','📋 复制请假申请','📋 员工离职通知表','提出通知日期 *','提前通知天数 *','自定义天数','输入天数（0–365）','离职原因 *','为方便安排人手，请尽量提前两星期（14天）通知管理层。实际通知要求以适用合同及法律为准。','📋 复制离职通知','表格仅复制文字，不会上传或储存资料。','共 {n} 个日历日','预计最后工作日期：{date}（提前 {n} 天）','请填写必填资料并确认。','已复制，请自行发送给管理层。','复制失败，请手动复制以下内容：','无','通知不足14天，建议尽快与管理层沟通。','最后工作日期','通知日期','请假日期','原因'],
'en':['📝 Leave and Resignation Forms','Complete the form, copy the message, and send it to management yourself.','📝 Employee Leave Request','Full English name *','Nickname (optional)','Leave type *','Personal leave','Sick leave','Other','Start date *','End date *','Expected return date *','Reason *','Notify management as early as possible. For sickness or emergencies, notify as soon as possible. Sending a notice does not mean leave is approved.','I confirm the details are correct and will send the message to management.','📋 Copy leave request','📋 Employee Resignation Notice','Notice date *','Advance notice days *','Custom days','Enter days (0–365)','Reason for leaving *','Please aim to give at least two weeks (14 days) notice for staffing arrangements. Actual requirements depend on applicable contracts and law.','📋 Copy resignation notice','The forms only copy text; no information is uploaded or stored.','{n} calendar days','Expected last working day: {date} ({n} days notice)','Complete all required fields and confirm the details.','Copied! Please send to management yourself.','Copy failed. Please manually copy the text below:','None','Less than 14 days notice; please discuss with management.','Last working day','Notice date','Leave dates','Reason'],
'ja':['📝 休暇・退職届フォーム','入力後、文章をコピーして管理者に送信してください。','📝 休暇申請フォーム','英語氏名 *','ニックネーム（任意）','休暇の種類 *','私用休暇','病気休暇','その他','開始日 *','終了日 *','復帰予定日 *','理由 *','できるだけ早く管理者に連絡してください。病気や緊急時は速やかに連絡してください。通知は承認を意味しません。','内容を確認し、自分で管理者に送信します。','📋 休暇申請をコピー','📋 退職通知フォーム','通知日 *','事前通知日数 *','日数を指定','日数を入力（0～365）','退職理由 *','人員調整のため、できるだけ2週間（14日）前に通知してください。実際の条件は契約・法律によります。','📋 退職通知をコピー','コピーのみで、情報はアップロード・保存されません。','{n} 暦日','最終勤務予定日：{date}（{n} 日前通知）','必須項目を入力し、確認してください。','コピーしました。管理者に送信してください。','コピーできませんでした。以下を手動でコピーしてください：','なし','通知が14日未満です。管理者に相談してください。','最終勤務日','通知日','休暇期間','理由'],
'ko':['📝 휴가 및 퇴사 통보 양식','작성 후 내용을 복사하여 관리자에게 직접 보내세요.','📝 직원 휴가 신청서','영문 성명 *','별명(선택)','휴가 유형 *','개인 사유 휴가','병가','기타','시작일 *','종료일 *','복귀 예정일 *','사유 *','가능한 한 일찍 관리자에게 알리세요. 질병이나 긴급 상황은 즉시 연락하세요. 통보가 승인으로 간주되지는 않습니다.','내용이 정확함을 확인하고 관리자에게 직접 보내겠습니다.','📋 휴가 신청 복사','📋 직원 퇴사 통보서','통보일 *','사전 통보 일수 *','직접 입력','일수 입력(0~365)','퇴사 사유 *','인력 배치를 위해 가능하면 최소 2주(14일) 전에 알려 주세요. 실제 요건은 계약과 관련 법률에 따릅니다.','📋 퇴사 통보 복사','복사만 가능하며 정보는 업로드되거나 저장되지 않습니다.','총 {n}일','예상 마지막 근무일: {date} ({n}일 전 통보)','필수 항목을 작성하고 확인해 주세요.','복사했습니다. 관리자에게 직접 보내세요.','복사 실패. 아래 내용을 직접 복사하세요:','없음','14일 미만 통보입니다. 관리자와 상의하세요.','마지막 근무일','통보일','휴가 기간','사유']
};
const ids=['heading','intro','leave-title','leave-name-label','leave-alias-label','leave-type-label','leave-personal','leave-sick','leave-other','leave-start-label','leave-end-label','leave-return-label','leave-reason-label','leave-reminder','leave-confirm-label','leave-copy','resign-title','resign-notice-label','resign-days-label','custom-label','resign-custom-label','resign-reason-label','resign-reminder','resign-copy','privacy'];
const personalReasonPrompts={
 'zh-TW':['請填寫具體理由，例如：家庭事務或預約辦事。','事假必須填寫具體理由。'],
 'zh-CN':['请填写具体理由，例如：家庭事务或预约办事。','事假必须填写具体理由。'],
 'en':['Enter a specific reason, e.g. a family matter or an appointment.','Enter a specific reason for personal leave.'],
 'ja':['具体的な理由を入力してください。例：家庭の事情、予約している用事。','私用休暇の具体的な理由を入力してください。'],
 'ko':['가족 일이나 예약된 일정 등 구체적인 사유를 입력하세요.','개인 사유 휴가의 구체적인 사유를 입력하세요.']
};
const genericPersonalReason=/^(?:事假|請事假|请事假|personal\s*leave|私用休暇|개인\s*사유\s*휴가)$/iu;
const el=id=>document.getElementById('nf-'+id);
const parse=s=>{if(!/^\d{4}-\d{2}-\d{2}$/.test(s||''))return null;const [y,m,d]=s.split('-').map(Number),v=new Date(Date.UTC(y,m-1,d));return v.getUTCFullYear()===y&&v.getUTCMonth()===m-1&&v.getUTCDate()===d?v:null};
const fmt=d=>String(d.getUTCDate()).padStart(2,'0')+'/'+String(d.getUTCMonth()+1).padStart(2,'0')+'/'+d.getUTCFullYear();
const dateDiff=(a,b)=>Math.round((b-a)/86400000);
const signalReminders={
 'zh-TW':['已複製請假申請','記得發給工頭讓他知道哦～\n在 Signal','知道了'],
 'zh-CN':['已复制请假申请','记得发给工头让他知道哦～\n在 Signal','知道了'],
 'en':['Leave request copied','Remember to send it to your supervisor on Signal.','Got it'],
 'ja':['休暇申請をコピーしました','Signalで現場責任者に送って、休暇申請を知らせてください。','わかりました'],
 'ko':['휴가 신청을 복사했습니다','Signal로 현장 책임자에게 휴가 신청을 보내 주세요.','확인']
};
let lastSubmittedLeave;
window.initEmployeeNoticeForms=function(lang){
const w=translations[lang]||translations['zh-TW'];if(!el('heading'))return;
ids.forEach((id,i)=>{if(el(id))el(id).textContent=w[i]});
['resign-name-label','resign-alias-label'].forEach((id,i)=>el(id).textContent=w[3+i]);
const status=(kind,msg)=>el(kind+'-status').textContent=msg;
const refreshLeave=()=>{const a=parse(el('leave-start').value),b=parse(el('leave-end').value);el('leave-days').textContent=a&&b&&b>=a?w[25].replace('{n}',dateDiff(a,b)+1):'';};
const refreshResign=()=>{const d=parse(el('resign-notice').value),custom=el('resign-days').value==='custom';el('resign-custom-wrap').hidden=!custom;const n=Number(custom?el('resign-custom').value:el('resign-days').value),valid=Number.isInteger(n)&&n>=0&&n<=365;if(!d||!valid){el('resign-last').textContent='';return null}const last=new Date(d.getTime()+n*86400000);el('resign-last').textContent=w[26].replace('{date}',fmt(last)).replace('{n}',n)+(n<14?' ⚠️ '+w[31]:'');return {n,last,d};};
['leave-start','leave-end'].forEach(id=>el(id).oninput=refreshLeave);
['resign-notice','resign-days','resign-custom'].forEach(id=>{el(id).oninput=refreshResign;el(id).onchange=refreshResign});
refreshLeave();refreshResign();
async function copy(kind,message){try{await navigator.clipboard.writeText(message);status(kind,w[28]);}catch(e){status(kind,w[29]);let area=el(kind+'-manual');if(!area){area=document.createElement('textarea');area.id='nf-'+kind+'-manual';area.rows=9;el(kind+'-status').after(area)}area.value=message;area.style.width='100%';area.focus();area.select();}}
const messages={
'zh-TW':{hint:"中文或英文姓名（二選一）及別名必須與員工系統吻合。姓與名可以調轉。提交後請按「複製已提交申請」。請假須經管理員批准。",button:"📤 提交請假申請",working:'正在核對及登記…',done:"✅ 已提交待審批，亦已複製申請內容。",copied:"已提交待審批。瀏覽器未能自動複製，請長按下方文字複製。",fail:'❌ 姓名或別名未能唯一配對，未有登記。請核對後聯絡管理員。',duplicate:'⚠️ 日期已有請假紀錄，未重複登記。',rate:'⚠️ 提交過於頻繁，請稍後再試。',offline:"⚠️ 未能確認是否提交成功，請先向管理員查詢。",submitted:"✅ 已提交待審批。請按下方按鈕複製申請。",retry:"📋 複製已提交申請",dateError:"預計返工日期必須遲過請假結束日期。"},
'zh-CN':{hint:"中文或英文姓名（二选一）及别名必须与员工系统一致。姓与名可以调换。提交后请点击「复制已提交申请」。请假须经管理员批准。",button:"📤 提交请假申请",working:'正在核对及登记…',done:"✅ 已提交待审批，且已复制申请内容。",copied:"已提交待审批。浏览器无法自动复制，请长按下方文字复制。",fail:'❌ 姓名或别名未能唯一匹配，未登记。',duplicate:'⚠️ 日期已有请假记录。',rate:'⚠️ 提交过于频繁，请稍后再试。',offline:"⚠️ 无法确认提交是否成功，请先向管理员查询。",submitted:"✅ 已提交待审批。请点击下方按钮复制申请。",retry:"📋 复制已提交申请",dateError:"预计返工日期必须晚于请假结束日期。"},
'en':{hint:"Enter your Chinese or English full name and the nickname in the employee system. Surname and given-name order can be swapped. After submitting, use the copy button. Leave requires manager approval.",button:"📤 Submit leave request",working:'Checking and recording…',done:"✅ Submitted for approval and copied.",copied:"Submitted for approval. Automatic copying failed. Select and copy the text below.",fail:'❌ Name/nickname not uniquely matched. Nothing recorded.',duplicate:'⚠️ Existing leave record for these dates.',rate:'⚠️ Too many attempts. Try later.',offline:"⚠️ Submission could not be confirmed. Check with management first.",submitted:"✅ Submitted for approval. Use the button below to copy the request.",retry:"📋 Copy submitted request",dateError:"The expected return date must be after the leave end date."},
'ja':{hint:"中国語または英語の氏名と、社員システムに登録されたニックネームを入力してください。姓名の順序は入れ替え可能です。送信後にコピーできます。休暇には管理者の承認が必要です。",button:"📤 休暇申請を送信",working:'照合・登録中…',done:"✅ 承認待ちの申請をコピーしました。",copied:"申請は承認待ちです。自動コピーに失敗しました。下の文章を選択してコピーしてください。",fail:'❌ 氏名とニックネームが一致しません。未登録です。',duplicate:'⚠️ 既存の休暇記録があります。',rate:'⚠️ 試行回数が多すぎます。',offline:"⚠️ 送信結果を確認できません。まず管理者に確認してください。",submitted:"✅ 申請を送信しました。下のボタンでコピーできます。",retry:"📋 送信済み申請をコピー",dateError:"復帰予定日は休暇終了日より後にしてください。"},
'ko':{hint:"직원 시스템에 등록된 중국어 또는 영어 이름과 별명을 입력하세요. 성과 이름 순서를 바꿀 수 있습니다. 제출 후 복사할 수 있습니다. 휴가는 관리자 승인이 필요합니다.",button:"📤 휴가 신청 제출",working:'확인 및 등록 중…',done:"✅ 승인 대기 중인 신청 내용을 복사했습니다.",copied:"승인 대기 중입니다. 자동 복사에 실패했습니다. 아래 내용을 선택해 복사하세요.",fail:'❌ 이름/별명이 일치하지 않아 등록되지 않았습니다.',duplicate:'⚠️ 해당 날짜에 기존 휴가 기록이 있습니다.',rate:'⚠️ 요청이 너무 많습니다.',offline:"⚠️ 제출 결과를 확인할 수 없습니다. 먼저 관리자에게 문의하세요.",submitted:"✅ 승인 대기 중입니다. 아래 버튼을 눌러 신청 내용을 복사하세요.",retry:"📋 제출한 신청 복사",dateError:"복귀 예정일은 휴가 종료일보다 늦어야 합니다."}
};
const m=messages[lang]||messages['zh-TW'];
const fields={
'zh-TW':['中文姓名（選填）','英文姓名（選填）','中文或英文姓名填其中一項即可；別名必填。'],
'zh-CN':['中文姓名（选填）','英文姓名（选填）','中文或英文姓名填写其中一项即可；别名必填。'],
'en':['Chinese name (optional)','English name (optional)','Enter either a Chinese or English name. Nickname is required.'],
'ja':['中国語の氏名（任意）','英語の氏名（任意）','中国語または英語の氏名を入力してください。ニックネームは必須です。'],
'ko':['중국어 이름 (선택)','영어 이름 (선택)','중국어 또는 영어 이름을 입력하세요. 별명은 필수입니다.']
}[lang]||['中文姓名（選填）','英文姓名（選填）','中文或英文姓名填其中一項即可；別名必填。'];
el('leave-name-label').textContent=fields[0];el('leave-english-label').textContent=fields[1];el('leave-name-help').textContent=fields[2];
el('leave-alias-label').textContent=w[4].replace(/（選填）|（选填）| \\(optional\\)|（任意）|\\(선택\\)/g,'')+' *';
const reasonField=el('leave-reason');
const getLeaveType=()=>document.querySelector('input[name="nf-leave-type"]:checked')?.value||'personal';
const [personalReasonHint,personalReasonError]=personalReasonPrompts[lang]||personalReasonPrompts['zh-TW'];
const otherReasonHint=({'zh-TW':'例如：頭痛、生理期、身體不適等','zh-CN':'例如：头痛、生理期、身体不适等','en':'e.g. headache, menstrual discomfort, feeling unwell','ja':'例：頭痛、生理痛、体調不良など','ko':'예: 두통, 생리통, 몸이 아픈 경우 등'}[lang]||'例如：頭痛、生理期、身體不適等');
const refreshReasonHint=()=>{reasonField.placeholder=getLeaveType()==='personal'?personalReasonHint:otherReasonHint};
document.querySelectorAll('input[name="nf-leave-type"]').forEach(input=>{input.onchange=refreshReasonHint});
refreshReasonHint();
el('leave-name').placeholder='例如：陳大文';el('leave-english').placeholder='e.g. Lam XXX Iris';el('leave-alias').placeholder='例如：YY';
el('leave-copy').textContent=m.button;
el('leave-reminder').textContent=m.hint;
el('privacy').hidden=true;
const copyPanel=el('leave-copy-panel');
const copyText=el('leave-copy-text');
const copyButton=el('leave-copy-again');
copyButton.textContent=m.retry;
copyText.setAttribute('aria-label',m.retry);
const signalReminder=el('leave-copy-reminder');
const [reminderTitle,reminderText,reminderClose]=signalReminders[lang]||signalReminders['zh-TW'];
el('leave-copy-reminder-title').textContent=reminderTitle;
el('leave-copy-reminder-text').textContent=reminderText;
el('leave-copy-reminder-close').textContent=reminderClose;
copyButton.onclick=async()=>{
 try{
  if(navigator.clipboard?.writeText){
   await navigator.clipboard.writeText(copyText.value);
  }else{
   copyText.focus();
   copyText.select();
   copyText.setSelectionRange(0,copyText.value.length);
   if(!document.execCommand('copy'))throw Error('Copy unavailable');
  }
 }catch{
  status('leave',m.copied);
  copyText.focus();
  copyText.select();
  copyText.setSelectionRange(0,copyText.value.length);
  return;
 }
 status('leave',m.done);
 if(typeof signalReminder.showModal==='function'){
  if(!signalReminder.open)signalReminder.showModal();
 }else{
  window.alert(reminderText);
 }
};
el('leave-copy').onclick=async()=>{
 const a=parse(el('leave-start').value),b=parse(el('leave-end').value),back=parse(el('leave-return').value),chineseName=el('leave-name').value.trim(),englishName=el('leave-english').value.trim(),name=chineseName||englishName,alias=el('leave-alias').value.trim(),reason=reasonField.value.trim();
 const button=el('leave-copy');
 if(button.disabled)return;
 copyPanel.hidden=true;
 const type=getLeaveType();
 const reasonText=reason.replace(/[\p{P}\p{S}\p{Cf}]/gu,'').trim();
 if(type==='personal'&&(!reasonText||genericPersonalReason.test(reasonText))){
  status('leave',personalReasonError);reasonField.focus();return;
 }
 if(b&&back&&back<=b){status('leave',m.dateError);el('leave-return').focus();return}
 if(!name||!alias||!a||!b||b<a||!back||!reason||!el('leave-confirm').checked){status('leave',w[27]);return}
 const typeText=w[type==='personal'?6:type==='sick'?7:8];
 const message=[
  w[2],
  ...(chineseName?[fields[0].replace(/（[^）]*）|\s*\([^)]*\)/g,'')+': '+chineseName]:[]),
  ...(englishName?[fields[1].replace(/（[^）]*）|\s*\([^)]*\)/g,'')+': '+englishName]:[]),
  el('leave-alias-label').textContent.replace(/\s*\*$/,'')+': '+alias,
  w[5].replace(/\s*\*$/,'')+': '+typeText,
  w[34]+': '+fmt(a)+' – '+fmt(b),
  w[25].replace('{n}',dateDiff(a,b)+1),
  w[11].replace(/\s*\*$/,'')+': '+fmt(back),
  w[12].replace(/\s*\*$/,'')+(lang==='zh-TW'||lang==='zh-CN'?'：':': ')+reason
 ].join('\n');
 const payload=JSON.stringify({name,alias,type,start:el('leave-start').value,end:el('leave-end').value,returnDate:el('leave-return').value,reason});
 if(payload!==lastSubmittedLeave){
  button.disabled=true;
  status('leave',m.working);
  try{
   const resp=await fetch('https://batsjsznudkeqaaijxsg.supabase.co/functions/v1/public-leave-submit',{method:'POST',headers:{'Content-Type':'application/json'},body:payload});
   const result=await resp.json();
   if(!resp.ok||!result.ok){status('leave',result.code==='duplicate'?m.duplicate:result.code==='not_matched'?m.fail:result.code==='rate_limit'?m.rate:m.offline);return}
   lastSubmittedLeave=payload;
  }catch{
   status('leave',m.offline);
   return;
  }finally{
   button.disabled=false;
  }
 }
 copyText.value=message;
 copyPanel.hidden=false;
 status('leave',m.submitted);
};
el('resign-copy').onclick=()=>{
const calc=refreshResign(),name=el('resign-name').value.trim(),reason=el('resign-reason').value.trim();
if(!name||!calc||!reason||!el('resign-confirm').checked){status('resign',w[27]);return}
copy('resign',[w[16],w[3]+': '+name,w[4]+': '+(el('resign-alias').value.trim()||w[30]),w[33]+': '+fmt(calc.d),w[18]+': '+calc.n,w[32]+': '+fmt(calc.last),w[35]+': '+reason].join('\n'));
};
};
})();