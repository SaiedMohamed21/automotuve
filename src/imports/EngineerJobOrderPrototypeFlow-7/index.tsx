function App() {
  return <div className="bg-[#f3f4f6] h-[606.4px] relative shrink-0 w-[1195.2px]" data-name="App" />;
}

function TextInput() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-[366.837_0_0] flex-col h-[40px] items-start justify-center max-w-[400px] min-w-px overflow-clip px-[16px] relative rounded-[8px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] w-full">Search by part name, number, SKU, brand...</p>
    </div>
  );
}

function Container2() {
  return <div className="flex-[333.238_0_0] h-0 min-w-px relative" data-name="Container" />;
}

function Button() {
  return (
    <div className="bg-[#0f2340] content-stretch flex flex-col h-[40px] items-center justify-center px-[20px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">✓ Saved</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#0f2340] content-stretch flex flex-col h-[40px] items-center justify-center px-[20px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">+ Add New Part</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-[979.2px]" data-name="Container">
      <TextInput />
      <Container2 />
      <Button />
      <Button1 />
    </div>
  );
}

function TableRow() {
  return (
    <div className="[word-break:break-word] absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid font-['Inter:Semi_Bold',sans-serif] font-semibold h-[40.9px] leading-[16.5px] left-0 not-italic text-[#6a7282] text-[11px] top-0 tracking-[0.6px] uppercase w-[977.6px] whitespace-nowrap" data-name="Table Row">
      <p className="absolute left-[16px] top-[12.6px]">Part Name</p>
      <p className="absolute left-[387.34px] top-[12.6px]">Part Number</p>
      <p className="-translate-x-full absolute left-[678.16px] text-right top-[12.6px]">System Qty</p>
      <p className="-translate-x-full absolute left-[837.76px] text-right top-[12.6px]">Add Qty</p>
      <p className="-translate-x-full absolute left-[962.56px] text-right top-[12.6px]">New Qty</p>
    </div>
  );
}

