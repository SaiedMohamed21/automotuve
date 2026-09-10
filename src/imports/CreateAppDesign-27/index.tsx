function Button() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#99a1af] text-[14px] text-center whitespace-nowrap">← Back to Jobs</p>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Warehouse Parts Issue</p>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Button />
      <Heading1 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">Job Order</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex flex-col h-[28px] items-start pt-[4px] relative shrink-0 w-[268.8px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[24px] relative shrink-0 text-[#0f2340] text-[16px] whitespace-nowrap">JO-2026-00125</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">12 Aug 2026 · Full Service</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Paragraph />
      <Paragraph1 />
      <Paragraph2 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">Vehicle</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex flex-col h-[28px] items-start pt-[4px] relative shrink-0 w-[268.8px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#101828] text-[16px] whitespace-nowrap">BMW 320i (2018)</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[29.975px] relative shrink-0 w-full" data-name="Container">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-semibold leading-[16px] left-0 text-[#4a5565] text-[12px] top-[2.6px] tracking-[0.3px] whitespace-nowrap">ABC 123</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="col-2 content-stretch flex flex-col items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Paragraph3 />
      <Paragraph4 />
      <Container3 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">Relevant Work</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="content-stretch flex flex-col h-[24px] items-start pt-[4px] relative shrink-0 w-[268.8px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] whitespace-nowrap">Full Service</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[2px] relative shrink-0 w-[268.8px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] w-[269px]">Customer reported unusual noise from brakes. Check and advise.</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="col-3 content-stretch flex flex-col items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Paragraph5 />
      <Paragraph6 />
      <Paragraph7 />
    </div>
  );
}

function WarehouseOpenJobOrders1() {
  return (
    <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[___268.80px_268.80px_268.80px] grid-rows-[_73.96px] relative shrink-0 w-full" data-name="WarehouseOpenJobOrders">
      <Container1 />
      <Container2 />
      <Container4 />
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col items-start p-[20px] relative rounded-[10px] shrink-0 w-full" data-name="Card">
      <WarehouseOpenJobOrders1 />
    </div>
  );
}

function CardMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-name="Card:margin">
      <Card />
    </div>
  );
}

function SectionHeader() {
  return (
    <div className="content-stretch flex flex-col h-[36px] items-start pb-[16px] relative shrink-0 w-[207px]" data-name="SectionHeader">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#1e2939] text-[14px] tracking-[0.7px] uppercase whitespace-nowrap">Parts Issued to This Job</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#0f2340] content-stretch flex items-center justify-center px-[12px] py-[6px] relative rounded-[4px] shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">+ Add Part to Job</p>
    </div>
  );
}

function WarehouseOpenJobOrders2() {
  return (
    <div className="border-[#f3f4f6] border-b-[0.8px] border-solid content-stretch flex h-[68.8px] items-center justify-between px-[20px] py-[16px] relative shrink-0 w-full" data-name="WarehouseOpenJobOrders">
      <SectionHeader />
      <Button1 />
    </div>
  );
}

function HeaderCell() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-0 top-0 w-[288.688px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Part Name</p>
    </div>
  );
}

function HeaderCell1() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[288.69px] top-0 w-[200.738px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Part Number</p>
    </div>
  );
}

function HeaderCell2() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[489.42px] top-0 w-[157.938px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Location</p>
    </div>
  );
}

function HeaderCell3() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[647.36px] top-0 w-[177.213px]" data-name="Header Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[161.95px] not-italic text-[#6a7282] text-[12px] text-right top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Qty Issued</p>
    </div>
  );
}

function HeaderCell4() {
  return <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[824.58px] top-0 w-[69.825px]" data-name="Header Cell" />;
}

function TableCell() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[50.4px] left-0 top-[36.39px] w-[288.688px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[15.8px] whitespace-nowrap">Engine Oil 5W-30 4L</p>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[50.4px] left-[288.69px] top-[36.39px] w-[200.738px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#364153] text-[12px] top-[17.2px] whitespace-nowrap">OIL-5W30-4L</p>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20px] left-[16px] rounded-[4px] top-[16.4px] w-[44.8px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[8px] text-[#364153] text-[12px] top-[2px] whitespace-nowrap">B-01</p>
    </div>
  );
}

function TableCell2() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[50.4px] left-[489.42px] top-[36.39px] w-[157.938px]" data-name="Table Cell">
      <Text />
    </div>
  );
}

