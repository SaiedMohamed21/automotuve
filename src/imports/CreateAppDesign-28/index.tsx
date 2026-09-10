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
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-0 top-0 w-[359.837px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Part Name</p>
    </div>
  );
}

function HeaderCell1() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[359.84px] top-0 w-[177.15px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Part Number</p>
    </div>
  );
}

function HeaderCell2() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[676.38px] top-0 w-[156.387px]" data-name="Header Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[141.13px] not-italic text-[#6a7282] text-[12px] text-right top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Qty Issued</p>
    </div>
  );
}

function HeaderCell3() {
  return <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[832.76px] top-0 w-[61.638px]" data-name="Header Cell" />;
}

function TableCell() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[50.4px] left-0 top-[36.39px] w-[359.837px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[15.8px] whitespace-nowrap">Engine Oil 5W-30 4L</p>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[50.4px] left-[359.84px] top-[36.39px] w-[177.15px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#364153] text-[12px] top-[17.2px] whitespace-nowrap">OIL-5W30-4L</p>
    </div>
  );
}

function NumberInput() {
  return (
    <div className="absolute border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[25.6px] items-start justify-center left-[92.39px] overflow-clip px-[4px] py-[2px] rounded-[4px] top-[12.4px] w-[48px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] text-right w-full">2</p>
    </div>
  );
}

function TableCell2() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[50.4px] left-[676.38px] top-[36.39px] w-[156.387px]" data-name="Table Cell">
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

function TableCell3() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[50.4px] left-[832.76px] top-[36.39px] w-[61.638px]" data-name="Table Cell">
      <Button2 />
    </div>
  );
}

function TableCell4() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[50.4px] left-0 top-[86.79px] w-[359.837px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[15.8px] whitespace-nowrap">Oil Filter — BMW N20</p>
    </div>
  );
}

function TableCell5() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[50.4px] left-[359.84px] top-[86.79px] w-[177.15px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#364153] text-[12px] top-[17.2px] whitespace-nowrap">OF-BMW-N20</p>
    </div>
  );
}

function NumberInput1() {
  return (
    <div className="absolute border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[25.6px] items-start justify-center left-[92.39px] overflow-clip px-[4px] py-[2px] rounded-[4px] top-[12.4px] w-[48px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] text-right w-full">1</p>
    </div>
  );
}

function TableCell6() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[50.4px] left-[676.38px] top-[86.79px] w-[156.387px]" data-name="Table Cell">
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

function TableCell7() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[50.4px] left-[832.76px] top-[86.79px] w-[61.638px]" data-name="Table Cell">
      <Button3 />
    </div>
  );
}

function TableCell8() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[50.4px] left-0 top-[137.19px] w-[359.837px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[15.8px] whitespace-nowrap">Air Filter — BMW 320i</p>
    </div>
  );
}

function TableCell9() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[50.4px] left-[359.84px] top-[137.19px] w-[177.15px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#364153] text-[12px] top-[17.2px] whitespace-nowrap">AF-BMW-320</p>
    </div>
  );
}

function NumberInput2() {
  return (
    <div className="absolute border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[25.6px] items-start justify-center left-[92.39px] overflow-clip px-[4px] py-[2px] rounded-[4px] top-[12.4px] w-[48px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] text-right w-full">1</p>
    </div>
  );
}

function TableCell10() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[50.4px] left-[676.38px] top-[137.19px] w-[156.387px]" data-name="Table Cell">
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

function TableCell11() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[50.4px] left-[832.76px] top-[137.19px] w-[61.638px]" data-name="Table Cell">
      <Button4 />
    </div>
  );
}

function TableCell12() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[50.4px] left-0 top-[187.59px] w-[359.837px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[15.8px] whitespace-nowrap">Brake Pad Front — BMW Series 3</p>
    </div>
  );
}

function TableCell13() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[50.4px] left-[359.84px] top-[187.59px] w-[177.15px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#364153] text-[12px] top-[17.2px] whitespace-nowrap">BP-BMW-F001</p>
    </div>
  );
}

function NumberInput3() {
  return (
    <div className="absolute border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[25.6px] items-start justify-center left-[92.39px] overflow-clip px-[4px] py-[2px] rounded-[4px] top-[12.4px] w-[48px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] text-right w-full">1</p>
    </div>
  );
}

function TableCell14() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[50.4px] left-[676.38px] top-[187.59px] w-[156.387px]" data-name="Table Cell">
      <NumberInput3 />
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute h-[20px] left-[16px] top-[15.2px] w-[11.438px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[20px] left-[6.5px] not-italic text-[#d1d5dc] text-[14px] text-center top-[0.6px] whitespace-nowrap">✕</p>
    </div>
  );
}

function TableCell15() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[50.4px] left-[832.76px] top-[187.59px] w-[61.638px]" data-name="Table Cell">
      <Button5 />
    </div>
  );
}

