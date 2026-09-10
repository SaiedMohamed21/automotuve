function Button() {
  return (
    <div className="bg-[#0f2340] content-stretch flex h-full items-center justify-center px-[16px] py-[8px] relative rounded-[4px] shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">+ Add New Part</p>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex h-[36px] items-start justify-end relative shrink-0 w-full" data-name="Container">
      <Button />
    </div>
  );
}

function HeaderCell() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-0 top-0 w-[281.962px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Part</p>
    </div>
  );
}

function HeaderCell1() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[281.96px] top-0 w-[119.713px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Number</p>
    </div>
  );
}

function HeaderCell2() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[401.68px] top-0 w-[110.338px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Category</p>
    </div>
  );
}

function HeaderCell3() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[512.01px] top-0 w-[105.8px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Location</p>
    </div>
  );
}

function HeaderCell4() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[617.81px] top-0 w-[61.7px]" data-name="Header Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[46.39px] not-italic text-[#6a7282] text-[12px] text-right top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Min</p>
    </div>
  );
}

function HeaderCell5() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[679.51px] top-0 w-[110.45px]" data-name="Header Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[94.86px] not-italic text-[#6a7282] text-[12px] text-right top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Available</p>
    </div>
  );
}

function HeaderCell6() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[789.96px] top-0 w-[130.838px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Status</p>
    </div>
  );
}

function TableCell() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-0 not-italic top-[36.39px] w-[281.962px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Brake Pad Front — BMW Series 3</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[32.4px]">Brembo</p>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[281.96px] top-[36.39px] w-[119.713px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#364153] text-[12px] top-[22.4px] whitespace-nowrap">BP-BMW-F001</p>
    </div>
  );
}

function TableCell2() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[401.68px] top-[36.39px] w-[110.338px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[20.99px] whitespace-nowrap">Brakes</p>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20px] left-[16px] rounded-[4px] top-[21.59px] w-[44.8px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[8px] text-[#364153] text-[12px] top-[2px] whitespace-nowrap">A-03</p>
    </div>
  );
}

function TableCell3() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[512.01px] top-[36.39px] w-[105.8px]" data-name="Table Cell">
      <Text />
    </div>
  );
}

function TableCell4() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[617.81px] top-[36.39px] w-[61.7px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[46.39px] not-italic text-[#364153] text-[14px] text-right top-[20.99px] whitespace-nowrap">5</p>
    </div>
  );
}

function TableCell5() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[679.51px] top-[36.39px] w-[110.45px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-[95.34px] not-italic text-[#101828] text-[14px] text-right top-[20.99px] whitespace-nowrap">8</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute bg-[#f0fdf4] border-[#b9f8cf] border-[0.8px] border-solid content-stretch flex items-start left-[16px] px-[8px] py-[2px] rounded-[4px] top-[19.8px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#008236] text-[12px] whitespace-nowrap">In Stock</p>
    </div>
  );
}

function TableCell6() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[789.96px] top-[36.39px] w-[130.838px]" data-name="Table Cell">
      <Text1 />
    </div>
  );
}

function TableCell7() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-0 not-italic top-[97.18px] w-[281.962px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Engine Oil 5W-30 4L</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[32.4px]">Mobil 1</p>
    </div>
  );
}

function TableCell8() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[281.96px] top-[97.18px] w-[119.713px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#364153] text-[12px] top-[22.4px] whitespace-nowrap">OIL-5W30-4L</p>
    </div>
  );
}

function TableCell9() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[401.68px] top-[97.18px] w-[110.338px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[20.99px] whitespace-nowrap">Lubricants</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20px] left-[16px] rounded-[4px] top-[21.59px] w-[44.8px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[8px] text-[#364153] text-[12px] top-[2px] whitespace-nowrap">B-01</p>
    </div>
  );
}

function TableCell10() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[512.01px] top-[97.18px] w-[105.8px]" data-name="Table Cell">
      <Text2 />
    </div>
  );
}

function TableCell11() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[617.81px] top-[97.18px] w-[61.7px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[46.33px] not-italic text-[#364153] text-[14px] text-right top-[20.99px] whitespace-nowrap">20</p>
    </div>
  );
}

function TableCell12() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[679.51px] top-[97.18px] w-[110.45px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-[95.16px] not-italic text-[#101828] text-[14px] text-right top-[20.99px] whitespace-nowrap">42</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute bg-[#f0fdf4] border-[#b9f8cf] border-[0.8px] border-solid content-stretch flex items-start left-[16px] px-[8px] py-[2px] rounded-[4px] top-[19.8px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#008236] text-[12px] whitespace-nowrap">In Stock</p>
    </div>
  );
}

function TableCell13() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[789.96px] top-[97.18px] w-[130.838px]" data-name="Table Cell">
      <Text3 />
    </div>
  );
}

function TableCell14() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-0 not-italic top-[157.96px] w-[281.962px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Oil Filter — BMW N20</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[32.4px]">Mann Filter</p>
    </div>
  );
}

