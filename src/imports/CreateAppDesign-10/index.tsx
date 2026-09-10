function TextInput() {
  return (
    <div className="absolute bg-white border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[37.6px] items-start justify-center left-0 overflow-clip pl-[36px] pr-[16px] py-[8px] rounded-[6px] top-0 w-[384px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] w-full">Search by name or phone…</p>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[37.6px] max-w-[384px] relative shrink-0 w-[384px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[12.11px] not-italic text-[#99a1af] text-[14px] top-[8.8px] whitespace-nowrap">🔍</p>
      <TextInput />
    </div>
  );
}

function HeaderCell() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[52.375px] left-0 top-0 w-[146.563px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[17.99px] tracking-[0.6px] uppercase whitespace-nowrap">Customer</p>
    </div>
  );
}

function HeaderCell1() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[52.375px] left-[146.56px] top-0 w-[124.4px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[17.99px] tracking-[0.6px] uppercase whitespace-nowrap">Phone</p>
    </div>
  );
}

function HeaderCell2() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[52.375px] left-[270.96px] top-0 w-[158.425px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[17.99px] tracking-[0.6px] uppercase whitespace-nowrap">Email</p>
    </div>
  );
}

function HeaderCell3() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[52.375px] left-[429.39px] top-0 w-[157.8px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[17.99px] tracking-[0.6px] uppercase whitespace-nowrap">Address</p>
    </div>
  );
}

function HeaderCell4() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[52.375px] left-[587.19px] top-0 w-[218.625px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[17.99px] tracking-[0.6px] uppercase whitespace-nowrap">Vehicles</p>
    </div>
  );
}

function HeaderCell5() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[52.375px] left-[805.81px] top-0 w-[114.988px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase w-[83px]">Total Visits</p>
    </div>
  );
}

function TableCell() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[68.775px] left-0 top-[52.38px] w-[146.563px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[14.39px] w-[115px]">Ahmed Mohamed</p>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[68.775px] left-[146.56px] top-[52.38px] w-[124.4px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[20px] left-[16px] text-[#364153] text-[14px] top-[24.19px] whitespace-nowrap">01012345678</p>
    </div>
  );
}

function TableCell2() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[68.775px] left-[270.96px] top-[52.38px] w-[158.425px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[24.99px] whitespace-nowrap">ahmed@email.com</p>
    </div>
  );
}

function TableCell3() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[68.775px] left-[429.39px] top-[52.38px] w-[157.8px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[24.99px] whitespace-nowrap">12 Tahrir St, Cairo</p>
    </div>
  );
}

function Code() {
  return (
    <div className="absolute bg-[#f3f4f6] content-stretch flex flex-col items-start left-[16px] px-[6px] py-[2px] rounded-[4px] top-[12.4px]" data-name="Code">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#4a5565] text-[12px] tracking-[0.3px] whitespace-nowrap">ABC 123</p>
    </div>
  );
}

function Code1() {
  return (
    <div className="absolute bg-[#f3f4f6] content-stretch flex flex-col items-start left-[84.5px] px-[6px] py-[2px] rounded-[4px] top-[12.4px]" data-name="Code">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#4a5565] text-[12px] tracking-[0.3px] whitespace-nowrap">XYZ 456</p>
    </div>
  );
}

function Code2() {
  return (
    <div className="absolute bg-[#f3f4f6] content-stretch flex flex-col items-start left-[16px] px-[6px] py-[2px] rounded-[4px] top-[36.39px]" data-name="Code">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#4a5565] text-[12px] tracking-[0.3px] whitespace-nowrap">DEF 789</p>
    </div>
  );
}

function TableCell4() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[68.775px] left-[587.19px] top-[52.38px] w-[218.625px]" data-name="Table Cell">
      <Code />
      <Code1 />
      <Code2 />
    </div>
  );
}

function TableCell5() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[68.775px] left-[805.81px] top-[52.38px] w-[114.988px]" data-name="Table Cell">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[57.24px] not-italic text-[#101828] text-[14px] text-center top-[24.99px] whitespace-nowrap">15</p>
    </div>
  );
}

function TableCell6() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[44.8px] left-0 top-[121.15px] w-[146.563px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[12.4px] whitespace-nowrap">Sara Hassan</p>
    </div>
  );
}

function TableCell7() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[44.8px] left-[146.56px] top-[121.15px] w-[124.4px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[20px] left-[16px] text-[#364153] text-[14px] top-[12.2px] whitespace-nowrap">01198765432</p>
    </div>
  );
}

function TableCell8() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[44.8px] left-[270.96px] top-[121.15px] w-[158.425px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[13px] whitespace-nowrap">sara@email.com</p>
    </div>
  );
}

