function TextInput() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-[480_0_0] flex-col h-[40px] items-start justify-center max-w-[480px] min-w-px overflow-clip px-[16px] relative rounded-[8px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] w-full">Search by job #, plate, vehicle...</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex h-[38.4px] items-center left-[16px] overflow-clip top-0 w-[114.4px]" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">Sort by Date</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[6px] relative shrink-0 w-[10px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="6" preserveAspectRatio="none" viewBox="0 0 10 6" width="10">
        <g id="Icon">
          <path d="M1 1L5 5L9 1" id="Vector" stroke="#111827" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex h-[38.4px] items-center justify-center left-[139.4px] top-0 w-[20px]" data-name="Container">
      <Icon />
    </div>
  );
}

function Dropdown() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid h-[40px] overflow-clip relative rounded-[8px] shrink-0 w-[160px]" data-name="Dropdown">
      <Container2 />
      <Container3 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[#6a7282] text-[14px] whitespace-nowrap">5 open jobs</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <TextInput />
      <Dropdown />
      <Paragraph />
    </div>
  );
}

function TableRow() {
  return (
    <div className="[word-break:break-word] absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid font-['Inter:Semi_Bold',sans-serif] font-semibold h-[40.9px] leading-[16.5px] left-0 not-italic text-[#6a7282] text-[11px] top-0 tracking-[0.6px] uppercase w-[977.6px] whitespace-nowrap" data-name="Table Row">
      <p className="absolute left-[16px] top-[12.6px]">Job Order</p>
      <p className="absolute left-[212.46px] top-[12.6px]">Date ↕</p>
      <p className="absolute left-[376.39px] top-[12.6px]">Vehicle</p>
      <p className="absolute left-[567.95px] top-[12.6px]">Plate</p>
      <p className="absolute left-[694.29px] top-[12.6px]">Parts Issued</p>
    </div>
  );
}

