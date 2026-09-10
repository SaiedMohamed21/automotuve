function Paragraph() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] whitespace-nowrap">Enter actual quantities from physical count. Differences will be flagged.</p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#0f2340] content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[4px] shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">Save Count</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="flex flex-row items-center self-stretch">
      <div className="bg-[#0f2340] content-stretch flex h-full items-center justify-center px-[16px] py-[8px] relative rounded-[4px] shrink-0" data-name="Button">
        <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">+ Add New Part</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Paragraph />
      <Button />
      <Button1 />
    </div>
  );
}

function HeaderCell() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-0 top-0 w-[266.363px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Part Name</p>
    </div>
  );
}

function HeaderCell1() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[266.36px] top-0 w-[127.025px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Part Number</p>
    </div>
  );
}

function HeaderCell2() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[493.34px] top-0 w-[118.9px]" data-name="Header Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[102.99px] not-italic text-[#6a7282] text-[12px] text-right top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">System Qty</p>
    </div>
  );
}

function HeaderCell3() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[612.24px] top-0 w-[117.675px]" data-name="Header Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[101.97px] not-italic text-[#6a7282] text-[12px] text-right top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Actual Qty</p>
    </div>
  );
}

function HeaderCell4() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[729.91px] top-0 w-[113.588px]" data-name="Header Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[97.9px] not-italic text-[#6a7282] text-[12px] text-right top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Difference</p>
    </div>
  );
}

function HeaderCell5() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[843.5px] top-0 w-[77.3px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Notes</p>
    </div>
  );
}

function TableCell() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-0 not-italic top-[36.39px] w-[266.363px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Brake Pad Front — BMW Series 3</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[32.4px]">Brembo</p>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[266.36px] top-[36.39px] w-[127.025px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#364153] text-[12px] top-[22.4px] whitespace-nowrap">BP-BMW-F001</p>
    </div>
  );
}

function TableCell2() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[493.34px] top-[36.39px] w-[118.9px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[102.94px] not-italic text-[#364153] text-[14px] text-right top-[20.99px] whitespace-nowrap">8</p>
    </div>
  );
}

function NumberInput() {
  return (
    <div className="absolute border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[29.6px] items-start justify-center left-[21.67px] overflow-clip px-[8px] py-[4px] rounded-[4px] top-[15.59px] w-[80px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(54,65,83,0.5)] text-right w-full">—</p>
    </div>
  );
}

function TableCell3() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[612.24px] top-[36.39px] w-[117.675px]" data-name="Table Cell">
      <NumberInput />
    </div>
  );
}

function TableCell4() {
  return <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[729.91px] top-[36.39px] w-[113.588px]" data-name="Table Cell" />;
}

function TableCell5() {
  return <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[843.5px] top-[36.39px] w-[77.3px]" data-name="Table Cell" />;
}

function TableCell6() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-0 not-italic top-[97.18px] w-[266.363px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Engine Oil 5W-30 4L</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[32.4px]">Mobil 1</p>
    </div>
  );
}

function TableCell7() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[266.36px] top-[97.18px] w-[127.025px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#364153] text-[12px] top-[22.4px] whitespace-nowrap">OIL-5W30-4L</p>
    </div>
  );
}

function TableCell8() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[493.34px] top-[97.18px] w-[118.9px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[103.85px] not-italic text-[#364153] text-[14px] text-right top-[20.99px] whitespace-nowrap">42</p>
    </div>
  );
}

function NumberInput1() {
  return (
    <div className="absolute border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[29.6px] items-start justify-center left-[21.67px] overflow-clip px-[8px] py-[4px] rounded-[4px] top-[15.59px] w-[80px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(54,65,83,0.5)] text-right w-full">—</p>
    </div>
  );
}

function TableCell9() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[612.24px] top-[97.18px] w-[117.675px]" data-name="Table Cell">
      <NumberInput1 />
    </div>
  );
}

function TableCell10() {
  return <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[729.91px] top-[97.18px] w-[113.588px]" data-name="Table Cell" />;
}

function TableCell11() {
  return <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[843.5px] top-[97.18px] w-[77.3px]" data-name="Table Cell" />;
}

function TableCell12() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-0 not-italic top-[157.96px] w-[266.363px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Oil Filter — BMW N20</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[32.4px]">Mann Filter</p>
    </div>
  );
}

function TableCell13() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[266.36px] top-[157.96px] w-[127.025px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#364153] text-[12px] top-[22.4px] whitespace-nowrap">OF-BMW-N20</p>
    </div>
  );
}

