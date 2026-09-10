function TextInput() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-[400_0_0] flex-col h-[40px] items-start justify-center max-w-[400px] min-w-px overflow-clip px-[16px] relative rounded-[8px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] w-full">Search by part name, number, SKU, brand...</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex h-[38.4px] items-center left-[16px] overflow-clip top-0 w-[69.6px]" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">All</p>
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
    <div className="absolute content-stretch flex h-[38.4px] items-center justify-center left-[94.6px] top-0 w-[20px]" data-name="Container">
      <Icon />
    </div>
  );
}

function Dropdown() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid h-[40px] overflow-clip relative rounded-[8px] shrink-0 w-[115.2px]" data-name="Dropdown">
      <Container2 />
      <Container3 />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex h-[38.4px] items-center left-[16px] overflow-clip top-0 w-[114.4px]" data-name="Container">
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
    <div className="absolute content-stretch flex h-[38.4px] items-center justify-center left-[139.4px] top-0 w-[20px]" data-name="Container">
      <Icon1 />
    </div>
  );
}

function Dropdown1() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid h-[40px] overflow-clip relative rounded-[8px] shrink-0 w-[160px]" data-name="Dropdown">
      <Container4 />
      <Container5 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#0f2340] content-stretch flex flex-col h-[40px] items-center justify-center px-[16px] py-[8px] relative rounded-[4px] shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] not-italic relative shrink-0 text-[13px] text-center text-white whitespace-nowrap">+ Add New Part</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Container">
      <TextInput />
      <Dropdown />
      <Dropdown1 />
      <Button />
    </div>
  );
}

function TableRow() {
  return (
    <div className="[word-break:break-word] absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid font-['Inter:Semi_Bold',sans-serif] font-semibold h-[40.9px] leading-[16.5px] left-0 not-italic text-[#6a7282] text-[11px] top-0 tracking-[0.6px] uppercase w-[977.6px] whitespace-nowrap" data-name="Table Row">
      <p className="absolute left-[16px] top-[12.6px]">Part</p>
      <p className="absolute left-[317.24px] top-[12.6px]">Number</p>
      <p className="absolute left-[445.1px] top-[12.6px]">Category</p>
      <p className="-translate-x-full absolute left-[700.16px] text-right top-[12.6px]">Min</p>
      <p className="-translate-x-full absolute left-[828.83px] text-right top-[12.6px]">Available ↕</p>
      <p className="absolute left-[860.35px] top-[12.6px]">Status</p>
    </div>
  );
}

function TableCell() {
  return (
    <div className="[word-break:break-word] absolute h-[63.8px] left-0 not-italic top-0 w-[301.238px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Air Filter — BMW 320i</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[16px] text-[#6a7282] text-[12px] top-[33.4px]">Mann Filter</p>
    </div>
  );
}

function WStockBadge() {
  return (
    <div className="absolute bg-[#fffbeb] border-[#fee685] border-[0.8px] border-solid content-stretch flex h-[22.1px] items-center left-[860.35px] px-[8px] py-[2px] rounded-[4px] top-[22.65px]" data-name="WStockBadge">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[#bb4d00] text-[11px] whitespace-nowrap">Low Stock</p>
    </div>
  );
}

function TableRow1() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[63.8px] left-0 top-[40.9px] w-[977.6px]" data-name="Table Row">
      <TableCell />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[317.24px] text-[#364153] text-[12px] top-[22.7px] whitespace-nowrap">AF-BMW-320</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[445.1px] not-italic text-[#364153] text-[14px] top-[21px] whitespace-nowrap">Filters</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[700.6px] not-italic text-[#364153] text-[14px] text-right top-[21px] whitespace-nowrap">5</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[828.85px] not-italic text-[#e17100] text-[14px] text-right top-[21px] whitespace-nowrap">4</p>
      <WStockBadge />
    </div>
  );
}

