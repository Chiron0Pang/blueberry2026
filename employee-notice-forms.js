(function(){
const translations={
'zh-TW':['📝 請假及離職通知表格','填寫後複製內容，自行發送給管理層。','📝 員工請假申請表','英文姓名 *','別名（選填）','請假類型 *','事假','病假','其他','開始日期 *','結束日期 *','預計返工日期 *','請假原因 *','請盡早通知管理層；病假或突發情況請盡快通知。通知不代表已獲批准。','我確認資料正確，並會自行發送給管理層。','📋 複製請假申請','📋 員工離職通知表','提出通知日期 *','提前通知日數 *','自訂日數','輸入日數（0–365）','離職原因 *','為方便安排人手，請盡量提前兩星期（14日）通知管理層。實際通知要求以適用合約及法律為準。','📋 複製離職通知','表格只會複製文字，不會上傳或儲存資料。','共 {n} 個日曆日','預計最後工作日期：{date}（提前 {n} 日）','請填妥所有必填資料，並確認資料正確。','已複製，請自行發送管理層。','複製失敗，請手動複製以下內容：','無','通知日數不足14日，建議盡快與管理層溝通。','最後工作日期','通知日期','請假日期','原因'],
'zh-CN':['📝 请假及离职通知表格','填写后复制内容，自行发送给管理层。','📝 员工请假申请表','英文姓名 *','别名（选填）','请假类型 *','事假','病假','其他','开始日期 *','结束日期 *','预计返工日期 *','请假原因 *','请尽早通知管理层；病假或突发情况请尽快通知。通知不代表已获批准。','我确认资料正确，并会自行发送给管理层。','📋 复制请假申请','📋 员工离职通知表','提出通知日期 *','提前通知天数 *','自定义天数','输入天数（0–365）','离职原因 *','为方便安排人手，请尽量提前两星期（14天）通知管理层。实际通知要求以适用合同及法律为准。','📋 复制离职通知','表格仅复制文字，不会上传或储存资料。','共 {n} 个日历日','预计最后工作日期：{date}（提前 {n} 天）','请填写必填资料并确认。','已复制，请自行发送给管理层。','复制失败，请手动复制以下内容：','无','通知不足14天，建议尽快与管理层沟通。','最后工作日期','通知日期','请假日期','原因'],
'en':['📝 Leave and Resignation Forms','Complete the form, copy the message, and send it to management yourself.','📝 Employee Leave Request','Full English name *','Nickname (optional)','Leave type *','Personal leave','Sick leave','Other','Start date *','End date *','Expected return date *','Reason for leave *','Notify management as early as possible. For sickness or emergencies, notify as soon as possible. Sending a notice does not mean leave is approved.','I confirm the details are correct and will send the message to management.','📋 Copy leave request','📋 Employee Resignation Notice','Notice date *','Advance notice days *','Custom days','Enter days (0–365)','Reason for leaving *','Please aim to give at least two weeks (14 days) notice for staffing arrangements. Actual requirements depend on applicable contracts and law.','📋 Copy resignation notice','The forms only copy text; no information is uploaded or stored.','{n} calendar days','Expected last working day: {date} ({n} days notice)','Complete all required fields and confirm the details.','Copied! Please send to management yourself.','Copy failed. Please manually copy the text below:','None','Less than 14 days notice; please discuss with management.','Last working day','Notice date','Leave dates','Reason'],
'ja':['📝 休暇・退職届フォーム','入力後、文章をコピーして管理者に送信してください。','📝 休暇申請フォーム','英語氏名 *','ニックネーム（任意）','休暇の種類 *','私用休暇','病気休暇','その他','開始日 *','終了日 *','復帰予定日 *','休暇理由 *','できるだけ早く管理者に連絡してください。病気や緊急時は速やかに連絡してください。通知は承認を意味しません。','内容を確認し、自分で管理者に送信します。','📋 休暇申請をコピー','📋 退職通知フォーム','通知日 *','事前通知日数 *','日数を指定','日数を入力（0～365）','退職理由 *','人員調整のため、できるだけ2週間（14日）前に通知してください。実際の条件は契約・法律によります。','📋 退職通知をコピー','コピーのみで、情報はアップロード・保存されません。','{n} 暦日','最終勤務予定日：{date}（{n} 日前通知）','必須項目を入力し、確認してください。','コピーしました。管理者に送信してください。','コピーできませんでした。以下を手動でコピーしてください：','なし','通知が14日未満です。管理者に相談してください。','最終勤務日','通知日','休暇期間','理由'],
'ko':['📝 휴가 및 퇴사 통보 양식','작성 후 내용을 복사하여 관리자에게 직접 보내세요.','📝 직원 휴가 신청서','영문 성명 *','별명(선택)','휴가 유형 *','개인 사유 휴가','병가','기타','시작일 *','종료일 *','복귀 예정일 *','휴가 사유 *','가능한 한 일찍 관리자에게 알리세요. 질병이나 긴급 상황은 즉시 연락하세요. 통보가 승인으로 간주되지는 않습니다.','내용이 정확함을 확인하고 관리자에게 직접 보내겠습니다.','📋 휴가 신청 복사','📋 직원 퇴사 통보서','통보일 *','사전 통보 일수 *','직접 입력','일수 입력(0~365)','퇴사 사유 *','인력 배치를 위해 가능하면 최소 2주(14일) 전에 알려 주세요. 실제 요건은 계약과 관련 법률에 따릅니다.','📋 퇴사 통보 복사','복사만 가능하며 정보는 업로드되거나 저장되지 않습니다.','총 {n}일','예상 마지막 근무일: {date} ({n}일 전 통보)','필수 항목을 작성하고 확인해 주세요.','복사했습니다. 관리자에게 직접 보내세요.','복사 실패. 아래 내용을 직접 복사하세요:','없음','14일 미만 통보입니다. 관리자와 상의하세요.','마지막 근무일','통보일','휴가 기간','사유']
};
const ids=['heading','intro','leave-title','leave-name-label','leave-alias-label','leave-type-label','leave-personal','leave-sick','leave-other','leave-start-label','leave-end-label','leave-return-label','leave-reason-label','leave-reminder','leave-confirm-label','leave-copy','resign-title','resign-notice-label','resign-days-label','custom-label','resign-custom-label','resign-reason-label','resign-reminder','resign-copy','privacy'];
const el=id=>document.getElementById('nf-'+id);
const parse=s=>{if(!/^\d{4}-\d{2}-\d{2}$/.test(s||''))return null;const [y,m,d]=s.split('-').map(Number),v=new Date(Date.UTC(y,m-1,d));return v.getUTCFullYear()===y&&v.getUTCMonth()===m-1&&v.getUTCDate()===d?v:null};
const fmt=d=>String(d.getUTCDate()).padStart(2,'0')+'/'+String(d.getUTCMonth()+1).padStart(2,'0')+'/'+d.getUTCFullYear();
const dateDiff=(a,b)=>Math.round((b-a)/86400000);
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
el('leave-copy').onclick=()=>{
const a=parse(el('leave-start').value),b=parse(el('leave-end').value),back=parse(el('leave-return').value),name=el('leave-name').value.trim(),reason=el('leave-reason').value.trim();
if(!name||!a||!b||b<a||!back||back<=b||!reason||!el('leave-confirm').checked){status('leave',w[27]);return}
const type=document.querySelector('input[name="nf-leave-type"]:checked')?.value||'personal',typeText=w[type==='personal'?6:type==='sick'?7:8];
copy('leave',[w[2],w[3]+': '+name,w[4]+': '+(el('leave-alias').value.trim()||w[30]),w[5]+': '+typeText,w[34]+': '+fmt(a)+' – '+fmt(b),w[25].replace('{n}',dateDiff(a,b)+1),w[11]+': '+fmt(back),w[35]+': '+reason].join('\n'));
};
el('resign-copy').onclick=()=>{
const calc=refreshResign(),name=el('resign-name').value.trim(),reason=el('resign-reason').value.trim();
if(!name||!calc||!reason||!el('resign-confirm').checked){status('resign',w[27]);return}
copy('resign',[w[16],w[3]+': '+name,w[4]+': '+(el('resign-alias').value.trim()||w[30]),w[33]+': '+fmt(calc.d),w[18]+': '+calc.n,w[32]+': '+fmt(calc.last),w[35]+': '+reason].join('\n'));
};
};
})();