function TableCell() {
  return (
    <div className="[word-break:break-word] absolute h-[71.8px] left-0 not-italic top-0 w-[371.337px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] text-[#101828] text-[14px] top-[16.4px]">Brake Pad Front — BMW Series 3</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[16px] text-[#99a1af] text-[12px] top-[37.4px]">Brembo</p>
    </div>
  );
}

function NumberInput() {
  return (
    <div className="border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[32px] items-start justify-center overflow-clip px-[8px] relative rounded-[4px] shrink-0 w-[80px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(54,65,83,0.5)] text-right w-full">—</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex flex-col items-end left-[710.04px] top-[19.9px] w-[126.75px]" data-name="Container">
      <NumberInput />
    </div>
  );
}

function TableRow1() {
  return (
    <div className="absolute border-[#f3f4f6] border-b-[0.8px] border-solid h-[71.8px] left-0 top-[40.9px] w-[977.6px]" data-name="Table Row">
      <TableCell />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[19.5px] left-[387.34px] text-[#364153] text-[13px] top-[25.95px] whitespace-nowrap">BP-BMW-F001</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[678.95px] not-italic text-[#364153] text-[14px] text-right top-[25px] whitespace-nowrap">13</p>
      <Container4 />
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[961.6px] not-italic text-[#d1d5dc] text-[16px] text-right top-[21.7px] whitespace-nowrap">—</p>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="[word-break:break-word] absolute h-[71.8px] left-0 not-italic top-0 w-[371.337px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] text-[#101828] text-[14px] top-[16.4px]">Engine Oil 5W-30 4L</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[16px] text-[#99a1af] text-[12px] top-[37.4px]">Mobil 1</p>
    </div>
  );
}

function NumberInput1() {
  return (
    <div className="border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[32px] items-start justify-center overflow-clip px-[8px] relative rounded-[4px] shrink-0 w-[80px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(54,65,83,0.5)] text-right w-full">—</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col items-end left-[710.04px] top-[19.9px] w-[126.75px]" data-name="Container">
      <NumberInput1 />
    </div>
  );
}

function TableRow2() {
  return (
    <div className="absolute border-[#f3f4f6] border-b-[0.8px] border-solid h-[71.8px] left-0 top-[112.7px] w-[977.6px]" data-name="Table Row">
      <TableCell1 />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[19.5px] left-[387.34px] text-[#364153] text-[13px] top-[25.95px] whitespace-nowrap">OIL-5W30-4L</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[678.73px] not-italic text-[#364153] text-[14px] text-right top-[25px] whitespace-nowrap">42</p>
      <Container5 />
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[961.6px] not-italic text-[#d1d5dc] text-[16px] text-right top-[21.7px] whitespace-nowrap">—</p>
    </div>
  );
}

function TableCell2() {
  return (
    <div className="[word-break:break-word] absolute h-[71.8px] left-0 not-italic top-0 w-[371.337px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] text-[#101828] text-[14px] top-[16.4px]">Oil Filter — BMW N20</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[16px] text-[#99a1af] text-[12px] top-[37.4px]">Mann Filter</p>
    </div>
  );
}

function NumberInput2() {
  return (
    <div className="border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[32px] items-start justify-center overflow-clip px-[8px] relative rounded-[4px] shrink-0 w-[80px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(54,65,83,0.5)] text-right w-full">—</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex flex-col items-end left-[710.04px] top-[19.9px] w-[126.75px]" data-name="Container">
      <NumberInput2 />
    </div>
  );
}

function TableRow3() {
  return (
    <div className="absolute border-[#f3f4f6] border-b-[0.8px] border-solid h-[71.8px] left-0 top-[184.5px] w-[977.6px]" data-name="Table Row">
      <TableCell2 />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[19.5px] left-[387.34px] text-[#364153] text-[13px] top-[25.95px] whitespace-nowrap">OF-BMW-N20</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[678.36px] not-italic text-[#364153] text-[14px] text-right top-[25px] whitespace-nowrap">12</p>
      <Container6 />
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[961.6px] not-italic text-[#d1d5dc] text-[16px] text-right top-[21.7px] whitespace-nowrap">—</p>
    </div>
  );
}

function TableCell3() {
  return (
    <div className="[word-break:break-word] absolute h-[71.8px] left-0 not-italic top-0 w-[371.337px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] text-[#101828] text-[14px] top-[16.4px]">Air Filter — BMW 320i</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[16px] text-[#99a1af] text-[12px] top-[37.4px]">Mann Filter</p>
    </div>
  );
}

function NumberInput3() {
  return (
    <div className="border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[32px] items-start justify-center overflow-clip px-[8px] relative rounded-[4px] shrink-0 w-[80px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(54,65,83,0.5)] text-right w-full">—</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col items-end left-[710.04px] top-[19.9px] w-[126.75px]" data-name="Container">
      <NumberInput3 />
    </div>
  );
}

function TableRow4() {
  return (
    <div className="absolute border-[#f3f4f6] border-b-[0.8px] border-solid h-[71.8px] left-0 top-[256.3px] w-[977.6px]" data-name="Table Row">
      <TableCell3 />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[19.5px] left-[387.34px] text-[#364153] text-[13px] top-[25.95px] whitespace-nowrap">AF-BMW-320</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[679.01px] not-italic text-[#364153] text-[14px] text-right top-[25px] whitespace-nowrap">5</p>
      <Container7 />
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[961.6px] not-italic text-[#d1d5dc] text-[16px] text-right top-[21.7px] whitespace-nowrap">—</p>
    </div>
  );
}

function TableCell4() {
  return (
    <div className="[word-break:break-word] absolute h-[71.8px] left-0 not-italic top-0 w-[371.337px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] text-[#101828] text-[14px] top-[16.4px]">Spark Plug Iridium</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[16px] text-[#99a1af] text-[12px] top-[37.4px]">NGK</p>
    </div>
  );
}

function NumberInput4() {
  return (
    <div className="border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[32px] items-start justify-center overflow-clip px-[8px] relative rounded-[4px] shrink-0 w-[80px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(54,65,83,0.5)] text-right w-full">—</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col items-end left-[710.04px] top-[19.9px] w-[126.75px]" data-name="Container">
      <NumberInput4 />
    </div>
  );
}

function TableRow5() {
  return (
    <div className="absolute border-[#f3f4f6] border-b-[0.8px] border-solid h-[71.8px] left-0 top-[328.1px] w-[977.6px]" data-name="Table Row">
      <TableCell4 />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[19.5px] left-[387.34px] text-[#364153] text-[13px] top-[25.95px] whitespace-nowrap">SP-IRD-001</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[678.21px] not-italic text-[#364153] text-[14px] text-right top-[25px] whitespace-nowrap">2</p>
      <Container8 />
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[961.6px] not-italic text-[#d1d5dc] text-[16px] text-right top-[21.7px] whitespace-nowrap">—</p>
    </div>
  );
}

function TableCell5() {
  return (
    <div className="[word-break:break-word] absolute h-[71.8px] left-0 not-italic top-0 w-[371.337px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] text-[#101828] text-[14px] top-[16.4px]">Brake Disc Front — Toyota Corolla</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[16px] text-[#99a1af] text-[12px] top-[37.4px]">Brembo</p>
    </div>
  );
}

function NumberInput5() {
  return (
    <div className="border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[32px] items-start justify-center overflow-clip px-[8px] relative rounded-[4px] shrink-0 w-[80px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(54,65,83,0.5)] text-right w-full">—</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col items-end left-[710.04px] top-[19.9px] w-[126.75px]" data-name="Container">
      <NumberInput5 />
    </div>
  );
}

function TableRow6() {
  return (
    <div className="absolute border-[#f3f4f6] border-b-[0.8px] border-solid h-[71.8px] left-0 top-[399.9px] w-[977.6px]" data-name="Table Row">
      <TableCell5 />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[19.5px] left-[387.34px] text-[#364153] text-[13px] top-[25.95px] whitespace-nowrap">BD-TOY-F001</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[678.54px] not-italic text-[#364153] text-[14px] text-right top-[25px] whitespace-nowrap">4</p>
      <Container9 />
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[961.6px] not-italic text-[#d1d5dc] text-[16px] text-right top-[21.7px] whitespace-nowrap">—</p>
    </div>
  );
}

function TableCell6() {
  return (
    <div className="[word-break:break-word] absolute h-[71.8px] left-0 not-italic top-0 w-[371.337px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] text-[#101828] text-[14px] top-[16.4px]">Engine Oil 0W-20 4L</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[16px] text-[#99a1af] text-[12px] top-[37.4px]">Toyota Genuine</p>
    </div>
  );
}

function NumberInput6() {
  return (
    <div className="border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[32px] items-start justify-center overflow-clip px-[8px] relative rounded-[4px] shrink-0 w-[80px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(54,65,83,0.5)] text-right w-full">—</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex flex-col items-end left-[710.04px] top-[19.9px] w-[126.75px]" data-name="Container">
      <NumberInput6 />
    </div>
  );
}

function TableRow7() {
  return (
    <div className="absolute border-[#f3f4f6] border-b-[0.8px] border-solid h-[71.8px] left-0 top-[471.7px] w-[977.6px]" data-name="Table Row">
      <TableCell6 />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[19.5px] left-[387.34px] text-[#364153] text-[13px] top-[25.95px] whitespace-nowrap">OIL-0W20-4L</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[678.93px] not-italic text-[#364153] text-[14px] text-right top-[25px] whitespace-nowrap">18</p>
      <Container10 />
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[961.6px] not-italic text-[#d1d5dc] text-[16px] text-right top-[21.7px] whitespace-nowrap">—</p>
    </div>
  );
}

function TableCell7() {
  return (
    <div className="[word-break:break-word] absolute h-[71.8px] left-0 not-italic top-0 w-[371.337px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] text-[#101828] text-[14px] top-[16.4px]">Coolant Ready-Mix 1L</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[16px] text-[#99a1af] text-[12px] top-[37.4px]">Prestone</p>
    </div>
  );
}

function NumberInput7() {
  return (
    <div className="border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[32px] items-start justify-center overflow-clip px-[8px] relative rounded-[4px] shrink-0 w-[80px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(54,65,83,0.5)] text-right w-full">—</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col items-end left-[710.04px] top-[19.9px] w-[126.75px]" data-name="Container">
      <NumberInput7 />
    </div>
  );
}

function TableRow8() {
  return (
    <div className="absolute border-[#f3f4f6] border-b-[0.8px] border-solid h-[71.8px] left-0 top-[543.5px] w-[977.6px]" data-name="Table Row">
      <TableCell7 />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[19.5px] left-[387.34px] text-[#364153] text-[13px] top-[25.95px] whitespace-nowrap">COO-RM-001</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[678.4px] not-italic text-[#364153] text-[14px] text-right top-[25px] whitespace-nowrap">0</p>
      <Container11 />
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[961.6px] not-italic text-[#d1d5dc] text-[16px] text-right top-[21.7px] whitespace-nowrap">—</p>
    </div>
  );
}

function TableCell8() {
  return (
    <div className="[word-break:break-word] absolute h-[71.8px] left-0 not-italic top-0 w-[371.337px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] text-[#101828] text-[14px] top-[16.4px]">Brake Fluid DOT4 500ml</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[16px] text-[#99a1af] text-[12px] top-[37.4px]">ATE</p>
    </div>
  );
}

function NumberInput8() {
  return (
    <div className="border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[32px] items-start justify-center overflow-clip px-[8px] relative rounded-[4px] shrink-0 w-[80px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(54,65,83,0.5)] text-right w-full">—</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex flex-col items-end left-[710.04px] top-[19.9px] w-[126.75px]" data-name="Container">
      <NumberInput8 />
    </div>
  );
}

function TableRow9() {
  return (
    <div className="absolute border-[#f3f4f6] border-b-[0.8px] border-solid h-[71.8px] left-0 top-[615.3px] w-[977.6px]" data-name="Table Row">
      <TableCell8 />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[19.5px] left-[387.34px] text-[#364153] text-[13px] top-[25.95px] whitespace-nowrap">BF-DOT4-500</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[678.7px] not-italic text-[#364153] text-[14px] text-right top-[25px] whitespace-nowrap">7</p>
      <Container12 />
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[961.6px] not-italic text-[#d1d5dc] text-[16px] text-right top-[21.7px] whitespace-nowrap">—</p>
    </div>
  );
}

function TableCell9() {
  return (
    <div className="[word-break:break-word] absolute h-[71.8px] left-0 not-italic top-0 w-[371.337px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] text-[#101828] text-[14px] top-[16.4px]">Serpentine Belt — Hyundai Elantra</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[16px] text-[#99a1af] text-[12px] top-[37.4px]">Gates</p>
    </div>
  );
}

function NumberInput9() {
  return (
    <div className="border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[32px] items-start justify-center overflow-clip px-[8px] relative rounded-[4px] shrink-0 w-[80px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(54,65,83,0.5)] text-right w-full">—</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex flex-col items-end left-[710.04px] top-[19.9px] w-[126.75px]" data-name="Container">
      <NumberInput9 />
    </div>
  );
}

function TableRow10() {
  return (
    <div className="absolute border-[#f3f4f6] border-b-[0.8px] border-solid h-[71.8px] left-0 top-[687.1px] w-[977.6px]" data-name="Table Row">
      <TableCell9 />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[19.5px] left-[387.34px] text-[#364153] text-[13px] top-[25.95px] whitespace-nowrap">SB-HYU-001</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[678.8px] not-italic text-[#364153] text-[14px] text-right top-[25px] whitespace-nowrap">3</p>
      <Container13 />
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[961.6px] not-italic text-[#d1d5dc] text-[16px] text-right top-[21.7px] whitespace-nowrap">—</p>
    </div>
  );
}

function TableCell10() {
  return (
    <div className="[word-break:break-word] absolute h-[71.8px] left-0 not-italic top-0 w-[371.337px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] text-[#101828] text-[14px] top-[16.4px]">Cabin Air Filter — Mercedes C200</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[16px] text-[#99a1af] text-[12px] top-[37.4px]">Mann Filter</p>
    </div>
  );
}

function NumberInput10() {
  return (
    <div className="border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[32px] items-start justify-center overflow-clip px-[8px] relative rounded-[4px] shrink-0 w-[80px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(54,65,83,0.5)] text-right w-full">—</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex flex-col items-end left-[710.04px] top-[19.9px] w-[126.75px]" data-name="Container">
      <NumberInput10 />
    </div>
  );
}

function TableRow11() {
  return (
    <div className="absolute border-[#f3f4f6] border-b-[0.8px] border-solid h-[71.8px] left-0 top-[758.9px] w-[977.6px]" data-name="Table Row">
      <TableCell10 />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[19.5px] left-[387.34px] text-[#364153] text-[13px] top-[25.95px] whitespace-nowrap">CAF-MER-001</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[678.79px] not-italic text-[#364153] text-[14px] text-right top-[25px] whitespace-nowrap">6</p>
      <Container14 />
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[961.6px] not-italic text-[#d1d5dc] text-[16px] text-right top-[21.7px] whitespace-nowrap">—</p>
    </div>
  );
}

function TableCell11() {
  return (
    <div className="[word-break:break-word] absolute h-[71.4px] left-0 not-italic top-0 w-[371.337px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] text-[#101828] text-[14px] top-[16.4px]">{`Wiper Blade Set 24"+16"`}</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[16px] text-[#99a1af] text-[12px] top-[37.4px]">Bosch</p>
    </div>
  );
}

function NumberInput11() {
  return (
    <div className="border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[32px] items-start justify-center overflow-clip px-[8px] relative rounded-[4px] shrink-0 w-[80px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(54,65,83,0.5)] text-right w-full">—</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex flex-col items-end left-[710.04px] top-[19.9px] w-[126.75px]" data-name="Container">
      <NumberInput11 />
    </div>
  );
}

function TableRow12() {
  return (
    <div className="absolute h-[71.4px] left-0 top-[830.7px] w-[977.6px]" data-name="Table Row">
      <TableCell11 />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[19.5px] left-[387.34px] text-[#364153] text-[13px] top-[25.95px] whitespace-nowrap">WB-SET-2416</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[678.79px] not-italic text-[#364153] text-[14px] text-right top-[25px] whitespace-nowrap">9</p>
      <Container15 />
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[961.6px] not-italic text-[#d1d5dc] text-[16px] text-right top-[21.7px] whitespace-nowrap">—</p>
    </div>
  );
}

function Table() {
  return (
    <div className="h-[902.1px] relative shrink-0 w-full" data-name="Table">
      <TableRow />
      <TableRow1 />
      <TableRow2 />
      <TableRow3 />
      <TableRow4 />
      <TableRow5 />
      <TableRow6 />
      <TableRow7 />
      <TableRow8 />
      <TableRow9 />
      <TableRow10 />
      <TableRow11 />
      <TableRow12 />
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[903.7px] items-start overflow-clip relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <Table />
    </div>
  );
}

function ContainerMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[20px] relative shrink-0 w-full" data-name="Container:margin">
      <Container3 />
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

function WarehouseStockCountScreen() {
  return (
    <div className="absolute bg-[#f3f4f6] content-stretch flex flex-col h-[550.4px] items-start left-[168px] overflow-clip top-[56px] w-[1027.2px]" data-name="WarehouseStockCountScreen">
      <Container />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 1">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[#111827] text-[18px] whitespace-nowrap">Stock Count</p>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute bg-[#ffb900] content-stretch flex items-center justify-center left-[12.65px] rounded-[26843500px] size-[16px] top-[-4px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[13.5px] not-italic relative shrink-0 text-[9px] text-white whitespace-nowrap">1</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[30px] not-italic relative shrink-0 text-[#6a7282] text-[20px] whitespace-nowrap">🔔</p>
      <Text />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#111827] text-[13px] text-right whitespace-nowrap">Hassan Nour</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[14px] not-italic relative shrink-0 text-[#6a7282] text-[11px] text-right tracking-[0.5px] uppercase whitespace-nowrap">Warehouse</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[80.638px]" data-name="Container">
      <Paragraph />
      <Paragraph1 />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Container17 />
      <Container18 />
    </div>
  );
}

function WarehouseHeader() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-b-[0.8px] border-solid content-stretch flex h-[56px] items-center justify-between left-[168px] px-[24px] top-0 w-[1027.2px]" data-name="WarehouseHeader">
      <Heading />
      <Container16 />
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[18px] relative shrink-0 text-[12px] text-[rgba(255,255,255,0.9)] whitespace-nowrap">SA</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[28px]" data-name="Container">
      <Text1 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex flex-col h-[15px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] not-italic overflow-hidden relative shrink-0 text-[12px] text-ellipsis text-white w-full whitespace-nowrap">Star Auto Center</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.4)] tracking-[0.5px] uppercase whitespace-nowrap">Warehouse</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[90px]" data-name="Container">
      <Paragraph2 />
      <Paragraph3 />
    </div>
  );
}

function Container19() {
  return (
    <div className="border-[rgba(255,255,255,0.1)] border-b-[0.8px] border-solid content-stretch flex gap-[10px] items-center p-[20px] relative shrink-0 w-full" data-name="Container">
      <Container20 />
      <Container21 />
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">⊞</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Dashboard</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[168px]" data-name="Button">
      <Text2 />
      <Text3 />
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[14.375px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">◫</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] w-[102px]">Open Job Orders</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[168px]" data-name="Button">
      <Text4 />
      <Text5 />
    </div>
  );
}

function Text6() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">▤</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Parts</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[168px]" data-name="Button">
      <Text6 />
      <Text7 />
    </div>
  );
}

function Text8() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">⊟</p>
    </div>
  );
}

function Text9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Stock Update</p>
    </div>
  );
}

function Container23() {
  return <div className="absolute bg-[rgba(255,255,255,0.6)] h-[16px] left-[164px] rounded-[26843500px] top-[12px] w-[4px]" data-name="Container" />;
}

function Button5() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[168px]" data-name="Button">
      <Text8 />
      <Text9 />
      <Container23 />
    </div>
  );
}

function Text10() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">↕</p>
    </div>
  );
}

function Text11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Movements</p>
    </div>
  );
}

function Button6() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[168px]" data-name="Button">
      <Text10 />
      <Text11 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-[428.8_0_0] flex-col items-start min-h-px py-[8px] relative w-full" data-name="Container">
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
      <Button6 />
    </div>
  );
}

function Text12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] not-italic relative shrink-0 text-[10px] text-white whitespace-nowrap">HN</p>
    </div>
  );
}

function Container26() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center relative rounded-[26843500px] shrink-0 size-[28px]" data-name="Container">
      <Text12 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex flex-col h-[16px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">Hassan Nour</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[14px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.4)] tracking-[0.5px] uppercase whitespace-nowrap">Warehouse</p>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[73.713px]" data-name="Container">
      <Paragraph4 />
      <Paragraph5 />
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Container26 />
      <Container27 />
    </div>
  );
}

function ContainerMargin1() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[12px] relative shrink-0 w-full" data-name="Container:margin">
      <Container25 />
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute h-[19.5px] left-0 top-[4px] w-[66.662px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-[33.5px] not-italic text-[13px] text-[rgba(255,255,255,0.4)] text-center top-[0.6px] whitespace-nowrap">→ Sign out</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Button7 />
    </div>
  );
}

function Container24() {
  return (
    <div className="border-[rgba(255,255,255,0.1)] border-solid border-t-[0.8px] content-stretch flex flex-col items-start p-[20px] relative shrink-0 w-full" data-name="Container">
      <ContainerMargin1 />
      <Container28 />
    </div>
  );
}

function WarehouseSidebar() {
  return (
    <div className="absolute bg-[#060f1e] content-stretch flex flex-col h-[606.4px] items-start left-0 top-0 w-[168px]" data-name="WarehouseSidebar">
      <Container19 />
      <Container22 />
      <Container24 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27px] not-italic relative shrink-0 text-[#111827] text-[18px] whitespace-nowrap">Add New Part</p>
    </div>
  );
}

function Button8() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[22px] not-italic relative shrink-0 text-[#6a7282] text-[22px] text-center whitespace-nowrap">×</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="border-[#f3f4f6] border-b-[0.8px] border-solid content-stretch flex items-center justify-between px-[24px] py-[16px] relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Button8 />
    </div>
  );
}

function TextInput1() {
  return (
    <div className="absolute border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[40px] items-start justify-center left-0 overflow-clip px-[12px] rounded-[8px] top-[28px] w-[492px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(17,24,39,0.5)] w-full">e.g. Turbocharger BMW 320i</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[68px] relative shrink-0 w-full" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] left-0 not-italic text-[#6a7282] text-[11px] top-[7px] tracking-[0.6px] uppercase whitespace-nowrap">
        <span className="leading-[16.5px]">{`Part Name `}</span>
        <span className="leading-[16.5px] text-[#fb2c36]">*</span>
      </p>
      <TextInput1 />
    </div>
  );
}

function TextInput2() {
  return (
    <div className="absolute border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[40px] items-start justify-center left-0 overflow-clip px-[12px] rounded-[8px] top-[28px] w-[238px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(17,24,39,0.5)] w-full">TB-BMW-320-001</p>
    </div>
  );
}

function Container34() {
  return (
    <div className="col-1 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-0 not-italic text-[#6a7282] text-[11px] top-[7px] tracking-[0.6px] uppercase whitespace-nowrap">Part Number</p>
      <TextInput2 />
    </div>
  );
}

function TextInput3() {
  return (
    <div className="absolute border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[40px] items-start justify-center left-0 overflow-clip px-[12px] rounded-[8px] top-[28px] w-[238px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(17,24,39,0.5)] w-full">123456789</p>
    </div>
  );
}

function Container35() {
  return (
    <div className="col-2 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-0 not-italic text-[#6a7282] text-[11px] top-[7px] tracking-[0.6px] uppercase whitespace-nowrap">OEM Number</p>
      <TextInput3 />
    </div>
  );
}

function Container33() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[__238px_238px] grid-rows-[_68px] relative shrink-0 w-full" data-name="Container">
      <Container34 />
      <Container35 />
    </div>
  );
}

function ContainerMargin2() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-name="Container:margin">
      <Container33 />
    </div>
  );
}

function TextInput4() {
  return (
    <div className="absolute border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[40px] items-start justify-center left-0 overflow-clip px-[12px] rounded-[8px] top-[28px] w-[238px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(17,24,39,0.5)] w-full">e.g. Garrett</p>
    </div>
  );
}

function Container37() {
  return (
    <div className="col-1 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-0 not-italic text-[#6a7282] text-[11px] top-[7px] tracking-[0.6px] uppercase whitespace-nowrap">Brand</p>
      <TextInput4 />
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute content-stretch flex h-[38.4px] items-center left-[16px] overflow-clip top-0 w-[192.4px]" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">Select...</p>
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

function Container40() {
  return (
    <div className="absolute content-stretch flex h-[38.4px] items-center justify-center left-[217.4px] top-0 w-[20px]" data-name="Container">
      <Icon />
    </div>
  );
}

function Dropdown() {
  return (
    <div className="absolute border-[#e5e7eb] border-[0.8px] border-solid h-[40px] left-0 overflow-clip rounded-[8px] top-[28px] w-[238px]" data-name="Dropdown">
      <Container39 />
      <Container40 />
    </div>
  );
}

function Container38() {
  return (
    <div className="col-2 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-0 not-italic text-[#6a7282] text-[11px] top-[7px] tracking-[0.6px] uppercase whitespace-nowrap">Category</p>
      <Dropdown />
    </div>
  );
}

function Container36() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[__238px_238px] grid-rows-[_68px] relative shrink-0 w-full" data-name="Container">
      <Container37 />
      <Container38 />
    </div>
  );
}

function ContainerMargin3() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-name="Container:margin">
      <Container36 />
    </div>
  );
}

function TextInput5() {
  return (
    <div className="absolute border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[40px] items-start justify-center left-0 overflow-clip px-[12px] rounded-[8px] top-[28px] w-[238px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(17,24,39,0.5)] w-full">BMW</p>
    </div>
  );
}

function Container42() {
  return (
    <div className="col-1 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-0 not-italic text-[#6a7282] text-[11px] top-[7px] tracking-[0.6px] uppercase whitespace-nowrap">Compatible Make</p>
      <TextInput5 />
    </div>
  );
}

function TextInput6() {
  return (
    <div className="absolute border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[40px] items-start justify-center left-0 overflow-clip px-[12px] rounded-[8px] top-[28px] w-[238px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(17,24,39,0.5)] w-full">320i</p>
    </div>
  );
}

function Container43() {
  return (
    <div className="col-2 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-0 not-italic text-[#6a7282] text-[11px] top-[7px] tracking-[0.6px] uppercase whitespace-nowrap">Compatible Model</p>
      <TextInput6 />
    </div>
  );
}

function Container41() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[__238px_238px] grid-rows-[_68px] relative shrink-0 w-full" data-name="Container">
      <Container42 />
      <Container43 />
    </div>
  );
}

function ContainerMargin4() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-name="Container:margin">
      <Container41 />
    </div>
  );
}

function TextInput7() {
  return (
    <div className="absolute border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[40px] items-start justify-center left-0 overflow-clip px-[12px] rounded-[8px] top-[28px] w-[238px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(17,24,39,0.5)] w-full">2018-2022</p>
    </div>
  );
}

function Container45() {
  return (
    <div className="col-1 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-0 not-italic text-[#6a7282] text-[11px] top-[7px] tracking-[0.6px] uppercase whitespace-nowrap">Compatible Year</p>
      <TextInput7 />
    </div>
  );
}

function NumberInput12() {
  return (
    <div className="absolute border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[40px] items-start justify-center left-0 overflow-clip px-[12px] rounded-[8px] top-[28px] w-[238px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[#111827] text-[14px] w-full">0</p>
    </div>
  );
}

function Container46() {
  return (
    <div className="col-2 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-0 not-italic text-[#6a7282] text-[11px] top-[7px] tracking-[0.6px] uppercase whitespace-nowrap">Initial Quantity</p>
      <NumberInput12 />
    </div>
  );
}

function Container44() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[__238px_238px] grid-rows-[_68px] relative shrink-0 w-full" data-name="Container">
      <Container45 />
      <Container46 />
    </div>
  );
}

function ContainerMargin5() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-name="Container:margin">
      <Container44 />
    </div>
  );
}

function NumberInput13() {
  return (
    <div className="absolute border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[40px] items-start justify-center left-0 overflow-clip px-[12px] rounded-[8px] top-[28px] w-[238px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[#111827] text-[14px] w-full">1</p>
    </div>
  );
}

function Container48() {
  return (
    <div className="col-1 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-0 not-italic text-[#6a7282] text-[11px] top-[7px] tracking-[0.6px] uppercase whitespace-nowrap">Minimum Stock</p>
      <NumberInput13 />
    </div>
  );
}

function TextInput8() {
  return (
    <div className="absolute border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[40px] items-start justify-center left-0 overflow-clip px-[12px] rounded-[8px] top-[28px] w-[238px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(17,24,39,0.5)] w-full">A-04</p>
    </div>
  );
}

function Container49() {
  return (
    <div className="col-2 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-0 not-italic text-[#6a7282] text-[11px] top-[7px] tracking-[0.6px] uppercase whitespace-nowrap">Storage Location</p>
      <TextInput8 />
    </div>
  );
}

function Container47() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[__238px_238px] grid-rows-[_68px] relative shrink-0 w-full" data-name="Container">
      <Container48 />
      <Container49 />
    </div>
  );
}