function TableCell1() {
  return (
    <div className="[word-break:break-word] absolute h-[63.8px] left-0 not-italic top-0 w-[301.238px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Brake Disc Front — Toyota Corolla</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[16px] text-[#6a7282] text-[12px] top-[33.4px]">Brembo</p>
    </div>
  );
}

function WStockBadge1() {
  return (
    <div className="absolute bg-[#fffbeb] border-[#fee685] border-[0.8px] border-solid content-stretch flex h-[22.1px] items-center left-[860.35px] px-[8px] py-[2px] rounded-[4px] top-[22.65px]" data-name="WStockBadge">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[#bb4d00] text-[11px] whitespace-nowrap">Low Stock</p>
    </div>
  );
}

function TableRow2() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[63.8px] left-0 top-[104.7px] w-[977.6px]" data-name="Table Row">
      <TableCell1 />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[317.24px] text-[#364153] text-[12px] top-[22.7px] whitespace-nowrap">BD-TOY-F001</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[445.1px] not-italic text-[#364153] text-[14px] top-[21px] whitespace-nowrap">Brakes</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[700.11px] not-italic text-[#364153] text-[14px] text-right top-[21px] whitespace-nowrap">4</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[828.85px] not-italic text-[#e17100] text-[14px] text-right top-[21px] whitespace-nowrap">4</p>
      <WStockBadge1 />
    </div>
  );
}

function TableCell2() {
  return (
    <div className="[word-break:break-word] absolute h-[63.8px] left-0 not-italic top-0 w-[301.238px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Brake Fluid DOT4 500ml</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[16px] text-[#6a7282] text-[12px] top-[33.4px]">ATE</p>
    </div>
  );
}

function WStockBadge2() {
  return (
    <div className="absolute bg-[#ecfdf5] border-[#a4f4cf] border-[0.8px] border-solid content-stretch flex h-[22.1px] items-center left-[860.35px] px-[8px] py-[2px] rounded-[4px] top-[22.65px]" data-name="WStockBadge">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[#007a55] text-[11px] whitespace-nowrap">In Stock</p>
    </div>
  );
}

function TableRow3() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[63.8px] left-0 top-[168.5px] w-[977.6px]" data-name="Table Row">
      <TableCell2 />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[317.24px] text-[#364153] text-[12px] top-[22.7px] whitespace-nowrap">BF-DOT4-500</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[445.1px] not-italic text-[#364153] text-[14px] top-[21px] whitespace-nowrap">Fluids</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[700.6px] not-italic text-[#364153] text-[14px] text-right top-[21px] whitespace-nowrap">5</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[829.01px] not-italic text-[#101828] text-[14px] text-right top-[21px] whitespace-nowrap">7</p>
      <WStockBadge2 />
    </div>
  );
}

function TableCell3() {
  return (
    <div className="[word-break:break-word] absolute h-[63.8px] left-0 not-italic top-0 w-[301.238px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Brake Pad Front — BMW Series 3</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[16px] text-[#6a7282] text-[12px] top-[33.4px]">Brembo</p>
    </div>
  );
}

function WStockBadge3() {
  return (
    <div className="absolute bg-[#ecfdf5] border-[#a4f4cf] border-[0.8px] border-solid content-stretch flex h-[22.1px] items-center left-[860.35px] px-[8px] py-[2px] rounded-[4px] top-[22.65px]" data-name="WStockBadge">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[#007a55] text-[11px] whitespace-nowrap">In Stock</p>
    </div>
  );
}

function TableRow4() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[63.8px] left-0 top-[232.3px] w-[977.6px]" data-name="Table Row">
      <TableCell3 />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[317.24px] text-[#364153] text-[12px] top-[22.7px] whitespace-nowrap">BP-BMW-F001</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[445.1px] not-italic text-[#364153] text-[14px] top-[21px] whitespace-nowrap">Brakes</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[700.6px] not-italic text-[#364153] text-[14px] text-right top-[21px] whitespace-nowrap">5</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[829.01px] not-italic text-[#101828] text-[14px] text-right top-[21px] whitespace-nowrap">7</p>
      <WStockBadge3 />
    </div>
  );
}

