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
 'zh-TW':['請說明辦理甚麼事情，以及為何需要在請假當日處理。例：已預約到銀行親身辦理身份核實。毋須填寫戶口號碼等私隱資料。','理由太空泛。請寫清楚實際事情及當日需要請假的原因，不能只填「預約辦事／私人原因／有事／處理事情」。'],
 'zh-CN':['请说明办理什么事情，以及为何需要在请假当天处理。例：已预约到银行亲自办理身份核实。无需填写账号等隐私资料。','理由太笼统。请说明实际事情及当天需要请假的原因，不能只填“预约办事／私人原因／有事／处理事情”。'],
 'en':['Explain what you need to do and why it requires leave that day, e.g. an in-person bank identity verification appointment. Do not include account numbers or other private details.','The reason is too vague. Describe the actual matter and why you need leave that day; “appointment”, “personal reasons” or “errands” alone is insufficient.'],
 'ja':['何をするために、その日に休暇が必要なのか記入してください。例：銀行で本人確認の予約があり、来店が必要。口座番号などは不要です。','理由が曖昧です。用事の内容と、その日に休暇が必要な理由を記入してください。「私用」「予約」だけでは不十分です。'],
 'ko':['어떤 일이며 왜 그날 휴가가 필요한지 작성하세요. 예: 은행 본인 확인 예약으로 직접 방문해야 함. 계좌번호 등은 적지 마세요.','사유가 너무 모호합니다. 실제 용무와 그날 휴가가 필요한 이유를 작성하세요. “개인 사유”, “예약”만으로는 부족합니다.']
};
const genericPersonalReason=/^(?:(?:因為|因为|因|需要|需|我要|我想|想要|想|要|已)?(?:請事假|请事假|事假|預約辦事|预约办事|預約|预约|辦事|办事|私人原因|個人原因|个人原因|私人事務|私人事务|個人事務|个人事务|家庭事務|家庭事务|有事|有事情|處理事情|处理事情|處理私事|处理私事|私事|有安排|其他)|personal\s*(?:leave|reasons?|matters?)|private\s*(?:reasons?|matters?)|an?\s*appointment|appointment|family\s*matters?|errands?|something\s*to\s*do|私用休暇|私用|家庭の事情|用事|予約|개인\s*(?:사유|용무)(?:\s*휴가)?|예약)$/iu;
const el=id=>document.getElementById('nf-'+id);
const parse=s=>{if(!/^\d{4}-\d{2}-\d{2}$/.test(s||''))return null;const [y,m,d]=s.split('-').map(Number),v=new Date(Date.UTC(y,m-1,d));return v.getUTCFullYear()===y&&v.getUTCMonth()===m-1&&v.getUTCDate()===d?v:null};
const fmt=d=>String(d.getUTCDate()).padStart(2,'0')+'/'+String(d.getUTCMonth()+1).padStart(2,'0')+'/'+d.getUTCFullYear();
const dateDiff=(a,b)=>Math.round((b-a)/86400000);
const signalReminders={
 'zh-TW':['已複製請假申請','記得在Signal發給工頭及隊長讓他們知道你要(請假)哦~','知道了'],
 'zh-CN':['已复制请假申请','记得发给工头让他知道哦～\n在 Signal','知道了'],
 'en':['Leave request copied','Remember to send it to your supervisor on Signal.','Got it'],
 'ja':['休暇申請をコピーしました','Signalで現場責任者に送って、休暇申請を知らせてください。','わかりました'],
 'ko':['휴가 신청을 복사했습니다','Signal로 현장 책임자에게 휴가 신청을 보내 주세요.','확인']
};
const resignationText={
 'zh-TW':{intro:'請填寫並提交請假申請或離職通知。',privacy:'已提交的表格只供授權管理員審核。',name:'英文姓名（選填）',help:'英文全名或別名填一項。兩項都有填，就必須對到同一位員工。',send:'按「複製離職通知」會同時將通知私下送交管理員審核。',confirm:'我確認資料正確，並提交離職通知。',sending:'正在核對員工資料並送出…',done:'✅ 已送交管理員審核，並已複製離職通知。',manual:'✅ 已送交管理員審核。請長按下方文字複製。',retry:'📋 再複製已提交的通知',mismatch:'英文姓名或別名未能唯一配對，未有送出。請核對後再試。',pending:'已有一份通知待審核；如需更改，請聯絡管理員。',offline:'未能確認送出結果。請稍後重試。'},
 'zh-CN':{intro:'请填写并提交请假申请或离职通知。',privacy:'已提交的表格仅供授权管理员审核。',name:'英文姓名（选填）',help:'英文全名或别名填写一项。两项都填时，须匹配同一位员工。',send:'点击「复制离职通知」会同时将通知私下送交管理员审核。',confirm:'我确认资料正确，并提交离职通知。',sending:'正在核对员工资料并提交…',done:'✅ 已送交管理员审核，并已复制离职通知。',manual:'✅ 已送交管理员审核。请长按下方文字复制。',retry:'📋 再复制已提交的通知',mismatch:'英文姓名或别名无法唯一匹配，未提交。请核对后重试。',pending:'已有一份通知待审核。如需更改，请联系管理员。',offline:'无法确认提交结果，请稍后重试。'},
 en:{intro:'Complete and submit a leave request or resignation notice.',privacy:'Submitted forms are available to authorised managers for review.',name:'English full name (optional)',help:'Enter your English full name or nickname. If you enter both, they must identify the same employee.',send:'Copying the resignation notice also submits it privately for manager review.',confirm:'I confirm the details and submit this resignation notice.',sending:'Checking employee details and submitting…',done:'✅ Submitted for manager review and copied.',manual:'✅ Submitted for manager review. Select and copy the text below.',retry:'📋 Copy submitted notice',mismatch:'The name or nickname could not be matched to one employee. Check your entry and retry.',pending:'A notice is already awaiting review. Contact management to make changes.',offline:'Submission could not be confirmed. Please retry later.'},
 ja:{intro:'休暇申請または退職通知を入力し、送信してください。',privacy:'送信内容は権限のある管理者のみが確認できます。',name:'英語氏名（任意）',help:'英語の氏名またはニックネームを入力してください。両方の場合は同じ従業員と一致する必要があります。',send:'退職通知をコピーすると、管理者の確認用に非公開で送信されます。',confirm:'内容を確認し、退職通知を送信します。',sending:'従業員情報を照合して送信中…',done:'✅ 管理者に送信し、通知をコピーしました。',manual:'✅ 管理者に送信しました。下の文章を選択してコピーしてください。',retry:'📋 送信済みの通知をコピー',mismatch:'氏名またはニックネームが一意に一致しません。入力を確認してください。',pending:'確認待ちの通知があります。変更は管理者に連絡してください。',offline:'送信を確認できません。時間をおいて再試行してください。'},
 ko:{intro:'휴가 신청 또는 퇴사 통보를 작성해 제출하세요.',privacy:'제출된 양식은 권한이 있는 관리자만 검토할 수 있습니다.',name:'영문 성명 (선택)',help:'영문 성명이나 별명 중 하나를 입력하세요. 둘 다 입력하면 동일한 직원과 일치해야 합니다.',send:'퇴사 통보를 복사하면 관리자 검토를 위해 비공개로 제출됩니다.',confirm:'내용이 정확함을 확인하고 퇴사 통보를 제출합니다.',sending:'직원 정보 확인 후 제출 중…',done:'✅ 관리자에게 제출하고 통보를 복사했습니다.',manual:'✅ 관리자에게 제출했습니다. 아래 내용을 선택해 복사하세요.',retry:'📋 제출한 통보 다시 복사',mismatch:'성명 또는 별명이 직원 한 명과 일치하지 않습니다. 입력 내용을 확인하세요.',pending:'검토 대기 중인 통보가 있습니다. 변경은 관리자에게 문의하세요.',offline:'제출을 확인할 수 없습니다. 잠시 후 다시 시도하세요.'}
};
let lastSubmittedLeave,lastSubmittedResignation;
window.initEmployeeNoticeForms=function(lang){
window.__leaveFormLanguage=lang;
let manualReviewNote='';
const w=translations[lang]||translations['zh-TW'];if(!el('heading'))return;
ids.forEach((id,i)=>{if(el(id))el(id).textContent=w[i]});
const resign=resignationText[lang]||resignationText['zh-TW'];
el('intro').textContent=resign.intro;
el('privacy').textContent=resign.privacy;
el('resign-name-label').textContent=resign.name;
el('resign-alias-label').textContent=w[4];
el('resign-name-help').textContent=resign.help;
el('resign-send-help').textContent=resign.send;
el('resign-confirm-label').textContent=resign.confirm;
el('resign-copy-again').textContent=resign.retry;
el('resign-copy-text').setAttribute('aria-label',resign.retry);
const status=(kind,msg)=>el(kind+'-status').textContent=msg;
const refreshLeave=()=>{const a=parse(el('leave-start').value),b=parse(el('leave-end').value);el('leave-days').textContent=a&&b&&b>=a?w[25].replace('{n}',dateDiff(a,b)+1):'';};
const refreshResign=()=>{const d=parse(el('resign-notice').value),custom=el('resign-days').value==='custom';el('resign-custom-wrap').hidden=!custom;const daysValue=custom?el('resign-custom').value:el('resign-days').value,n=Number(daysValue),valid=daysValue.trim()!==''&&Number.isInteger(n)&&n>=0&&n<=365;if(!d||!valid){el('resign-last').textContent='';return null}const last=new Date(d.getTime()+n*86400000);el('resign-last').textContent=w[26].replace('{date}',fmt(last)).replace('{n}',n)+(n<14?' ⚠️ '+w[31]:'');return {n,last,d};};
['leave-start','leave-end'].forEach(id=>el(id).oninput=refreshLeave);
['resign-notice','resign-days','resign-custom'].forEach(id=>{el(id).oninput=refreshResign;el(id).onchange=refreshResign});
refreshLeave();refreshResign();
const messages={
'zh-TW':{hint:"中文或英文姓名（二選一）及別名必須與員工系統吻合。姓與名可以調轉。提交成功後會嘗試複製內容。請假須經管理員批准。",button:"📤 提交請假申請及複製",working:'正在核對及登記…',done:"✅ 已提交待審批，亦已複製申請內容。",copied:"已提交待審批。瀏覽器未能自動複製，請長按下方文字複製。",fail:'❌ 姓名或別名未能唯一配對，未有登記。請核對後聯絡管理員。',duplicate:'⚠️ 日期已有請假紀錄，未重複登記。',rate:'⚠️ 提交過於頻繁，請稍後再試。',offline:"⚠️ 未能確認是否提交成功，請先向管理員查詢。",retry:"📋 複製已提交申請",dateError:"預計返工日期必須遲過請假結束日期。"},
'zh-CN':{hint:"中文或英文姓名（二选一）及别名必须与员工系统一致。姓与名可以调换。提交成功后会尝试复制内容。请假须经管理员批准。",button:"📤 提交请假申请及复制",working:'正在核对及登记…',done:"✅ 已提交待审批，且已复制申请内容。",copied:"已提交待审批。浏览器无法自动复制，请长按下方文字复制。",fail:'❌ 姓名或别名未能唯一匹配，未登记。',duplicate:'⚠️ 日期已有请假记录。',rate:'⚠️ 提交过于频繁，请稍后再试。',offline:"⚠️ 无法确认提交是否成功，请先向管理员查询。",retry:"📋 复制已提交申请",dateError:"预计返工日期必须晚于请假结束日期。"},
'en':{hint:"Enter your Chinese or English full name and the nickname in the employee system. Surname and given-name order can be swapped. The page tries to copy the request after submission. Leave requires manager approval.",button:"📤 Submit and copy leave request",working:'Checking and recording…',done:"✅ Submitted for approval and copied.",copied:"Submitted for approval. Automatic copying failed. Select and copy the text below.",fail:'❌ Name/nickname not uniquely matched. Nothing recorded.',duplicate:'⚠️ Existing leave record for these dates.',rate:'⚠️ Too many attempts. Try later.',offline:"⚠️ Submission could not be confirmed. Check with management first.",retry:"📋 Copy submitted request",dateError:"The expected return date must be after the leave end date."},
'ja':{hint:"中国語または英語の氏名と、社員システムに登録されたニックネームを入力してください。姓名の順序は入れ替え可能です。送信成功後にコピーを試みます。休暇には管理者の承認が必要です。",button:"📤 休暇申請を送信してコピー",working:'照合・登録中…',done:"✅ 承認待ちの申請をコピーしました。",copied:"申請は承認待ちです。自動コピーに失敗しました。下の文章を選択してコピーしてください。",fail:'❌ 氏名とニックネームが一致しません。未登録です。',duplicate:'⚠️ 既存の休暇記録があります。',rate:'⚠️ 試行回数が多すぎます。',offline:"⚠️ 送信結果を確認できません。まず管理者に確認してください。",retry:"📋 送信済み申請をコピー",dateError:"復帰予定日は休暇終了日より後にしてください。"},
'ko':{hint:"직원 시스템에 등록된 중국어 또는 영어 이름과 별명을 입력하세요. 성과 이름 순서를 바꿀 수 있습니다. 제출 후 신청 내용 복사를 시도합니다. 휴가는 관리자 승인이 필요합니다.",button:"📤 휴가 신청 제출 및 복사",working:'확인 및 등록 중…',done:"✅ 승인 대기 중인 신청 내용을 복사했습니다.",copied:"승인 대기 중입니다. 자동 복사에 실패했습니다. 아래 내용을 선택해 복사하세요.",fail:'❌ 이름/별명이 일치하지 않아 등록되지 않았습니다.',duplicate:'⚠️ 해당 날짜에 기존 휴가 기록이 있습니다.',rate:'⚠️ 요청이 너무 많습니다.',offline:"⚠️ 제출 결과를 확인할 수 없습니다. 먼저 관리자에게 문의하세요.",retry:"📋 제출한 신청 복사",dateError:"복귀 예정일은 휴가 종료일보다 늦어야 합니다."}
};
const m=messages[lang]||messages['zh-TW'];
const familyLabels={'zh-TW':'突發家庭事故','zh-CN':'突发家庭事故',en:'Family emergency',ja:'家庭の緊急事情',ko:'가족 긴급 상황'};
const familyText=familyLabels[lang]||familyLabels['zh-TW'];
if(el('leave-family'))el('leave-family').textContent=familyText;
el('leave-other').textContent=({'zh-TW':'其他（自填）','zh-CN':'其他（自填）',en:'Other (specify)',ja:'その他（記入）',ko:'기타 (직접 입력)'})[lang]||'其他（自填）';

const fields={
'zh-TW':['中文姓名（選填）','英文姓名（選填）','中文或英文姓名填其中一項即可；別名必填。'],
'zh-CN':['中文姓名（选填）','英文姓名（选填）','中文或英文姓名填写其中一项即可；别名必填。'],
'en':['Chinese name (optional)','English name (optional)','Enter either a Chinese or English name. Nickname is required.'],
'ja':['中国語の氏名（任意）','英語の氏名（任意）','中国語または英語の氏名を入力してください。ニックネームは必須です。'],
'ko':['중국어 이름 (선택)','영어 이름 (선택)','중국어 또는 영어 이름을 입력하세요. 별명은 필수입니다.']
}[lang]||['中文姓名（選填）','英文姓名（選填）','中文或英文姓名填其中一項即可；別名必填。'];
el('leave-name-label').textContent=fields[0];el('leave-english-label').textContent=fields[1];el('leave-name-help').textContent=fields[2];
el('leave-alias-label').textContent=w[4].replace(/（選填）|（选填）| \(optional\)|（任意）|\(선택\)/g,'')+' *';
const reasonField=el('leave-reason');
let reviewHelp=el('leave-reason-review-help');
if(!reviewHelp){reviewHelp=document.createElement('p');reviewHelp.id='nf-leave-reason-review-help';reviewHelp.style.cssText='font-size:13px;line-height:1.5;color:#34536c;';reasonField.after(reviewHelp);}
reviewHelp.textContent=({
 'zh-TW':'系統會使用 AI 檢查理由是否清楚；毋須提供證件號碼、戶口資料或詳細病歷。AI 不會批准或拒絕請假。',
 'zh-CN':'系统会使用 AI 检查理由是否清楚；无需提供证件号码、账号或详细病历。AI 不会批准或拒绝请假。',
 en:'AI checks whether your reason is clear. Do not include ID/account numbers or detailed medical records. Management decides leave approval.',
 ja:'AIが理由の明確さを確認します。証明書番号・口座情報・詳しい病歴は不要です。承認は管理者が行います。',
 ko:'AI가 사유가 명확한지 확인합니다. 신분증·계좌번호나 자세한 병력은 필요 없습니다. 승인 여부는 관리자가 결정합니다.'
})[lang]||'';
const getLeaveType=()=>document.querySelector('input[name="nf-leave-type"]:checked')?.value||'personal';
const [personalReasonHint,personalReasonError]=personalReasonPrompts[lang]||personalReasonPrompts['zh-TW'];
const otherReasonHint=({'zh-TW':'例如：頭痛、生理期、身體不適等','zh-CN':'例如：头痛、生理期、身体不适等','en':'e.g. headache, menstrual discomfort, feeling unwell','ja':'例：頭痛、生理痛、体調不良など','ko':'예: 두통, 생리통, 몸이 아픈 경우 등'}[lang]||'例如：頭痛、生理期、身體不適等');
const refreshReasonHint=()=>{
 const type=getLeaveType();
 reasonField.placeholder=type==='family'?({'zh-TW':'簡述家庭突發事情即可。','zh-CN':'简述家庭突发事情即可。',en:'A brief description is sufficient.',ja:'簡単な説明で構いません。',ko:'간단히 작성해 주세요.'}[lang]||'簡述家庭突發事情即可。'):type==='personal'?personalReasonHint:type==='other'?({'zh-TW':'請簡述實際事由，例如：辦理護照續期。','zh-CN':'请简述实际事由，例如：办理护照续期。',en:'Briefly describe the reason, e.g. passport renewal.',ja:'理由を簡単に記入してください。',ko:'실제 사유를 간단히 작성하세요.'}[lang]||personalReasonHint):otherReasonHint;
};
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
el('leave-copy-reminder-tip').textContent=({"zh-TW":"已複製,直接出發去signal貼上","zh-CN":"已复制，直接去 Signal 粘贴","en":"Copied. Open Signal and paste it.","ja":"コピー済み。Signalに貼り付けてください。","ko":"복사 완료. Signal에 붙여넣으세요."})[lang]||'已複製,直接出發去signal貼上';
const showCopiedReminder=()=>{
 status('leave',m.done+manualReviewNote);
 if(typeof signalReminder.showModal==='function'){
  if(!signalReminder.open)signalReminder.showModal();
 }else{
  window.alert(reminderText);
 }
};
copyButton.onclick=async()=>{
 try{
  if(navigator.clipboard?.writeText){
   await Promise.race([navigator.clipboard.writeText(copyText.value),new Promise((_,reject)=>setTimeout(()=>reject(Error('Copy timeout')),2500))]);
  }else{
   copyText.focus();
   copyText.select();
   copyText.setSelectionRange(0,copyText.value.length);
   if(!document.execCommand('copy'))throw Error('Copy unavailable');
  }
 }catch{
  status('leave',m.copied+manualReviewNote);
  copyText.focus();
  copyText.select();
  copyText.setSelectionRange(0,copyText.value.length);
  return;
 }
 showCopiedReminder();
};
async function submitLeave(payload){
 status('leave',m.working);
 try{
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),20000);
  let resp;
  try{resp=await fetch('https://batsjsznudkeqaaijxsg.supabase.co/functions/v1/public-leave-submit',{method:'POST',headers:{'Content-Type':'application/json'},body:payload,signal:controller.signal});}
  finally{clearTimeout(timer);}
  const result=await resp.json();
  if(!resp.ok||!result.ok){
   if(['reason_needs_detail','reason_invalid','reason_date_conflict'].includes(result.code)){
    const category=result.code==='reason_invalid'?'invalid':'vague';
    const message=result.review?.message||personalReasonError;
    status('leave',message);
    if(typeof window.showLeaveReasonWarning==='function')window.showLeaveReasonWarning(message,category,result.code!=='reason_date_conflict');
    else reasonField.focus();
    return false;
   }
   status('leave',result.code==='reason_too_vague'?personalReasonError:result.code==='duplicate'?m.duplicate:result.code==='not_matched'?m.fail:result.code==='rate_limit'?m.rate:result.code==='invalid'?w[27]+' '+(lang==='en'?'Check the date range and field lengths.':'請檢查日期範圍及文字長度。'):m.offline);
   return false;
  }
  manualReviewNote=result.review?.decision==='uncertain'?({
   'zh-TW':' 理由已交由管理員人工核對，並非亂填警告。',
   'zh-CN':' 理由已交由管理员人工核对，并非乱填警告。',
   en:' Your reason needs a manual check by management. This is not a warning.',
   ja:' 理由は管理者が確認します。警告ではありません。',
   ko:' 사유는 관리자가 확인합니다. 경고가 아닙니다.'
  }[lang]||''):'';
  window.resetLeaveReasonWarnings?.();
  lastSubmittedLeave=payload;
  return true;
 }catch{
  status('leave',m.offline);
  return false;
 }
}
el('leave-copy').onclick=async()=>{
 const a=parse(el('leave-start').value),b=parse(el('leave-end').value),back=parse(el('leave-return').value),chineseName=el('leave-name').value.trim(),englishName=el('leave-english').value.trim(),name=chineseName||englishName,alias=el('leave-alias').value.trim(),reason=reasonField.value.trim();
 const button=el('leave-copy');
 if(button.disabled)return;
 copyPanel.hidden=true;
 const type=getLeaveType();
 const reasonText=reason.normalize('NFKC').replace(/[\p{P}\p{S}\p{Cf}]/gu,'').replace(/\s+/gu,' ').trim();
 if((type==='personal'||type==='other')&&(!reasonText||genericPersonalReason.test(reasonText))){
  status('leave',personalReasonError);if(typeof window.showLeaveReasonWarning==='function')window.showLeaveReasonWarning(personalReasonError,'vague',true);else reasonField.focus();return;
 }
 if(b&&back&&back<=b){status('leave',m.dateError);el('leave-return').focus();return}
 if(!name||!alias||!a||!b||b<a||!back||!reason||!el('leave-confirm').checked){status('leave',w[27]);return}
 const invalidField=(id,msg)=>{status('leave',msg);el(id).focus();};
 const explain=(zh,en)=>lang==='en'?en:zh;
 if(name.length<2||name.length>120){invalidField(chineseName?'leave-name':'leave-english',explain('姓名須為2至120個字，請填寫系統姓名。','Name must contain 2–120 characters.'));return;}
 if(alias.length>80){invalidField('leave-alias',explain('別名不可超過80個字。','Nickname must not exceed 80 characters.'));return;}
 if(reason.length<2||reason.length>1000){invalidField('leave-reason',explain('理由須為2至1000個字。','Reason must contain 2–1000 characters.'));return;}
 const brisbaneToday=new Intl.DateTimeFormat('en-CA',{timeZone:'Australia/Brisbane',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
 const todayDate=parse(brisbaneToday);
 if(dateDiff(a,b)>45){invalidField('leave-end',explain('一次申請最多46個日曆日；較長假期請聯絡管理層。','A request can cover up to 46 calendar days. Contact management for longer leave.'));return;}
 if(todayDate&&(dateDiff(todayDate,a)<-7||dateDiff(todayDate,a)>365)){invalidField('leave-start',explain('開始日期須在過去7日至未來365日內；其他日期請聯絡管理層。','Start date must be within the past 7 days or the next 365 days. Contact management for other dates.'));return;}

 const typeText=type==='family'?familyText:w[type==='personal'?6:type==='sick'?7:8];
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
 const payload=JSON.stringify({name,alias,type,language:lang,start:el('leave-start').value,end:el('leave-end').value,returnDate:el('leave-return').value,reason});
 button.disabled=true;
 window.__leaveSubmitting=true;
 try{
  const alreadySubmitted=payload===lastSubmittedLeave;
  const submitted=alreadySubmitted?Promise.resolve(true):submitLeave(payload);
  let copied=Promise.resolve(false);
  if(!alreadySubmitted&&navigator.clipboard?.write&&typeof ClipboardItem==='function'){
   // Start the clipboard write during the tap, but only provide text after the server accepts the request.
   const content=submitted.then(ok=>{
    if(!ok)throw Error('Leave request was not accepted');
    return new Blob([message],{type:'text/plain'});
   });
   content.catch(()=>{});
   try{
    copied=navigator.clipboard.write([new ClipboardItem({'text/plain':content})]).then(()=>true,()=>false);
   }catch{
    // The copy button below is still available if this browser rejects deferred writes.
   }
  }
  if(!await submitted)return;
  const copiedOnSubmit=await Promise.race([copied,new Promise(resolve=>setTimeout(()=>resolve(false),2500))]);
  copyText.value=message;
  copyPanel.hidden=false;
  if(copiedOnSubmit)showCopiedReminder();
  else await copyButton.onclick();
 }finally{
  button.disabled=false;
  window.__leaveSubmitting=false;
 }
};
const resignationPanel=el('resign-copy-panel'),resignationCopyText=el('resign-copy-text');
el('resign-copy-again').onclick=async()=>{
 try{await navigator.clipboard.writeText(resignationCopyText.value);status('resign',resign.done);}
 catch{status('resign',resign.manual);resignationCopyText.focus();resignationCopyText.select();}
};
async function submitResignation(payload){
 status('resign',resign.sending);
 try{
  const response=await fetch('https://batsjsznudkeqaaijxsg.supabase.co/functions/v1/public-resignation-submit',{
   method:'POST',headers:{'Content-Type':'application/json'},body:payload,signal:AbortSignal.timeout(12000)
  });
  const result=await response.json();
  if(response.ok&&result.ok){lastSubmittedResignation=payload;return true;}
  const errors={not_matched:resign.mismatch,already_pending:resign.pending,rate_limit:m.rate,invalid:w[27]};
  status('resign','⚠️ '+(errors[result.code]||resign.offline));
 }catch{status('resign','⚠️ '+resign.offline);}
 return false;
}
el('resign-copy').onclick=async()=>{
 const button=el('resign-copy');
 if(button.disabled)return;
 resignationPanel.hidden=true;
 const calc=refreshResign(),name=el('resign-name').value.trim(),alias=el('resign-alias').value.trim(),reason=el('resign-reason').value.trim();
 if((!name&&!alias)||!calc||!reason||!el('resign-confirm').checked){status('resign',w[27]);return;}
 const payload=JSON.stringify({name,alias,notice:el('resign-notice').value,days:calc.n,reason});
 const message=[w[16],...(name?[resign.name+': '+name]:[]),...(alias?[w[4]+': '+alias]:[]),w[33]+': '+fmt(calc.d),w[18]+': '+calc.n,w[32]+': '+fmt(calc.last),w[35]+': '+reason].join('\n');
 button.disabled=true;
 try{
  const submitted=payload===lastSubmittedResignation?Promise.resolve(true):submitResignation(payload);
  let copied=Promise.resolve(false);
  if(navigator.clipboard?.write&&typeof ClipboardItem==='function'){
   const content=submitted.then(ok=>{
    if(!ok)throw Error('Resignation notice was not accepted');
    return new Blob([message],{type:'text/plain'});
   });
   content.catch(()=>{});
   try{copied=navigator.clipboard.write([new ClipboardItem({'text/plain':content})]).then(()=>true,()=>false);}catch{}
  }
  if(!await submitted)return;
  resignationCopyText.value=message;
  resignationPanel.hidden=false;
  if(await Promise.race([copied,new Promise(resolve=>setTimeout(()=>resolve(false),2500))]))status('resign',resign.done);
  else await el('resign-copy-again').onclick();
 }finally{button.disabled=false;}
};
};
})();