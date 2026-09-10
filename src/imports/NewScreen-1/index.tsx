function Paragraph() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.5)] tracking-[0.8px] uppercase whitespace-nowrap">READY TO START</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col h-[40px] items-start pt-[4px] relative shrink-0 w-[277.313px]" data-name="Heading 1">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[36px] not-italic relative shrink-0 text-[24px] text-white whitespace-nowrap">Create a New Job Order</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex flex-col h-[24px] items-start pt-[4px] relative shrink-0 w-[277.313px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] not-italic relative shrink-0 text-[13px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Tue, 12 August 2026 · Star Auto Center</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[277.313px]" data-name="Container">
      <Paragraph />
      <Heading />
      <Paragraph1 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center px-[20px] py-[10px] relative rounded-[8px] shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#0f2340] text-[14px] text-center whitespace-nowrap">+ New Job Order</p>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[#0f2340] content-stretch flex items-center justify-between p-[24px] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <Container1 />
      <Button />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[#99a1af] text-[11px] tracking-[0.6px] uppercase whitespace-nowrap">{`TODAY'S JOBS`}</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#99a1af] text-[16px] whitespace-nowrap">◫</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text />
      <Text1 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex flex-col h-[60px] items-start pt-[12px] relative shrink-0 w-[177.2px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[48px] not-italic relative shrink-0 text-[#101828] text-[32px] whitespace-nowrap">1</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex flex-col h-[22px] items-start pt-[4px] relative shrink-0 w-[177.2px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">12 Aug 2026</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid col-1 content-stretch flex flex-col items-start justify-self-stretch p-[20px] relative rounded-[12px] row-1 self-stretch shrink-0" data-name="Container">
      <Container4 />
      <Paragraph2 />
      <Paragraph3 />
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[#99a1af] text-[11px] tracking-[0.6px] uppercase whitespace-nowrap">OPEN</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#99a1af] text-[16px] whitespace-nowrap">○</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text2 />
      <Text3 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex flex-col h-[60px] items-start pt-[12px] relative shrink-0 w-[177.2px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[48px] not-italic relative shrink-0 text-[#101828] text-[32px] whitespace-nowrap">1</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex flex-col h-[22px] items-start pt-[4px] relative shrink-0 w-[177.2px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">Awaiting work</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid col-2 content-stretch flex flex-col items-start justify-self-stretch p-[20px] relative rounded-[12px] row-1 self-stretch shrink-0" data-name="Container">
      <Container6 />
      <Paragraph4 />
      <Paragraph5 />
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[#99a1af] text-[11px] tracking-[0.6px] uppercase whitespace-nowrap">COMPLETED TODAY</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#99a1af] text-[16px] whitespace-nowrap">✓</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text4 />
      <Text5 />
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="content-stretch flex flex-col h-[60px] items-start pt-[12px] relative shrink-0 w-[177.2px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[48px] not-italic relative shrink-0 text-[#096] text-[32px] whitespace-nowrap">2</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="content-stretch flex flex-col h-[22px] items-start pt-[4px] relative shrink-0 w-[177.2px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">Ready for accounting</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid col-3 content-stretch flex flex-col items-start justify-self-stretch p-[20px] relative rounded-[12px] row-1 self-stretch shrink-0" data-name="Container">
      <Container8 />
      <Paragraph6 />
      <Paragraph7 />
    </div>
  );
}

function Container2() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[____218.80px_218.80px_218.80px_218.80px] grid-rows-[_147.60px] relative shrink-0 w-full" data-name="Container">
      <Container3 />
      <Container5 />
      <Container7 />
    </div>
  );
}

function ContainerMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[24px] relative shrink-0 w-full" data-name="Container:margin">
      <Container2 />
    </div>
  );
}

function Container11() {
  return (
    <div className="border-[#f3f4f6] border-b-[0.8px] border-solid content-stretch flex flex-col items-start px-[20px] py-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[#99a1af] text-[11px] tracking-[0.6px] uppercase whitespace-nowrap">{`TODAY'S WORKSHOP ACTIVITY`}</p>
    </div>
  );
}

function TableRow() {
  return (
    <div className="[word-break:break-word] absolute border-[#f3f4f6] border-b-[0.8px] border-solid font-['Inter:Semi_Bold',sans-serif] font-semibold h-[40.9px] leading-[16.5px] left-0 not-italic text-[#99a1af] text-[11px] top-0 tracking-[0.6px] w-[665.6px] whitespace-nowrap" data-name="Table Row">
      <p className="absolute left-[20px] top-[12.6px]">JOB ORDER</p>
      <p className="absolute left-[174.47px] top-[12.6px]">CUSTOMER</p>
      <p className="absolute left-[347.13px] top-[12.6px]">VEHICLE</p>
      <p className="absolute left-[506.28px] top-[12.6px]">STATUS</p>
    </div>
  );
}

function TableCell() {
  return (
    <div className="[word-break:break-word] absolute h-[71.8px] left-[154.47px] top-0 w-[172.65px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[20px] not-italic text-[#101828] text-[14px] top-[16.4px]">Ahmed Mohamed</p>
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[20px] text-[#99a1af] text-[12px] top-[37.4px]">01012345678</p>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="[word-break:break-word] absolute h-[71.8px] left-[327.13px] not-italic top-0 w-[159.15px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[20px] text-[#101828] text-[14px] top-[16.4px]">BMW 320i</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[20px] text-[#99a1af] text-[12px] top-[37.4px]">ABC 123</p>
    </div>
  );
}

function StatusBadge() {
  return (
    <div className="absolute bg-[#eff6ff] border-[#bedbff] border-[0.8px] border-solid content-stretch flex h-[23.6px] items-center left-[506.28px] px-[10px] py-[2px] rounded-[26843500px] top-[25.5px]" data-name="StatusBadge">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[#1447e6] text-[12px] whitespace-nowrap">Open</p>
    </div>
  );
}

function TableRow1() {
  return (
    <div className="absolute border-[#f3f4f6] border-b-[0.8px] border-solid h-[71.8px] left-0 top-[40.9px] w-[665.6px]" data-name="Table Row">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[19.5px] left-[20px] text-[#101828] text-[13px] top-[25.95px] whitespace-nowrap">JO-2026-00125</p>
      <TableCell />
      <TableCell1 />
      <StatusBadge />
    </div>
  );
}

function TableCell2() {
  return (
    <div className="[word-break:break-word] absolute h-[71.8px] left-[154.47px] top-0 w-[172.65px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[20px] not-italic text-[#101828] text-[14px] top-[16.4px]">Sara Hassan</p>
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[20px] text-[#99a1af] text-[12px] top-[37.4px]">01198765432</p>
    </div>
  );
}

function TableCell3() {
  return (
    <div className="[word-break:break-word] absolute h-[71.8px] left-[327.13px] not-italic top-0 w-[159.15px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[20px] text-[#101828] text-[14px] top-[16.4px]">Hyundai Elantra</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[20px] text-[#99a1af] text-[12px] top-[37.4px]">GHI 012</p>
    </div>
  );
}

function StatusBadge1() {
  return (
    <div className="absolute bg-[#eff6ff] border-[#bedbff] border-[0.8px] border-solid content-stretch flex h-[23.6px] items-center left-[506.28px] px-[10px] py-[2px] rounded-[26843500px] top-[25.7px]" data-name="StatusBadge">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[#1447e6] text-[12px] whitespace-nowrap">Open</p>
    </div>
  );
}

function TableRow2() {
  return (
    <div className="absolute border-[#f3f4f6] border-b-[0.8px] border-solid h-[71.8px] left-0 top-[112.7px] w-[665.6px]" data-name="Table Row">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[19.5px] left-[20px] text-[#101828] text-[13px] top-[25.95px] whitespace-nowrap">JO-2026-00124</p>
      <TableCell2 />
      <TableCell3 />
      <StatusBadge1 />
    </div>
  );
}

function TableCell4() {
  return (
    <div className="[word-break:break-word] absolute h-[71.8px] left-[154.47px] top-0 w-[172.65px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[20px] not-italic text-[#101828] text-[14px] top-[16.4px]">Mohamed Ali</p>
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[20px] text-[#99a1af] text-[12px] top-[37.4px]">01067891234</p>
    </div>
  );
}

function TableCell5() {
  return (
    <div className="[word-break:break-word] absolute h-[71.8px] left-[327.13px] not-italic top-0 w-[159.15px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[20px] text-[#101828] text-[14px] top-[16.4px]">Kia Sportage</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[20px] text-[#99a1af] text-[12px] top-[37.4px]">JKL 345</p>
    </div>
  );
}

function StatusBadge2() {
  return (
    <div className="absolute bg-[#ecfdf5] border-[#a4f4cf] border-[0.8px] border-solid content-stretch flex h-[23.6px] items-center left-[506.28px] px-[10px] py-[2px] rounded-[26843500px] top-[25.5px]" data-name="StatusBadge">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[#007a55] text-[12px] whitespace-nowrap">Completed</p>
    </div>
  );
}

function TableRow3() {
  return (
    <div className="absolute border-[#f3f4f6] border-b-[0.8px] border-solid h-[71.8px] left-0 top-[184.5px] w-[665.6px]" data-name="Table Row">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[19.5px] left-[20px] text-[#101828] text-[13px] top-[25.95px] whitespace-nowrap">JO-2026-00123</p>
      <TableCell4 />
      <TableCell5 />
      <StatusBadge2 />
    </div>
  );
}

function TableCell6() {
  return (
    <div className="[word-break:break-word] absolute h-[71.8px] left-[154.47px] top-0 w-[172.65px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[20px] not-italic text-[#101828] text-[14px] top-[16.4px]">Layla Karim</p>
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[20px] text-[#99a1af] text-[12px] top-[37.4px]">01156789012</p>
    </div>
  );
}

function TableCell7() {
  return (
    <div className="[word-break:break-word] absolute h-[71.8px] left-[327.13px] not-italic top-0 w-[159.15px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[20px] text-[#101828] text-[14px] top-[16.4px]">Nissan Altima</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[20px] text-[#99a1af] text-[12px] top-[37.4px]">MNO 678</p>
    </div>
  );
}

function StatusBadge3() {
  return (
    <div className="absolute bg-[#f3f4f6] border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex h-[23.6px] items-center left-[506.28px] px-[10px] py-[2px] rounded-[26843500px] top-[25.5px]" data-name="StatusBadge">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">Closed</p>
    </div>
  );
}

function TableRow4() {
  return (
    <div className="absolute border-[#f3f4f6] border-b-[0.8px] border-solid h-[71.8px] left-0 top-[256.3px] w-[665.6px]" data-name="Table Row">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[19.5px] left-[20px] text-[#101828] text-[13px] top-[25.95px] whitespace-nowrap">JO-2026-00122</p>
      <TableCell6 />
      <TableCell7 />
      <StatusBadge3 />
    </div>
  );
}

function TableCell8() {
  return (
    <div className="[word-break:break-word] absolute h-[71.4px] left-[154.47px] top-0 w-[172.65px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[20px] not-italic text-[#101828] text-[14px] top-[16.4px]">Omar Farouk</p>
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[20px] text-[#99a1af] text-[12px] top-[37.4px]">01023456789</p>
    </div>
  );
}

function TableCell9() {
  return (
    <div className="[word-break:break-word] absolute h-[71.4px] left-[327.13px] not-italic top-0 w-[159.15px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[20px] text-[#101828] text-[14px] top-[16.4px]">Toyota Camry</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[20px] text-[#99a1af] text-[12px] top-[37.4px]">PQR 901</p>
    </div>
  );
}

function StatusBadge4() {
  return (
    <div className="absolute bg-[#ecfdf5] border-[#a4f4cf] border-[0.8px] border-solid content-stretch flex h-[23.6px] items-center left-[506.28px] px-[10px] py-[2px] rounded-[26843500px] top-[25.5px]" data-name="StatusBadge">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[#007a55] text-[12px] whitespace-nowrap">Completed</p>
    </div>
  );
}

function TableRow5() {
  return (
    <div className="absolute h-[71.4px] left-0 top-[328.1px] w-[665.6px]" data-name="Table Row">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[19.5px] left-[20px] text-[#101828] text-[13px] top-[25.95px] whitespace-nowrap">JO-2026-00121</p>
      <TableCell8 />
      <TableCell9 />
      <StatusBadge4 />
    </div>
  );
}

function Table() {
  return (
    <div className="h-[399.5px] relative shrink-0 w-full" data-name="Table">
      <TableRow />
      <TableRow1 />
      <TableRow2 />
      <TableRow3 />
      <TableRow4 />
      <TableRow5 />
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-[667.2_0_0] flex-col h-full items-start min-w-px overflow-clip relative rounded-[12px]" data-name="Container">
      <Container11 />
      <Table />
    </div>
  );
}

function Container14() {
  return (
    <div className="border-[#f3f4f6] border-b-[0.8px] border-solid content-stretch flex flex-col items-start px-[20px] py-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[#99a1af] text-[11px] tracking-[0.6px] uppercase whitespace-nowrap">RECENT VEHICLES</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] not-italic relative shrink-0 text-[#101828] text-[13px] whitespace-nowrap">BMW 320i</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="content-stretch flex flex-col h-[17px] items-start pl-[8px] relative shrink-0 w-[76px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#99a1af] text-[11px] whitespace-nowrap">08 Aug 2026</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Paragraph8 />
      <Paragraph9 />
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#99a1af] text-[11px] whitespace-nowrap">ABC 123 · Ahmed Mohamed</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="border-[#f3f4f6] border-b-[0.8px] border-solid content-stretch flex flex-col items-start px-[20px] py-[12px] relative shrink-0 w-full" data-name="Container">
      <Container16 />
      <Paragraph10 />
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] not-italic relative shrink-0 text-[#101828] text-[13px] w-[129px]">Mercedes-Benz C200</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="content-stretch flex flex-col h-[17px] items-start pl-[8px] relative shrink-0 w-[70px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#99a1af] text-[11px] whitespace-nowrap">02 Jul 2026</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph11 />
      <Paragraph12 />
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#99a1af] text-[11px] whitespace-nowrap">XYZ 456 · Ahmed Mohamed</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="border-[#f3f4f6] border-b-[0.8px] border-solid content-stretch flex flex-col items-start px-[20px] py-[12px] relative shrink-0 w-full" data-name="Container">
      <Container18 />
      <Paragraph13 />
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] not-italic relative shrink-0 text-[#101828] text-[13px] whitespace-nowrap">Toyota Corolla</p>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="content-stretch flex flex-col h-[17px] items-start pl-[8px] relative shrink-0 w-[72px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#99a1af] text-[11px] whitespace-nowrap">15 Jun 2026</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Paragraph14 />
      <Paragraph15 />
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#99a1af] text-[11px] whitespace-nowrap">DEF 789 · Ahmed Mohamed</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="border-[#f3f4f6] border-b-[0.8px] border-solid content-stretch flex flex-col items-start px-[20px] py-[12px] relative shrink-0 w-full" data-name="Container">
      <Container20 />
      <Paragraph16 />
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] not-italic relative shrink-0 text-[#101828] text-[13px] whitespace-nowrap">Hyundai Elantra</p>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="content-stretch flex flex-col h-[17px] items-start pl-[8px] relative shrink-0 w-[76px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#99a1af] text-[11px] whitespace-nowrap">05 Aug 2026</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Paragraph17 />
      <Paragraph18 />
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#99a1af] text-[11px] whitespace-nowrap">GHI 012 · Sara Hassan</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[12px] relative shrink-0 w-full" data-name="Container">
      <Container22 />
      <Paragraph19 />
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[320.3px] items-start overflow-clip relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <Container14 />
      <Container15 />
      <Container17 />
      <Container19 />
      <Container21 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0 w-[240px]" data-name="Container">
      <Container13 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[16px] h-[536.5px] items-start pt-[24px] relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Container12 />
    </div>
  );
}

function DashboardScreen() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-start min-h-[606.4000244140625px] p-[24px] relative shrink-0 w-full" data-name="DashboardScreen">
      <Container />
      <ContainerMargin />
      <Container9 />
    </div>
  );
}

function DashboardScreenMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[224px] relative shrink-0 w-full" data-name="DashboardScreen:margin">
      <DashboardScreen />
    </div>
  );
}

function App() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col h-[606.4px] items-start relative shrink-0 w-[1195.2px]" data-name="App">
      <DashboardScreenMargin />
    </div>
  );
}

function BodyMargin() {
  return (
    <div className="content-stretch flex flex-col h-[941px] items-start pt-[56px] relative shrink-0" data-name="Body:margin">
      <App />
    </div>
  );
}

function Text6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[12px] relative shrink-0 text-[12px] text-[rgba(255,255,255,0.9)] whitespace-nowrap">SA</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[28px]" data-name="Container">
      <Text6 />
    </div>
  );
}

function Text7() {
  return (
    <div className="content-stretch flex flex-col h-[15px] items-start overflow-clip relative shrink-0 w-[97.45px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">Star Auto Center</p>
    </div>
  );
}

function Text8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.4)] tracking-[0.5px] uppercase whitespace-nowrap">Engineer</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Text7 />
      <Text8 />
    </div>
  );
}

function Container23() {
  return (
    <div className="border-[rgba(255,255,255,0.1)] border-b-[0.8px] border-solid content-stretch flex gap-[10px] items-center p-[20px] relative shrink-0 w-full" data-name="Container">
      <Container24 />
      <Container25 />
    </div>
  );
}

function Text9() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">⊞</p>
    </div>
  );
}

function Text10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Dashboard</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-full" data-name="Button">
      <Text9 />
      <Text10 />
    </div>
  );
}

function Text11() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">◉</p>
    </div>
  );
}

function Text12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Customers</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-full" data-name="Button">
      <Text11 />
      <Text12 />
    </div>
  );
}

