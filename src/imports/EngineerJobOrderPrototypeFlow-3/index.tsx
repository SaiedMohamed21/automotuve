function TextInput() {
  return (
    <div className="absolute bg-white border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[38.6px] items-start justify-center left-0 overflow-clip pl-[36px] pr-[16px] py-[8px] rounded-[6px] top-0 w-[384px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] w-full">Search by number, customer, vehicle…</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[38.6px] max-w-[384px] relative shrink-0 w-[384px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[12.11px] not-italic text-[#99a1af] text-[14px] top-[8.8px] whitespace-nowrap">🔍</p>
      <TextInput />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex h-[38.4px] items-center left-[16px] overflow-clip top-0 w-[114.4px]" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">Sort by date</p>
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

function Container4() {
  return (
    <div className="absolute content-stretch flex h-[38.4px] items-center left-[16px] overflow-clip top-0 w-[69.6px]" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">Status</p>
    </div>
  );
}

function Icon1() {
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

function Container5() {
  return (
    <div className="absolute content-stretch flex h-[38.4px] items-center justify-center left-[94.6px] top-0 w-[20px]" data-name="Container">
      <Icon1 />
    </div>
  );
}

function Dropdown1() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid h-[40px] overflow-clip relative rounded-[8px] shrink-0 w-[115.2px]" data-name="Dropdown">
      <Container4 />
      <Container5 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#0f2340] content-stretch flex flex-col items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">+ New Job Order</p>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Dropdown />
      <Dropdown1 />
      <Button />
    </div>
  );
}

function HeaderCell() {
  return (
    <div className="absolute bg-[#f9fafb] h-[40.9px] left-0 top-0 w-[156.625px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-[20px] not-italic text-[#6a7282] text-[11px] top-[12.6px] tracking-[0.6px] uppercase whitespace-nowrap">JOB ORDER</p>
    </div>
  );
}

function HeaderCell1() {
  return (
    <div className="absolute bg-[#f9fafb] h-[40.9px] left-[156.63px] top-0 w-[135.5px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-[20px] not-italic text-[#6a7282] text-[11px] top-[12.6px] tracking-[0.6px] uppercase whitespace-nowrap">DATE</p>
    </div>
  );
}

function HeaderCell2() {
  return (
    <div className="absolute bg-[#f9fafb] h-[40.9px] left-[292.13px] top-0 w-[170.363px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-[20px] not-italic text-[#6a7282] text-[11px] top-[12.6px] tracking-[0.6px] uppercase whitespace-nowrap">CUSTOMER</p>
    </div>
  );
}

function HeaderCell3() {
  return (
    <div className="absolute bg-[#f9fafb] h-[40.9px] left-[462.49px] top-0 w-[157.038px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-[20px] not-italic text-[#6a7282] text-[11px] top-[12.6px] tracking-[0.6px] uppercase whitespace-nowrap">VEHICLE</p>
    </div>
  );
}

function HeaderCell4() {
  return (
    <div className="absolute bg-[#f9fafb] h-[40.9px] left-[744.65px] top-0 w-[176.95px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-[20px] not-italic text-[#6a7282] text-[11px] top-[12.6px] tracking-[0.6px] uppercase whitespace-nowrap">STATUS</p>
    </div>
  );
}

function TableRow() {
  return (
    <div className="absolute border-[#f3f4f6] border-b-[0.8px] border-solid h-[40.9px] left-0 top-0 w-[921.6px]" data-name="Table Row">
      <HeaderCell />
      <HeaderCell1 />
      <HeaderCell2 />
      <HeaderCell3 />
      <HeaderCell4 />
    </div>
  );
}

function TableCell() {
  return (
    <div className="[word-break:break-word] absolute h-[71.8px] left-[292.13px] top-0 w-[170.363px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[20px] not-italic text-[#101828] text-[14px] top-[16.4px]">Ahmed Mohamed</p>
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[20px] text-[#99a1af] text-[12px] top-[37.4px]">01012345678</p>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="[word-break:break-word] absolute h-[71.8px] left-[462.49px] top-0 w-[157.038px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[20px] not-italic text-[#101828] text-[14px] top-[16.4px]">BMW 320i</p>
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[20px] text-[#99a1af] text-[12px] top-[37.4px]">ABC 123</p>
    </div>
  );
}

function StatusBadge() {
  return (
    <div className="absolute bg-[#eff6ff] border-[#bedbff] border-[0.8px] border-solid content-stretch flex h-[23.6px] items-center left-[764.65px] px-[10px] py-[2px] rounded-[26843500px] top-[25.5px]" data-name="StatusBadge">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[#1447e6] text-[12px] whitespace-nowrap">Open</p>
    </div>
  );
}

function TableRow1() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[71.8px] left-0 top-[40.9px] w-[921.6px]" data-name="Table Row">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[19.5px] left-[20px] text-[#0f2340] text-[13px] top-[25.95px] tracking-[0.3px] whitespace-nowrap">JO-2026-00125</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[176.63px] not-italic text-[#364153] text-[14px] top-[25px] whitespace-nowrap">12 Aug 2026</p>
      <TableCell />
      <TableCell1 />
      <StatusBadge />
    </div>
  );
}

function TableCell2() {
  return (
    <div className="[word-break:break-word] absolute h-[71.8px] left-[292.13px] top-0 w-[170.363px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[20px] not-italic text-[#101828] text-[14px] top-[16.4px]">Mohamed Ali</p>
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[20px] text-[#99a1af] text-[12px] top-[37.4px]">01067891234</p>
    </div>
  );
}

function TableCell3() {
  return (
    <div className="[word-break:break-word] absolute h-[71.8px] left-[462.49px] top-0 w-[157.038px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[20px] not-italic text-[#101828] text-[14px] top-[16.4px]">Kia Sportage</p>
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[20px] text-[#99a1af] text-[12px] top-[37.4px]">JKL 345</p>
    </div>
  );
}

function StatusBadge1() {
  return (
    <div className="absolute bg-[#ecfdf5] border-[#a4f4cf] border-[0.8px] border-solid content-stretch flex h-[23.6px] items-center left-[764.65px] px-[10px] py-[2px] rounded-[26843500px] top-[25.5px]" data-name="StatusBadge">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[#007a55] text-[12px] whitespace-nowrap">Completed</p>
    </div>
  );
}

function TableRow2() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[71.8px] left-0 top-[184.5px] w-[921.6px]" data-name="Table Row">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[19.5px] left-[20px] text-[#0f2340] text-[13px] top-[25.95px] tracking-[0.3px] whitespace-nowrap">JO-2026-00123</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[176.63px] not-italic text-[#364153] text-[14px] top-[25px] whitespace-nowrap">01 Aug 2026</p>
      <TableCell2 />
      <TableCell3 />
      <StatusBadge1 />
    </div>
  );
}

function TableCell4() {
  return (
    <div className="[word-break:break-word] absolute h-[71.8px] left-[292.13px] top-0 w-[170.363px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[20px] not-italic text-[#101828] text-[14px] top-[16.4px]">Layla Karim</p>
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[20px] text-[#99a1af] text-[12px] top-[37.4px]">01156789012</p>
    </div>
  );
}

function TableCell5() {
  return (
    <div className="[word-break:break-word] absolute h-[71.8px] left-[462.49px] top-0 w-[157.038px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[20px] not-italic text-[#101828] text-[14px] top-[16.4px]">Nissan Altima</p>
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[20px] text-[#99a1af] text-[12px] top-[37.4px]">MNO 678</p>
    </div>
  );
}

function StatusBadge2() {
  return (
    <div className="absolute bg-[#f3f4f6] border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex h-[23.6px] items-center left-[764.65px] px-[10px] py-[2px] rounded-[26843500px] top-[25.5px]" data-name="StatusBadge">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">Closed</p>
    </div>
  );
}

function TableRow3() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[71.8px] left-0 top-[256.3px] w-[921.6px]" data-name="Table Row">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[19.5px] left-[20px] text-[#0f2340] text-[13px] top-[25.95px] tracking-[0.3px] whitespace-nowrap">JO-2026-00122</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[176.63px] not-italic text-[#364153] text-[14px] top-[25px] whitespace-nowrap">—</p>
      <TableCell4 />
      <TableCell5 />
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[639.53px] not-italic text-[#6a7282] text-[14px] top-[25px] whitespace-nowrap">—</p>
      <StatusBadge2 />
    </div>
  );
}

function TableCell6() {
  return (
    <div className="[word-break:break-word] absolute h-[71.4px] left-[292.13px] top-0 w-[170.363px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[20px] not-italic text-[#101828] text-[14px] top-[16.4px]">Omar Farouk</p>
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[20px] text-[#99a1af] text-[12px] top-[37.4px]">01023456789</p>
    </div>
  );
}

function TableCell7() {
  return (
    <div className="[word-break:break-word] absolute h-[71.4px] left-[462.49px] top-0 w-[157.038px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[20px] not-italic text-[#101828] text-[14px] top-[16.4px]">Toyota Camry</p>
      <p className="absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[20px] text-[#99a1af] text-[12px] top-[37.4px]">PQR 901</p>
    </div>
  );
}

function StatusBadge3() {
  return (
    <div className="absolute bg-[#ecfdf5] border-[#a4f4cf] border-[0.8px] border-solid content-stretch flex h-[23.6px] items-center left-[764.65px] px-[10px] py-[2px] rounded-[26843500px] top-[25.5px]" data-name="StatusBadge">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[#007a55] text-[12px] whitespace-nowrap">Completed</p>
    </div>
  );
}

function TableRow4() {
  return (
    <div className="absolute h-[71.4px] left-0 top-[328.1px] w-[921.6px]" data-name="Table Row">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[19.5px] left-[20px] text-[#0f2340] text-[13px] top-[25.95px] tracking-[0.3px] whitespace-nowrap">JO-2026-00121</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[176.63px] not-italic text-[#364153] text-[14px] top-[25px] whitespace-nowrap">—</p>
      <TableCell6 />
      <TableCell7 />
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[639.53px] not-italic text-[#6a7282] text-[14px] top-[25px] whitespace-nowrap">—</p>
      <StatusBadge3 />
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
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[401.1px] items-start overflow-clip relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <Table />
    </div>
  );
}

function ContainerMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[20px] relative shrink-0 w-full" data-name="Container:margin">
      <Container6 />
    </div>
  );
}

function JobOrdersListScreen() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-start min-h-[606.4000244140625px] p-[24px] relative shrink-0 w-full" data-name="JobOrdersListScreen">
      <Container />
      <ContainerMargin />
    </div>
  );
}

function App() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col h-[606.4px] items-start pl-[224px] relative shrink-0 w-[1195.2px]" data-name="App">
      <JobOrdersListScreen />
    </div>
  );
}

function BodyMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[56px] relative shrink-0" data-name="Body:margin">
      <App />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[12px] relative shrink-0 text-[12px] text-[rgba(255,255,255,0.9)] whitespace-nowrap">SA</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[28px]" data-name="Container">
      <Text />
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col h-[15px] items-start overflow-clip relative shrink-0 w-[97.45px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">Star Auto Center</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.4)] tracking-[0.5px] uppercase whitespace-nowrap">Engineer</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Text1 />
      <Text2 />
    </div>
  );
}

function Container7() {
  return (
    <div className="border-[rgba(255,255,255,0.1)] border-b-[0.8px] border-solid content-stretch flex gap-[10px] items-center p-[20px] relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Container9 />
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">⊞</p>
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Dashboard</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-full" data-name="Button">
      <Text3 />
      <Text4 />
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">◉</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Customers</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-full" data-name="Button">
      <Text5 />
      <Text6 />
    </div>
  );
}

function Text7() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">◈</p>
    </div>
  );
}

function Text8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Vehicles</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-full" data-name="Button">
      <Text7 />
      <Text8 />
    </div>
  );
}

function Text9() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">◫</p>
    </div>
  );
}