function TableCell15() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[281.96px] top-[157.96px] w-[119.713px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#364153] text-[12px] top-[22.4px] whitespace-nowrap">OF-BMW-N20</p>
    </div>
  );
}

function TableCell16() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[401.68px] top-[157.96px] w-[110.338px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[20.99px] whitespace-nowrap">Filters</p>
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20px] left-[16px] rounded-[4px] top-[21.59px] w-[44.8px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[8px] text-[#364153] text-[12px] top-[2px] whitespace-nowrap">B-02</p>
    </div>
  );
}

function TableCell17() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[512.01px] top-[157.96px] w-[105.8px]" data-name="Table Cell">
      <Text4 />
    </div>
  );
}

function TableCell18() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[617.81px] top-[157.96px] w-[61.7px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[46.04px] not-italic text-[#364153] text-[14px] text-right top-[20.99px] whitespace-nowrap">8</p>
    </div>
  );
}

function TableCell19() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[679.51px] top-[157.96px] w-[110.45px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-[94.59px] not-italic text-[#101828] text-[14px] text-right top-[20.99px] whitespace-nowrap">12</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute bg-[#f0fdf4] border-[#b9f8cf] border-[0.8px] border-solid content-stretch flex items-start left-[16px] px-[8px] py-[2px] rounded-[4px] top-[19.8px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#008236] text-[12px] whitespace-nowrap">In Stock</p>
    </div>
  );
}

function TableCell20() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[789.96px] top-[157.96px] w-[130.838px]" data-name="Table Cell">
      <Text5 />
    </div>
  );
}

function TableCell21() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-0 not-italic top-[218.75px] w-[281.962px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Air Filter — BMW 320i</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[32.4px]">Mann Filter</p>
    </div>
  );
}

function TableCell22() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[281.96px] top-[218.75px] w-[119.713px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#364153] text-[12px] top-[22.4px] whitespace-nowrap">AF-BMW-320</p>
    </div>
  );
}

function TableCell23() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[401.68px] top-[218.75px] w-[110.338px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[20.99px] whitespace-nowrap">Filters</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20px] left-[16px] rounded-[4px] top-[21.59px] w-[44.8px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[8px] text-[#364153] text-[12px] top-[2px] whitespace-nowrap">B-03</p>
    </div>
  );
}

function TableCell24() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[512.01px] top-[218.75px] w-[105.8px]" data-name="Table Cell">
      <Text6 />
    </div>
  );
}

function TableCell25() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[617.81px] top-[218.75px] w-[61.7px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[46.39px] not-italic text-[#364153] text-[14px] text-right top-[20.99px] whitespace-nowrap">5</p>
    </div>
  );
}

function TableCell26() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[679.51px] top-[218.75px] w-[110.45px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-[94.74px] not-italic text-[#e7000b] text-[14px] text-right top-[20.99px] whitespace-nowrap">5</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute bg-[#fffbeb] border-[#fee685] border-[0.8px] border-solid content-stretch flex items-start left-[16px] px-[8px] py-[2px] rounded-[4px] top-[19.8px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#bb4d00] text-[12px] whitespace-nowrap">Low Stock</p>
    </div>
  );
}

function TableCell27() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[789.96px] top-[218.75px] w-[130.838px]" data-name="Table Cell">
      <Text7 />
    </div>
  );
}

function TableCell28() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-0 not-italic top-[279.54px] w-[281.962px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Spark Plug Iridium</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[32.4px]">NGK</p>
    </div>
  );
}

function TableCell29() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[281.96px] top-[279.54px] w-[119.713px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#364153] text-[12px] top-[22.4px] whitespace-nowrap">SP-IRD-001</p>
    </div>
  );
}

function TableCell30() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[401.68px] top-[279.54px] w-[110.338px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[20.99px] whitespace-nowrap">Ignition</p>
    </div>
  );
}

function Text8() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20px] left-[16px] rounded-[4px] top-[21.59px] w-[44.8px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[8px] text-[#364153] text-[12px] top-[2px] whitespace-nowrap">C-01</p>
    </div>
  );
}

function TableCell31() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[512.01px] top-[279.54px] w-[105.8px]" data-name="Table Cell">
      <Text8 />
    </div>
  );
}

function TableCell32() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[617.81px] top-[279.54px] w-[61.7px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[46.04px] not-italic text-[#364153] text-[14px] text-right top-[20.99px] whitespace-nowrap">8</p>
    </div>
  );
}

function TableCell33() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[679.51px] top-[279.54px] w-[110.45px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-[94.63px] not-italic text-[#e7000b] text-[14px] text-right top-[20.99px] whitespace-nowrap">2</p>
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute bg-[#fffbeb] border-[#fee685] border-[0.8px] border-solid content-stretch flex items-start left-[16px] px-[8px] py-[2px] rounded-[4px] top-[19.8px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#bb4d00] text-[12px] whitespace-nowrap">Low Stock</p>
    </div>
  );
}

function TableCell34() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[789.96px] top-[279.54px] w-[130.838px]" data-name="Table Cell">
      <Text9 />
    </div>
  );
}

