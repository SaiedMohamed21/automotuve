function Button() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-center whitespace-nowrap">← Back</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#101828] text-[0px] whitespace-nowrap">
        <span className="leading-[30px] text-[20px]">{`BMW 320i `}</span>
        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[30px] text-[#99a1af] text-[20px]">2018</span>
      </p>
    </div>
  );
}

function Text() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#364153] text-[12px] tracking-[0.3px] whitespace-nowrap">ABC 123</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[#99a1af] text-[14px] whitespace-nowrap">Silver</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[12px] h-[26px] items-center pt-[4px] relative shrink-0 w-[151.613px]" data-name="Container">
      <Text />
      <Text1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[151.613px]" data-name="Container">
      <Heading />
      <Container2 />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center whitespace-nowrap">+ New Job Order</p>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex h-[72px] items-start justify-between pt-[16px] relative shrink-0 w-[923.2px]" data-name="Container">
      <Container1 />
      <Button1 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[#99a1af] text-[11px] tracking-[0.6px] uppercase whitespace-nowrap">VEHICLE DETAILS</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[#6a7282] text-[14px] whitespace-nowrap">VIN</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[21px] relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">WBA8E9C57JA123456</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="border-[#f3f4f6] border-b-[0.8px] border-solid content-stretch flex items-center justify-between py-[8px] relative shrink-0 w-full" data-name="Container">
      <Text2 />
      <Text3 />
    </div>
  );
}

function ContainerMargin1() {
  return (
    <div className="content-stretch flex flex-col items-center pt-[12px] relative shrink-0 w-full" data-name="Container:margin">
      <Container5 />
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[#6a7282] text-[14px] whitespace-nowrap">Color</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Silver</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="border-[#f3f4f6] border-b-[0.8px] border-solid content-stretch flex items-center justify-between py-[8px] relative shrink-0 w-full" data-name="Container">
      <Text4 />
      <Text5 />
    </div>
  );
}

function Text6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[#6a7282] text-[14px] whitespace-nowrap">Odometer</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[21px] relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">125,430 km</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex items-center justify-between py-[8px] relative shrink-0 w-full" data-name="Container">
      <Text6 />
      <Text7 />
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid col-1 content-stretch flex flex-col items-start justify-self-stretch p-[20px] relative rounded-[12px] row-1 self-stretch shrink-0" data-name="Container">
      <Paragraph />
      <ContainerMargin1 />
      <Container6 />
      <Container7 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[#99a1af] text-[11px] tracking-[0.6px] uppercase whitespace-nowrap">OWNER</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] not-italic relative shrink-0 text-[#1447e6] text-[13px] text-center whitespace-nowrap">Edit</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Paragraph1 />
      <Button2 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex flex-col h-[36px] items-start pt-[12px] relative shrink-0 w-[412px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#101828] text-[16px] whitespace-nowrap">Ahmed Mohamed</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex flex-col h-[37px] items-start pb-[12px] pt-[4px] relative shrink-0 w-[412px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[21px] relative shrink-0 text-[#6a7282] text-[14px] whitespace-nowrap">01012345678</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute h-[19.5px] left-0 top-[4px] w-[149.838px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-[75px] not-italic text-[#1447e6] text-[13px] text-center top-[0.6px] whitespace-nowrap">View customer profile →</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[48.6px] relative shrink-0 w-full" data-name="Container">
      <Button3 />
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid col-2 content-stretch flex flex-col items-start justify-self-stretch p-[20px] relative rounded-[12px] row-1 self-stretch shrink-0" data-name="Container">
      <Container9 />
      <Paragraph2 />
      <Paragraph3 />
      <Container10 />
    </div>
  );
}

function Container3() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[__453.60px_453.60px] grid-rows-[_182.70px] relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Container8 />
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

function Text8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[#99a1af] text-[11px] tracking-[0.6px] uppercase whitespace-nowrap">TOTAL VISITS</p>
    </div>
  );
}

function Text9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[#99a1af] text-[14px] whitespace-nowrap">◫</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text8 />
      <Text9 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex flex-col h-[56px] items-start pt-[8px] relative shrink-0 w-[177.2px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[48px] not-italic relative shrink-0 text-[#101828] text-[32px] whitespace-nowrap">7</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid col-1 content-stretch flex flex-col items-start justify-self-stretch p-[20px] relative rounded-[12px] row-1 self-stretch shrink-0" data-name="Container">
      <Container13 />
      <Paragraph4 />
    </div>
  );
}

function Text10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[#99a1af] text-[11px] tracking-[0.6px] uppercase whitespace-nowrap">LAST SERVICE</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text10 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex flex-col h-[41px] items-start pt-[8px] relative shrink-0 w-[177.2px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[33px] not-italic relative shrink-0 text-[#101828] text-[22px] whitespace-nowrap">08 Aug 2026</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid col-2 content-stretch flex flex-col items-start justify-self-stretch p-[20px] relative rounded-[12px] row-1 self-stretch shrink-0" data-name="Container">
      <Container15 />
      <Paragraph5 />
    </div>
  );
}

function Text11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[#99a1af] text-[11px] tracking-[0.6px] uppercase whitespace-nowrap">COMPLETED ITEMS</p>
    </div>
  );
}