function Text10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Job Orders</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-full" data-name="Button">
      <Text9 />
      <Text10 />
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

function Text11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">KS</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center relative rounded-[26843500px] shrink-0 size-[28px]" data-name="Container">
      <Text11 />
    </div>
  );
}

function Text12() {
  return (
    <div className="content-stretch flex flex-col h-[16px] items-start overflow-clip relative shrink-0 w-[146px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.8)] whitespace-nowrap">Karim Samir</p>
    </div>
  );
}

function Text13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.35)] tracking-[0.5px] uppercase whitespace-nowrap">Engineer</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-[146_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Text12 />
      <Text13 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex gap-[10px] items-center pb-[12px] relative shrink-0 w-[184px]" data-name="Container">
      <Container12 />
      <Container13 />
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

function Container14() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Button5 />
    </div>
  );
}

function Container10() {
  return (
    <div className="border-[rgba(255,255,255,0.1)] border-solid border-t-[0.8px] content-stretch flex flex-col items-start px-[20px] py-[16px] relative shrink-0 w-full" data-name="Container">
      <Container11 />
      <Container14 />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="absolute bg-[#060f1e] content-stretch flex flex-col h-[606.4px] items-start left-0 top-0 w-[224px]" data-name="Sidebar">
      <Container7 />
      <Navigation />
      <Container10 />
    </div>
  );
}