function TableCell9() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[44.8px] left-[429.39px] top-[121.15px] w-[157.8px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[13px] whitespace-nowrap">5 Nile Ave, Giza</p>
    </div>
  );
}

function Code3() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-start px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="Code">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#4a5565] text-[12px] tracking-[0.3px] whitespace-nowrap">GHI 012</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex items-start left-[16px] top-[12.4px] w-[186.625px]" data-name="Container">
      <Code3 />
    </div>
  );
}

function TableCell10() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[44.8px] left-[587.19px] top-[121.15px] w-[218.625px]" data-name="Table Cell">
      <Container1 />
    </div>
  );
}

function TableCell11() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[44.8px] left-[805.81px] top-[121.15px] w-[114.988px]" data-name="Table Cell">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[57.63px] not-italic text-[#101828] text-[14px] text-center top-[13px] whitespace-nowrap">2</p>
    </div>
  );
}

function TableCell12() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-0 top-[165.95px] w-[146.563px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[22.4px] whitespace-nowrap">Mohamed Ali</p>
    </div>
  );
}

function TableCell13() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[146.56px] top-[165.95px] w-[124.4px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[20px] left-[16px] text-[#364153] text-[14px] top-[22.2px] whitespace-nowrap">01067891234</p>
    </div>
  );
}

function TableCell14() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[270.96px] top-[165.95px] w-[158.425px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[23px] whitespace-nowrap">mali@email.com</p>
    </div>
  );
}

function TableCell15() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[429.39px] top-[165.95px] w-[157.8px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[13px] w-[126px]">88 Ramses St, Cairo</p>
    </div>
  );
}

function Code4() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-start px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="Code">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#4a5565] text-[12px] tracking-[0.3px] whitespace-nowrap">JKL 345</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex items-start left-[16px] top-[22.4px] w-[186.625px]" data-name="Container">
      <Code4 />
    </div>
  );
}

function TableCell16() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[587.19px] top-[165.95px] w-[218.625px]" data-name="Table Cell">
      <Container2 />
    </div>
  );
}

function TableCell17() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[805.81px] top-[165.95px] w-[114.988px]" data-name="Table Cell">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[58.03px] not-italic text-[#101828] text-[14px] text-center top-[23px] whitespace-nowrap">1</p>
    </div>
  );
}

function TableCell18() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-0 top-[230.75px] w-[146.563px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[22.4px] whitespace-nowrap">Layla Karim</p>
    </div>
  );
}

function TableCell19() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[146.56px] top-[230.75px] w-[124.4px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[20px] left-[16px] text-[#364153] text-[14px] top-[22.2px] whitespace-nowrap">01156789012</p>
    </div>
  );
}

function TableCell20() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[270.96px] top-[230.75px] w-[158.425px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[23px] whitespace-nowrap">—</p>
    </div>
  );
}

function TableCell21() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[429.39px] top-[230.75px] w-[157.8px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[13px] w-[126px]">3 Garden City, Cairo</p>
    </div>
  );
}

function Code5() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-start px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="Code">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#4a5565] text-[12px] tracking-[0.3px] whitespace-nowrap">MNO 678</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex items-start left-[16px] top-[22.4px] w-[186.625px]" data-name="Container">
      <Code5 />
    </div>
  );
}

function TableCell22() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[587.19px] top-[230.75px] w-[218.625px]" data-name="Table Cell">
      <Container3 />
    </div>
  );
}

function TableCell23() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[805.81px] top-[230.75px] w-[114.988px]" data-name="Table Cell">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[57.82px] not-italic text-[#101828] text-[14px] text-center top-[23px] whitespace-nowrap">4</p>
    </div>
  );
}

function TableCell24() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[44.8px] left-0 top-[295.55px] w-[146.563px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[12.4px] whitespace-nowrap">Omar Farouk</p>
    </div>
  );
}

function TableCell25() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[44.8px] left-[146.56px] top-[295.55px] w-[124.4px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[20px] left-[16px] text-[#364153] text-[14px] top-[12.2px] whitespace-nowrap">01023456789</p>
    </div>
  );
}

function TableCell26() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[44.8px] left-[270.96px] top-[295.55px] w-[158.425px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[13px] whitespace-nowrap">—</p>
    </div>
  );
}

function TableCell27() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[44.8px] left-[429.39px] top-[295.55px] w-[157.8px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[13px] whitespace-nowrap">22 Maadi St, Cairo</p>
    </div>
  );
}

function Code6() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-start px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="Code">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#4a5565] text-[12px] tracking-[0.3px] whitespace-nowrap">PQR 901</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex items-start left-[16px] top-[12.4px] w-[186.625px]" data-name="Container">
      <Code6 />
    </div>
  );
}

