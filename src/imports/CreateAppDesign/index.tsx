function Paragraph() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.6)] tracking-[0.6px] uppercase whitespace-nowrap">Ready to start</p>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col h-[32px] items-start pt-[4px] relative shrink-0 w-[257.75px]" data-name="Heading 2">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">Create a New Job Order</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex flex-col h-[24px] items-start pt-[4px] relative shrink-0 w-[257.75px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.4)] whitespace-nowrap">Tue, 12 August 2026 · Star Auto Center</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[257.75px]" data-name="Container">
      <Paragraph />
      <Heading1 />
      <Paragraph1 />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[#0f2340] text-[18px] text-center whitespace-nowrap">+</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center px-[20px] py-[10px] relative rounded-[10px] shrink-0" data-name="Container">
      <Text />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#0f2340] text-[14px] text-center whitespace-nowrap">New Job Order</p>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[#0f2340] content-stretch flex items-center justify-between p-[24px] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <Container1 />
      <Container2 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">{`Today's Jobs`}</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex flex-col h-[36px] items-start pt-[4px] relative shrink-0 w-[94.488px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[#0f2340] text-[24px] whitespace-nowrap">1</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex flex-col h-[18px] items-start pt-[2px] relative shrink-0 w-[94.488px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">12 Aug 2026</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[94.488px]" data-name="Container">
      <Paragraph2 />
      <Paragraph3 />
      <Paragraph4 />
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-50 relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#111827] text-[20px] whitespace-nowrap">◫</p>
    </div>
  );
}

function KpiCard() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="KpiCard">
      <Container4 />
      <Text1 />
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid col-1 content-stretch flex flex-col items-start justify-self-stretch p-[20px] relative rounded-[10px] row-1 self-stretch shrink-0" data-name="Card">
      <KpiCard />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Open</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="content-stretch flex flex-col h-[36px] items-start pt-[4px] relative shrink-0 w-[79.688px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[#0f2340] text-[24px] whitespace-nowrap">1</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="content-stretch flex flex-col h-[18px] items-start pt-[2px] relative shrink-0 w-[79.688px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">Awaiting work</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[79.688px]" data-name="Container">
      <Paragraph5 />
      <Paragraph6 />
      <Paragraph7 />
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-50 relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#111827] text-[20px] whitespace-nowrap">○</p>
    </div>
  );
}

function KpiCard1() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="KpiCard">
      <Container5 />
      <Text2 />
    </div>
  );
}

function Card1() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid col-2 content-stretch flex flex-col items-start justify-self-stretch p-[20px] relative rounded-[10px] row-1 self-stretch shrink-0" data-name="Card">
      <KpiCard1 />
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Pending Approval</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="content-stretch flex flex-col h-[36px] items-start pt-[4px] relative shrink-0 w-[139.463px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[#bb4d00] text-[24px] whitespace-nowrap">1</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="content-stretch flex flex-col h-[18px] items-start pt-[2px] relative shrink-0 w-[139.463px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">Customer action needed</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[139.463px]" data-name="Container">
      <Paragraph8 />
      <Paragraph9 />
      <Paragraph10 />
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-50 relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#111827] text-[20px] whitespace-nowrap">⏳</p>
    </div>
  );
}

function KpiCard2() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="KpiCard">
      <Container6 />
      <Text3 />
    </div>
  );
}

function Card2() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid col-3 content-stretch flex flex-col items-start justify-self-stretch p-[20px] relative rounded-[10px] row-1 self-stretch shrink-0" data-name="Card">
      <KpiCard2 />
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Completed Today</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="content-stretch flex flex-col h-[36px] items-start pt-[4px] relative shrink-0 w-[127.45px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[#008236] text-[24px] whitespace-nowrap">2</p>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="content-stretch flex flex-col h-[18px] items-start pt-[2px] relative shrink-0 w-[127.45px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">Ready for accounting</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[127.45px]" data-name="Container">
      <Paragraph11 />
      <Paragraph12 />
      <Paragraph13 />
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-50 relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#111827] text-[20px] whitespace-nowrap">✓</p>
    </div>
  );
}

function KpiCard3() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="KpiCard">
      <Container7 />
      <Text4 />
    </div>
  );
}