function TableCell35() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-0 not-italic top-[340.33px] w-[281.962px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Brake Disc Front — Toyota Corolla</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[32.4px]">Brembo</p>
    </div>
  );
}

function TableCell36() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[281.96px] top-[340.33px] w-[119.713px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#364153] text-[12px] top-[22.4px] whitespace-nowrap">BD-TOY-F001</p>
    </div>
  );
}

function TableCell37() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[401.68px] top-[340.33px] w-[110.338px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[20.99px] whitespace-nowrap">Brakes</p>
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20px] left-[16px] rounded-[4px] top-[21.59px] w-[44.8px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[8px] text-[#364153] text-[12px] top-[2px] whitespace-nowrap">A-05</p>
    </div>
  );
}

function TableCell38() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[512.01px] top-[340.33px] w-[105.8px]" data-name="Table Cell">
      <Text10 />
    </div>
  );
}

function TableCell39() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[617.81px] top-[340.33px] w-[61.7px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[46.65px] not-italic text-[#364153] text-[14px] text-right top-[20.99px] whitespace-nowrap">4</p>
    </div>
  );
}

function TableCell40() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[679.51px] top-[340.33px] w-[110.45px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-[94.98px] not-italic text-[#e7000b] text-[14px] text-right top-[20.99px] whitespace-nowrap">4</p>
    </div>
  );
}

function Text11() {
  return (
    <div className="absolute bg-[#fffbeb] border-[#fee685] border-[0.8px] border-solid content-stretch flex items-start left-[16px] px-[8px] py-[2px] rounded-[4px] top-[19.8px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#bb4d00] text-[12px] whitespace-nowrap">Low Stock</p>
    </div>
  );
}

function TableCell41() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[789.96px] top-[340.33px] w-[130.838px]" data-name="Table Cell">
      <Text11 />
    </div>
  );
}

function TableCell42() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-0 not-italic top-[401.11px] w-[281.962px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Engine Oil 0W-20 4L</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[32.4px]">Toyota Genuine</p>
    </div>
  );
}

function TableCell43() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[281.96px] top-[401.11px] w-[119.713px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#364153] text-[12px] top-[22.4px] whitespace-nowrap">OIL-0W20-4L</p>
    </div>
  );
}

function TableCell44() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[401.68px] top-[401.11px] w-[110.338px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[20.99px] whitespace-nowrap">Lubricants</p>
    </div>
  );
}

function Text12() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20px] left-[16px] rounded-[4px] top-[21.59px] w-[44.8px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[8px] text-[#364153] text-[12px] top-[2px] whitespace-nowrap">B-04</p>
    </div>
  );
}

function TableCell45() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[512.01px] top-[401.11px] w-[105.8px]" data-name="Table Cell">
      <Text12 />
    </div>
  );
}

function TableCell46() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[617.81px] top-[401.11px] w-[61.7px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[45.7px] not-italic text-[#364153] text-[14px] text-right top-[20.99px] whitespace-nowrap">15</p>
    </div>
  );
}

function TableCell47() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[679.51px] top-[401.11px] w-[110.45px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-[95.3px] not-italic text-[#101828] text-[14px] text-right top-[20.99px] whitespace-nowrap">18</p>
    </div>
  );
}

function Text13() {
  return (
    <div className="absolute bg-[#f0fdf4] border-[#b9f8cf] border-[0.8px] border-solid content-stretch flex items-start left-[16px] px-[8px] py-[2px] rounded-[4px] top-[19.8px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#008236] text-[12px] whitespace-nowrap">In Stock</p>
    </div>
  );
}

function TableCell48() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[789.96px] top-[401.11px] w-[130.838px]" data-name="Table Cell">
      <Text13 />
    </div>
  );
}

function TableCell49() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-0 not-italic top-[461.9px] w-[281.962px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Coolant Ready-Mix 1L</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[32.4px]">Prestone</p>
    </div>
  );
}

function TableCell50() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[281.96px] top-[461.9px] w-[119.713px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#364153] text-[12px] top-[22.4px] whitespace-nowrap">COO-RM-001</p>
    </div>
  );
}

function TableCell51() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[401.68px] top-[461.9px] w-[110.338px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[20.99px] whitespace-nowrap">Fluids</p>
    </div>
  );
}

function Text14() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20px] left-[16px] rounded-[4px] top-[21.59px] w-[44.8px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[8px] text-[#364153] text-[12px] top-[2px] whitespace-nowrap">D-01</p>
    </div>
  );
}

function TableCell52() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[512.01px] top-[461.9px] w-[105.8px]" data-name="Table Cell">
      <Text14 />
    </div>
  );
}

function TableCell53() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[617.81px] top-[461.9px] w-[61.7px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[46.16px] not-italic text-[#364153] text-[14px] text-right top-[20.99px] whitespace-nowrap">10</p>
    </div>
  );
}

function TableCell54() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[679.51px] top-[461.9px] w-[110.45px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-[95px] not-italic text-[#e7000b] text-[14px] text-right top-[20.99px] whitespace-nowrap">0</p>
    </div>
  );
}