function TableCell4() {
  return (
    <div className="[word-break:break-word] absolute h-[63.8px] left-0 not-italic top-0 w-[301.238px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Cabin Air Filter — Mercedes C200</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[16px] text-[#6a7282] text-[12px] top-[33.4px]">Mann Filter</p>
    </div>
  );
}

function WStockBadge4() {
  return (
    <div className="absolute bg-[#ecfdf5] border-[#a4f4cf] border-[0.8px] border-solid content-stretch flex h-[22.1px] items-center left-[860.35px] px-[8px] py-[2px] rounded-[4px] top-[22.65px]" data-name="WStockBadge">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[#007a55] text-[11px] whitespace-nowrap">In Stock</p>
    </div>
  );
}

function TableRow5() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[63.8px] left-0 top-[296.1px] w-[977.6px]" data-name="Table Row">
      <TableCell4 />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[317.24px] text-[#364153] text-[12px] top-[22.7px] whitespace-nowrap">CAF-MER-001</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[445.1px] not-italic text-[#364153] text-[14px] top-[21px] whitespace-nowrap">Filters</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[700.11px] not-italic text-[#364153] text-[14px] text-right top-[21px] whitespace-nowrap">4</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[829.1px] not-italic text-[#101828] text-[14px] text-right top-[21px] whitespace-nowrap">6</p>
      <WStockBadge4 />
    </div>
  );
}

function TableCell5() {
  return (
    <div className="[word-break:break-word] absolute h-[63.8px] left-0 not-italic top-0 w-[301.238px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Coolant Ready-Mix 1L</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[16px] text-[#6a7282] text-[12px] top-[33.4px]">Prestone</p>
    </div>
  );
}

function WStockBadge5() {
  return (
    <div className="absolute bg-[#fef2f2] border-[#ffc9c9] border-[0.8px] border-solid content-stretch flex h-[22.1px] items-center left-[860.35px] px-[8px] py-[2px] rounded-[4px] top-[22.65px]" data-name="WStockBadge">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[#e7000b] text-[11px] whitespace-nowrap">Out of Stock</p>
    </div>
  );
}

function TableRow6() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[63.8px] left-0 top-[359.9px] w-[977.6px]" data-name="Table Row">
      <TableCell5 />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[317.24px] text-[#364153] text-[12px] top-[22.7px] whitespace-nowrap">COO-RM-001</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[445.1px] not-italic text-[#364153] text-[14px] top-[21px] whitespace-nowrap">Fluids</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[700.85px] not-italic text-[#364153] text-[14px] text-right top-[21px] whitespace-nowrap">10</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[828.71px] not-italic text-[#e7000b] text-[14px] text-right top-[21px] whitespace-nowrap">0</p>
      <WStockBadge5 />
    </div>
  );
}

function TableCell6() {
  return (
    <div className="[word-break:break-word] absolute h-[63.8px] left-0 not-italic top-0 w-[301.238px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Engine Oil 0W-20 4L</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[16px] text-[#6a7282] text-[12px] top-[33.4px]">Toyota Genuine</p>
    </div>
  );
}

function WStockBadge6() {
  return (
    <div className="absolute bg-[#ecfdf5] border-[#a4f4cf] border-[0.8px] border-solid content-stretch flex h-[22.1px] items-center left-[860.35px] px-[8px] py-[2px] rounded-[4px] top-[22.65px]" data-name="WStockBadge">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[#007a55] text-[11px] whitespace-nowrap">In Stock</p>
    </div>
  );
}

function TableRow7() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[63.8px] left-0 top-[423.7px] w-[977.6px]" data-name="Table Row">
      <TableCell6 />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[317.24px] text-[#364153] text-[12px] top-[22.7px] whitespace-nowrap">OIL-0W20-4L</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[445.1px] not-italic text-[#364153] text-[14px] top-[21px] whitespace-nowrap">Lubricants</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[701.09px] not-italic text-[#364153] text-[14px] text-right top-[21px] whitespace-nowrap">15</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[829.24px] not-italic text-[#101828] text-[14px] text-right top-[21px] whitespace-nowrap">18</p>
      <WStockBadge6 />
    </div>
  );
}