function Card3() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid col-4 content-stretch flex flex-col items-start justify-self-stretch p-[20px] relative rounded-[10px] row-1 self-stretch shrink-0" data-name="Card">
      <KpiCard3 />
    </div>
  );
}

function Container3() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[____218.60px_218.60px_218.60px_218.60px] grid-rows-[_111.56px] relative shrink-0 w-full" data-name="Container">
      <Card />
      <Card1 />
      <Card2 />
      <Card3 />
    </div>
  );
}

function ContainerMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[24px] relative shrink-0 w-full" data-name="Container:margin">
      <Container3 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#1e2939] text-[14px] tracking-[0.7px] uppercase whitespace-nowrap">{`Today's Workshop Activity`}</p>
    </div>
  );
}

function SectionHeader() {
  return (
    <div className="content-stretch flex h-[36px] items-center justify-between pb-[16px] relative shrink-0 w-[565.325px]" data-name="SectionHeader">
      <Heading2 />
    </div>
  );
}

function EngineerDashboard() {
  return (
    <div className="border-[#f3f4f6] border-b-[0.8px] border-solid content-stretch flex flex-col items-start px-[20px] py-[16px] relative shrink-0 w-full" data-name="EngineerDashboard">
      <SectionHeader />
    </div>
  );
}

function HeaderCell() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-0 top-0 w-[137.825px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Job Order</p>
    </div>
  );
}

function HeaderCell1() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[137.82px] top-0 w-[159.975px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Customer</p>
    </div>
  );
}

function HeaderCell2() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[297.8px] top-0 w-[146.55px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Vehicle</p>
    </div>
  );
}

function HeaderCell3() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[444.35px] top-0 w-[160.975px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Status</p>
    </div>
  );
}

function TableCell() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-0 top-[36.39px] w-[137.825px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-semibold leading-[16px] left-[16px] text-[#0f2340] text-[12px] top-[24.4px] tracking-[0.3px] whitespace-nowrap">JO-2026-00125</p>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[137.82px] not-italic top-[36.39px] w-[159.975px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[14.4px]">Ahmed Mohamed</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[34.4px]">01012345678</p>
    </div>
  );
}

function TableCell2() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[297.8px] top-[36.39px] w-[146.55px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[12.4px]">BMW 320i</p>
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#6a7282] text-[12px] top-[34.6px] tracking-[0.3px]">ABC 123</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute bg-[#eff6ff] border-[#bedbff] border-[0.8px] border-solid content-stretch flex items-start left-[16px] px-[8px] py-[2px] rounded-[4px] top-[21.8px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#1447e6] text-[12px] whitespace-nowrap">Open</p>
    </div>
  );
}

function TableCell3() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[444.35px] top-[36.39px] w-[160.975px]" data-name="Table Cell">
      <Text5 />
    </div>
  );
}

function TableCell4() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-0 top-[101.19px] w-[137.825px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-semibold leading-[16px] left-[16px] text-[#0f2340] text-[12px] top-[24.4px] tracking-[0.3px] whitespace-nowrap">JO-2026-00124</p>
    </div>
  );
}

function TableCell5() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[137.82px] not-italic top-[101.19px] w-[159.975px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[14.4px]">Sara Hassan</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[34.4px]">01198765432</p>
    </div>
  );
}

function TableCell6() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[297.8px] top-[101.19px] w-[146.55px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[12.4px]">Hyundai Elantra</p>
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#6a7282] text-[12px] top-[34.6px] tracking-[0.3px]">GHI 012</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute bg-[#faf5ff] border-[#e9d4ff] border-[0.8px] border-solid content-stretch flex items-start left-[16px] px-[8px] py-[2px] rounded-[4px] top-[21.8px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#8200db] text-[12px] whitespace-nowrap">Pending Approval</p>
    </div>
  );
}

function TableCell7() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[444.35px] top-[101.19px] w-[160.975px]" data-name="Table Cell">
      <Text6 />
    </div>
  );
}

function TableCell8() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-0 top-[165.99px] w-[137.825px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-semibold leading-[16px] left-[16px] text-[#0f2340] text-[12px] top-[24.4px] tracking-[0.3px] whitespace-nowrap">JO-2026-00123</p>
    </div>
  );
}