function Text12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[#99a1af] text-[14px] whitespace-nowrap">✓</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text11 />
      <Text12 />
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="content-stretch flex flex-col h-[56px] items-start pt-[8px] relative shrink-0 w-[177.2px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[48px] not-italic relative shrink-0 text-[#096] text-[32px] whitespace-nowrap">1</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid col-3 content-stretch flex flex-col items-start justify-self-stretch p-[20px] relative rounded-[12px] row-1 self-stretch shrink-0" data-name="Container">
      <Container17 />
      <Paragraph6 />
    </div>
  );
}

function Text13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[#99a1af] text-[11px] tracking-[0.6px] uppercase whitespace-nowrap">DEFERRED ITEMS</p>
    </div>
  );
}

function Text14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[#99a1af] text-[14px] whitespace-nowrap">⏳</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text13 />
      <Text14 />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="content-stretch flex flex-col h-[56px] items-start pt-[8px] relative shrink-0 w-[177.2px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[48px] not-italic relative shrink-0 text-[#fe9a00] text-[32px] whitespace-nowrap">4</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid col-4 content-stretch flex flex-col items-start justify-self-stretch p-[20px] relative rounded-[12px] row-1 self-stretch shrink-0" data-name="Container">
      <Container19 />
      <Paragraph7 />
    </div>
  );
}

function Container11() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[____218.80px_218.80px_218.80px_218.80px] grid-rows-[_118.60px] relative shrink-0 w-full" data-name="Container">
      <Container12 />
      <Container14 />
      <Container16 />
      <Container18 />
    </div>
  );
}

function ContainerMargin2() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-name="Container:margin">
      <Container11 />
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute bg-white border-[#d1d5dc] border-[0.8px] border-solid content-stretch flex flex-col items-center justify-center left-[755.2px] px-[16px] py-[8px] rounded-[8px] top-[7.9px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#101828] text-[14px] text-center whitespace-nowrap">Print Job Orders</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="border-[#f3f4f6] border-b-[0.8px] border-solid h-[54px] relative shrink-0 w-full" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-[20px] not-italic text-[#101828] text-[14px] top-[16px] whitespace-nowrap">SERVICE HISTORY</p>
      <Button4 />
    </div>
  );
}