function TableCell14() {
  return <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[393.39px] top-[157.96px] w-[99.95px]" data-name="Table Cell" />;
}

function TableCell15() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[493.34px] top-[157.96px] w-[118.9px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[103.25px] not-italic text-[#364153] text-[14px] text-right top-[20.99px] whitespace-nowrap">12</p>
    </div>
  );
}

function NumberInput2() {
  return (
    <div className="absolute border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[29.6px] items-start justify-center left-[21.67px] overflow-clip px-[8px] py-[4px] rounded-[4px] top-[15.59px] w-[80px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(54,65,83,0.5)] text-right w-full">—</p>
    </div>
  );
}

function TableCell16() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[612.24px] top-[157.96px] w-[117.675px]" data-name="Table Cell">
      <NumberInput2 />
    </div>
  );
}

function TableCell17() {
  return <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[729.91px] top-[157.96px] w-[113.588px]" data-name="Table Cell" />;
}

function TableCell18() {
  return <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[843.5px] top-[157.96px] w-[77.3px]" data-name="Table Cell" />;
}

function TableCell19() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-0 not-italic top-[218.75px] w-[266.363px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Air Filter — BMW 320i</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[32.4px]">Mann Filter</p>
    </div>
  );
}

function TableCell20() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[266.36px] top-[218.75px] w-[127.025px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#364153] text-[12px] top-[22.4px] whitespace-nowrap">AF-BMW-320</p>
    </div>
  );
}

function TableCell21() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[493.34px] top-[218.75px] w-[118.9px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[103.33px] not-italic text-[#364153] text-[14px] text-right top-[20.99px] whitespace-nowrap">5</p>
    </div>
  );
}

function NumberInput3() {
  return (
    <div className="absolute border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[29.6px] items-start justify-center left-[21.67px] overflow-clip px-[8px] py-[4px] rounded-[4px] top-[15.59px] w-[80px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(54,65,83,0.5)] text-right w-full">—</p>
    </div>
  );
}

function TableCell22() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[612.24px] top-[218.75px] w-[117.675px]" data-name="Table Cell">
      <NumberInput3 />
    </div>
  );
}

function TableCell23() {
  return <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[729.91px] top-[218.75px] w-[113.588px]" data-name="Table Cell" />;
}

function TableCell24() {
  return <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[843.5px] top-[218.75px] w-[77.3px]" data-name="Table Cell" />;
}

function TableCell25() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-0 not-italic top-[279.54px] w-[266.363px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Spark Plug Iridium</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[32.4px]">NGK</p>
    </div>
  );
}

function TableCell26() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[266.36px] top-[279.54px] w-[127.025px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#364153] text-[12px] top-[22.4px] whitespace-nowrap">SP-IRD-001</p>
    </div>
  );
}

function TableCell27() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[493.34px] top-[279.54px] w-[118.9px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[103.17px] not-italic text-[#364153] text-[14px] text-right top-[20.99px] whitespace-nowrap">2</p>
    </div>
  );
}

function NumberInput4() {
  return (
    <div className="absolute border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[29.6px] items-start justify-center left-[21.67px] overflow-clip px-[8px] py-[4px] rounded-[4px] top-[15.59px] w-[80px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(54,65,83,0.5)] text-right w-full">—</p>
    </div>
  );
}

function TableCell28() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[612.24px] top-[279.54px] w-[117.675px]" data-name="Table Cell">
      <NumberInput4 />
    </div>
  );
}

function TableCell29() {
  return <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[729.91px] top-[279.54px] w-[113.588px]" data-name="Table Cell" />;
}

function TableCell30() {
  return <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[843.5px] top-[279.54px] w-[77.3px]" data-name="Table Cell" />;
}

function TableCell31() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-0 not-italic top-[340.33px] w-[266.363px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Brake Disc Front — Toyota Corolla</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[32.4px]">Brembo</p>
    </div>
  );
}

function TableCell32() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[266.36px] top-[340.33px] w-[127.025px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#364153] text-[12px] top-[22.4px] whitespace-nowrap">BD-TOY-F001</p>
    </div>
  );
}

function TableCell33() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[493.34px] top-[340.33px] w-[118.9px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[103.58px] not-italic text-[#364153] text-[14px] text-right top-[20.99px] whitespace-nowrap">4</p>
    </div>
  );
}

function NumberInput5() {
  return (
    <div className="absolute border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[29.6px] items-start justify-center left-[21.67px] overflow-clip px-[8px] py-[4px] rounded-[4px] top-[15.59px] w-[80px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(54,65,83,0.5)] text-right w-full">—</p>
    </div>
  );
}