function Table() {
  return (
    <div className="h-[238.387px] overflow-clip relative shrink-0 w-full" data-name="Table">
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

function Container5() {
  return (
    <div className="bg-[#00a63e] content-stretch flex items-center justify-center relative rounded-[26843500px] shrink-0 size-[32px]" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">✓</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#0d542b] text-[16px] whitespace-nowrap">Stock Updated Successfully</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#008236] text-[14px] whitespace-nowrap">5 items issued to JO-2026-00125. Inventory updated.</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[353.725px]" data-name="Container">
      <Paragraph8 />
      <Paragraph9 />
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-white border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex items-center justify-center px-[12px] py-[6px] relative rounded-[4px] shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-center whitespace-nowrap">Print Issue Doc</p>
    </div>
  );
}

function ButtonAlign() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-w-px relative" data-name="Button:align">
      <Button6 />
    </div>
  );
}

function WarehouseOpenJobOrders3() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="WarehouseOpenJobOrders">
      <Container5 />
      <Container6 />
      <ButtonAlign />
    </div>
  );
}

function Card2() {
  return (
    <div className="bg-white border-[#b9f8cf] border-[0.8px] border-solid content-stretch flex flex-col items-start p-[20px] relative rounded-[10px] shrink-0 w-full" data-name="Card">
      <WarehouseOpenJobOrders3 />
    </div>
  );
}

function CardMargin2() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-name="Card:margin">
      <Card2 />
    </div>
  );
}

function WarehouseOpenJobOrders() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[896px] relative shrink-0 w-[896px]" data-name="WarehouseOpenJobOrders">
      <Container />
      <CardMargin />
      <CardMargin1 />
      <CardMargin2 />
    </div>
  );
}

function App1() {
  return (
    <div className="content-stretch flex flex-col items-center max-w-[1280px] p-[24px] relative shrink-0 w-[970.4px]" data-name="App">
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

function Container8() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[28px]" data-name="Container">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[12px] text-[rgba(255,255,255,0.9)] whitespace-nowrap">SA</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="content-stretch flex flex-col h-[15px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">Star Auto Center</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="content-stretch flex flex-col h-[17px] items-start pt-[2px] relative shrink-0 w-[96.563px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.4)] tracking-[0.5px] uppercase whitespace-nowrap">Warehouse</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[96.563px]" data-name="Container">
      <Paragraph10 />
      <Paragraph11 />
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

function Text() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">⊞</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Dashboard</p>
    </div>
  );
}

function Button7() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text />
      <Text1 />
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">◫</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Open Job Orders</p>
    </div>
  );
}

function Container11() {
  return <div className="bg-[rgba(255,255,255,0.6)] h-[16px] relative rounded-[26843500px] shrink-0 w-[4px]" data-name="Container" />;
}

function ContainerAlign() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-w-px relative" data-name="Container:align">
      <Container11 />
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-full" data-name="Container">
      <Text2 />
      <Text3 />
      <ContainerAlign />
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">▤</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Parts</p>
    </div>
  );
}

function Button8() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text4 />
      <Text5 />
    </div>
  );
}

function Text6() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">⊟</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Stock Update</p>
    </div>
  );
}

function Button9() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text6 />
      <Text7 />
    </div>
  );
}

function Text8() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">↕</p>
    </div>
  );
}

function Text9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Movements</p>
    </div>
  );
}

function Button10() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text8 />
      <Text9 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="content-stretch flex flex-[515.413_0_0] flex-col items-start min-h-px overflow-clip py-[16px] relative w-full" data-name="Navigation">
      <Button7 />
      <Container10 />
      <Button8 />
      <Button9 />
      <Button10 />
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center relative rounded-[26843500px] shrink-0 size-[28px]" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">HN</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="content-stretch flex flex-col h-[15.988px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.8)] whitespace-nowrap">Hassan Nour</p>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.35)] tracking-[0.5px] uppercase whitespace-nowrap">Warehouse</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-[146_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Paragraph12 />
      <Paragraph13 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-[184px]" data-name="Container">
      <Container14 />
      <Container15 />
    </div>
  );
}

function ContainerMargin() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[12px] relative shrink-0 w-full" data-name="Container:margin">
      <Container13 />
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

function Container16() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Button11 />
    </div>
  );
}

function Container12() {
  return (
    <div className="border-[rgba(255,255,255,0.1)] border-solid border-t-[0.8px] content-stretch flex flex-col items-start px-[20px] py-[16px] relative shrink-0 w-full" data-name="Container">
      <ContainerMargin />
      <Container16 />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="absolute bg-[#060f1e] content-stretch flex flex-col h-[688px] items-start left-0 top-0 w-[224px]" data-name="Sidebar">
      <Container7 />
      <Navigation />
      <Container12 />
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

function Text10() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] text-center whitespace-nowrap">🔔</p>
    </div>
  );
}

function Text11() {
  return <div className="absolute bg-[#fb2c36] border-[0.8px] border-solid border-white left-[20px] rounded-[26843500px] size-[8px] top-[4px]" data-name="Text" />;
}

function Button12() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[26843500px] shrink-0 size-[32px]" data-name="Button">
      <Text10 />
      <Text11 />
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#101828] text-[12px] text-right whitespace-nowrap">Hassan Nour</p>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] capitalize font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[#99a1af] text-[10px] text-right whitespace-nowrap">warehouse</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[74.1px]" data-name="Container">
      <Paragraph14 />
      <Paragraph15 />
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
      <ContainerAlign1 />
    </div>
  );
}

export default function CreateAppDesign() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-start relative size-full" data-name="Create app design">
      <App />
      <Sidebar />
      <Header />
    </div>
  );
}