function TableRow() {
  return (
    <div className="[word-break:break-word] absolute border-[#f3f4f6] border-b-[0.8px] border-solid font-['Inter:Semi_Bold',sans-serif] font-semibold h-[40.9px] leading-[16.5px] left-0 not-italic text-[#99a1af] text-[11px] top-0 tracking-[0.6px] uppercase w-[921.6px] whitespace-nowrap" data-name="Table Row">
      <p className="absolute left-[20px] top-[12.6px]">JOB ORDER</p>
      <p className="absolute left-[235.49px] top-[12.6px]">DATE</p>
      <p className="absolute left-[427.23px] top-[12.6px]">KM</p>
      <p className="absolute left-[577.79px] top-[12.6px]">INSPECTION</p>
      <p className="absolute left-[750.31px] top-[12.6px]">STATUS</p>
    </div>
  );
}

function StatusBadge() {
  return (
    <div className="absolute bg-[#eff6ff] border-[#bedbff] border-[0.8px] border-solid content-stretch flex h-[23.6px] items-center left-[750.31px] px-[10px] py-[2px] rounded-[26843500px] top-[15.2px]" data-name="StatusBadge">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[#1447e6] text-[12px] whitespace-nowrap">Open</p>
    </div>
  );
}

function TableRow1() {
  return (
    <div className="absolute border-[#f3f4f6] border-b-[0.8px] border-solid h-[51.2px] left-0 top-[40.9px] w-[921.6px]" data-name="Table Row">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[19.5px] left-[20px] text-[#1447e6] text-[13px] top-[15.65px] whitespace-nowrap">JO-2026-00125</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[235.49px] not-italic text-[#364153] text-[14px] top-[14.7px] whitespace-nowrap">12 Aug 2026</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[21px] left-[427.23px] text-[#364153] text-[14px] top-[13.9px] whitespace-nowrap">125,430</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[577.79px] not-italic text-[#6a7282] text-[14px] top-[14.7px] whitespace-nowrap">0/4 items</p>
      <StatusBadge />
    </div>
  );
}

function StatusBadge1() {
  return (
    <div className="absolute bg-[#ecfdf5] border-[#a4f4cf] border-[0.8px] border-solid content-stretch flex h-[23.6px] items-center left-[750.31px] px-[10px] py-[2px] rounded-[26843500px] top-[15.2px]" data-name="StatusBadge">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] not-italic relative shrink-0 text-[#007a55] text-[12px] whitespace-nowrap">Completed</p>
    </div>
  );
}

function TableRow2() {
  return (
    <div className="absolute h-[50.8px] left-0 top-[92.1px] w-[921.6px]" data-name="Table Row">
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[19.5px] left-[20px] text-[#1447e6] text-[13px] top-[15.65px] whitespace-nowrap">JO-2026-00120</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[235.49px] not-italic text-[#364153] text-[14px] top-[14.7px] whitespace-nowrap">08 Aug 2026</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[21px] left-[427.23px] text-[#364153] text-[14px] top-[13.9px] whitespace-nowrap">124,800</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[577.79px] not-italic text-[#6a7282] text-[14px] top-[14.7px] whitespace-nowrap">2/4 items</p>
      <StatusBadge1 />
    </div>
  );
}

function Table() {
  return (
    <div className="h-[142.9px] relative shrink-0 w-full" data-name="Table">
      <TableRow />
      <TableRow1 />
      <TableRow2 />
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[201.5px] items-start overflow-clip relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <Container21 />
      <Table />
    </div>
  );
}

function ContainerMargin3() {
  return (
    <div className="content-stretch flex flex-col h-[242px] items-start pt-[20px] relative shrink-0 w-full" data-name="Container:margin">
      <Container20 />
    </div>
  );
}

function Text15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#fe9a00] text-[16px] whitespace-nowrap">⏳</p>
    </div>
  );
}

function Text16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">DEFERRED WORK</p>
    </div>
  );
}

function Text17() {
  return (
    <div className="bg-[#fef3c6] content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-[26843500px] shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] not-italic relative shrink-0 text-[#bb4d00] text-[11px] whitespace-nowrap">4 items</p>
    </div>
  );
}