function Text14() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[8px] relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Job Orders</p>
    </div>
  );
}

function TextInput1() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[34.6px] items-start justify-center left-0 overflow-clip pl-[32px] pr-[16px] py-[6px] rounded-[10px] top-0 w-[448px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(153,161,175,0.5)] w-full">Search vehicle, customer, job order…</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="flex-[448_0_0] h-[34.6px] max-w-[448px] min-w-px relative" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[12.24px] not-italic text-[#99a1af] text-[12px] top-[8.3px] whitespace-nowrap">🔍</p>
      <TextInput1 />
    </div>
  );
}

function Text15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-black whitespace-nowrap">🔔</p>
    </div>
  );
}

function Container18() {
  return <div className="absolute bg-[#fb2c36] border-[#5ee9b5] border-[0.8px] border-solid left-[20px] rounded-[26843500px] size-[8px] top-[4px]" data-name="Container" />;
}

function Container17() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[32px]" data-name="Container">
      <Text15 />
      <Container18 />
    </div>
  );
}

function Container19() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col items-end not-italic relative shrink-0 whitespace-nowrap" data-name="Container">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] relative shrink-0 text-[#101828] text-[12px]">Karim Samir</p>
      <p className="capitalize font-['Inter:Regular',sans-serif] font-normal leading-[15px] relative shrink-0 text-[#99a1af] text-[10px]">engineer</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Container17 />
      <Container19 />
    </div>
  );
}

function ContainerAlign() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-w-px relative" data-name="Container:align">
      <Container16 />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-b-[0.8px] border-solid content-stretch flex gap-[16px] h-[56px] items-center left-[224px] px-[24px] top-0 w-[971.2px]" data-name="Header">
      <Text14 />
      <Container15 />
      <ContainerAlign />
    </div>
  );
}

export default function EngineerJobOrderPrototypeFlow() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Engineer Job Order Prototype Flow">
      <BodyMargin />
      <Sidebar />
      <Header />
    </div>
  );
}