function TableCell7() {
  return (
    <div className="[word-break:break-word] absolute h-[63.8px] left-0 not-italic top-0 w-[301.238px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Engine Oil 5W-30 4L</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[16px] text-[#6a7282] text-[12px] top-[33.4px]">Mobil 1</p>
    </div>
  );
}

function WStockBadge7() {
  return (
    <div className="absolute bg-[#ecfdf5] border-[#a4f4cf] border-[0.8px] border-solid content-stretch flex h-[22.1px] items-center left-[860.35px] px-[8px] py-[2px] rounded-[4px] top-[22.65px]" data-name="WStockBadge">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[#007a55] text-[11px] whitespace-nowrap">In Stock</p>
    </div>
  );
}

function TableRow8() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[63.8px] left-0 top-[487.5px] w-[977.6px]" data-name="Table Row">
      <TableCell7 />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[317.24px] text-[#364153] text-[12px] top-[22.7px] whitespace-nowrap">OIL-5W30-4L</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[445.1px] not-italic text-[#364153] text-[14px] top-[21px] whitespace-nowrap">Lubricants</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[700.89px] not-italic text-[#364153] text-[14px] text-right top-[21px] whitespace-nowrap">20</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[829.21px] not-italic text-[#101828] text-[14px] text-right top-[21px] whitespace-nowrap">40</p>
      <WStockBadge7 />
    </div>
  );
}

function TableCell8() {
  return (
    <div className="[word-break:break-word] absolute h-[63.8px] left-0 not-italic top-0 w-[301.238px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Oil Filter — BMW N20</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[16px] text-[#6a7282] text-[12px] top-[33.4px]">Mann Filter</p>
    </div>
  );
}

function WStockBadge8() {
  return (
    <div className="absolute bg-[#ecfdf5] border-[#a4f4cf] border-[0.8px] border-solid content-stretch flex h-[22.1px] items-center left-[860.35px] px-[8px] py-[2px] rounded-[4px] top-[22.65px]" data-name="WStockBadge">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[#007a55] text-[11px] whitespace-nowrap">In Stock</p>
    </div>
  );
}

function TableRow9() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[63.8px] left-0 top-[551.3px] w-[977.6px]" data-name="Table Row">
      <TableCell8 />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[317.24px] text-[#364153] text-[12px] top-[22.7px] whitespace-nowrap">OF-BMW-N20</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[445.1px] not-italic text-[#364153] text-[14px] top-[21px] whitespace-nowrap">Filters</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[700.48px] not-italic text-[#364153] text-[14px] text-right top-[21px] whitespace-nowrap">8</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[828.86px] not-italic text-[#101828] text-[14px] text-right top-[21px] whitespace-nowrap">10</p>
      <WStockBadge8 />
    </div>
  );
}

function TableCell9() {
  return (
    <div className="[word-break:break-word] absolute h-[63.8px] left-0 not-italic top-0 w-[301.238px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Serpentine Belt — Hyundai Elantra</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[16px] text-[#6a7282] text-[12px] top-[33.4px]">Gates</p>
    </div>
  );
}

