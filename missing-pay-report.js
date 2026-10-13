(function(){
const dict={
'zh-TW':['📝 工資／Payslip 未收到申報表','星期一 17:00 後仍未收到？請先檢查垃圾郵件，並於當天 19:00 前通知管理層。','英文姓名 *','別名（選填）','未收到甚麼？ *','只欠工資','只欠 Payslip','工資及 Payslip 都未收到','選擇工資週期（星期四至下星期三） *','我已檢查收件箱及垃圾郵件（Spam / Junk）','我已檢查銀行戶口是否收到工資','補充資料（選填）','📋 複製申報內容','只會複製內容，請自行發訊息予管理層；此表格不會上傳或儲存個人資料。毋須提供 TFN 或銀行帳號。','工資週期','請填寫英文姓名、選擇工資週期並勾選至少一項確認。','已複製！請自行傳送予管理層。','無法自動複製，請手動複製以下內容：','無','是'],
'zh-CN':['📝 工资／Payslip 未收到申报表','星期一 17:00 后仍未收到？请先检查垃圾邮件，并于当天 19:00 前通知管理层。','英文姓名 *','别名（选填）','未收到什么？ *','只欠工资','只欠 Payslip','工资及 Payslip 都未收到','选择工资周期（星期四至下星期三） *','我已检查收件箱及垃圾邮件（Spam / Junk）','我已检查银行账户是否收到工资','补充资料（选填）','📋 复制申报内容','仅复制内容，请自行发送给管理层；表格不会上传或储存个人资料。无需填写 TFN 或银行账号。','工资周期','请填写英文姓名、选择工资周期并勾选至少一项确认。','已复制！请自行发送给管理层。','无法自动复制，请手动复制以下内容：','无','是'],
'en':['📝 Missing Pay / Payslip Report','Still missing after Monday 5 PM? Check spam/junk first and inform management by 7 PM that same Monday.','Full English name *','Nickname (optional)','What is missing? *','Pay only','Payslip only','Both pay and payslip','Select pay period (Thursday–Wednesday) *','I checked my inbox and spam/junk folders','I checked my bank account for payment','Additional notes (optional)','📋 Copy report','Copies only. Send the message to management yourself. This form does not upload or store personal data. Do not enter TFN or bank details.','Pay period','Enter your name, select a pay period, and tick at least one check.','Copied! Please send it to management yourself.','Automatic copy failed. Please copy this text manually:','None','Yes'],
'ja':['📝 給与／給与明細の未受領報告','月曜日17時を過ぎても届かない場合、迷惑メールを確認し、同日19時までに管理者へ連絡してください。','英語氏名 *','ニックネーム（任意）','未受領の項目 *','給与のみ','給与明細のみ','給与と給与明細の両方','給与期間を選択（木曜～翌水曜） *','受信トレイと迷惑メールを確認しました','銀行口座への入金を確認しました','補足（任意）','📋 報告文をコピー','コピーのみです。ご自身で管理者に送信してください。個人情報はアップロード・保存されません。TFNや口座番号は入力しないでください。','給与計算期間','氏名と給与期間を選び、少なくとも1項目を確認してください。','コピーしました。管理者へ送信してください。','自動コピーできませんでした。以下を手動でコピーしてください：','なし','はい'],
'ko':['📝 급여／급여명세서 미수령 신고','월요일 오후 5시 이후에도 받지 못했다면 스팸함을 확인하고 당일 오후 7시까지 관리자에게 알려 주세요.','영문 성명 *','별명(선택)','받지 못한 항목 *','급여만','급여명세서만','급여와 급여명세서 모두','급여 기간 선택 (목요일~다음 주 수요일) *','받은편지함과 스팸함을 확인했습니다','은행 계좌 입금 여부를 확인했습니다','추가 내용(선택)','📋 신고 내용 복사','복사만 됩니다. 관리자에게 직접 보내세요. 개인정보는 업로드하거나 저장하지 않습니다. TFN이나 은행 계좌번호를 입력하지 마세요.','급여 정산 기간','이름과 급여 기간을 선택하고 하나 이상 체크하세요.','복사되었습니다! 관리자에게 직접 보내세요.','자동 복사에 실패했습니다. 아래 내용을 직접 복사하세요:','없음','예']
};
const ids=['title','intro','name-label','alias-label','missing-label','salary','payslip','both','date-label','spam-label','bank-label','notes-label','copy','privacy'];
const get=id=>document.getElementById('mpr-'+id);
function week(value){if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return null;const [y,m,d]=value.split('-').map(Number);const day=new Date(Date.UTC(y,m-1,d));if(day.getUTCFullYear()!==y||day.getUTCMonth()!==m-1||day.getUTCDate()!==d)return null;const thu=new Date(day.getTime()-((day.getUTCDay()+3)%7)*86400000);const wed=new Date(thu.getTime()+6*86400000);const fmt=x=>String(x.getUTCDate()).padStart(2,'0')+'/'+String(x.getUTCMonth()+1).padStart(2,'0')+'/'+x.getUTCFullYear();return fmt(thu)+' – '+fmt(wed)}
window.initMissingPayReport=function(lang){
 const root=document.getElementById('missing-pay-report');if(!root)return;const words=dict[lang]||dict['zh-TW'];
 ids.forEach((id,i)=>{if(get(id))get(id).textContent=words[i]});
 const date=get('date'),period=get('period'),feedback=get('feedback');
 const hint={'zh-TW':'以下兩項可二選一，亦可全選 *','zh-CN':'以下两项可二选一，也可全选 *','en':'Select either or both checks *','ja':'以下のいずれか、または両方を選択 *','ko':'아래 항목 중 하나 또는 둘 다 선택 *'};
 get('check-hint').textContent=hint[lang]||hint['zh-TW'];
 const saved=date.value;date.innerHTML='';
 const placeholder=document.createElement('option');placeholder.value='';placeholder.textContent={'zh-TW':'請選擇工資週期','zh-CN':'请选择工资周期','en':'Select a pay period','ja':'給与期間を選択','ko':'급여 기간 선택'}[lang]||'請選擇工資週期';date.append(placeholder);
 const now=new Date(),utc=new Date(Date.UTC(now.getFullYear(),now.getMonth(),now.getDate()));
 const thisThu=new Date(utc.getTime()-((utc.getUTCDay()+3)%7)*86400000);
 const iso=d=>d.toISOString().slice(0,10);
 for(let offset=2;offset>=-51;offset--){const thu=new Date(thisThu.getTime()+offset*7*86400000);const option=document.createElement('option');option.value=iso(thu);option.textContent=week(option.value);date.append(option)}
 date.value=saved||'';
 const refresh=()=>{period.textContent=date.value&&week(date.value)?words[14]+'：'+week(date.value):'';};
 date.oninput=refresh;refresh();
 get('copy').onclick=async function(){
  const name=get('name').value.trim(),dateValue=date.value,range=week(dateValue);
  if(!name||!range||(!get('spam').checked&&!get('bank').checked)){feedback.textContent=words[15];return}
  const selected=root.querySelector('input[name="mpr-missing"]:checked')?.value||'both';
  const missing=words[selected==='salary'?5:selected==='payslip'?6:7];
  const report=[words[0],words[2].replace(' *','')+': '+name,words[3]+': '+(get('alias').value.trim()||words[18]),words[4].replace(' *','')+': '+missing,words[14]+': '+range,words[9]+': '+(get('spam').checked?words[19]:'—'),words[10]+': '+(get('bank').checked?words[19]:'—'),words[11]+': '+(get('notes').value.trim()||words[18])].join('\n');
  try{if(!navigator.clipboard||!navigator.clipboard.writeText)throw Error('clipboard unavailable');await navigator.clipboard.writeText(report);feedback.textContent=words[16];}
  catch(e){feedback.textContent=words[17];const ta=document.createElement('textarea');ta.value=report;ta.readOnly=true;ta.style.width='100%';ta.rows=9;const old=get('manual-copy');if(old)old.remove();ta.id='mpr-manual-copy';feedback.after(ta);ta.focus();ta.select();}
 };
};
})();