function NumberInput() {
  return (
    <div className="absolute border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[25.6px] items-start justify-center left-[113.21px] overflow-clip px-[4px] py-[2px] rounded-[4px] top-[12.4px] w-[48px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] text-right w-full">2</p>
    </div>
  );
}

function TableCell3() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[50.4px] left-[647.36px] top-[36.39px] w-[177.213px]" data-name="Table Cell">
      <NumberInput />
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute h-[20px] left-[16px] top-[15.2px] w-[11.438px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[20px] left-[6.5px] not-italic text-[#d1d5dc] text-[14px] text-center top-[0.6px] whitespace-nowrap">✕</p>
    </div>
  );
}

function TableCell4() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[50.4px] left-[824.58px] top-[36.39px] w-[69.825px]" data-name="Table Cell">
      <Button2 />
    </div>
  );
}

function TableCell5() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[50.4px] left-0 top-[86.79px] w-[288.688px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[15.8px] whitespace-nowrap">Oil Filter — BMW N20</p>
    </div>
  );
}

function TableCell6() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[50.4px] left-[288.69px] top-[86.79px] w-[200.738px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#364153] text-[12px] top-[17.2px] whitespace-nowrap">OF-BMW-N20</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20px] left-[16px] rounded-[4px] top-[16.4px] w-[44.8px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[8px] text-[#364153] text-[12px] top-[2px] whitespace-nowrap">B-02</p>
    </div>
  );
}

function TableCell7() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[50.4px] left-[489.42px] top-[86.79px] w-[157.938px]" data-name="Table Cell">
      <Text1 />
    </div>
  );
}

function NumberInput1() {
  return (
    <div className="absolute border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[25.6px] items-start justify-center left-[113.21px] overflow-clip px-[4px] py-[2px] rounded-[4px] top-[12.4px] w-[48px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] text-right w-full">1</p>
    </div>
  );
}

function TableCell8() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[50.4px] left-[647.36px] top-[86.79px] w-[177.213px]" data-name="Table Cell">
      <NumberInput1 />
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute h-[20px] left-[16px] top-[15.2px] w-[11.438px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[20px] left-[6.5px] not-italic text-[#d1d5dc] text-[14px] text-center top-[0.6px] whitespace-nowrap">✕</p>
    </div>
  );
}

function TableCell9() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[50.4px] left-[824.58px] top-[86.79px] w-[69.825px]" data-name="Table Cell">
      <Button3 />
    </div>
  );
}

function TableCell10() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[50.4px] left-0 top-[137.19px] w-[288.688px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[15.8px] whitespace-nowrap">Air Filter — BMW 320i</p>
    </div>
  );
}

function TableCell11() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[50.4px] left-[288.69px] top-[137.19px] w-[200.738px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#364153] text-[12px] top-[17.2px] whitespace-nowrap">AF-BMW-320</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20px] left-[16px] rounded-[4px] top-[16.4px] w-[44.8px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[8px] text-[#364153] text-[12px] top-[2px] whitespace-nowrap">B-03</p>
    </div>
  );
}

function TableCell12() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[50.4px] left-[489.42px] top-[137.19px] w-[157.938px]" data-name="Table Cell">
      <Text2 />
    </div>
  );
}

function NumberInput2() {
  return (
    <div className="absolute border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[25.6px] items-start justify-center left-[113.21px] overflow-clip px-[4px] py-[2px] rounded-[4px] top-[12.4px] w-[48px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] text-right w-full">1</p>
    </div>
  );
}

function TableCell13() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[50.4px] left-[647.36px] top-[137.19px] w-[177.213px]" data-name="Table Cell">
      <NumberInput2 />
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute h-[20px] left-[16px] top-[15.2px] w-[11.438px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[20px] left-[6.5px] not-italic text-[#d1d5dc] text-[14px] text-center top-[0.6px] whitespace-nowrap">✕</p>
    </div>
  );
}

function TableCell14() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[50.4px] left-[824.58px] top-[137.19px] w-[69.825px]" data-name="Table Cell">
      <Button4 />
    </div>
  );
}

function Table() {
  return (
    <div className="h-[187.988px] overflow-clip relative shrink-0 w-full" data-name="Table">
      <HeaderCell />
      <HeaderCell1 />
      <HeaderCell2 />
      <HeaderCell3 />
      <HeaderCell4 />
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
    </div>
  );
}