function Text15() {
  return (
    <div className="absolute bg-[#fef2f2] border-[#ffc9c9] border-[0.8px] border-solid content-stretch flex items-start left-[16px] px-[8px] py-[2px] rounded-[4px] top-[19.8px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#c10007] text-[12px] whitespace-nowrap">Out of Stock</p>
    </div>
  );
}

function TableCell55() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[789.96px] top-[461.9px] w-[130.838px]" data-name="Table Cell">
      <Text15 />
    </div>
  );
}

function TableCell56() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-0 not-italic top-[522.69px] w-[281.962px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Brake Fluid DOT4 500ml</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[32.4px]">ATE</p>
    </div>
  );
}

function TableCell57() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[281.96px] top-[522.69px] w-[119.713px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#364153] text-[12px] top-[22.4px] whitespace-nowrap">BF-DOT4-500</p>
    </div>
  );
}

function TableCell58() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[401.68px] top-[522.69px] w-[110.338px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[20.99px] whitespace-nowrap">Fluids</p>
    </div>
  );
}

function Text16() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20px] left-[16px] rounded-[4px] top-[21.59px] w-[44.8px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[8px] text-[#364153] text-[12px] top-[2px] whitespace-nowrap">D-02</p>
    </div>
  );
}

function TableCell59() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[512.01px] top-[522.69px] w-[105.8px]" data-name="Table Cell">
      <Text16 />
    </div>
  );
}

function TableCell60() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[617.81px] top-[522.69px] w-[61.7px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[46.39px] not-italic text-[#364153] text-[14px] text-right top-[20.99px] whitespace-nowrap">5</p>
    </div>
  );
}

function TableCell61() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[679.51px] top-[522.69px] w-[110.45px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-[95.3px] not-italic text-[#101828] text-[14px] text-right top-[20.99px] whitespace-nowrap">7</p>
    </div>
  );
}

function Text17() {
  return (
    <div className="absolute bg-[#f0fdf4] border-[#b9f8cf] border-[0.8px] border-solid content-stretch flex items-start left-[16px] px-[8px] py-[2px] rounded-[4px] top-[19.8px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#008236] text-[12px] whitespace-nowrap">In Stock</p>
    </div>
  );
}

function TableCell62() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[789.96px] top-[522.69px] w-[130.838px]" data-name="Table Cell">
      <Text17 />
    </div>
  );
}

function TableCell63() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-0 not-italic top-[583.48px] w-[281.962px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Serpentine Belt — Hyundai Elantra</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[32.4px]">Gates</p>
    </div>
  );
}

function TableCell64() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[281.96px] top-[583.48px] w-[119.713px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#364153] text-[12px] top-[22.4px] whitespace-nowrap">SB-HYU-001</p>
    </div>
  );
}

function TableCell65() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[401.68px] top-[583.48px] w-[110.338px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[20.99px] whitespace-nowrap">Belts</p>
    </div>
  );
}

function Text18() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20px] left-[16px] rounded-[4px] top-[21.59px] w-[44.8px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[8px] text-[#364153] text-[12px] top-[2px] whitespace-nowrap">E-01</p>
    </div>
  );
}

function TableCell66() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[512.01px] top-[583.48px] w-[105.8px]" data-name="Table Cell">
      <Text18 />
    </div>
  );
}

function TableCell67() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[617.81px] top-[583.48px] w-[61.7px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[46.65px] not-italic text-[#364153] text-[14px] text-right top-[20.99px] whitespace-nowrap">4</p>
    </div>
  );
}

function TableCell68() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[679.51px] top-[583.48px] w-[110.45px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-[95.41px] not-italic text-[#e7000b] text-[14px] text-right top-[20.99px] whitespace-nowrap">3</p>
    </div>
  );
}

function Text19() {
  return (
    <div className="absolute bg-[#fffbeb] border-[#fee685] border-[0.8px] border-solid content-stretch flex items-start left-[16px] px-[8px] py-[2px] rounded-[4px] top-[19.8px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#bb4d00] text-[12px] whitespace-nowrap">Low Stock</p>
    </div>
  );
}

function TableCell69() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[789.96px] top-[583.48px] w-[130.838px]" data-name="Table Cell">
      <Text19 />
    </div>
  );
}

function TableCell70() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-0 not-italic top-[644.26px] w-[281.962px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Cabin Air Filter — Mercedes C200</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[32.4px]">Mann Filter</p>
    </div>
  );
}

function TableCell71() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[281.96px] top-[644.26px] w-[119.713px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#364153] text-[12px] top-[22.4px] whitespace-nowrap">CAF-MER-001</p>
    </div>
  );
}

function TableCell72() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[401.68px] top-[644.26px] w-[110.338px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[20.99px] whitespace-nowrap">Filters</p>
    </div>
  );
}

function Text20() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20px] left-[16px] rounded-[4px] top-[21.59px] w-[44.8px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[8px] text-[#364153] text-[12px] top-[2px] whitespace-nowrap">B-05</p>
    </div>
  );
}