function TableCell9() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[137.82px] not-italic top-[165.99px] w-[159.975px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[14.4px]">Mohamed Ali</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[34.4px]">01067891234</p>
    </div>
  );
}

function TableCell10() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[297.8px] top-[165.99px] w-[146.55px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[12.4px]">Kia Sportage</p>
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#6a7282] text-[12px] top-[34.6px] tracking-[0.3px]">JKL 345</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute bg-[#f0fdf4] border-[#b9f8cf] border-[0.8px] border-solid content-stretch flex items-start left-[16px] px-[8px] py-[2px] rounded-[4px] top-[21.8px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#008236] text-[12px] whitespace-nowrap">Completed</p>
    </div>
  );
}

function TableCell11() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[444.35px] top-[165.99px] w-[160.975px]" data-name="Table Cell">
      <Text7 />
    </div>
  );
}

function TableCell12() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-0 top-[230.79px] w-[137.825px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-semibold leading-[16px] left-[16px] text-[#0f2340] text-[12px] top-[24.4px] tracking-[0.3px] whitespace-nowrap">JO-2026-00122</p>
    </div>
  );
}

function TableCell13() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[137.82px] not-italic top-[230.79px] w-[159.975px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[14.4px]">Layla Karim</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[34.4px]">01156789012</p>
    </div>
  );
}

function TableCell14() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[297.8px] top-[230.79px] w-[146.55px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[12.4px]">Nissan Altima</p>
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#6a7282] text-[12px] top-[34.6px] tracking-[0.3px]">MNO 678</p>
    </div>
  );
}

function Text8() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex items-start left-[16px] px-[8px] py-[2px] rounded-[4px] top-[21.8px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] whitespace-nowrap">Closed</p>
    </div>
  );
}

function TableCell15() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[444.35px] top-[230.79px] w-[160.975px]" data-name="Table Cell">
      <Text8 />
    </div>
  );
}

function TableCell16() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-0 top-[295.59px] w-[137.825px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-semibold leading-[16px] left-[16px] text-[#0f2340] text-[12px] top-[24.4px] tracking-[0.3px] whitespace-nowrap">JO-2026-00121</p>
    </div>
  );
}

function TableCell17() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[137.82px] not-italic top-[295.59px] w-[159.975px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[14.4px]">Omar Farouk</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[34.4px]">01023456789</p>
    </div>
  );
}

function TableCell18() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[297.8px] top-[295.59px] w-[146.55px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[12.4px]">Toyota Camry</p>
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#6a7282] text-[12px] top-[34.6px] tracking-[0.3px]">PQR 901</p>
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute bg-[#f0fdf4] border-[#b9f8cf] border-[0.8px] border-solid content-stretch flex items-start left-[16px] px-[8px] py-[2px] rounded-[4px] top-[21.8px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#008236] text-[12px] whitespace-nowrap">Completed</p>
    </div>
  );
}

function TableCell19() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[444.35px] top-[295.59px] w-[160.975px]" data-name="Table Cell">
      <Text9 />
    </div>
  );
}

function Table() {
  return (
    <div className="h-[360.788px] overflow-clip relative shrink-0 w-full" data-name="Table">
      <HeaderCell />
      <HeaderCell1 />
      <HeaderCell2 />
      <HeaderCell3 />
      <TableCell />
      <TableCell1 />
      <TableCell2 />
      <TableCell3 />
      <TableCell4 />
      <TableCell5 />
      <TableCell6 />
      <TableCell7 />
      <TableCell8 />
      <TableCell9 />
      <TableCell10 />
      <TableCell11 />
      <TableCell12 />
      <TableCell13 />
      <TableCell14 />
      <TableCell15 />
      <TableCell16 />
      <TableCell17 />
      <TableCell18 />
      <TableCell19 />
    </div>
  );
}

function Card4() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col items-start relative rounded-[10px] shrink-0 w-full" data-name="Card">
      <EngineerDashboard />
      <Table />
    </div>
  );
}

function Container9() {
  return (
    <div className="col-[1/span_2] content-stretch flex flex-col items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Card4 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#1e2939] text-[14px] tracking-[0.7px] uppercase whitespace-nowrap">Recent Vehicles</p>
    </div>
  );
}