function Card1() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col items-start relative rounded-[10px] shrink-0 w-full" data-name="Card">
      <WarehouseOpenJobOrders2 />
      <Table />
    </div>
  );
}

function CardMargin1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-name="Card:margin">
      <Card1 />
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">Warehouse: Hassan Nour · 12 Aug 2026</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#0f2340] content-stretch flex items-center justify-center px-[24px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">✓ Confirm Issue — 4 Items</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex h-[60px] items-center justify-between pt-[16px] relative shrink-0 w-[896px]" data-name="Container">
      <Paragraph8 />
      <Button5 />
    </div>
  );
}

function WarehouseOpenJobOrders() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[896px] relative shrink-0 w-[896px]" data-name="WarehouseOpenJobOrders">
      <Container />
      <CardMargin />
      <CardMargin1 />
      <Container5 />
    </div>
  );
}

function App1() {
  return (
    <div className="content-stretch flex flex-col items-center max-w-[1280px] pb-[40px] pt-[24px] px-[24px] relative shrink-0 w-[970.4px]" data-name="App">
      <WarehouseOpenJobOrders />
    </div>
  );
}

function App() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col h-[688px] items-start pl-[224px] pt-[56px] relative shrink-0 w-[1194.4px]" data-name="App">
      <App1 />
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[28px]" data-name="Container">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[12px] text-[rgba(255,255,255,0.9)] whitespace-nowrap">SA</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="content-stretch flex flex-col h-[15px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">Star Auto Center</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="content-stretch flex flex-col h-[17px] items-start pt-[2px] relative shrink-0 w-[96.563px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.4)] tracking-[0.5px] uppercase whitespace-nowrap">Warehouse</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[96.563px]" data-name="Container">
      <Paragraph9 />
      <Paragraph10 />
    </div>
  );
}

function Container6() {
  return (
    <div className="border-[rgba(255,255,255,0.1)] border-b-[0.8px] border-solid content-stretch flex gap-[10px] items-center p-[20px] relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Container8 />
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">⊞</p>
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Dashboard</p>
    </div>
  );
}

function Button6() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text3 />
      <Text4 />
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">◫</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Open Job Orders</p>
    </div>
  );
}

function Container10() {
  return <div className="bg-[rgba(255,255,255,0.6)] h-[16px] relative rounded-[26843500px] shrink-0 w-[4px]" data-name="Container" />;
}

function ContainerAlign() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-w-px relative" data-name="Container:align">
      <Container10 />
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-full" data-name="Container">
      <Text5 />
      <Text6 />
      <ContainerAlign />
    </div>
  );
}

function Text7() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">▤</p>
    </div>
  );
}

function Text8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Parts</p>
    </div>
  );
}

function Button7() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text7 />
      <Text8 />
    </div>
  );
}

function Text9() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">⬡</p>
    </div>
  );
}

function Text10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Inventory</p>
    </div>
  );
}

function Button8() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text9 />
      <Text10 />
    </div>
  );
}

function Text11() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">⊟</p>
    </div>
  );
}

function Text12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Stock Count</p>
    </div>
  );
}

function Button9() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text11 />
      <Text12 />
    </div>
  );
}

function Text13() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">↕</p>
    </div>
  );
}

function Text14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Movements</p>
    </div>
  );
}

function Button10() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text13 />
      <Text14 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="content-stretch flex flex-[515.413_0_0] flex-col items-start min-h-px overflow-clip py-[16px] relative w-full" data-name="Navigation">
      <Button6 />
      <Container9 />
      <Button7 />
      <Button8 />
      <Button9 />
      <Button10 />
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center relative rounded-[26843500px] shrink-0 size-[28px]" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">HN</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="content-stretch flex flex-col h-[15.988px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.8)] whitespace-nowrap">Hassan Nour</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.35)] tracking-[0.5px] uppercase whitespace-nowrap">Warehouse</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-[146_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Paragraph11 />
      <Paragraph12 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-[184px]" data-name="Container">
      <Container13 />
      <Container14 />
    </div>
  );
}

function ContainerMargin() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[12px] relative shrink-0 w-full" data-name="Container:margin">
      <Container12 />
    </div>
  );
}