function Text18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">Work recommended in previous visits that has not been completed yet.</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="border-[#f3f4f6] border-b-[0.8px] border-solid content-stretch flex gap-[12px] items-center px-[20px] py-[16px] relative shrink-0 w-full" data-name="Container">
      <Text15 />
      <Text16 />
      <Text17 />
      <Text18 />
    </div>
  );
}

function TableRow3() {
  return (
    <div className="[word-break:break-word] absolute border-[#f3f4f6] border-b-[0.8px] border-solid font-['Inter:Semi_Bold',sans-serif] font-semibold h-[57.4px] leading-[16.5px] left-0 not-italic text-[#99a1af] text-[11px] top-0 tracking-[0.6px] uppercase w-[921.6px]" data-name="Table Row">
      <p className="absolute left-[20px] top-[20.85px] whitespace-nowrap">WORK ITEM</p>
      <p className="absolute left-[299.9px] top-[20.85px] whitespace-nowrap">DATE</p>
      <p className="absolute left-[396.08px] top-[12.6px] w-[68px]">JOB ORDER</p>
      <p className="absolute left-[503.5px] top-[20.85px] whitespace-nowrap">KM</p>
      <p className="absolute left-[598.1px] top-[12.6px] w-[105px]">RECOMMENDED BY</p>
      <p className="absolute left-[742.54px] top-[20.85px] whitespace-nowrap">STATUS</p>
      <p className="absolute left-[855.26px] top-[20.85px] whitespace-nowrap">ACTION</p>
    </div>
  );
}

