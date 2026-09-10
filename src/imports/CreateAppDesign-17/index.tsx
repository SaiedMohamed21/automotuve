function Text() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[28px] relative shrink-0 text-[18px] text-center text-white whitespace-nowrap">SA</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center left-[196px] rounded-[12px] size-[56px] top-0" data-name="Container">
      <Text />
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Container">
      <Container3 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 1">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[24px] text-center text-white tracking-[-0.6px] whitespace-nowrap">Star Auto Center</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex flex-col h-[24px] items-center pt-[4px] relative shrink-0 w-[448px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.4)] text-center whitespace-nowrap">Workshop Management System</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Heading />
      <Paragraph />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex flex-col items-center py-[8px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.4)] text-center tracking-[1.2px] uppercase whitespace-nowrap">Select your role</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">🔧</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Engineer</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex flex-col h-[22px] items-start pt-[2px] relative shrink-0 w-[308.4px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.4)] whitespace-nowrap">Create job orders, inspect vehicles, print job cards</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-[310.313_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Paragraph2 />
      <Paragraph3 />
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.2)] whitespace-nowrap">→</p>
    </div>
  );
}

function Button() {
  return (
    <div className="col-1 content-stretch flex gap-[16px] items-center justify-self-stretch px-[20px] py-[16px] relative rounded-[10px] row-1 self-stretch shrink-0" data-name="Button">
      <Container6 />
      <Container7 />
      <Text1 />
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">📦</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Warehouse</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex flex-col h-[22px] items-start pt-[2px] relative shrink-0 w-[308.4px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.4)] whitespace-nowrap">Manage parts, issue stock, track movements</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-[310.313_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Paragraph4 />
      <Paragraph5 />
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.2)] whitespace-nowrap">→</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="col-1 content-stretch flex gap-[16px] items-center justify-self-stretch px-[20px] py-[16px] relative rounded-[10px] row-2 self-stretch shrink-0" data-name="Button">
      <Container8 />
      <Container9 />
      <Text2 />
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">📋</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Accountant</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="content-stretch flex flex-col h-[22px] items-start pt-[2px] relative shrink-0 w-[308.4px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.4)] whitespace-nowrap">Finalize jobs, create invoices, record payments</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-[310.313_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Paragraph6 />
      <Paragraph7 />
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.2)] whitespace-nowrap">→</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="col-1 content-stretch flex gap-[16px] items-center justify-self-stretch px-[20px] py-[16px] relative rounded-[10px] row-3 self-stretch shrink-0" data-name="Button">
      <Container10 />
      <Container11 />
      <Text3 />
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">◉</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Owner</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="content-stretch flex flex-col h-[22px] items-start pt-[2px] relative shrink-0 w-[308.4px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.4)] whitespace-nowrap">Full access: dashboard, reports, pricing, users</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-[310.313_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Paragraph8 />
      <Paragraph9 />
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.2)] whitespace-nowrap">→</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="col-1 content-stretch flex gap-[16px] items-center justify-self-stretch px-[20px] py-[16px] relative rounded-[10px] row-4 self-stretch shrink-0" data-name="Button">
      <Container12 />
      <Container13 />
      <Text4 />
    </div>
  );
}

function Container5() {
  return (
    <div className="gap-x-[4px] gap-y-[4px] grid grid-cols-[_434.40px] grid-rows-[____73.50px_73.50px_73.50px_73.50px] relative shrink-0 w-full" data-name="Container">
      <Button />
      <Button1 />
      <Button2 />
      <Button3 />
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] border-[0.8px] border-[rgba(255,255,255,0.1)] border-solid content-stretch flex flex-col items-start p-[6px] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <Paragraph1 />
      <Container5 />
    </div>
  );
}

function ContainerMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[40px] relative shrink-0 w-full" data-name="Container:margin">
      <Container4 />
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="content-stretch flex flex-col h-[40px] items-center pt-[24px] relative shrink-0 w-[448px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.2)] text-center whitespace-nowrap">Star Auto Center · Cairo, Egypt · v1.0</p>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[448px] relative shrink-0 w-[448px]" data-name="Container">
      <Container1 />
      <ContainerMargin />
      <Paragraph10 />
    </div>
  );
}

function Login() {
  return (
    <div className="bg-[#060f1e] content-stretch flex h-[688px] items-center justify-center p-[24px] relative shrink-0 w-[1194.4px]" data-name="Login">
      <Container />
    </div>
  );
}

export default function CreateAppDesign() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-start relative size-full" data-name="Create app design">
      <Login />
    </div>
  );
}