function Button11() {
  return (
    <div className="absolute h-[15.988px] left-0 top-[5.6px] w-[184px]" data-name="Button">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.35)] top-0 whitespace-nowrap">→ Sign out</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Button11 />
    </div>
  );
}

function Container11() {
  return (
    <div className="border-[rgba(255,255,255,0.1)] border-solid border-t-[0.8px] content-stretch flex flex-col items-start px-[20px] py-[16px] relative shrink-0 w-full" data-name="Container">
      <ContainerMargin />
      <Container15 />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="absolute bg-[#060f1e] content-stretch flex flex-col h-[688px] items-start left-0 top-0 w-[224px]" data-name="Sidebar">
      <Container6 />
      <Navigation />
      <Container11 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start pr-[16px] relative shrink-0 w-[131px]" data-name="Heading 1">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Open Job Orders</p>
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

function Container16() {
  return (
    <div className="flex-[448_0_0] h-[33.6px] max-w-[448px] min-w-px relative" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[12.24px] not-italic text-[#99a1af] text-[12px] top-[8.8px] whitespace-nowrap">🔍</p>
      <TextInput />
    </div>
  );
}

function Text15() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] text-center whitespace-nowrap">🔔</p>
    </div>
  );
}

function Text16() {
  return <div className="absolute bg-[#fb2c36] border-[0.8px] border-solid border-white left-[20px] rounded-[26843500px] size-[8px] top-[4px]" data-name="Text" />;
}

function Button12() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[26843500px] shrink-0 size-[32px]" data-name="Button">
      <Text15 />
      <Text16 />
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#101828] text-[12px] text-right whitespace-nowrap">Hassan Nour</p>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] capitalize font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[#99a1af] text-[10px] text-right whitespace-nowrap">warehouse</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[74.1px]" data-name="Container">
      <Paragraph13 />
      <Paragraph14 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Button12 />
      <Container18 />
    </div>
  );
}

function ContainerAlign1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-w-px relative" data-name="Container:align">
      <Container17 />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-b-[0.8px] border-solid content-stretch flex gap-[16px] h-[56px] items-center left-[224px] px-[24px] top-0 w-[970.4px]" data-name="Header">
      <Heading />
      <Container16 />
      <ContainerAlign1 />
    </div>
  );
}

function Container19() {
  return <div className="absolute backdrop-blur-[8px] bg-[rgba(0,0,0,0.4)] h-[688px] left-0 top-0 w-[1194px]" data-name="Container" />;
}

function TextInput1() {
  return (
    <div className="absolute bg-white border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[37.6px] items-start justify-center left-0 overflow-clip pl-[36px] pr-[16px] py-[8px] rounded-[6px] top-0 w-[624px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] w-full">Search by name, part number, OEM, brand…</p>
    </div>
  );
}

function SearchInput() {
  return (
    <div className="h-[37.6px] relative shrink-0 w-full" data-name="SearchInput">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[12.11px] not-italic text-[#99a1af] text-[14px] top-[8.8px] whitespace-nowrap">🔍</p>
      <TextInput1 />
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Brake Pad Front — BMW Series 3</p>
    </div>
  );
}

function Code() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Code">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#6a7282] text-[12px] tracking-[0.3px] whitespace-nowrap">BP-BMW-F001</p>
    </div>
  );
}

function Text17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">Brembo</p>
    </div>
  );
}

function Text18() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-start px-[6px] relative rounded-[4px] shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">A-03</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex gap-[12px] h-[18px] items-center pt-[2px] relative shrink-0 w-[523.013px]" data-name="Container">
      <Code />
      <Text17 />
      <Text18 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-[523.013_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Paragraph15 />
      <Container23 />
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#008236] text-[14px] text-right whitespace-nowrap">8</p>
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] text-right whitespace-nowrap">available</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[49.788px]" data-name="Container">
      <Paragraph16 />
      <Paragraph17 />
    </div>
  );
}

function Button13() {
  return (
    <div className="bg-[#eef3fb] border-[#1e3d6b] border-b-[0.8px] border-l-[1.6px] border-solid content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative shrink-0 w-full" data-name="Button">
      <Container22 />
      <Container24 />
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Engine Oil 5W-30 4L</p>
    </div>
  );
}

function Code1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Code">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#6a7282] text-[12px] tracking-[0.3px] whitespace-nowrap">OIL-5W30-4L</p>
    </div>
  );
}