function TableCell28() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[44.8px] left-[587.19px] top-[295.55px] w-[218.625px]" data-name="Table Cell">
      <Container4 />
    </div>
  );
}

function TableCell29() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[44.8px] left-[805.81px] top-[295.55px] w-[114.988px]" data-name="Table Cell">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[57.04px] not-italic text-[#101828] text-[14px] text-center top-[13px] whitespace-nowrap">3</p>
    </div>
  );
}

function Table() {
  return (
    <div className="h-[340.75px] overflow-clip relative shrink-0 w-full" data-name="Table">
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

function CustomersView() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1280px] p-[24px] relative shrink-0 w-[970.4px]" data-name="CustomersView">
      <Container />
      <CardMargin />
    </div>
  );
}

function App() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col h-[688px] items-start pl-[224px] pt-[56px] relative shrink-0 w-[1194.4px]" data-name="App">
      <CustomersView />
    </div>
  );
}

function Container6() {
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
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.4)] tracking-[0.5px] uppercase whitespace-nowrap">Engineer</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[96.563px]" data-name="Container">
      <Paragraph />
      <Paragraph1 />
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

function Button() {
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
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">◉</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Customers</p>
    </div>
  );
}

function Container9() {
  return <div className="bg-[rgba(255,255,255,0.6)] h-[16px] relative rounded-[26843500px] shrink-0 w-[4px]" data-name="Container" />;
}

function ContainerAlign() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-w-px relative" data-name="Container:align">
      <Container9 />
    </div>
  );
}

function Container8() {
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
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">◈</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Vehicles</p>
    </div>
  );
}

function Button1() {
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
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">◫</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Job Orders</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-[224px]" data-name="Button">
      <Text6 />
      <Text7 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="content-stretch flex flex-[515.413_0_0] flex-col items-start min-h-px overflow-clip py-[16px] relative w-full" data-name="Navigation">
      <Button />
      <Container8 />
      <Button1 />
      <Button2 />
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center relative rounded-[26843500px] shrink-0 size-[28px]" data-name="Container">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">KS</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex flex-col h-[15.988px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.8)] whitespace-nowrap">Karim Samir</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.35)] tracking-[0.5px] uppercase whitespace-nowrap">Engineer</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-[146_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Paragraph2 />
      <Paragraph3 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-[184px]" data-name="Container">
      <Container12 />
      <Container13 />
    </div>
  );
}

function ContainerMargin() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[12px] relative shrink-0 w-full" data-name="Container:margin">
      <Container11 />
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

function Container14() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Button3 />
    </div>
  );
}

function Container10() {
  return (
    <div className="border-[rgba(255,255,255,0.1)] border-solid border-t-[0.8px] content-stretch flex flex-col items-start px-[20px] py-[16px] relative shrink-0 w-full" data-name="Container">
      <ContainerMargin />
      <Container14 />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="absolute bg-[#060f1e] content-stretch flex flex-col h-[688px] items-start left-0 top-0 w-[224px]" data-name="Sidebar">
      <Container5 />
      <Navigation />
      <Container10 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start pr-[16px] relative shrink-0 w-[91px]" data-name="Heading 1">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Customers</p>
    </div>
  );
}

function TextInput1() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[33.6px] items-start justify-center left-0 overflow-clip pl-[32px] pr-[16px] py-[6px] rounded-[10px] top-0 w-[448px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] w-full">Search vehicle, customer, job order…</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="flex-[448_0_0] h-[33.6px] max-w-[448px] min-w-px relative" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[12.24px] not-italic text-[#99a1af] text-[12px] top-[8.8px] whitespace-nowrap">🔍</p>
      <TextInput1 />
    </div>
  );
}

function Text8() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] text-center whitespace-nowrap">🔔</p>
    </div>
  );
}

function Text9() {
  return <div className="absolute bg-[#fb2c36] border-[0.8px] border-solid border-white left-[20px] rounded-[26843500px] size-[8px] top-[4px]" data-name="Text" />;
}

function Button4() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[26843500px] shrink-0 size-[32px]" data-name="Button">
      <Text8 />
      <Text9 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#101828] text-[12px] text-right whitespace-nowrap">Karim Samir</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] capitalize font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[#99a1af] text-[10px] text-right whitespace-nowrap">engineer</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[69.575px]" data-name="Container">
      <Paragraph4 />
      <Paragraph5 />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Button4 />
      <Container17 />
    </div>
  );
}

function ContainerAlign1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-w-px relative" data-name="Container:align">
      <Container16 />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-b-[0.8px] border-solid content-stretch flex gap-[16px] h-[56px] items-center left-[224px] px-[24px] top-0 w-[970.4px]" data-name="Header">
      <Heading />
      <Container15 />
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