function TableCell73() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[512.01px] top-[644.26px] w-[105.8px]" data-name="Table Cell">
      <Text20 />
    </div>
  );
}

function TableCell74() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[617.81px] top-[644.26px] w-[61.7px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[46.65px] not-italic text-[#364153] text-[14px] text-right top-[20.99px] whitespace-nowrap">4</p>
    </div>
  );
}

function TableCell75() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[679.51px] top-[644.26px] w-[110.45px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-[95.35px] not-italic text-[#101828] text-[14px] text-right top-[20.99px] whitespace-nowrap">6</p>
    </div>
  );
}

function Text21() {
  return (
    <div className="absolute bg-[#f0fdf4] border-[#b9f8cf] border-[0.8px] border-solid content-stretch flex items-start left-[16px] px-[8px] py-[2px] rounded-[4px] top-[19.8px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#008236] text-[12px] whitespace-nowrap">In Stock</p>
    </div>
  );
}

function TableCell76() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[789.96px] top-[644.26px] w-[130.838px]" data-name="Table Cell">
      <Text21 />
    </div>
  );
}

function TableCell77() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-0 not-italic top-[705.05px] w-[281.962px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">{`Wiper Blade Set 24"+16"`}</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[32.4px]">Bosch</p>
    </div>
  );
}

function TableCell78() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[281.96px] top-[705.05px] w-[119.713px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#364153] text-[12px] top-[22.4px] whitespace-nowrap">WB-SET-2416</p>
    </div>
  );
}

function TableCell79() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[401.68px] top-[705.05px] w-[110.338px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[20.99px] whitespace-nowrap">Wipers</p>
    </div>
  );
}

function Text22() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[20px] left-[16px] rounded-[4px] top-[21.59px] w-[44.8px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] left-[8px] text-[#364153] text-[12px] top-[2px] whitespace-nowrap">F-01</p>
    </div>
  );
}

function TableCell80() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[512.01px] top-[705.05px] w-[105.8px]" data-name="Table Cell">
      <Text22 />
    </div>
  );
}

function TableCell81() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[617.81px] top-[705.05px] w-[61.7px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[46.01px] not-italic text-[#364153] text-[14px] text-right top-[20.99px] whitespace-nowrap">6</p>
    </div>
  );
}

function TableCell82() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[679.51px] top-[705.05px] w-[110.45px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-[95.35px] not-italic text-[#101828] text-[14px] text-right top-[20.99px] whitespace-nowrap">9</p>
    </div>
  );
}

function Text23() {
  return (
    <div className="absolute bg-[#f0fdf4] border-[#b9f8cf] border-[0.8px] border-solid content-stretch flex items-start left-[16px] px-[8px] py-[2px] rounded-[4px] top-[19.8px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#008236] text-[12px] whitespace-nowrap">In Stock</p>
    </div>
  );
}

function TableCell83() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[60.788px] left-[789.96px] top-[705.05px] w-[130.838px]" data-name="Table Cell">
      <Text23 />
    </div>
  );
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
      <HeaderCell6 />
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
      <TableCell73 />
      <TableCell74 />
      <TableCell75 />
      <TableCell76 />
      <TableCell77 />
      <TableCell78 />
      <TableCell79 />
      <TableCell80 />
      <TableCell81 />
      <TableCell82 />
      <TableCell83 />
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
    <div className="bg-[#f3f4f6] content-stretch flex flex-col h-[939.838px] items-start min-h-[688px] pb-[40px] pl-[248px] pr-[24px] pt-[80px] relative shrink-0 w-full" data-name="App">
      <Container />
      <CardMargin />
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex flex-col h-[688px] items-start relative shrink-0 w-[1194.4px]" data-name="Body">
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

function Paragraph() {
  return (
    <div className="content-stretch flex flex-col h-[15px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">Star Auto Center</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex flex-col h-[17px] items-start pt-[2px] relative shrink-0 w-[96.563px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.4)] tracking-[0.5px] uppercase whitespace-nowrap">Owner</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[96.563px]" data-name="Container">
      <Paragraph />
      <Paragraph1 />
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

function Text24() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">⊞</p>
    </div>
  );
}

function Text25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Dashboard</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text24 />
      <Text25 />
    </div>
  );
}

function Text26() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">◉</p>
    </div>
  );
}

function Text27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Customers</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text26 />
      <Text27 />
    </div>
  );
}

function Text28() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">◈</p>
    </div>
  );
}

function Text29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Vehicles</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text28 />
      <Text29 />
    </div>
  );
}

function Text30() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">◫</p>
    </div>
  );
}

function Text31() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Job Orders</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text30 />
      <Text31 />
    </div>
  );
}

function Text32() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">▤</p>
    </div>
  );
}

function Text33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Parts</p>
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
      <Text32 />
      <Text33 />
      <ContainerAlign />
    </div>
  );
}

function Text34() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">⬡</p>
    </div>
  );
}

function Text35() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Inventory</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text34 />
      <Text35 />
    </div>
  );
}