function Text19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">Mobil 1</p>
    </div>
  );
}

function Text20() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-start px-[6px] relative rounded-[4px] shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">B-01</p>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex gap-[12px] h-[18px] items-center pt-[2px] relative shrink-0 w-[524.612px]" data-name="Container">
      <Code1 />
      <Text19 />
      <Text20 />
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-[524.612_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Paragraph18 />
      <Container26 />
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#008236] text-[14px] text-right whitespace-nowrap">42</p>
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] text-right whitespace-nowrap">available</p>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[49.788px]" data-name="Container">
      <Paragraph19 />
      <Paragraph20 />
    </div>
  );
}

function Button14() {
  return (
    <div className="border-[#f9fafb] border-b-[0.8px] border-solid content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative shrink-0 w-full" data-name="Button">
      <Container25 />
      <Container27 />
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Oil Filter — BMW N20</p>
    </div>
  );
}

function Code2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Code">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#6a7282] text-[12px] tracking-[0.3px] whitespace-nowrap">OF-BMW-N20</p>
    </div>
  );
}

function Text21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">Mann Filter</p>
    </div>
  );
}

function Text22() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-start px-[6px] relative rounded-[4px] shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">B-02</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex gap-[12px] h-[18px] items-center pt-[2px] relative shrink-0 w-[524.612px]" data-name="Container">
      <Code2 />
      <Text21 />
      <Text22 />
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-[524.612_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Paragraph21 />
      <Container29 />
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#008236] text-[14px] text-right whitespace-nowrap">12</p>
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] text-right whitespace-nowrap">available</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[49.788px]" data-name="Container">
      <Paragraph22 />
      <Paragraph23 />
    </div>
  );
}

function Button15() {
  return (
    <div className="border-[#f9fafb] border-b-[0.8px] border-solid content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative shrink-0 w-full" data-name="Button">
      <Container28 />
      <Container30 />
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Air Filter — BMW 320i</p>
    </div>
  );
}

function Code3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Code">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#6a7282] text-[12px] tracking-[0.3px] whitespace-nowrap">AF-BMW-320</p>
    </div>
  );
}

function Text23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">Mann Filter</p>
    </div>
  );
}

function Text24() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-start px-[6px] relative rounded-[4px] shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">B-03</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex gap-[12px] h-[18px] items-center pt-[2px] relative shrink-0 w-[524.612px]" data-name="Container">
      <Code3 />
      <Text23 />
      <Text24 />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-[524.612_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Paragraph24 />
      <Container32 />
    </div>
  );
}

function Paragraph25() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#e17100] text-[14px] text-right whitespace-nowrap">5</p>
    </div>
  );
}

function Paragraph26() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] text-right whitespace-nowrap">available</p>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[49.788px]" data-name="Container">
      <Paragraph25 />
      <Paragraph26 />
    </div>
  );
}

function Button16() {
  return (
    <div className="border-[#f9fafb] border-b-[0.8px] border-solid content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative shrink-0 w-full" data-name="Button">
      <Container31 />
      <Container33 />
    </div>
  );
}

function Paragraph27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Spark Plug Iridium</p>
    </div>
  );
}

function Code4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Code">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#6a7282] text-[12px] tracking-[0.3px] whitespace-nowrap">SP-IRD-001</p>
    </div>
  );
}

function Text25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">NGK</p>
    </div>
  );
}

function Text26() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-start px-[6px] relative rounded-[4px] shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">C-01</p>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex gap-[12px] h-[18px] items-center pt-[2px] relative shrink-0 w-[524.612px]" data-name="Container">
      <Code4 />
      <Text25 />
      <Text26 />
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-[524.612_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Paragraph27 />
      <Container35 />
    </div>
  );
}

function Paragraph28() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#e17100] text-[14px] text-right whitespace-nowrap">2</p>
    </div>
  );
}

function Paragraph29() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] text-right whitespace-nowrap">available</p>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[49.788px]" data-name="Container">
      <Paragraph28 />
      <Paragraph29 />
    </div>
  );
}

function Button17() {
  return (
    <div className="border-[#f9fafb] border-b-[0.8px] border-solid content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative shrink-0 w-full" data-name="Button">
      <Container34 />
      <Container36 />
    </div>
  );
}