function Text13() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">◈</p>
    </div>
  );
}

function Text14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Vehicles</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-full" data-name="Button">
      <Text13 />
      <Text14 />
    </div>
  );
}

function Text15() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">◫</p>
    </div>
  );
}

function Text16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Job Orders</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-full" data-name="Button">
      <Text15 />
      <Text16 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="content-stretch flex flex-[435.8_0_0] flex-col items-start min-h-px overflow-clip py-[16px] relative w-full" data-name="Navigation">
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
    </div>
  );
}

function Text17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">KS</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center relative rounded-[26843500px] shrink-0 size-[28px]" data-name="Container">
      <Text17 />
    </div>
  );
}

function Text18() {
  return (
    <div className="content-stretch flex flex-col h-[16px] items-start overflow-clip relative shrink-0 w-[146px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.8)] whitespace-nowrap">Karim Samir</p>
    </div>
  );
}

function Text19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.35)] tracking-[0.5px] uppercase whitespace-nowrap">Engineer</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-[146_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Text18 />
      <Text19 />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex gap-[10px] items-center pb-[12px] relative shrink-0 w-[184px]" data-name="Container">
      <Container28 />
      <Container29 />
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute h-[18px] left-0 top-[5.6px] w-[61.538px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[31px] not-italic text-[12px] text-[rgba(255,255,255,0.35)] text-center top-[-0.2px] whitespace-nowrap">→ Sign out</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Button5 />
    </div>
  );
}