function ContainerMargin6() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-name="Container:margin">
      <Container47 />
    </div>
  );
}

function NumberInput14() {
  return (
    <div className="absolute border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[40px] items-start justify-center left-0 overflow-clip px-[12px] rounded-[8px] top-[28px] w-[238px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(17,24,39,0.5)] w-full">25000</p>
    </div>
  );
}

function Container51() {
  return (
    <div className="col-1 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] left-0 not-italic text-[#6a7282] text-[11px] top-[7px] tracking-[0.6px] uppercase whitespace-nowrap">
        <span className="leading-[16.5px]">{`Selling Price (EGP) `}</span>
        <span className="leading-[16.5px] text-[#fb2c36]">*</span>
      </p>
      <NumberInput14 />
    </div>
  );
}

function NumberInput15() {
  return (
    <div className="absolute border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[40px] items-start justify-center left-0 overflow-clip px-[12px] rounded-[8px] top-[28px] w-[238px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(17,24,39,0.5)] w-full">18000</p>
    </div>
  );
}

function Container52() {
  return (
    <div className="col-2 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-0 not-italic text-[#6a7282] text-[11px] top-[7px] tracking-[0.6px] uppercase whitespace-nowrap">Purchase Price (EGP)</p>
      <NumberInput15 />
    </div>
  );
}