function Paragraph30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Brake Disc Front — Toyota Corolla</p>
    </div>
  );
}

function Code5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Code">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#6a7282] text-[12px] tracking-[0.3px] whitespace-nowrap">BD-TOY-F001</p>
    </div>
  );
}

function Text27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">Brembo</p>
    </div>
  );
}

function Text28() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-start px-[6px] relative rounded-[4px] shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">A-05</p>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex gap-[12px] h-[18px] items-center pt-[2px] relative shrink-0 w-[524.612px]" data-name="Container">
      <Code5 />
      <Text27 />
      <Text28 />
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-[524.612_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Paragraph30 />
      <Container38 />
    </div>
  );
}

function Paragraph31() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#e17100] text-[14px] text-right whitespace-nowrap">4</p>
    </div>
  );
}

function Paragraph32() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] text-right whitespace-nowrap">available</p>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[49.788px]" data-name="Container">
      <Paragraph31 />
      <Paragraph32 />
    </div>
  );
}

function Button18() {
  return (
    <div className="border-[#f9fafb] border-b-[0.8px] border-solid content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative shrink-0 w-full" data-name="Button">
      <Container37 />
      <Container39 />
    </div>
  );
}

function Paragraph33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Engine Oil 0W-20 4L</p>
    </div>
  );
}

function Code6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Code">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#6a7282] text-[12px] tracking-[0.3px] whitespace-nowrap">OIL-0W20-4L</p>
    </div>
  );
}

function Text29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">Toyota Genuine</p>
    </div>
  );
}

function Text30() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-start px-[6px] relative rounded-[4px] shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">B-04</p>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex gap-[12px] h-[18px] items-center pt-[2px] relative shrink-0 w-[524.612px]" data-name="Container">
      <Code6 />
      <Text29 />
      <Text30 />
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-[524.612_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Paragraph33 />
      <Container41 />
    </div>
  );
}

function Paragraph34() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#008236] text-[14px] text-right whitespace-nowrap">18</p>
    </div>
  );
}

function Paragraph35() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] text-right whitespace-nowrap">available</p>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[49.788px]" data-name="Container">
      <Paragraph34 />
      <Paragraph35 />
    </div>
  );
}

function Button19() {
  return (
    <div className="border-[#f9fafb] border-b-[0.8px] border-solid content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative shrink-0 w-full" data-name="Button">
      <Container40 />
      <Container42 />
    </div>
  );
}

function Paragraph36() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Coolant Ready-Mix 1L</p>
    </div>
  );
}

function Code7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Code">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#6a7282] text-[12px] tracking-[0.3px] whitespace-nowrap">COO-RM-001</p>
    </div>
  );
}

function Text31() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">Prestone</p>
    </div>
  );
}

function Text32() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-start px-[6px] relative rounded-[4px] shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">D-01</p>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex gap-[12px] h-[18px] items-center pt-[2px] relative shrink-0 w-[524.612px]" data-name="Container">
      <Code7 />
      <Text31 />
      <Text32 />
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-[524.612_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Paragraph36 />
      <Container44 />
    </div>
  );
}

function Paragraph37() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#e7000b] text-[14px] text-right whitespace-nowrap">0</p>
    </div>
  );
}

function Paragraph38() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] text-right whitespace-nowrap">available</p>
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[49.788px]" data-name="Container">
      <Paragraph37 />
      <Paragraph38 />
    </div>
  );
}

function Button20() {
  return (
    <div className="border-[#f9fafb] border-b-[0.8px] border-solid content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative shrink-0 w-full" data-name="Button">
      <Container43 />
      <Container45 />
    </div>
  );
}

function Paragraph39() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Brake Fluid DOT4 500ml</p>
    </div>
  );
}

function Code8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Code">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#6a7282] text-[12px] tracking-[0.3px] whitespace-nowrap">BF-DOT4-500</p>
    </div>
  );
}

function Text33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">ATE</p>
    </div>
  );
}

function Text34() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-start px-[6px] relative rounded-[4px] shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">D-02</p>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex gap-[12px] h-[18px] items-center pt-[2px] relative shrink-0 w-[524.612px]" data-name="Container">
      <Code8 />
      <Text33 />
      <Text34 />
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-[524.612_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Paragraph39 />
      <Container47 />
    </div>
  );
}