function SectionHeader1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="SectionHeader">
      <Heading3 />
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">BMW 320i</p>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[#6a7282] text-[0px] tracking-[0.3px] whitespace-nowrap">
        <span className="leading-[16px] text-[12px]">ABC 123</span>
        <span className="font-['Inter:Regular',sans-serif] leading-[16px] not-italic text-[12px]">{` · Ahmed Mohamed`}</span>
      </p>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[163.05px]" data-name="Container">
      <Paragraph14 />
      <Paragraph15 />
    </div>
  );
}

function Text10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">08 Aug 2026</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="border-[#f9fafb] border-b-[0.8px] border-solid content-stretch flex items-center justify-between py-[8px] relative shrink-0 w-full" data-name="Container">
      <Container12 />
      <Text10 />
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Mercedes-Benz C200</p>
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[#6a7282] text-[0px] tracking-[0.3px] whitespace-nowrap">
        <span className="leading-[16px] text-[12px]">XYZ 456</span>
        <span className="font-['Inter:Regular',sans-serif] leading-[16px] not-italic text-[12px]">{` · Ahmed Mohamed`}</span>
      </p>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[163.05px]" data-name="Container">
      <Paragraph16 />
      <Paragraph17 />
    </div>
  );
}

function Text11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">02 Jul 2026</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="border-[#f9fafb] border-b-[0.8px] border-solid content-stretch flex items-center justify-between py-[8px] relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Text11 />
    </div>
  );
}

function ContainerMargin2() {
  return (
    <div className="content-stretch flex flex-col items-center pt-[12px] relative shrink-0 w-full" data-name="Container:margin">
      <Container13 />
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Toyota Corolla</p>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[#6a7282] text-[0px] tracking-[0.3px] whitespace-nowrap">
        <span className="leading-[16px] text-[12px]">DEF 789</span>
        <span className="font-['Inter:Regular',sans-serif] leading-[16px] not-italic text-[12px]">{` · Ahmed Mohamed`}</span>
      </p>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[163.05px]" data-name="Container">
      <Paragraph18 />
      <Paragraph19 />
    </div>
  );
}

function Text12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">15 Jun 2026</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="border-[#f9fafb] border-b-[0.8px] border-solid content-stretch flex items-center justify-between py-[8px] relative shrink-0 w-full" data-name="Container">
      <Container16 />
      <Text12 />
    </div>
  );
}

function ContainerMargin3() {
  return (
    <div className="content-stretch flex flex-col items-center pt-[12px] relative shrink-0 w-full" data-name="Container:margin">
      <Container15 />
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Hyundai Elantra</p>
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[#6a7282] text-[0px] tracking-[0.3px] whitespace-nowrap">
        <span className="leading-[16px] text-[12px]">GHI 012</span>
        <span className="font-['Inter:Regular',sans-serif] leading-[16px] not-italic text-[12px]">{` · Sara Hassan`}</span>
      </p>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[133.938px]" data-name="Container">
      <Paragraph20 />
      <Paragraph21 />
    </div>
  );
}

function Text13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">05 Aug 2026</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex h-[64px] items-center justify-between pb-[8px] pt-[20px] relative shrink-0 w-[249.875px]" data-name="Container">
      <Container18 />
      <Text13 />
    </div>
  );
}

function EngineerDashboard1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="EngineerDashboard">
      <Container11 />
      <ContainerMargin2 />
      <ContainerMargin3 />
      <Container17 />
    </div>
  );
}

function EngineerDashboardMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-name="EngineerDashboard:margin">
      <EngineerDashboard1 />
    </div>
  );
}

function Card5() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col items-start p-[20px] relative rounded-[10px] shrink-0 w-full" data-name="Card">
      <SectionHeader1 />
      <EngineerDashboardMargin />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#1e2939] text-[14px] tracking-[0.7px] uppercase whitespace-nowrap">Pending Approval</p>
    </div>
  );
}

function SectionHeader2() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="SectionHeader">
      <Heading4 />
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Bold',sans-serif] font-semibold leading-[16px] relative shrink-0 text-[#7b3306] text-[12px] whitespace-nowrap">JO-2026-00125</p>
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="content-stretch flex flex-col h-[18px] items-start pt-[2px] relative shrink-0 w-[224.275px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#bb4d00] text-[0px] whitespace-nowrap">
        <span className="leading-[16px] text-[12px]">{`BMW 320i · `}</span>
        <span className="font-['JetBrains_Mono:Regular',sans-serif] leading-[16px] text-[12px] tracking-[0.3px]">ABC 123</span>
      </p>
    </div>
  );
}