function TableCell34() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[612.24px] top-[340.33px] w-[117.675px]" data-name="Table Cell">
      <NumberInput5 />
    </div>
  );
}

function TableCell35() {
  return <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[729.91px] top-[340.33px] w-[113.588px]" data-name="Table Cell" />;
}

function TableCell36() {
  return <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[843.5px] top-[340.33px] w-[77.3px]" data-name="Table Cell" />;
}

function TableCell37() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-0 not-italic top-[401.11px] w-[266.363px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Engine Oil 0W-20 4L</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[32.4px]">Toyota Genuine</p>
    </div>
  );
}

function TableCell38() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[266.36px] top-[401.11px] w-[127.025px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#364153] text-[12px] top-[22.4px] whitespace-nowrap">OIL-0W20-4L</p>
    </div>
  );
}

function TableCell39() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[493.34px] top-[401.11px] w-[118.9px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[103.01px] not-italic text-[#364153] text-[14px] text-right top-[20.99px] whitespace-nowrap">18</p>
    </div>
  );
}

function NumberInput6() {
  return (
    <div className="absolute border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[29.6px] items-start justify-center left-[21.67px] overflow-clip px-[8px] py-[4px] rounded-[4px] top-[15.59px] w-[80px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(54,65,83,0.5)] text-right w-full">—</p>
    </div>
  );
}

function TableCell40() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[612.24px] top-[401.11px] w-[117.675px]" data-name="Table Cell">
      <NumberInput6 />
    </div>
  );
}

function TableCell41() {
  return <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[729.91px] top-[401.11px] w-[113.588px]" data-name="Table Cell" />;
}

function TableCell42() {
  return <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[843.5px] top-[401.11px] w-[77.3px]" data-name="Table Cell" />;
}

function TableCell43() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-0 not-italic top-[461.9px] w-[266.363px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Coolant Ready-Mix 1L</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[32.4px]">Prestone</p>
    </div>
  );
}

function TableCell44() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[266.36px] top-[461.9px] w-[127.025px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#364153] text-[12px] top-[22.4px] whitespace-nowrap">COO-RM-001</p>
    </div>
  );
}

function TableCell45() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[493.34px] top-[461.9px] w-[118.9px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[103.66px] not-italic text-[#364153] text-[14px] text-right top-[20.99px] whitespace-nowrap">0</p>
    </div>
  );
}

function NumberInput7() {
  return (
    <div className="absolute border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[29.6px] items-start justify-center left-[21.67px] overflow-clip px-[8px] py-[4px] rounded-[4px] top-[15.59px] w-[80px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(54,65,83,0.5)] text-right w-full">—</p>
    </div>
  );
}

function TableCell46() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[612.24px] top-[461.9px] w-[117.675px]" data-name="Table Cell">
      <NumberInput7 />
    </div>
  );
}

function TableCell47() {
  return <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[729.91px] top-[461.9px] w-[113.588px]" data-name="Table Cell" />;
}

function TableCell48() {
  return <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[843.5px] top-[461.9px] w-[77.3px]" data-name="Table Cell" />;
}

function TableCell49() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-0 not-italic top-[522.69px] w-[266.363px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Brake Fluid DOT4 500ml</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[32.4px]">ATE</p>
    </div>
  );
}

function TableCell50() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[266.36px] top-[522.69px] w-[127.025px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#364153] text-[12px] top-[22.4px] whitespace-nowrap">BF-DOT4-500</p>
    </div>
  );
}

function TableCell51() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[493.34px] top-[522.69px] w-[118.9px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[103.83px] not-italic text-[#364153] text-[14px] text-right top-[20.99px] whitespace-nowrap">7</p>
    </div>
  );
}

function NumberInput8() {
  return (
    <div className="absolute border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[29.6px] items-start justify-center left-[21.67px] overflow-clip px-[8px] py-[4px] rounded-[4px] top-[15.59px] w-[80px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(54,65,83,0.5)] text-right w-full">—</p>
    </div>
  );
}

function TableCell52() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[612.24px] top-[522.69px] w-[117.675px]" data-name="Table Cell">
      <NumberInput8 />
    </div>
  );
}

function TableCell53() {
  return <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[729.91px] top-[522.69px] w-[113.588px]" data-name="Table Cell" />;
}

function TableCell54() {
  return <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[843.5px] top-[522.69px] w-[77.3px]" data-name="Table Cell" />;
}

function TableCell55() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-0 not-italic top-[583.48px] w-[266.363px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Serpentine Belt — Hyundai Elantra</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[32.4px]">Gates</p>
    </div>
  );
}