function Paragraph40() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#008236] text-[14px] text-right whitespace-nowrap">7</p>
    </div>
  );
}

function Paragraph41() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] text-right whitespace-nowrap">available</p>
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[49.788px]" data-name="Container">
      <Paragraph40 />
      <Paragraph41 />
    </div>
  );
}

function Button21() {
  return (
    <div className="border-[#f9fafb] border-b-[0.8px] border-solid content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative shrink-0 w-full" data-name="Button">
      <Container46 />
      <Container48 />
    </div>
  );
}

function Paragraph42() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Serpentine Belt — Hyundai Elantra</p>
    </div>
  );
}

function Code9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Code">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#6a7282] text-[12px] tracking-[0.3px] whitespace-nowrap">SB-HYU-001</p>
    </div>
  );
}

function Text35() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">Gates</p>
    </div>
  );
}

function Text36() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-start px-[6px] relative rounded-[4px] shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">E-01</p>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex gap-[12px] h-[18px] items-center pt-[2px] relative shrink-0 w-[524.612px]" data-name="Container">
      <Code9 />
      <Text35 />
      <Text36 />
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-[524.612_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Paragraph42 />
      <Container50 />
    </div>
  );
}

function Paragraph43() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#e17100] text-[14px] text-right whitespace-nowrap">3</p>
    </div>
  );
}

function Paragraph44() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] text-right whitespace-nowrap">available</p>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[49.788px]" data-name="Container">
      <Paragraph43 />
      <Paragraph44 />
    </div>
  );
}

function Button22() {
  return (
    <div className="border-[#f9fafb] border-b-[0.8px] border-solid content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative shrink-0 w-full" data-name="Button">
      <Container49 />
      <Container51 />
    </div>
  );
}

function Paragraph45() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Cabin Air Filter — Mercedes C200</p>
    </div>
  );
}

function Code10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Code">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#6a7282] text-[12px] tracking-[0.3px] whitespace-nowrap">CAF-MER-001</p>
    </div>
  );
}

function Text37() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">Mann Filter</p>
    </div>
  );
}

function Text38() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-start px-[6px] relative rounded-[4px] shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">B-05</p>
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex gap-[12px] h-[18px] items-center pt-[2px] relative shrink-0 w-[524.612px]" data-name="Container">
      <Code10 />
      <Text37 />
      <Text38 />
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-[524.612_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Paragraph45 />
      <Container53 />
    </div>
  );
}

function Paragraph46() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#008236] text-[14px] text-right whitespace-nowrap">6</p>
    </div>
  );
}

function Paragraph47() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] text-right whitespace-nowrap">available</p>
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[49.788px]" data-name="Container">
      <Paragraph46 />
      <Paragraph47 />
    </div>
  );
}

function Button23() {
  return (
    <div className="border-[#f9fafb] border-b-[0.8px] border-solid content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative shrink-0 w-full" data-name="Button">
      <Container52 />
      <Container54 />
    </div>
  );
}

function Paragraph48() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">{`Wiper Blade Set 24"+16"`}</p>
    </div>
  );
}

function Code11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Code">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#6a7282] text-[12px] tracking-[0.3px] whitespace-nowrap">WB-SET-2416</p>
    </div>
  );
}

function Text39() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">Bosch</p>
    </div>
  );
}

function Text40() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-start px-[6px] relative rounded-[4px] shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">F-01</p>
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex gap-[12px] h-[18px] items-center pt-[2px] relative shrink-0 w-[524.612px]" data-name="Container">
      <Code11 />
      <Text39 />
      <Text40 />
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-[524.612_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Paragraph48 />
      <Container56 />
    </div>
  );
}

function Paragraph49() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#008236] text-[14px] text-right whitespace-nowrap">9</p>
    </div>
  );
}

function Paragraph50() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] text-right whitespace-nowrap">available</p>
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[49.788px]" data-name="Container">
      <Paragraph49 />
      <Paragraph50 />
    </div>
  );
}

function Button24() {
  return (
    <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative shrink-0 w-full" data-name="Button">
      <Container55 />
      <Container57 />
    </div>
  );
}

function Container21() {
  return (
    <div className="border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[288px] items-start max-h-[288px] overflow-clip relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <Button13 />
      <Button14 />
      <Button15 />
      <Button16 />
      <Button17 />
      <Button18 />
      <Button19 />
      <Button20 />
      <Button21 />
      <Button22 />
      <Button23 />
      <Button24 />
    </div>
  );
}

