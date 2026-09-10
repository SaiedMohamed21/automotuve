function TextInput() {
  return (
    <div className="absolute bg-white border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col h-[37.6px] items-start justify-center left-0 overflow-clip pl-[36px] pr-[16px] py-[8px] rounded-[6px] top-0 w-[384px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[14px] w-full">Search by plate, make, model…</p>
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
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-0 top-0 w-[171.313px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Vehicle</p>
    </div>
  );
}

function HeaderCell1() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[171.31px] top-0 w-[83.125px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Plate</p>
    </div>
  );
}

function HeaderCell2() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[254.44px] top-0 w-[138.25px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">VIN</p>
    </div>
  );
}

function HeaderCell3() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[392.69px] top-0 w-[145.813px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Customer</p>
    </div>
  );
}

function HeaderCell4() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[538.5px] top-0 w-[104.375px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Color</p>
    </div>
  );
}

function HeaderCell5() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[642.88px] top-0 w-[90.8px]" data-name="Header Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[75.09px] not-italic text-[#6a7282] text-[12px] text-right top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">KM</p>
    </div>
  );
}

function HeaderCell6() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[733.68px] top-0 w-[74.475px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Visits</p>
    </div>
  );
}

function HeaderCell7() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#f3f4f6] border-b-[0.8px] border-solid h-[36.388px] left-[808.15px] top-0 w-[112.65px]" data-name="Header Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[16px] not-italic text-[#6a7282] text-[12px] top-[10px] tracking-[0.6px] uppercase whitespace-nowrap">Last Visit</p>
    </div>
  );
}

function TableCell() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[80.787px] left-0 not-italic top-[36.39px] w-[171.313px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[22.4px]">BMW 320i</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[42.4px]">2018</p>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[80.787px] left-[171.31px] top-[36.39px] w-[83.125px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[16px] left-[16px] text-[#0f2340] text-[12px] top-[22.59px] tracking-[0.3px] w-[52px]">ABC 123</p>
    </div>
  );
}

function TableCell2() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[80.787px] left-[254.44px] top-[36.39px] w-[138.25px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[13.333px] left-[16px] text-[#6a7282] text-[10px] top-[34.19px] tracking-[0.25px] whitespace-nowrap">WBA8E9C57JA123456</p>
    </div>
  );
}

function TableCell3() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[80.787px] left-[392.69px] not-italic top-[36.39px] w-[145.813px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[12.4px] w-[114px]">Ahmed Mohamed</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[52.4px] whitespace-nowrap">01012345678</p>
    </div>
  );
}

function TableCell4() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[80.787px] left-[538.5px] top-[36.39px] w-[104.375px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[30.99px] whitespace-nowrap">Silver</p>
    </div>
  );
}

function TableCell5() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[80.787px] left-[642.88px] top-[36.39px] w-[90.8px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[20px] left-[75px] text-[#364153] text-[14px] text-right top-[30.19px] whitespace-nowrap">125,430</p>
    </div>
  );
}

function TableCell6() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[80.787px] left-[733.68px] top-[36.39px] w-[74.475px]" data-name="Table Cell">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[37.27px] not-italic text-[#364153] text-[14px] text-center top-[30.99px] whitespace-nowrap">7</p>
    </div>
  );
}

function TableCell7() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[80.787px] left-[808.15px] top-[36.39px] w-[112.65px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[20.99px] w-[81px]">08 Aug 2026</p>
    </div>
  );
}

function TableCell8() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[80.787px] left-0 not-italic top-[117.17px] w-[171.313px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[12.4px] w-[140px]">Mercedes-Benz C200</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[52.4px] whitespace-nowrap">2020</p>
    </div>
  );
}

function TableCell9() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[80.787px] left-[171.31px] top-[117.17px] w-[83.125px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[16px] left-[16px] text-[#0f2340] text-[12px] top-[22.59px] tracking-[0.3px] w-[52px]">XYZ 456</p>
    </div>
  );
}

function TableCell10() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[80.787px] left-[254.44px] top-[117.17px] w-[138.25px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[13.333px] left-[16px] text-[#6a7282] text-[10px] top-[34.19px] tracking-[0.25px] whitespace-nowrap">WDD2050572R234567</p>
    </div>
  );
}