function Container19() {
  return (
    <div className="bg-[#fffbeb] border-[#fef3c6] border-[0.8px] border-solid content-stretch flex flex-col items-start p-[12px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <Paragraph22 />
      <Paragraph23 />
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Bold',sans-serif] font-semibold leading-[16px] relative shrink-0 text-[#7b3306] text-[12px] whitespace-nowrap">JO-2026-00124</p>
    </div>
  );
}

function Paragraph25() {
  return (
    <div className="content-stretch flex flex-col h-[18px] items-start pt-[2px] relative shrink-0 w-[224.275px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#bb4d00] text-[0px] whitespace-nowrap">
        <span className="leading-[16px] text-[12px]">{`Hyundai Elantra · `}</span>
        <span className="font-['JetBrains_Mono:Regular',sans-serif] leading-[16px] text-[12px] tracking-[0.3px]">GHI 012</span>
      </p>
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-[#fffbeb] border-[#fef3c6] border-[0.8px] border-solid content-stretch flex flex-col items-start p-[12px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <Paragraph24 />
      <Paragraph25 />
    </div>
  );
}

function ContainerMargin4() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Container:margin">
      <Container20 />
    </div>
  );
}

function EngineerDashboard2() {
  return (
    <div className="content-stretch flex flex-col h-[143.2px] items-start pt-[16px] relative shrink-0 w-[249.875px]" data-name="EngineerDashboard">
      <Container19 />
      <ContainerMargin4 />
    </div>
  );
}

function Card6() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col items-start p-[20px] relative rounded-[10px] shrink-0 w-full" data-name="Card">
      <SectionHeader2 />
      <EngineerDashboard2 />
    </div>
  );
}

function CardMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-name="Card:margin">
      <Card6 />
    </div>
  );
}

function Container10() {
  return (
    <div className="col-3 content-stretch flex flex-col items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Card5 />
      <CardMargin />
    </div>
  );
}

function Container8() {
  return (
    <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[___291.46px_291.46px_291.48px] grid-rows-[_544.70px] relative shrink-0 w-full" data-name="Container">
      <Container9 />
      <Container10 />
    </div>
  );
}

function ContainerMargin1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[24px] relative shrink-0 w-full" data-name="Container:margin">
      <Container8 />
    </div>
  );
}

function App() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col h-[928.262px] items-start min-h-[688px] pb-[24px] pl-[248px] pr-[24px] pt-[80px] relative shrink-0 w-full" data-name="App">
      <Container />
      <ContainerMargin />
      <ContainerMargin1 />
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex flex-col h-[928px] items-start relative shrink-0 w-[1194px]" data-name="Body">
      <App />
    </div>
  );
}

function Container22() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[28px]" data-name="Container">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[12px] text-[rgba(255,255,255,0.9)] whitespace-nowrap">SA</p>
    </div>
  );
}

function Paragraph26() {
  return (
    <div className="content-stretch flex flex-col h-[15px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">Star Auto Center</p>
    </div>
  );
}

function Paragraph27() {
  return (
    <div className="content-stretch flex flex-col h-[17px] items-start pt-[2px] relative shrink-0 w-[96.563px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.4)] tracking-[0.5px] uppercase whitespace-nowrap">Engineer</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[96.563px]" data-name="Container">
      <Paragraph26 />
      <Paragraph27 />
    </div>
  );
}

function Container21() {
  return (
    <div className="border-[rgba(255,255,255,0.1)] border-b-[0.8px] border-solid content-stretch flex gap-[10px] items-center p-[20px] relative shrink-0 w-full" data-name="Container">
      <Container22 />
      <Container23 />
    </div>
  );
}

function Text14() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">⊞</p>
    </div>
  );
}

function Text15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Dashboard</p>
    </div>
  );
}

function Container25() {
  return <div className="bg-[rgba(255,255,255,0.6)] h-[16px] relative rounded-[26843500px] shrink-0 w-[4px]" data-name="Container" />;
}

function ContainerAlign() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-w-px relative" data-name="Container:align">
      <Container25 />
    </div>
  );
}