function TableCell() {
  return (
    <div className="[word-break:break-word] absolute h-[63.8px] left-0 not-italic top-0 w-[279.9px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[20px] text-[#101828] text-[14px] top-[12.4px]">Brake Pads (Front)</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[20px] text-[#99a1af] text-[12px] top-[33.4px]">Heavy wear observed</p>
    </div>
  );
}

function Text19() {
  return (
    <div className="absolute bg-[#fffbeb] border-[#fee685] border-[0.8px] border-solid h-[20.8px] left-[742.54px] rounded-[26843500px] top-[23.5px] w-[72.725px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] left-[10px] not-italic text-[#bb4d00] text-[12px] top-px whitespace-nowrap">Deferred</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute h-[19.5px] left-[855.26px] top-[23.9px] w-[46.075px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-[23.5px] not-italic text-[#1447e6] text-[13px] text-center top-[0.6px] whitespace-nowrap">View →</p>
    </div>
  );
}

function TableRow4() {
  return (
    <div className="absolute border-[#f3f4f6] border-b-[0.8px] border-solid h-[63.8px] left-0 top-[57.4px] w-[921.6px]" data-name="Table Row">
      <TableCell />
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-[299.9px] not-italic text-[#364153] text-[13px] top-[13px] w-[57px]">12 Aug 2026</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[18px] left-[396.08px] text-[#0f2340] text-[12px] top-[13.7px] w-[68px]">JO-2026-00125</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[19.5px] left-[503.5px] text-[#364153] text-[13px] top-[21.95px] whitespace-nowrap">125,430</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[598.1px] not-italic text-[#364153] text-[14px] top-[21px] whitespace-nowrap">Karim Samir</p>
      <Text19 />
      <Button5 />
    </div>
  );
}

function TableCell1() {
  return (
    <div className="[word-break:break-word] absolute h-[63.8px] left-0 not-italic top-0 w-[279.9px] whitespace-nowrap" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[20px] text-[#101828] text-[14px] top-[12.4px]">Wheel Alignment</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[20px] text-[#99a1af] text-[12px] top-[33.4px]">Recommended</p>
    </div>
  );
}

function Text20() {
  return (
    <div className="absolute bg-[#fffbeb] border-[#fee685] border-[0.8px] border-solid h-[20.8px] left-[742.54px] rounded-[26843500px] top-[23.5px] w-[72.725px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] left-[10px] not-italic text-[#bb4d00] text-[12px] top-px whitespace-nowrap">Deferred</p>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute h-[19.5px] left-[855.26px] top-[23.9px] w-[46.075px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-[23.5px] not-italic text-[#1447e6] text-[13px] text-center top-[0.6px] whitespace-nowrap">View →</p>
    </div>
  );
}

function TableRow5() {
  return (
    <div className="absolute border-[#f3f4f6] border-b-[0.8px] border-solid h-[63.8px] left-0 top-[121.2px] w-[921.6px]" data-name="Table Row">
      <TableCell1 />
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-[299.9px] not-italic text-[#364153] text-[13px] top-[13px] w-[57px]">12 Aug 2026</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[18px] left-[396.08px] text-[#0f2340] text-[12px] top-[13.7px] w-[68px]">JO-2026-00125</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[19.5px] left-[503.5px] text-[#364153] text-[13px] top-[21.95px] whitespace-nowrap">125,430</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[598.1px] not-italic text-[#364153] text-[14px] top-[21px] whitespace-nowrap">Karim Samir</p>
      <Text20 />
      <Button6 />
    </div>
  );
}

function TableCell2() {
  return (
    <div className="[word-break:break-word] absolute h-[81.8px] left-0 not-italic top-0 w-[279.9px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[20px] text-[#101828] text-[14px] top-[12.4px] whitespace-nowrap">Brake Pad Replacement</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[20px] text-[#99a1af] text-[12px] top-[33.4px] w-[240px]">Heavy wear on front and rear pads — customer declined due to cost</p>
    </div>
  );
}

function Text21() {
  return (
    <div className="absolute bg-[#fffbeb] border-[#fee685] border-[0.8px] border-solid h-[20.8px] left-[742.54px] rounded-[26843500px] top-[32.5px] w-[72.725px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] left-[10px] not-italic text-[#bb4d00] text-[12px] top-px whitespace-nowrap">Deferred</p>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute h-[19.5px] left-[855.26px] top-[32.9px] w-[46.075px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-[23.5px] not-italic text-[#1447e6] text-[13px] text-center top-[0.6px] whitespace-nowrap">View →</p>
    </div>
  );
}

function TableRow6() {
  return (
    <div className="absolute border-[#f3f4f6] border-b-[0.8px] border-solid h-[81.8px] left-0 top-[185px] w-[921.6px]" data-name="Table Row">
      <TableCell2 />
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-[299.9px] not-italic text-[#364153] text-[13px] top-[22px] w-[57px]">08 Aug 2026</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[18px] left-[396.08px] text-[#0f2340] text-[12px] top-[22.7px] w-[68px]">JO-2026-00120</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[19.5px] left-[503.5px] text-[#364153] text-[13px] top-[30.95px] whitespace-nowrap">124,800</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[598.1px] not-italic text-[#364153] text-[14px] top-[30px] whitespace-nowrap">Karim Samir</p>
      <Text21 />
      <Button7 />
    </div>
  );
}

function TableCell3() {
  return (
    <div className="[word-break:break-word] absolute h-[81.4px] left-0 not-italic top-0 w-[279.9px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[20px] text-[#101828] text-[14px] top-[12.4px] whitespace-nowrap">AC Compressor Inspection</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[20px] text-[#99a1af] text-[12px] top-[33.4px] w-[240px]">Noise from AC compressor — requires belt replacement</p>
    </div>
  );
}

function Text22() {
  return (
    <div className="absolute bg-[#fffbeb] border-[#fee685] border-[0.8px] border-solid h-[20.8px] left-[742.54px] rounded-[26843500px] top-[32.5px] w-[72.725px]" data-name="Text">
      <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] left-[10px] not-italic text-[#bb4d00] text-[12px] top-px whitespace-nowrap">Deferred</p>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute h-[19.5px] left-[855.26px] top-[32.9px] w-[46.075px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-[23.5px] not-italic text-[#1447e6] text-[13px] text-center top-[0.6px] whitespace-nowrap">View →</p>
    </div>
  );
}

function TableRow7() {
  return (
    <div className="absolute h-[81.4px] left-0 top-[266.8px] w-[921.6px]" data-name="Table Row">
      <TableCell3 />
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-[299.9px] not-italic text-[#364153] text-[13px] top-[22px] w-[57px]">08 Aug 2026</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[18px] left-[396.08px] text-[#0f2340] text-[12px] top-[22.7px] w-[68px]">JO-2026-00120</p>
      <p className="[word-break:break-word] absolute font-['JetBrains_Mono:Regular',sans-serif] font-normal leading-[19.5px] left-[503.5px] text-[#364153] text-[13px] top-[30.95px] whitespace-nowrap">124,800</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[598.1px] not-italic text-[#364153] text-[14px] top-[30px] whitespace-nowrap">Karim Samir</p>
      <Text22 />
      <Button8 />
    </div>
  );
}

function Table1() {
  return (
    <div className="h-[348.2px] relative shrink-0 w-full" data-name="Table">
      <TableRow3 />
      <TableRow4 />
      <TableRow5 />
      <TableRow6 />
      <TableRow7 />
    </div>
  );
}

function Container22() {
  return (
    <div className="bg-white border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[406.6px] items-start overflow-clip relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <Container23 />
      <Table1 />
    </div>
  );
}

function ContainerMargin4() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-name="Container:margin">
      <Container22 />
    </div>
  );
}

function VehicleDetailsScreen() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col items-start min-h-[606.4000244140625px] pb-[40px] pt-[24px] px-[24px] relative shrink-0 w-full" data-name="VehicleDetailsScreen">
      <Button />
      <Container />
      <ContainerMargin />
      <ContainerMargin2 />
      <ContainerMargin3 />
      <ContainerMargin4 />
    </div>
  );
}

function VehicleDetailsScreenMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[224px] relative shrink-0 w-full" data-name="VehicleDetailsScreen:margin">
      <VehicleDetailsScreen />
    </div>
  );
}

function App() {
  return (
    <div className="bg-[#f3f4f6] content-stretch flex flex-col h-[606.4px] items-start relative shrink-0 w-[1195.2px]" data-name="App">
      <VehicleDetailsScreenMargin />
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

function Text23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['JetBrains_Mono:Bold',sans-serif] font-bold leading-[12px] relative shrink-0 text-[12px] text-[rgba(255,255,255,0.9)] whitespace-nowrap">SA</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[28px]" data-name="Container">
      <Text23 />
    </div>
  );
}

function Text24() {
  return (
    <div className="content-stretch flex flex-col h-[15px] items-start overflow-clip relative shrink-0 w-[97.45px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">Star Auto Center</p>
    </div>
  );
}

function Text25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.4)] tracking-[0.5px] uppercase whitespace-nowrap">Engineer</p>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Text24 />
      <Text25 />
    </div>
  );
}

function Container24() {
  return (
    <div className="border-[rgba(255,255,255,0.1)] border-b-[0.8px] border-solid content-stretch flex gap-[10px] items-center p-[20px] relative shrink-0 w-full" data-name="Container">
      <Container25 />
      <Container26 />
    </div>
  );
}

function Text26() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">⊞</p>
    </div>
  );
}

function Text27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Dashboard</p>
    </div>
  );
}

function Button9() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-full" data-name="Button">
      <Text26 />
      <Text27 />
    </div>
  );
}