function TableCell11() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[80.787px] left-[392.69px] not-italic top-[117.17px] w-[145.813px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[12.4px] w-[114px]">Ahmed Mohamed</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[52.4px] whitespace-nowrap">01012345678</p>
    </div>
  );
}

function TableCell12() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[80.787px] left-[538.5px] top-[117.17px] w-[104.375px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[30.99px] whitespace-nowrap">Black</p>
    </div>
  );
}

function TableCell13() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[80.787px] left-[642.88px] top-[117.17px] w-[90.8px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[20px] left-[75.4px] text-[#364153] text-[14px] text-right top-[30.19px] whitespace-nowrap">87,200</p>
    </div>
  );
}

function TableCell14() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[80.787px] left-[733.68px] top-[117.17px] w-[74.475px]" data-name="Table Cell">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[37.41px] not-italic text-[#364153] text-[14px] text-center top-[30.99px] whitespace-nowrap">3</p>
    </div>
  );
}

function TableCell15() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[80.787px] left-[808.15px] top-[117.17px] w-[112.65px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[30.99px] whitespace-nowrap">02 Jul 2026</p>
    </div>
  );
}

function TableCell16() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[80.787px] left-0 not-italic top-[197.96px] w-[171.313px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[22.4px]">Toyota Corolla</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[42.4px]">2019</p>
    </div>
  );
}

function TableCell17() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[80.787px] left-[171.31px] top-[197.96px] w-[83.125px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[16px] left-[16px] text-[#0f2340] text-[12px] top-[22.59px] tracking-[0.3px] w-[52px]">DEF 789</p>
    </div>
  );
}

function TableCell18() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[80.787px] left-[254.44px] top-[197.96px] w-[138.25px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[13.333px] left-[16px] text-[#6a7282] text-[10px] top-[34.19px] tracking-[0.25px] whitespace-nowrap">JTDBT4K37J0345678</p>
    </div>
  );
}

function TableCell19() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[80.787px] left-[392.69px] not-italic top-[197.96px] w-[145.813px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[12.4px] w-[114px]">Ahmed Mohamed</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[52.4px] whitespace-nowrap">01012345678</p>
    </div>
  );
}

function TableCell20() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[80.787px] left-[538.5px] top-[197.96px] w-[104.375px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[30.99px] whitespace-nowrap">White</p>
    </div>
  );
}

function TableCell21() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[80.787px] left-[642.88px] top-[197.96px] w-[90.8px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[20px] left-[75px] text-[#364153] text-[14px] text-right top-[30.19px] whitespace-nowrap">142,100</p>
    </div>
  );
}

function TableCell22() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[80.787px] left-[733.68px] top-[197.96px] w-[74.475px]" data-name="Table Cell">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[37.57px] not-italic text-[#364153] text-[14px] text-center top-[30.99px] whitespace-nowrap">5</p>
    </div>
  );
}

function TableCell23() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[80.787px] left-[808.15px] top-[197.96px] w-[112.65px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[20.99px] w-[81px]">15 Jun 2026</p>
    </div>
  );
}

function TableCell24() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-0 not-italic top-[278.75px] w-[171.313px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[14.4px]">Hyundai Elantra</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[34.4px]">2021</p>
    </div>
  );
}

function TableCell25() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[171.31px] top-[278.75px] w-[83.125px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[16px] left-[16px] text-[#0f2340] text-[12px] top-[14.6px] tracking-[0.3px] w-[52px]">GHI 012</p>
    </div>
  );
}

function TableCell26() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[254.44px] top-[278.75px] w-[138.25px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[13.333px] left-[16px] text-[#6a7282] text-[10px] top-[26.2px] tracking-[0.25px] whitespace-nowrap">KMHD84LF1MU456789</p>
    </div>
  );
}

function TableCell27() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[392.69px] not-italic top-[278.75px] w-[145.813px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[14.4px]">Sara Hassan</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[34.4px]">01198765432</p>
    </div>
  );
}

function TableCell28() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[538.5px] top-[278.75px] w-[104.375px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[23px] whitespace-nowrap">Gray</p>
    </div>
  );
}