function ContainerMargin1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-name="Container:margin">
      <Container21 />
    </div>
  );
}

function Paragraph51() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#1e3d6b] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">Selected Part</p>
    </div>
  );
}

function Paragraph52() {
  return (
    <div className="content-stretch flex flex-col h-[32px] items-start pt-[8px] relative shrink-0 w-[590.4px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#0f2340] text-[16px] whitespace-nowrap">Brake Pad Front — BMW Series 3</p>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start pb-[4px] relative shrink-0 w-[95.575px]" data-name="Label">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#254e87] text-[12px] whitespace-nowrap">Quantity to Issue</p>
    </div>
  );
}

function NumberInput3() {
  return (
    <div className="absolute border-[#111827] border-[0.8px] border-solid content-stretch flex flex-col h-[33.6px] items-start justify-center left-0 overflow-clip px-[8px] py-[6px] rounded-[6px] top-0 w-[80px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] text-center w-full">1</p>
    </div>
  );
}

function Container61() {
  return (
    <div className="h-[33.6px] relative shrink-0 w-full" data-name="Container">
      <NumberInput3 />
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[95.575px]" data-name="Container">
      <Label />
      <Container61 />
    </div>
  );
}

function Paragraph53() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#254e87] text-[0px] whitespace-nowrap">
        <span className="leading-[16px] text-[12px]">{`Available: `}</span>
        <span className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] text-[12px]">8</span>
      </p>
    </div>
  );
}

function Paragraph54() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#254e87] text-[0px] whitespace-nowrap">
        <span className="leading-[16px] text-[12px]">{`Location: `}</span>
        <span className="font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[16px] text-[12px]">A-03</span>
      </p>
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[84.45px]" data-name="Container">
      <Paragraph53 />
      <Paragraph54 />
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Container60 />
      <Container62 />
    </div>
  );
}

function ContainerMargin3() {
  return (
    <div className="content-stretch flex flex-col items-center pt-[12px] relative shrink-0 w-full" data-name="Container:margin">
      <Container59 />
    </div>
  );
}

function Container58() {
  return (
    <div className="bg-[#eef3fb] border-[#111827] border-[0.8px] border-solid content-stretch flex flex-col items-start p-[16px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <Paragraph51 />
      <Paragraph52 />
      <ContainerMargin3 />
    </div>
  );
}

function ContainerMargin2() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-name="Container:margin">
      <Container58 />
    </div>
  );
}

function Button25() {
  return (
    <div className="bg-[#0f2340] content-stretch flex flex-[531.925_0_0] h-full items-center justify-center min-w-px px-[16px] py-[8px] relative rounded-[4px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">Add to Job</p>
    </div>
  );
}

function Button26() {
  return (
    <div className="bg-white border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex h-full items-center justify-center px-[16px] py-[8px] relative rounded-[4px] shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] text-center whitespace-nowrap">Cancel</p>
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex gap-[12px] h-[61.6px] items-start pt-[24px] relative shrink-0 w-full" data-name="Container">
      <Button25 />
      <Button26 />
    </div>
  );
}

function WarehouseOpenJobOrders3() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[20px] relative shrink-0 w-[672px]" data-name="WarehouseOpenJobOrders">
      <SearchInput />
      <ContainerMargin1 />
      <ContainerMargin2 />
      <Container63 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 3">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Add Part to Job</p>
    </div>
  );
}

function Button27() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#99a1af] text-[18px] text-center whitespace-nowrap">×</p>
    </div>
  );
}

function Container64() {
  return (
    <div className="border-[#f3f4f6] border-b-[0.8px] border-solid content-stretch flex items-center justify-between px-[24px] py-[16px] relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Button27 />
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[619px] items-start left-[261px] max-h-[619.2000122070312px] max-w-[672px] overflow-clip rounded-[12px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] top-[34px] w-[672px]" data-name="Container">
      <WarehouseOpenJobOrders3 />
      <Container64 />
    </div>
  );
}

export default function CreateAppDesign() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-start relative size-full" data-name="Create app design">
      <App />
      <Sidebar />
      <Header />
      <Container19 />
      <Container20 />
    </div>
  );
}