function Text28() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">◉</p>
    </div>
  );
}

function Text29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Customers</p>
    </div>
  );
}

function Button10() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-full" data-name="Button">
      <Text28 />
      <Text29 />
    </div>
  );
}

function Text30() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">◈</p>
    </div>
  );
}

function Text31() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Vehicles</p>
    </div>
  );
}

function Button11() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-full" data-name="Button">
      <Text30 />
      <Text31 />
    </div>
  );
}

function Text32() {
  return (
    <div className="content-stretch flex flex-col items-center opacity-80 relative shrink-0 w-[16px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] text-center whitespace-nowrap">◫</p>
    </div>
  );
}

function Text33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Job Orders</p>
    </div>
  );
}

function Button12() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[10px] relative shrink-0 w-full" data-name="Button">
      <Text32 />
      <Text33 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="content-stretch flex flex-[435.8_0_0] flex-col items-start min-h-px overflow-clip py-[16px] relative w-full" data-name="Navigation">
      <Button9 />
      <Button10 />
      <Button11 />
      <Button12 />
    </div>
  );
}

function Text34() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[12px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">KS</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center relative rounded-[26843500px] shrink-0 size-[28px]" data-name="Container">
      <Text34 />
    </div>
  );
}

function Text35() {
  return (
    <div className="content-stretch flex flex-col h-[16px] items-start overflow-clip relative shrink-0 w-[146px]" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.8)] whitespace-nowrap">Karim Samir</p>
    </div>
  );
}