function TableCell29() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[642.88px] top-[278.75px] w-[90.8px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[20px] left-[75.4px] text-[#364153] text-[14px] text-right top-[22.2px] whitespace-nowrap">45,200</p>
    </div>
  );
}

function TableCell30() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[733.68px] top-[278.75px] w-[74.475px]" data-name="Table Cell">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[37.46px] not-italic text-[#364153] text-[14px] text-center top-[23px] whitespace-nowrap">2</p>
    </div>
  );
}

function TableCell31() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[808.15px] top-[278.75px] w-[112.65px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[13px] w-[81px]">05 Aug 2026</p>
    </div>
  );
}

function TableCell32() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-0 not-italic top-[343.55px] w-[171.313px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[14.4px]">Kia Sportage</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[34.4px]">2022</p>
    </div>
  );
}

function TableCell33() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[171.31px] top-[343.55px] w-[83.125px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[16px] left-[16px] text-[#0f2340] text-[12px] top-[14.6px] tracking-[0.3px] w-[52px]">JKL 345</p>
    </div>
  );
}

function TableCell34() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[254.44px] top-[343.55px] w-[138.25px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[13.333px] left-[16px] text-[#6a7282] text-[10px] top-[26.2px] tracking-[0.25px] whitespace-nowrap">KNDPMCAC4N7567890</p>
    </div>
  );
}

function TableCell35() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[392.69px] not-italic top-[343.55px] w-[145.813px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[14.4px]">Mohamed Ali</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[34.4px]">01067891234</p>
    </div>
  );
}

function TableCell36() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[538.5px] top-[343.55px] w-[104.375px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[23px] whitespace-nowrap">Blue</p>
    </div>
  );
}

function TableCell37() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[642.88px] top-[343.55px] w-[90.8px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[20px] left-[75.4px] text-[#364153] text-[14px] text-right top-[22.2px] whitespace-nowrap">31,800</p>
    </div>
  );
}

function TableCell38() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[733.68px] top-[343.55px] w-[74.475px]" data-name="Table Cell">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[37.89px] not-italic text-[#364153] text-[14px] text-center top-[23px] whitespace-nowrap">1</p>
    </div>
  );
}

function TableCell39() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[808.15px] top-[343.55px] w-[112.65px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[13px] w-[81px]">01 Aug 2026</p>
    </div>
  );
}

function TableCell40() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-0 not-italic top-[408.35px] w-[171.313px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[14.4px]">Nissan Altima</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[34.4px]">2019</p>
    </div>
  );
}

function TableCell41() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[171.31px] top-[408.35px] w-[83.125px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[16px] left-[16px] text-[#0f2340] text-[12px] top-[14.6px] tracking-[0.3px] w-[52px]">MNO 678</p>
    </div>
  );
}

function TableCell42() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[254.44px] top-[408.35px] w-[138.25px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[13.333px] left-[16px] text-[#6a7282] text-[10px] top-[26.2px] tracking-[0.25px] whitespace-nowrap">1N4AL3AP1KN678901</p>
    </div>
  );
}

function TableCell43() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[392.69px] not-italic top-[408.35px] w-[145.813px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[14.4px]">Layla Karim</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[34.4px]">01156789012</p>
    </div>
  );
}

function TableCell44() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[538.5px] top-[408.35px] w-[104.375px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[23px] whitespace-nowrap">Red</p>
    </div>
  );
}

function TableCell45() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[642.88px] top-[408.35px] w-[90.8px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[20px] left-[75.4px] text-[#364153] text-[14px] text-right top-[22.2px] whitespace-nowrap">98,400</p>
    </div>
  );
}

function TableCell46() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[733.68px] top-[408.35px] w-[74.475px]" data-name="Table Cell">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[38.21px] not-italic text-[#364153] text-[14px] text-center top-[23px] whitespace-nowrap">4</p>
    </div>
  );
}

function TableCell47() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[808.15px] top-[408.35px] w-[112.65px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[23px] whitespace-nowrap">28 Jul 2026</p>
    </div>
  );
}