function Container7() {
  return <div className="border-[rgba(255,255,255,0.1)] border-solid border-t-[0.8px] h-[0.8px] relative shrink-0 w-full" data-name="Container" />;
}

function ContainerMargin() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] relative shrink-0 w-full" data-name="Container:margin">
      <Container7 />
    </div>
  );
}

function Text36() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">◈</p>
    </div>
  );
}

function Text37() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Accounting</p>
    </div>
  );
}

function Button6() {
  return (
    <div className="content-stretch flex gap-[12px] h-[48px] items-center pb-[10px] pt-[18px] px-[20px] relative shrink-0 w-[224px]" data-name="Button">
      <Text36 />
      <Text37 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col h-[56.8px] items-start pt-[8px] relative shrink-0 w-[224px]" data-name="Container">
      <ContainerMargin />
      <Button6 />
    </div>
  );
}

function Text38() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">◳</p>
    </div>
  );
}

function Text39() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Reports</p>
    </div>
  );
}

function Button7() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text38 />
      <Text39 />
    </div>
  );
}

function Text40() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">◉</p>
    </div>
  );
}

function Text41() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Users</p>
    </div>
  );
}

function Button8() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text40 />
      <Text41 />
    </div>
  );
}

function Text42() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">⚙</p>
    </div>
  );
}

function Text43() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Settings</p>
    </div>
  );
}

function Button9() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text42 />
      <Text43 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="content-stretch flex flex-[515.413_0_0] flex-col items-start min-h-px overflow-clip py-[16px] relative w-full" data-name="Navigation">
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
      <Container4 />
      <Button5 />
      <Container6 />
      <Button7 />
      <Button8 />
      <Button9 />
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center relative rounded-[26843500px] shrink-0 size-[28px]" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">DSA</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex flex-col h-[15.988px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.8)] whitespace-nowrap">Dr. Sameh Anwar</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.35)] tracking-[0.5px] uppercase whitespace-nowrap">Owner</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-[146_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Paragraph2 />
      <Paragraph3 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-[184px]" data-name="Container">
      <Container10 />
      <Container11 />
    </div>
  );
}

function ContainerMargin1() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[12px] relative shrink-0 w-full" data-name="Container:margin">
      <Container9 />
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute h-[15.988px] left-0 top-[5.6px] w-[184px]" data-name="Button">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.35)] top-0 whitespace-nowrap">→ Sign out</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Button10 />
    </div>
  );
}

function Container8() {
  return (
    <div className="border-[rgba(255,255,255,0.1)] border-solid border-t-[0.8px] content-stretch flex flex-col items-start px-[20px] py-[16px] relative shrink-0 w-full" data-name="Container">
      <ContainerMargin1 />
      <Container12 />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="absolute bg-[#060f1e] content-stretch flex flex-col h-[688px] items-start left-0 top-0 w-[224px]" data-name="Sidebar">
      <Container1 />
      <Navigation />
      <Container8 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start pr-[16px] relative shrink-0 w-[133px]" data-name="Heading 1">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">{`Parts & Inventory`}</p>
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

function Container13() {
  return (
    <div className="flex-[448_0_0] h-[33.6px] max-w-[448px] min-w-px relative" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[12.24px] not-italic text-[#99a1af] text-[12px] top-[8.8px] whitespace-nowrap">🔍</p>
      <TextInput />
    </div>
  );
}

function Text44() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] text-center whitespace-nowrap">🔔</p>
    </div>
  );
}

function Text45() {
  return <div className="absolute bg-[#fb2c36] border-[0.8px] border-solid border-white left-[20px] rounded-[26843500px] size-[8px] top-[4px]" data-name="Text" />;
}

function Button11() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[26843500px] shrink-0 size-[32px]" data-name="Button">
      <Text44 />
      <Text45 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#101828] text-[12px] text-right whitespace-nowrap">Dr. Sameh Anwar</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] capitalize font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[#99a1af] text-[10px] text-right whitespace-nowrap">owner</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[99.088px]" data-name="Container">
      <Paragraph4 />
      <Paragraph5 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Button11 />
      <Container15 />
    </div>
  );
}

function ContainerAlign1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-w-px relative" data-name="Container:align">
      <Container14 />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-b-[0.8px] border-solid content-stretch flex gap-[16px] h-[56px] items-center left-[224px] px-[24px] top-0 w-[970.4px]" data-name="Header">
      <Heading />
      <Container13 />
      <ContainerAlign1 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[#101828] text-[16px] whitespace-nowrap">Add New Part</p>
    </div>
  );
}

function Button12() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#99a1af] text-[18px] text-center whitespace-nowrap">×</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="border-[#f3f4f6] border-b-[0.8px] border-solid content-stretch flex items-center justify-between p-[20px] relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Button12 />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start pb-[4px] relative shrink-0 w-[632px]" data-name="Label">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">Part Name *</p>
    </div>
  );
}

function TextInput1() {
  return (
    <div className="border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[37.6px] items-start justify-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[632px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(17,24,39,0.5)] w-full">e.g. Turbocharger BMW 320i</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="col-[1/span_2] content-stretch flex flex-col items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Label />
      <TextInput1 />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start pb-[4px] relative shrink-0 w-[308px]" data-name="Label">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">Part Number</p>
    </div>
  );
}