function TableCell56() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[266.36px] top-[583.48px] w-[127.025px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#364153] text-[12px] top-[22.4px] whitespace-nowrap">SB-HYU-001</p>
    </div>
  );
}

function TableCell57() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[493.34px] top-[583.48px] w-[118.9px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[102.99px] not-italic text-[#364153] text-[14px] text-right top-[20.99px] whitespace-nowrap">3</p>
    </div>
  );
}

function NumberInput9() {
  return (
    <div className="absolute border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[29.6px] items-start justify-center left-[21.67px] overflow-clip px-[8px] py-[4px] rounded-[4px] top-[15.59px] w-[80px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(54,65,83,0.5)] text-right w-full">—</p>
    </div>
  );
}

function TableCell58() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[612.24px] top-[583.48px] w-[117.675px]" data-name="Table Cell">
      <NumberInput9 />
    </div>
  );
}

function TableCell59() {
  return <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[729.91px] top-[583.48px] w-[113.588px]" data-name="Table Cell" />;
}

function TableCell60() {
  return <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[843.5px] top-[583.48px] w-[77.3px]" data-name="Table Cell" />;
}

function TableCell61() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-0 not-italic top-[644.26px] w-[266.363px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Cabin Air Filter — Mercedes C200</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[32.4px]">Mann Filter</p>
    </div>
  );
}

function TableCell62() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[266.36px] top-[644.26px] w-[127.025px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#364153] text-[12px] top-[22.4px] whitespace-nowrap">CAF-MER-001</p>
    </div>
  );
}

function TableCell63() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[493.34px] top-[644.26px] w-[118.9px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[102.94px] not-italic text-[#364153] text-[14px] text-right top-[20.99px] whitespace-nowrap">6</p>
    </div>
  );
}

function NumberInput10() {
  return (
    <div className="absolute border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[29.6px] items-start justify-center left-[21.67px] overflow-clip px-[8px] py-[4px] rounded-[4px] top-[15.59px] w-[80px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(54,65,83,0.5)] text-right w-full">—</p>
    </div>
  );
}

function TableCell64() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[612.24px] top-[644.26px] w-[117.675px]" data-name="Table Cell">
      <NumberInput10 />
    </div>
  );
}

function TableCell65() {
  return <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[729.91px] top-[644.26px] w-[113.588px]" data-name="Table Cell" />;
}

function TableCell66() {
  return <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[843.5px] top-[644.26px] w-[77.3px]" data-name="Table Cell" />;
}

function TableCell67() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-0 not-italic top-[705.05px] w-[266.363px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">{`Wiper Blade Set 24"+16"`}</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[32.4px]">Bosch</p>
    </div>
  );
}

function TableCell68() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[266.36px] top-[705.05px] w-[127.025px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#364153] text-[12px] top-[22.4px] whitespace-nowrap">WB-SET-2416</p>
    </div>
  );
}

function TableCell69() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[493.34px] top-[705.05px] w-[118.9px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[102.94px] not-italic text-[#364153] text-[14px] text-right top-[20.99px] whitespace-nowrap">9</p>
    </div>
  );
}

function NumberInput11() {
  return (
    <div className="absolute border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[29.6px] items-start justify-center left-[21.67px] overflow-clip px-[8px] py-[4px] rounded-[4px] top-[15.59px] w-[80px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(54,65,83,0.5)] text-right w-full">—</p>
    </div>
  );
}

function TableCell70() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[612.24px] top-[705.05px] w-[117.675px]" data-name="Table Cell">
      <NumberInput11 />
    </div>
  );
}

function TableCell71() {
  return <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[729.91px] top-[705.05px] w-[113.588px]" data-name="Table Cell" />;
}

function TableCell72() {
  return <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[843.5px] top-[705.05px] w-[77.3px]" data-name="Table Cell" />;
}