function Container26() {
  return (
    <div className="border-[rgba(255,255,255,0.1)] border-solid border-t-[0.8px] content-stretch flex flex-col items-start px-[20px] py-[16px] relative shrink-0 w-full" data-name="Container">
      <Container27 />
      <Container30 />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="absolute bg-[#060f1e] content-stretch flex flex-col h-[940px] items-start left-0 top-0 w-[224px]" data-name="Sidebar">
      <Container23 />
      <Navigation />
      <Container26 />
    </div>
  );
}

function Text20() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[8px] relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Dashboard</p>
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[34.6px] items-start justify-center left-0 overflow-clip pl-[32px] pr-[16px] py-[6px] rounded-[10px] top-0 w-[448px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(153,161,175,0.5)] w-full">Search vehicle, customer, job order…</p>
    </div>
  );
}

function Container31() {
  return (
    <div className="flex-[448_0_0] h-[34.6px] max-w-[448px] min-w-px relative" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[12.24px] not-italic text-[#99a1af] text-[12px] top-[8.3px] whitespace-nowrap">🔍</p>
      <TextInput />
    </div>
  );
}

function Text21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-black whitespace-nowrap">🔔</p>
    </div>
  );
}

function Container34() {
  return <div className="absolute bg-[#fb2c36] border-[#5ee9b5] border-[0.8px] border-solid left-[20px] rounded-[26843500px] size-[8px] top-[4px]" data-name="Container" />;
}

function Container33() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[32px]" data-name="Container">
      <Text21 />
      <Container34 />
    </div>
  );
}

function Container35() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col items-end not-italic relative shrink-0 whitespace-nowrap" data-name="Container">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] relative shrink-0 text-[#101828] text-[12px]">Karim Samir</p>
      <p className="capitalize font-['Inter:Regular',sans-serif] font-normal leading-[15px] relative shrink-0 text-[#99a1af] text-[10px]">engineer</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Container33 />
      <Container35 />
    </div>
  );
}

function ContainerAlign() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-w-px relative" data-name="Container:align">
      <Container32 />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-b-[0.8px] border-solid content-stretch flex gap-[16px] h-[56px] items-center left-[224px] px-[24px] top-0 w-[971.2px]" data-name="Header">
      <Text20 />
      <Container31 />
      <ContainerAlign />
    </div>
  );
}

export default function NewScreen() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="NEW SCREEN">
      <BodyMargin />
      <Sidebar />
      <Header />
    </div>
  );
}