function Text36() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.35)] tracking-[0.5px] uppercase whitespace-nowrap">Engineer</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-[146_0_0] flex-col items-start min-w-px relative" data-name="Container">
      <Text35 />
      <Text36 />
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex gap-[10px] items-center pb-[12px] relative shrink-0 w-[184px]" data-name="Container">
      <Container29 />
      <Container30 />
    </div>
  );
}

function Button13() {
  return (
    <div className="absolute h-[18px] left-0 top-[5.6px] w-[61.538px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[31px] not-italic text-[12px] text-[rgba(255,255,255,0.35)] text-center top-[-0.2px] whitespace-nowrap">→ Sign out</p>
    </div>
  );
}

function Container31() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Button13 />
    </div>
  );
}

function Container27() {
  return (
    <div className="border-[rgba(255,255,255,0.1)] border-solid border-t-[0.8px] content-stretch flex flex-col items-start px-[20px] py-[16px] relative shrink-0 w-full" data-name="Container">
      <Container28 />
      <Container31 />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="absolute bg-[#060f1e] content-stretch flex flex-col h-[1212px] items-start left-0 top-0 w-[224px]" data-name="Sidebar">
      <Container24 />
      <Navigation />
      <Container27 />
    </div>
  );
}

function Text37() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[8px] relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">Vehicle Details</p>
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#e5e7eb] border-[0.8px] border-solid content-stretch flex flex-col h-[34.6px] items-start justify-center left-0 overflow-clip pl-[32px] pr-[16px] py-[6px] rounded-[10px] top-0 w-[448px]" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(153,161,175,0.5)] w-full">Search vehicle, customer, job order…</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="flex-[448_0_0] h-[34.6px] max-w-[448px] min-w-px relative" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[12.24px] not-italic text-[#99a1af] text-[12px] top-[8.3px] whitespace-nowrap">🔍</p>
      <TextInput />
    </div>
  );
}

function Text38() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-black whitespace-nowrap">🔔</p>
    </div>
  );
}

function Container35() {
  return <div className="absolute bg-[#fb2c36] border-[#5ee9b5] border-[0.8px] border-solid left-[20px] rounded-[26843500px] size-[8px] top-[4px]" data-name="Container" />;
}

function Container34() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[32px]" data-name="Container">
      <Text38 />
      <Container35 />
    </div>
  );
}

function Container36() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col items-end not-italic relative shrink-0 whitespace-nowrap" data-name="Container">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] relative shrink-0 text-[#101828] text-[12px]">Karim Samir</p>
      <p className="capitalize font-['Inter:Regular',sans-serif] font-normal leading-[15px] relative shrink-0 text-[#99a1af] text-[10px]">engineer</p>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Container34 />
      <Container36 />
    </div>
  );
}

function ContainerAlign() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-end min-w-px relative" data-name="Container:align">
      <Container33 />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-b-[0.8px] border-solid content-stretch flex gap-[16px] h-[56px] items-center left-[224px] px-[24px] top-0 w-[971.2px]" data-name="Header">
      <Text37 />
      <Container32 />
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