function Table() {
  return (
    <div className="h-[766.237px] overflow-clip relative shrink-0 w-full" data-name="Table">
      <HeaderCell />
      <HeaderCell1 />
      <HeaderCell2 />
      <HeaderCell3 />
      <HeaderCell4 />
      <HeaderCell5 />
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
      <TableCell20 />
      <TableCell21 />
      <TableCell22 />
      <TableCell23 />
      <TableCell24 />
      <TableCell25 />
      <TableCell26 />
      <TableCell27 />
      <TableCell28 />
      <TableCell29 />
      <TableCell30 />
      <TableCell31 />
      <TableCell32 />
      <TableCell33 />
      <TableCell34 />
      <TableCell35 />
      <TableCell36 />
      <TableCell37 />
      <TableCell38 />
      <TableCell39 />
      <TableCell40 />
      <TableCell41 />
      <TableCell42 />
      <TableCell43 />
      <TableCell44 />
      <TableCell45 />
      <TableCell46 />
      <TableCell47 />
      <TableCell48 />
      <TableCell49 />
      <TableCell50 />
      <TableCell51 />
      <TableCell52 />
      <TableCell53 />
      <TableCell54 />
      <TableCell55 />
      <TableCell56 />
      <TableCell57 />
      <TableCell58 />
      <TableCell59 />
      <TableCell60 />
      <TableCell61 />
      <TableCell62 />
      <TableCell63 />
      <TableCell64 />
      <TableCell65 />
      <TableCell66 />
      <TableCell67 />
      <TableCell68 />
      <TableCell69 />
      <TableCell70 />
      <TableCell71 />
      <TableCell72 />
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col items-start relative rounded-[10px] shrink-0 w-full" data-name="Card">
      <Table />
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

function App() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-start min-h-[688px] pb-[24px] pl-[248px] pr-[24px] pt-[80px] relative shrink-0 w-full" data-name="App">
      <Container />
      <CardMargin />
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[1194.4px]" data-name="Body">
      <App />
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[28px]" data-name="Container">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[12px] text-[rgba(255,255,255,0.9)] whitespace-nowrap">SA</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex flex-col h-[15px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">Star Auto Center</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex flex-col h-[17px] items-start pt-[2px] relative shrink-0 w-[96.563px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.4)] tracking-[0.5px] uppercase whitespace-nowrap">Warehouse</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[96.563px]" data-name="Container">
      <Paragraph1 />
      <Paragraph2 />
    </div>
  );
}

function Container1() {
  return (
    <div className="border-[rgba(255,255,255,0.1)] border-b-[0.8px] border-solid content-stretch flex gap-[10px] items-center p-[20px] relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container3 />
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

function Button2() {
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
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">◫</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Open Job Orders</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text2 />
      <Text3 />
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

function Button4() {
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
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">⊟</p>
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

function Container5() {
  return <div className="bg-[rgba(255,255,255,0.6)] h-[16px] relative rounded-[26843500px] shrink-0 w-[4px]" data-name="Container" />;
}

function ContainerAlign() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-w-px relative" data-name="Container:align">
      <Container5 />
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-full" data-name="Container">
      <Text6 />
      <Text7 />
      <ContainerAlign />
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

function Button5() {
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
      <Button2 />
      <Button3 />
      <Button4 />
      <Container4 />
      <Button5 />
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center relative rounded-[26843500px] shrink-0 size-[28px]" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">HN</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex flex-col h-[15.988px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.8)] whitespace-nowrap">Hassan Nour</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.35)] tracking-[0.5px] uppercase whitespace-nowrap">Warehouse</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-[146_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Paragraph3 />
      <Paragraph4 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-[184px]" data-name="Container">
      <Container8 />
      <Container9 />
    </div>
  );
}

function ContainerMargin() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[12px] relative shrink-0 w-full" data-name="Container:margin">
      <Container7 />
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute h-[15.988px] left-0 top-[5.6px] w-[184px]" data-name="Button">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.35)] top-0 whitespace-nowrap">→ Sign out</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Button6 />
    </div>
  );
}

function Container6() {
  return (
    <div className="border-[rgba(255,255,255,0.1)] border-solid border-t-[0.8px] content-stretch flex flex-col items-start px-[20px] py-[16px] relative shrink-0 w-full" data-name="Container">
      <ContainerMargin />
      <Container10 />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="absolute bg-[#060f1e] content-stretch flex flex-col h-[924px] items-start left-0 top-0 w-[224px]" data-name="Sidebar">
      <Container1 />
      <Navigation />
      <Container6 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start pr-[16px] relative shrink-0 w-[100px]" data-name="Heading 1">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Stock Count</p>
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

function Button7() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[26843500px] shrink-0 size-[32px]" data-name="Button">
      <Text10 />
      <Text11 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#101828] text-[12px] text-right whitespace-nowrap">Hassan Nour</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] capitalize font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[#99a1af] text-[10px] text-right whitespace-nowrap">warehouse</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[74.1px]" data-name="Container">
      <Paragraph5 />
      <Paragraph6 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Button7 />
      <Container12 />
    </div>
  );
}

function ContainerAlign1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-w-px relative" data-name="Container:align">
      <Container11 />
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
      <Body />
      <Sidebar />
      <Header />
    </div>
  );
}