function TableCell() {
  return (
    <div className="[word-break:break-word] absolute h-[71.8px] left-[360.39px] not-italic top-0 w-[191.563px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] text-[#101828] text-[14px] top-[16.4px]">BMW 320i</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[16px] text-[#6a7282] text-[12px] top-[37.4px]">Silver · 2018</p>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#0f2340] h-[31.5px] left-[896.19px] rounded-[4px] top-[20.15px] w-[65.412px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-[33px] not-italic text-[13px] text-center text-white top-[6.6px] whitespace-nowrap">Open</p>
    </div>
  );
}

function TableRow1() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[71.8px] left-0 top-[40.9px] w-[977.6px]" data-name="Table Row">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[21px] left-[16px] text-[#0f2340] text-[14px] top-[24.2px] whitespace-nowrap">JO-2026-00125</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[212.46px] not-italic text-[#364153] text-[14px] top-[25px] whitespace-nowrap">12 Aug 2026</p>
      <TableCell />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[21px] left-[567.95px] text-[#364153] text-[14px] top-[24.2px] whitespace-nowrap">ABC 123</p>
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[694.29px] not-italic text-[#364153] text-[14px] top-[25.6px] whitespace-nowrap">3 parts</p>
      <Button />
    </div>
  );
}

function TableCell1() {
  return (
    <div className="[word-break:break-word] absolute h-[71.8px] left-[360.39px] not-italic top-0 w-[191.563px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] text-[#101828] text-[14px] top-[16.4px]">Hyundai Elantra</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[16px] text-[#6a7282] text-[12px] top-[37.4px]">Gray · 2021</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#0f2340] h-[31.5px] left-[896.19px] rounded-[4px] top-[20.15px] w-[65.412px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-[33px] not-italic text-[13px] text-center text-white top-[6.6px] whitespace-nowrap">Open</p>
    </div>
  );
}

function TableRow2() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[71.8px] left-0 top-[112.7px] w-[977.6px]" data-name="Table Row">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[21px] left-[16px] text-[#0f2340] text-[14px] top-[24.2px] whitespace-nowrap">JO-2026-00124</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[212.46px] not-italic text-[#364153] text-[14px] top-[25px] whitespace-nowrap">11 Aug 2026</p>
      <TableCell1 />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[21px] left-[567.95px] text-[#364153] text-[14px] top-[24.2px] whitespace-nowrap">GHI 012</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[694.29px] not-italic text-[#d1d5dc] text-[16px] top-[21.7px] whitespace-nowrap">—</p>
      <Button1 />
    </div>
  );
}

function TableCell2() {
  return (
    <div className="[word-break:break-word] absolute h-[71.8px] left-[360.39px] not-italic top-0 w-[191.563px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] text-[#101828] text-[14px] top-[16.4px]">Kia Sportage</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[16px] text-[#6a7282] text-[12px] top-[37.4px]">Blue · 2022</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-[#0f2340] h-[31.5px] left-[896.19px] rounded-[4px] top-[20.15px] w-[65.412px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-[33px] not-italic text-[13px] text-center text-white top-[6.6px] whitespace-nowrap">Open</p>
    </div>
  );
}

function TableRow3() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[71.8px] left-0 top-[184.5px] w-[977.6px]" data-name="Table Row">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[21px] left-[16px] text-[#0f2340] text-[14px] top-[24.2px] whitespace-nowrap">JO-2026-00123</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[212.46px] not-italic text-[#364153] text-[14px] top-[25px] whitespace-nowrap">10 Aug 2026</p>
      <TableCell2 />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[21px] left-[567.95px] text-[#364153] text-[14px] top-[24.2px] whitespace-nowrap">JKL 345</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[694.29px] not-italic text-[#d1d5dc] text-[16px] top-[21.7px] whitespace-nowrap">—</p>
      <Button2 />
    </div>
  );
}

function TableCell3() {
  return (
    <div className="[word-break:break-word] absolute h-[71.8px] left-[360.39px] not-italic top-0 w-[191.563px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] text-[#101828] text-[14px] top-[16.4px]">Toyota Camry</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[16px] text-[#6a7282] text-[12px] top-[37.4px]">Pearl White · 2020</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-[#0f2340] h-[31.5px] left-[896.19px] rounded-[4px] top-[20.15px] w-[65.412px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-[33px] not-italic text-[13px] text-center text-white top-[6.6px] whitespace-nowrap">Open</p>
    </div>
  );
}

function TableRow4() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[71.8px] left-0 top-[256.3px] w-[977.6px]" data-name="Table Row">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[21px] left-[16px] text-[#0f2340] text-[14px] top-[24.2px] whitespace-nowrap">JO-2026-00121</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[212.46px] not-italic text-[#364153] text-[14px] top-[25px] whitespace-nowrap">08 Aug 2026</p>
      <TableCell3 />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[21px] left-[567.95px] text-[#364153] text-[14px] top-[24.2px] whitespace-nowrap">PQR 901</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[694.29px] not-italic text-[#d1d5dc] text-[16px] top-[21.7px] whitespace-nowrap">—</p>
      <Button3 />
    </div>
  );
}

function TableCell4() {
  return (
    <div className="[word-break:break-word] absolute h-[71.4px] left-[360.39px] not-italic top-0 w-[191.563px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] text-[#101828] text-[14px] top-[16.4px]">BMW 320i</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[16px] text-[#6a7282] text-[12px] top-[37.4px]">Silver · 2018</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute bg-[#0f2340] h-[31.5px] left-[896.19px] rounded-[4px] top-[20.15px] w-[65.412px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-[33px] not-italic text-[13px] text-center text-white top-[6.6px] whitespace-nowrap">Open</p>
    </div>
  );
}

function TableRow5() {
  return (
    <div className="absolute h-[71.4px] left-0 top-[328.1px] w-[977.6px]" data-name="Table Row">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[21px] left-[16px] text-[#0f2340] text-[14px] top-[24.2px] whitespace-nowrap">JO-2026-00120</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[212.46px] not-italic text-[#364153] text-[14px] top-[25px] whitespace-nowrap">08 Aug 2026</p>
      <TableCell4 />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[21px] left-[567.95px] text-[#364153] text-[14px] top-[24.2px] whitespace-nowrap">ABC 123</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[694.29px] not-italic text-[#d1d5dc] text-[16px] top-[21.7px] whitespace-nowrap">—</p>
      <Button4 />
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

function Container4() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[401.1px] items-start overflow-clip relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <Table />
    </div>
  );
}

function ContainerMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[20px] relative shrink-0 w-full" data-name="Container:margin">
      <Container4 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start p-[24px] relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <ContainerMargin />
    </div>
  );
}

function WarehouseJobsScreen() {
  return (
    <div className="absolute bg-[#f3f4f6] content-stretch flex flex-col h-[550.4px] items-start left-[168px] overflow-clip top-[56px] w-[1027.2px]" data-name="WarehouseJobsScreen">
      <Container />
    </div>
  );
}

function App() {
  return (
    <div className="bg-[#f3f4f6] h-[606.4px] relative shrink-0 w-[1195.2px]" data-name="App">
      <WarehouseJobsScreen />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[18px] relative shrink-0 text-[12px] text-[rgba(255,255,255,0.9)] whitespace-nowrap">SA</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[28px]" data-name="Container">
      <Text />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex flex-col h-[15px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] not-italic overflow-hidden relative shrink-0 text-[12px] text-ellipsis text-white w-full whitespace-nowrap">Star Auto Center</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.4)] tracking-[0.5px] uppercase whitespace-nowrap">Warehouse</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[90px]" data-name="Container">
      <Paragraph1 />
      <Paragraph2 />
    </div>
  );
}

function Container5() {
  return (
    <div className="border-[rgba(255,255,255,0.1)] border-b-[0.8px] border-solid content-stretch flex gap-[10px] items-center p-[20px] relative shrink-0 w-full" data-name="Container">
      <Container6 />
      <Container7 />
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">⊞</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Dashboard</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[168px]" data-name="Button">
      <Text1 />
      <Text2 />
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[14.275px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">◫</p>
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white w-[102px]">Open Job Orders</p>
    </div>
  );
}

function Container9() {
  return <div className="absolute bg-[rgba(255,255,255,0.6)] h-[16px] left-[164px] rounded-[26843500px] top-[22px] w-[4px]" data-name="Container" />;
}

function Button6() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[168px]" data-name="Button">
      <Text3 />
      <Text4 />
      <Container9 />
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">▤</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Parts</p>
    </div>
  );
}

function Button7() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[168px]" data-name="Button">
      <Text5 />
      <Text6 />
    </div>
  );
}

function Text7() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">⊟</p>
    </div>
  );
}

function Text8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Stock Update</p>
    </div>
  );
}