function Container50() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[__238px_238px] grid-rows-[_68px] relative shrink-0 w-full" data-name="Container">
      <Container51 />
      <Container52 />
    </div>
  );
}

function ContainerMargin7() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-name="Container:margin">
      <Container50 />
    </div>
  );
}

function ContainerScrollContent() {
  return (
    <div className="absolute content-stretch flex flex-col h-[410.55px] items-start left-0 px-[24px] py-[20px] top-[-201.6px] w-[540px]" data-name="Container:scroll-content">
      <Container32 />
      <ContainerMargin2 />
      <ContainerMargin3 />
      <ContainerMargin4 />
      <ContainerMargin5 />
      <ContainerMargin6 />
      <ContainerMargin7 />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-[410.55_0_0] flex-col items-start min-h-px overflow-clip relative w-full" data-name="Container">
      <ContainerScrollContent />
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-[#d1d5dc] content-stretch flex flex-[392.113_0_0] flex-col h-[42.6px] items-center justify-center min-w-px py-[10px] relative rounded-[8px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#6a7282] text-[14px] text-center whitespace-nowrap">Save Part</p>
    </div>
  );
}

function Button10() {
  return (
    <div className="border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col items-center justify-center px-[20px] py-[10px] relative rounded-[8px] self-stretch shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#364153] text-[14px] text-center whitespace-nowrap">Cancel</p>
    </div>
  );
}

function Container53() {
  return (
    <div className="border-[#e5e7eb] border-solid border-t-[0.8px] content-stretch flex gap-[12px] items-start px-[24px] py-[16px] relative shrink-0 w-full" data-name="Container">
      <Button9 />
      <Button10 />
    </div>
  );
}

function Container29() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[545.75px] items-start max-h-[545.760009765625px] overflow-clip relative rounded-[16px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] shrink-0 w-[540px]" data-name="Container">
      <Container30 />
      <Container31 />
      <Container53 />
    </div>
  );
}

function AddNewPartModal() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.4)] content-stretch flex h-[606.4px] items-center justify-center left-0 top-0 w-[1195.2px]" data-name="AddNewPartModal">
      <Container29 />
    </div>
  );
}

export default function EngineerJobOrderPrototypeFlow() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Engineer Job Order Prototype Flow">
      <App />
      <WarehouseStockCountScreen />
      <WarehouseHeader />
      <WarehouseSidebar />
      <AddNewPartModal />
    </div>
  );
}