function WStockBadge9() {
  return (
    <div className="absolute bg-[#fffbeb] border-[#fee685] border-[0.8px] border-solid content-stretch flex h-[22.1px] items-center left-[860.35px] px-[8px] py-[2px] rounded-[4px] top-[22.65px]" data-name="WStockBadge">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[#bb4d00] text-[11px] whitespace-nowrap">Low Stock</p>
    </div>
  );
}

function TableRow10() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[63.8px] left-0 top-[615.1px] w-[977.6px]" data-name="Table Row">
      <TableCell9 />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[317.24px] text-[#364153] text-[12px] top-[22.7px] whitespace-nowrap">SB-HYU-001</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[445.1px] not-italic text-[#364153] text-[14px] top-[21px] whitespace-nowrap">Belts</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[700.11px] not-italic text-[#364153] text-[14px] text-right top-[21px] whitespace-nowrap">4</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[829.11px] not-italic text-[#e17100] text-[14px] text-right top-[21px] whitespace-nowrap">3</p>
      <WStockBadge9 />
    </div>
  );
}

function TableCell10() {
  return (
    <div className="[word-break:break-word] absolute h-[63.8px] left-0 not-italic top-0 w-[301.238px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">Spark Plug Iridium</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[16px] text-[#6a7282] text-[12px] top-[33.4px]">NGK</p>
    </div>
  );
}

function WStockBadge10() {
  return (
    <div className="absolute bg-[#fffbeb] border-[#fee685] border-[0.8px] border-solid content-stretch flex h-[22.1px] items-center left-[860.35px] px-[8px] py-[2px] rounded-[4px] top-[22.65px]" data-name="WStockBadge">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[#bb4d00] text-[11px] whitespace-nowrap">Low Stock</p>
    </div>
  );
}

function TableRow11() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[63.8px] left-0 top-[678.9px] w-[977.6px]" data-name="Table Row">
      <TableCell10 />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[317.24px] text-[#364153] text-[12px] top-[22.7px] whitespace-nowrap">SP-IRD-001</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[445.1px] not-italic text-[#364153] text-[14px] top-[21px] whitespace-nowrap">Ignition</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[700.48px] not-italic text-[#364153] text-[14px] text-right top-[21px] whitespace-nowrap">8</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[828.53px] not-italic text-[#e17100] text-[14px] text-right top-[21px] whitespace-nowrap">2</p>
      <WStockBadge10 />
    </div>
  );
}

function TableCell11() {
  return (
    <div className="[word-break:break-word] absolute h-[63.4px] left-0 not-italic top-0 w-[301.238px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[16px] text-[#101828] text-[14px] top-[12.4px]">{`Wiper Blade Set 24"+16"`}</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[16px] text-[#6a7282] text-[12px] top-[33.4px]">Bosch</p>
    </div>
  );
}

function WStockBadge11() {
  return (
    <div className="absolute bg-[#ecfdf5] border-[#a4f4cf] border-[0.8px] border-solid content-stretch flex h-[22.1px] items-center left-[860.35px] px-[8px] py-[2px] rounded-[4px] top-[22.65px]" data-name="WStockBadge">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[#007a55] text-[11px] whitespace-nowrap">In Stock</p>
    </div>
  );
}

function TableRow12() {
  return (
    <div className="absolute h-[63.4px] left-0 top-[742.7px] w-[977.6px]" data-name="Table Row">
      <TableCell11 />
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] left-[317.24px] text-[#364153] text-[12px] top-[22.7px] whitespace-nowrap">WB-SET-2416</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[445.1px] not-italic text-[#364153] text-[14px] top-[21px] whitespace-nowrap">Wipers</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[700.38px] not-italic text-[#364153] text-[14px] text-right top-[21px] whitespace-nowrap">6</p>
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[21px] left-[829.1px] not-italic text-[#101828] text-[14px] text-right top-[21px] whitespace-nowrap">9</p>
      <WStockBadge11 />
    </div>
  );
}

function Table() {
  return (
    <div className="h-[806.1px] relative shrink-0 w-full" data-name="Table">
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

function Container6() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[807.7px] items-start overflow-clip relative rounded-[10px] shrink-0 w-full" data-name="Container">
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

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start p-[24px] relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <ContainerMargin />
    </div>
  );
}

function WarehousePartsScreen() {
  return (
    <div className="absolute bg-[#f3f4f6] content-stretch flex flex-col h-[910px] items-start left-[168px] overflow-clip top-[56px] w-[1027px]" data-name="WarehousePartsScreen">
      <Container />
    </div>
  );
}

function App() {
  return (
    <div className="bg-[#f3f4f6] h-[1103px] relative shrink-0 w-[1195px]" data-name="App">
      <WarehousePartsScreen />
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

function Container8() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[28px]" data-name="Container">
      <Text />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex flex-col h-[15px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] not-italic overflow-hidden relative shrink-0 text-[12px] text-ellipsis text-white w-full whitespace-nowrap">Star Auto Center</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.4)] tracking-[0.5px] uppercase whitespace-nowrap">Warehouse</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[90px]" data-name="Container">
      <Paragraph />
      <Paragraph1 />
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

function Button1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[168px]" data-name="Button">
      <Text1 />
      <Text2 />
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[14.375px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">◫</p>
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] w-[102px]">Open Job Orders</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[168px]" data-name="Button">
      <Text3 />
      <Text4 />
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">▤</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Parts</p>
    </div>
  );
}

function Container11() {
  return <div className="absolute bg-[rgba(255,255,255,0.6)] h-[16px] left-[164px] rounded-[26843500px] top-[12px] w-[4px]" data-name="Container" />;
}

function Button3() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[168px]" data-name="Button">
      <Text5 />
      <Text6 />
      <Container11 />
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

function Button4() {
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

function Button5() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[168px]" data-name="Button">
      <Text9 />
      <Text10 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-[428.8_0_0] flex-col items-start min-h-px py-[8px] relative w-full" data-name="Container">
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
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

function Container14() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center relative rounded-[26843500px] shrink-0 size-[28px]" data-name="Container">
      <Text11 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex flex-col h-[16px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">Hassan Nour</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[14px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.4)] tracking-[0.5px] uppercase whitespace-nowrap">Warehouse</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[73.713px]" data-name="Container">
      <Paragraph2 />
      <Paragraph3 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Container15 />
    </div>
  );
}

function ContainerMargin1() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[12px] relative shrink-0 w-full" data-name="Container:margin">
      <Container13 />
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute h-[19.5px] left-0 top-[4px] w-[66.662px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-[33.5px] not-italic text-[13px] text-[rgba(255,255,255,0.4)] text-center top-[0.6px] whitespace-nowrap">→ Sign out</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Button6 />
    </div>
  );
}

function Container12() {
  return (
    <div className="border-[rgba(255,255,255,0.1)] border-solid border-t-[0.8px] content-stretch flex flex-col items-start p-[20px] relative shrink-0 w-full" data-name="Container">
      <ContainerMargin1 />
      <Container16 />
    </div>
  );
}

function WarehouseSidebar() {
  return (
    <div className="absolute bg-[#060f1e] content-stretch flex flex-col h-[1110px] items-start left-0 top-0 w-[168px]" data-name="WarehouseSidebar">
      <Container7 />
      <Container10 />
      <Container12 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 1">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[#111827] text-[18px] whitespace-nowrap">{`Parts & Inventory`}</p>
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

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[30px] not-italic relative shrink-0 text-[#6a7282] text-[20px] whitespace-nowrap">🔔</p>
      <Text12 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#111827] text-[13px] text-right whitespace-nowrap">Hassan Nour</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[14px] not-italic relative shrink-0 text-[#6a7282] text-[11px] text-right tracking-[0.5px] uppercase whitespace-nowrap">Warehouse</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[80.638px]" data-name="Container">
      <Paragraph4 />
      <Paragraph5 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Container18 />
      <Container19 />
    </div>
  );
}

function WarehouseHeader() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-b-[0.8px] border-solid content-stretch flex h-[56px] items-center justify-between left-[168px] px-[24px] top-0 w-[1027.2px]" data-name="WarehouseHeader">
      <Heading />
      <Container17 />
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