function TextInput2() {
  return (
    <div className="border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[37.6px] items-start justify-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[308px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(17,24,39,0.5)] w-full">TB-BMW-320-001</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch relative row-2 self-stretch shrink-0" data-name="Container">
      <Label1 />
      <TextInput2 />
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start pb-[4px] relative shrink-0 w-[308px]" data-name="Label">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">OEM Number</p>
    </div>
  );
}

function TextInput3() {
  return (
    <div className="border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[37.6px] items-start justify-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[308px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(17,24,39,0.5)] w-full">123456789</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="col-2 content-stretch flex flex-col items-start justify-self-stretch relative row-2 self-stretch shrink-0" data-name="Container">
      <Label2 />
      <TextInput3 />
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start pb-[4px] relative shrink-0 w-[308px]" data-name="Label">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">Brand</p>
    </div>
  );
}

function TextInput4() {
  return (
    <div className="border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[37.6px] items-start justify-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[308px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(17,24,39,0.5)] w-full">e.g. Garrett</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch relative row-3 self-stretch shrink-0" data-name="Container">
      <Label3 />
      <TextInput4 />
    </div>
  );
}

function Label4() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start pb-[4px] relative shrink-0 w-[308px]" data-name="Label">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">Category</p>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex h-[18.4px] items-center left-[16px] overflow-clip top-[8px] w-[262.4px]" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">Select…</p>
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

function Container27() {
  return (
    <div className="absolute content-stretch flex h-[34.4px] items-center justify-center left-[287.4px] top-0 w-[20px]" data-name="Container">
      <Icon />
    </div>
  );
}

function Dropdown() {
  return (
    <div className="absolute border-[#d1d5dc] border-[0.8px] border-solid h-[36px] left-0 rounded-[6px] top-0 w-[308px]" data-name="Dropdown">
      <Container26 />
      <Container27 />
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[37.6px] relative shrink-0 w-full" data-name="Container">
      <Dropdown />
    </div>
  );
}

function Container24() {
  return (
    <div className="col-2 content-stretch flex flex-col items-start justify-self-stretch relative row-3 self-stretch shrink-0" data-name="Container">
      <Label4 />
      <Container25 />
    </div>
  );
}

function Label5() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start pb-[4px] relative shrink-0 w-[308px]" data-name="Label">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">Compatible Make</p>
    </div>
  );
}

function TextInput5() {
  return (
    <div className="border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[37.6px] items-start justify-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[308px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(17,24,39,0.5)] w-full">BMW</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch relative row-4 self-stretch shrink-0" data-name="Container">
      <Label5 />
      <TextInput5 />
    </div>
  );
}

function Label6() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start pb-[4px] relative shrink-0 w-[308px]" data-name="Label">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">Compatible Model</p>
    </div>
  );
}

function TextInput6() {
  return (
    <div className="border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[37.6px] items-start justify-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[308px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(17,24,39,0.5)] w-full">320i</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="col-2 content-stretch flex flex-col items-start justify-self-stretch relative row-4 self-stretch shrink-0" data-name="Container">
      <Label6 />
      <TextInput6 />
    </div>
  );
}

function Label7() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start pb-[4px] relative shrink-0 w-[308px]" data-name="Label">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">Compatible Year</p>
    </div>
  );
}

function TextInput7() {
  return (
    <div className="border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[37.6px] items-start justify-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[308px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(17,24,39,0.5)] w-full">2018–2022</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch relative row-5 self-stretch shrink-0" data-name="Container">
      <Label7 />
      <TextInput7 />
    </div>
  );
}

function Label8() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start pb-[4px] relative shrink-0 w-[308px]" data-name="Label">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">Initial Quantity</p>
    </div>
  );
}

function NumberInput() {
  return (
    <div className="border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[37.6px] items-start justify-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[308px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(17,24,39,0.5)] w-full">0</p>
    </div>
  );
}

function Container31() {
  return (
    <div className="col-2 content-stretch flex flex-col items-start justify-self-stretch relative row-5 self-stretch shrink-0" data-name="Container">
      <Label8 />
      <NumberInput />
    </div>
  );
}

function Label9() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start pb-[4px] relative shrink-0 w-[308px]" data-name="Label">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">Minimum Stock</p>
    </div>
  );
}

function NumberInput1() {
  return (
    <div className="border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[37.6px] items-start justify-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[308px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(17,24,39,0.5)] w-full">1</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch relative row-6 self-stretch shrink-0" data-name="Container">
      <Label9 />
      <NumberInput1 />
    </div>
  );
}

function Label10() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start pb-[4px] relative shrink-0 w-[308px]" data-name="Label">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">Selling Price (EGP) *</p>
    </div>
  );
}

function NumberInput2() {
  return (
    <div className="border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[37.6px] items-start justify-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[308px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(17,24,39,0.5)] w-full">25000</p>
    </div>
  );
}