function Button8() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[168px]" data-name="Button">
      <Text7 />
      <Text8 />
    </div>
  );
}

function Text9() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">↕</p>
    </div>
  );
}

function Text10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Movements</p>
    </div>
  );
}

function Button9() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[168px]" data-name="Button">
      <Text9 />
      <Text10 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-[428.8_0_0] flex-col items-start min-h-px py-[8px] relative w-full" data-name="Container">
      <Button5 />
      <Button6 />
      <Button7 />
      <Button8 />
      <Button9 />
    </div>
  );
}

function Text11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] not-italic relative shrink-0 text-[10px] text-white whitespace-nowrap">HN</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center relative rounded-[26843500px] shrink-0 size-[28px]" data-name="Container">
      <Text11 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex flex-col h-[16px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">Hassan Nour</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[14px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.4)] tracking-[0.5px] uppercase whitespace-nowrap">Warehouse</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[73.713px]" data-name="Container">
      <Paragraph3 />
      <Paragraph4 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Container12 />
      <Container13 />
    </div>
  );
}

function ContainerMargin1() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[12px] relative shrink-0 w-full" data-name="Container:margin">
      <Container11 />
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute h-[19.5px] left-0 top-[4px] w-[66.662px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-[33.5px] not-italic text-[13px] text-[rgba(255,255,255,0.4)] text-center top-[0.6px] whitespace-nowrap">→ Sign out</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Button10 />
    </div>
  );
}

function Container10() {
  return (
    <div className="border-[rgba(255,255,255,0.1)] border-solid border-t-[0.8px] content-stretch flex flex-col items-start p-[20px] relative shrink-0 w-full" data-name="Container">
      <ContainerMargin1 />
      <Container14 />
    </div>
  );
}

function WarehouseSidebar() {
  return (
    <div className="absolute bg-[#060f1e] content-stretch flex flex-col h-[606.4px] items-start left-0 top-0 w-[168px]" data-name="WarehouseSidebar">
      <Container5 />
      <Container8 />
      <Container10 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 1">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[#111827] text-[18px] whitespace-nowrap">Open Job Orders</p>
    </div>
  );
}

function Text12() {
  return (
    <div className="absolute bg-[#ffb900] content-stretch flex items-center justify-center left-[12.65px] rounded-[26843500px] size-[16px] top-[-4px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[13.5px] not-italic relative shrink-0 text-[9px] text-white whitespace-nowrap">1</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[30px] not-italic relative shrink-0 text-[#6a7282] text-[20px] whitespace-nowrap">🔔</p>
      <Text12 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#111827] text-[13px] text-right whitespace-nowrap">Hassan Nour</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[14px] not-italic relative shrink-0 text-[#6a7282] text-[11px] text-right tracking-[0.5px] uppercase whitespace-nowrap">Warehouse</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[80.638px]" data-name="Container">
      <Paragraph5 />
      <Paragraph6 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Container16 />
      <Container17 />
    </div>
  );
}

function WarehouseHeader() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-b-[0.8px] border-solid content-stretch flex h-[56px] items-center justify-between left-[168px] px-[24px] top-0 w-[1027.2px]" data-name="WarehouseHeader">
      <Heading />
      <Container15 />
    </div>
  );
}

export default function EngineerJobOrderPrototypeFlow() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Engineer Job Order Prototype Flow">
      <App />
      <WarehouseSidebar />
      <WarehouseHeader />
    </div>
  );
}