function Container24() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-full" data-name="Container">
      <Text14 />
      <Text15 />
      <ContainerAlign />
    </div>
  );
}

function Text16() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">◉</p>
    </div>
  );
}

function Text17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Customers</p>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text16 />
      <Text17 />
    </div>
  );
}

function Text18() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">◈</p>
    </div>
  );
}

function Text19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Vehicles</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text18 />
      <Text19 />
    </div>
  );
}

function Text20() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">◫</p>
    </div>
  );
}

function Text21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Job Orders</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text20 />
      <Text21 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="content-stretch flex flex-[515.413_0_0] flex-col items-start min-h-px overflow-clip py-[16px] relative w-full" data-name="Navigation">
      <Container24 />
      <Button />
      <Button1 />
      <Button2 />
    </div>
  );
}

function Container28() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center relative rounded-[26843500px] shrink-0 size-[28px]" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">KS</p>
    </div>
  );
}

function Paragraph28() {
  return (
    <div className="content-stretch flex flex-col h-[15.988px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.8)] whitespace-nowrap">Karim Samir</p>
    </div>
  );
}

function Paragraph29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.35)] tracking-[0.5px] uppercase whitespace-nowrap">Engineer</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-[146_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Paragraph28 />
      <Paragraph29 />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-[184px]" data-name="Container">
      <Container28 />
      <Container29 />
    </div>
  );
}

function ContainerMargin5() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[12px] relative shrink-0 w-full" data-name="Container:margin">
      <Container27 />
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute h-[15.988px] left-0 top-[5.6px] w-[184px]" data-name="Button">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.35)] top-0 whitespace-nowrap">→ Sign out</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Button3 />
    </div>
  );
}

function Container26() {
  return (
    <div className="border-[rgba(255,255,255,0.1)] border-solid border-t-[0.8px] content-stretch flex flex-col items-start px-[20px] py-[16px] relative shrink-0 w-full" data-name="Container">
      <ContainerMargin5 />
      <Container30 />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="absolute bg-[#060f1e] content-stretch flex flex-col h-[928px] items-start left-0 top-0 w-[224px]" data-name="Sidebar">
      <Container21 />
      <Navigation />
      <Container26 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start pr-[16px] relative shrink-0 w-[90px]" data-name="Heading 1">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Dashboard</p>
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[33.6px] items-start justify-center left-0 overflow-clip pl-[32px] pr-[16px] py-[6px] rounded-[10px] top-0 w-[448px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] w-full">Search vehicle, customer, job order…</p>
    </div>
  );
}

function Container31() {
  return (
    <div className="flex-[448_0_0] h-[33.6px] max-w-[448px] min-w-px relative" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[12.24px] not-italic text-[#99a1af] text-[12px] top-[8.8px] whitespace-nowrap">🔍</p>
      <TextInput />
    </div>
  );
}

function Text22() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] text-center whitespace-nowrap">🔔</p>
    </div>
  );
}

function Text23() {
  return <div className="absolute bg-[#fb2c36] border-[0.8px] border-solid border-white left-[20px] rounded-[26843500px] size-[8px] top-[4px]" data-name="Text" />;
}

function Button4() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[26843500px] shrink-0 size-[32px]" data-name="Button">
      <Text22 />
      <Text23 />
    </div>
  );
}

function Paragraph30() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#101828] text-[12px] text-right whitespace-nowrap">Karim Samir</p>
    </div>
  );
}

function Paragraph31() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] capitalize font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[#99a1af] text-[10px] text-right whitespace-nowrap">engineer</p>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[69.575px]" data-name="Container">
      <Paragraph30 />
      <Paragraph31 />
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Button4 />
      <Container33 />
    </div>
  );
}

function ContainerAlign1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-w-px relative" data-name="Container:align">
      <Container32 />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-b-[0.8px] border-solid content-stretch flex gap-[16px] h-[56px] items-center left-[224px] px-[24px] top-0 w-[970.4px]" data-name="Header">
      <Heading />
      <Container31 />
      <ContainerAlign1 />
    </div>
  );
}

export default function CreateAppDesign() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-start relative size-full" data-name="Create app design">
      <Body />
      <Sidebar />
      <Header />
    </div>
  );
}