function Container33() {
  return (
    <div className="col-2 content-stretch flex flex-col items-start justify-self-stretch relative row-6 self-stretch shrink-0" data-name="Container">
      <Label10 />
      <NumberInput2 />
    </div>
  );
}

function Label11() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start pb-[4px] relative shrink-0 w-[308px]" data-name="Label">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">Purchase Price (EGP)</p>
    </div>
  );
}

function NumberInput3() {
  return (
    <div className="border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[37.6px] items-start justify-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[308px]" data-name="Number Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(17,24,39,0.5)] w-full">18000</p>
    </div>
  );
}

function Container34() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch relative row-7 self-stretch shrink-0" data-name="Container">
      <Label11 />
      <NumberInput3 />
    </div>
  );
}

function Label12() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start pb-[4px] relative shrink-0 w-[308px]" data-name="Label">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">Storage Location</p>
    </div>
  );
}

function TextInput8() {
  return (
    <div className="border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[37.6px] items-start justify-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0 w-[308px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(17,24,39,0.5)] w-full">A-04</p>
    </div>
  );
}

function Container35() {
  return (
    <div className="col-2 content-stretch flex flex-col items-start justify-self-stretch relative row-7 self-stretch shrink-0" data-name="Container">
      <Label12 />
      <TextInput8 />
    </div>
  );
}

function Label13() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start pb-[4px] relative shrink-0 w-[308px]" data-name="Label">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">Unit</p>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute content-stretch flex h-[18.4px] items-center left-[16px] overflow-clip top-[8px] w-[262.4px]" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">Select…</p>
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

function Container38() {
  return (
    <div className="absolute content-stretch flex h-[34.4px] items-center justify-center left-[287.4px] top-0 w-[20px]" data-name="Container">
      <Icon1 />
    </div>
  );
}

function Dropdown1() {
  return (
    <div className="border-[#d1d5dc] border-[0.8px] border-solid h-[36px] relative rounded-[6px] shrink-0 w-full" data-name="Dropdown">
      <Container37 />
      <Container38 />
    </div>
  );
}

function Container36() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch relative row-8 self-stretch shrink-0" data-name="Container">
      <Label13 />
      <Dropdown1 />
    </div>
  );
}

function Label14() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start pb-[4px] relative shrink-0 w-[632px]" data-name="Label">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">Notes</p>
    </div>
  );
}

function TextArea() {
  return (
    <div className="absolute border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[57.6px] items-start left-0 overflow-clip px-[12px] py-[8px] rounded-[6px] top-0 w-[632px]" data-name="Text Area">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(17,24,39,0.5)] w-full">Any additional notes…</p>
    </div>
  );
}

function Container40() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Container">
      <TextArea />
    </div>
  );
}

function Container39() {
  return (
    <div className="col-[1/span_2] content-stretch flex flex-col items-start justify-self-stretch relative row-9 self-stretch shrink-0" data-name="Container">
      <Label14 />
      <Container40 />
    </div>
  );
}

function Container19() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[__308px_308px] grid-rows-[_________57.59px_57.59px_57.59px_57.59px_57.59px_57.59px_57.59px_55.99px_83.99px] relative shrink-0 w-full" data-name="Container">
      <Container20 />
      <Container21 />
      <Container22 />
      <Container23 />
      <Container24 />
      <Container28 />
      <Container29 />
      <Container30 />
      <Container31 />
      <Container32 />
      <Container33 />
      <Container34 />
      <Container35 />
      <Container36 />
      <Container39 />
    </div>
  );
}

function Button13() {
  return (
    <div className="bg-[#0f2340] content-stretch flex flex-[539.925_0_0] flex-col h-full items-center justify-center min-w-px opacity-40 px-[16px] py-[10px] relative rounded-[10px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">Save Part</p>
    </div>
  );
}

function Button14() {
  return (
    <div className="border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-full items-center justify-center px-[16px] py-[10px] relative rounded-[10px] shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] text-center whitespace-nowrap">Cancel</p>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex gap-[12px] h-[49.6px] items-start pt-[8px] relative shrink-0 w-[632px]" data-name="Container">
      <Button13 />
      <Button14 />
    </div>
  );
}

function ContainerMargin2() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-name="Container:margin">
      <Container41 />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start p-[20px] relative shrink-0 w-full" data-name="Container">
      <Container19 />
      <ContainerMargin2 />
    </div>
  );
}

function Container16() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[619.2px] items-start max-h-[619.2000122070312px] max-w-[672px] overflow-clip relative rounded-[12px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] shrink-0 w-[672px]" data-name="Container">
      <Container17 />
      <Container18 />
    </div>
  );
}

function PartsView() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.4)] content-stretch flex h-[940px] items-center justify-center left-0 p-[16px] top-0 w-[1194px]" data-name="PartsView">
      <Container16 />
    </div>
  );
}

export default function CreateAppDesign() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-start relative size-full" data-name="Create app design">
      <Body />
      <Sidebar />
      <Header />
      <PartsView />
    </div>
  );
}