function TableCell48() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-0 not-italic top-[473.15px] w-[171.313px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[14.4px]">Toyota Camry</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[34.4px]">2020</p>
    </div>
  );
}

function TableCell49() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[171.31px] top-[473.15px] w-[83.125px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[16px] left-[16px] text-[#0f2340] text-[12px] top-[14.6px] tracking-[0.3px] w-[52px]">PQR 901</p>
    </div>
  );
}

function TableCell50() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[254.44px] top-[473.15px] w-[138.25px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[13.333px] left-[16px] text-[#6a7282] text-[10px] top-[26.2px] tracking-[0.25px] whitespace-nowrap">4T1BF1FK4LU789012</p>
    </div>
  );
}

function TableCell51() {
  return (
    <div className="[word-break:break-word] absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[392.69px] not-italic top-[473.15px] w-[145.813px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] text-[#101828] text-[14px] top-[14.4px]">Omar Farouk</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[16px] text-[#99a1af] text-[12px] top-[34.4px]">01023456789</p>
    </div>
  );
}

function TableCell52() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[538.5px] top-[473.15px] w-[104.375px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[13px] w-[73px]">Pearl White</p>
    </div>
  );
}

function TableCell53() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[642.88px] top-[473.15px] w-[90.8px]" data-name="Table Cell">
      <p className="-translate-x-full [word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[20px] left-[75.4px] text-[#364153] text-[14px] text-right top-[22.2px] whitespace-nowrap">67,300</p>
    </div>
  );
}

function TableCell54() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[733.68px] top-[473.15px] w-[74.475px]" data-name="Table Cell">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[37.41px] not-italic text-[#364153] text-[14px] text-center top-[23px] whitespace-nowrap">3</p>
    </div>
  );
}

function TableCell55() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[0.8px] border-solid h-[64.8px] left-[808.15px] top-[473.15px] w-[112.65px]" data-name="Table Cell">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[13px] w-[81px]">10 Aug 2026</p>
    </div>
  );
}

function Table() {
  return (
    <div className="h-[538.35px] overflow-clip relative shrink-0 w-full" data-name="Table">
      <HeaderCell />
      <HeaderCell1 />
      <HeaderCell2 />
      <HeaderCell3 />
      <HeaderCell4 />
      <HeaderCell5 />
      <HeaderCell6 />
      <HeaderCell7 />
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
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.4)] tracking-[0.5px] uppercase whitespace-nowrap">Engineer</p>
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
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">◉</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Customers</p>
    </div>
  );
}

function Button1() {
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
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">◈</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Vehicles</p>
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
      <Text4 />
      <Text5 />
      <ContainerAlign />
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
      <Button1 />
      <Container4 />
      <Button2 />
    </div>
  );
}

function Container8() {
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

function Container9() {
  return (
    <div className="content-stretch flex flex-[146_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Paragraph2 />
      <Paragraph3 />
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

function Button3() {
  return (
    <div className="absolute h-[15.988px] left-0 top-[5.6px] w-[184px]" data-name="Button">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.35)] top-0 whitespace-nowrap">→ Sign out</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Button3 />
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
    <div className="absolute bg-[#060f1e] content-stretch flex flex-col h-[688px] items-start left-0 top-0 w-[224px]" data-name="Sidebar">
      <Container1 />
      <Navigation />
      <Container6 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start pr-[16px] relative shrink-0 w-[74px]" data-name="Heading 1">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Vehicles</p>
    </div>
  );
}

function TextInput1() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[33.6px] items-start justify-center left-0 overflow-clip pl-[32px] pr-[16px] py-[6px] rounded-[10px] top-0 w-[448px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px] w-full">abc</p>
    </div>
  );
}

function Container11() {
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

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[69.575px]" data-name="Container">
      <Paragraph4 />
      <Paragraph5 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Button4 />
      <Container13 />
    </div>
  );
}

function ContainerAlign1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-w-px relative" data-name="Container:align">
      <Container12 />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-b-[0.8px] border-solid content-stretch flex gap-[16px] h-[56px] items-center left-[224px] px-[24px] top-0 w-[970.4px]" data-name="Header">
      <Heading />
      <Container11 />
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